<template>
  <NuxtLayout name="default" :breadcrumbs="breadcrumbs">
    <NarrowContainer>
      <div class="lg:grid gap-x-6 grid-areas-product-page grid-cols-product-page relative">
        <section class="grid-in-left-top md:h-full xl:max-h-[700px] mb-5">
          <Gallery :images="addModernImageExtensionForGallery(productGetters.getGallery(product))" />
        </section>
        <section class="grid-in-right-top mb-10 md:mb-0">
          <NuxtLazyHydrate when-idle>
            <UiPurchaseCard v-if="product" :product="product" :review-average="countsProductReviews" />
          </NuxtLazyHydrate>
        </section>
        <NuxtLazyHydrate when-visible>
          <section class="grid-in-full-width single-bread hidden md:block">
            <NarrowContainer v-if="breadcrumbs?.length" class="">
              <LazyUiBreadcrumbs :breadcrumbs="breadcrumbs" />
            </NarrowContainer>
          </section>
        </NuxtLazyHydrate>
        <section class="grid-in-left-bottom md:mt-xl p-4 xl:p-0">
          <NuxtLazyHydrate when-visible>
            <ProductAccordion v-if="product" :product="product" />
          </NuxtLazyHydrate>
          <ReviewsAccordion
            v-if="product"
            :product="product"
            :total-reviews="reviewGetters.getTotalReviews(countsProductReviews)"
          />

          <div class="py-4 flex">
            <p
              class="custom-font text-secondary-500 font-semibold whitespace-nowrap mt-5 cursor-pointer"
              data-testid="open-manufacturer-drawer"
              @click="openDrawer()"
            >
              <span>{{ t('legalDetails') }}</span>
              <SfIconChevronRight />
            </p>
          </div>
        </section>
        <section
          class="grid-in-right-bottom md:mt-xl fs-xselling overflow-x-scroll scrollbar-hidden p-4 xl:px-6"
          v-if="crossSellingItems?.products?.length"
        >
          <h2 class="custom-font text-3xl text-secondary-500 font-semibold whitespace-nowrap my-3 lg:my-6">
            Passendes Zubehör
          </h2>
          <NuxtLazyHydrate when-visible>
            <div>
              <UiProductCard
                v-for="product in crossSellingItems.products"
                :key="productGetters.getId(product)"
                :product="product"
                :name="productGetters.getName(product)"
                :slug="productGetters.getSlug(product) + `-${productGetters.getId(product)}`"
                :image-url="addModernImageExtension(productGetters.getSecondPreviewImage(product))"
                :image-alt="
                  productImageGetters.getImageAlternate(productImageGetters.getFirstImage(product)) ||
                  productGetters.getName(product) ||
                  ''
                "
                :image-title="
                  productImageGetters.getImageName(productImageGetters.getFirstImage(product)) ||
                  productGetters.getName(product) ||
                  ''
                "
                :image-height="productGetters.getImageHeight(product) || 600"
                :image-width="productGetters.getImageWidth(product) || 600"
                :rating-count="productGetters.getTotalReviews(product)"
                :rating="productGetters.getAverageRating(product, 'half')"
                is-from-slider
                class="xselling-item"
              />
            </div>
          </NuxtLazyHydrate>
        </section>
      </div>
    </NarrowContainer>

    <UiReviewModal />
    <ProductLegalDetailsDrawer v-if="open" :product="product" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { SfIconChevronRight } from '@storefront-ui/vue';
import type { Product } from '@plentymarkets/shop-api';
import { productGetters, reviewGetters, categoryTreeGetters, productImageGetters } from '@plentymarkets/shop-api';

definePageMeta({
  layout: false,
  path: '/:slug*_:itemId',
  name: 'custom-single-meta',
});
import type { ProductCardProps } from '~/components/ui/ProductCard/types';
const { imageUrl } = defineProps<ProductCardProps>();
const currentImageUrl = ref(imageUrl);

const { t } = useI18n();
const route = useRoute();

const { addModernImageExtension } = useModernImage();
const { setCurrentProduct } = useProducts();
const { setProductMetaData, setProductRobotsMetaData, setProductCanonicalMetaData } = useStructuredData();
const { buildProductLanguagePath } = useLocalization();
const { addModernImageExtensionForGallery } = useModernImage();
const { productParams, productId } = createProductParams(route.params);
const { data: product, fetchProduct, setProductMeta, setBreadcrumbs, breadcrumbs } = useProduct(productId);
const { data: productReviews, fetchProductReviews } = useProductReviews(Number(productId));
const { data: categoryTree } = useCategoryTree();
const { open, openDrawer } = useProductLegalDetailsDrawer();

const { setPageMeta } = usePageMeta();
const productName = computed(() => productGetters.getName(product.value));
const icon = 'sell';
setPageMeta(productName.value, icon);

const countsProductReviews = computed(() => reviewGetters.getReviewCounts(productReviews.value));

await fetchProduct(productParams).then(() => {
  usePlentyEvent().emit('frontend:productLoaded', {
    product: product.value,
  });
});

if (Object.keys(product.value).length === 0) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Product not found',
  });
}
setCurrentProduct(product.value || ({} as Product));
setProductMeta();

async function fetchReviews() {
  const productVariationId = productGetters.getVariationId(product.value);
  await fetchProductReviews(Number(productId), productVariationId);
}
await fetchReviews();

setBreadcrumbs();

/* TODO: This should only be temporary.
 *  It changes the url of the product page while on the page and switching the locale.
 *  Should be removed when the item search is refactored.
 */

watch(
  () => product.value.texts.urlPath,
  (value, oldValue) => {
    if (value !== oldValue) {
      navigateTo({
        path: buildProductLanguagePath(
          `/${productGetters.getUrlPath(product.value)}_${productGetters.getItemId(product.value)}`,
        ),
        query: route.query,
      });
    }
  },
);

watch(
  () => categoryTree.value,
  (categoriesTree) => {
    const productCategoryId = productGetters.getParentCategoryId(product.value);
    if (categoriesTree.length > 0 && productCategoryId) {
      const categoryTree = categoriesTree.find(
        (categoryTree) => categoryTreeGetters.getId(categoryTree) === productCategoryId,
      );
      if (categoryTree) {
        setProductMetaData(product.value, categoryTree);
        setProductRobotsMetaData(product.value);
      }
      setProductCanonicalMetaData(product.value);
    }
  },
  { immediate: true },
);
watch(
  () => route.params,
  () => {
    const productName = computed(() => productGetters.getName(product.value));
    const icon = 'sell';
    setPageMeta(productName.value, icon);
  },
  { immediate: true },
);

// FS Xselling
const itemId = productGetters.getItemId(product.value);
// the param for useProducts is your state key, if you want to have multiple item lists, this identifier must be unique

const { fetchProducts: fetchCrossSelling, data: crossSellingItems } = useProducts(productId + 'Similar');

fetchCrossSelling({
  itemId: productGetters.getItemId(product.value),
  type: 'cross_selling',
  crossSellingRelation: 'Similar',
});
</script>
