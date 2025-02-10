<template>
  <NuxtLayout name="default" :breadcrumbs="breadcrumbs">
    <NarrowContainer>
      <div class="md:grid gap-x-6 grid-areas-product-page grid-cols-product-page">
        <section class="grid-in-left-top md:h-full xl:max-h-[700px]">
          <Gallery :images="addModernImageExtensionForGallery(productGetters.getGallery(product))" />
        </section>
        <section class="grid-in-right-top mb-10 md:mb-0">
          <NuxtLazyHydrate when-idle>
            <UiPurchaseCard v-if="product" :product="product" :review-average="countsProductReviews" />
          </NuxtLazyHydrate>
        </section>
        <section class="grid-in-full-width single-bread">
          <NarrowContainer v-if="breadcrumbs?.length" class="">
            <LazyUiBreadcrumbs :breadcrumbs="breadcrumbs" />
          </NarrowContainer>
        </section>
        <section class="grid-in-left-bottom md:mt-8">
          <!-- <UiDivider class="mt-4 mb-2 md:mt-8" />-->
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
        <section class="grid-in-right-bottom md:mt-8 fs-xselling overflow-x-scroll scrollbar-hidden xl:px-6">
          <h2 class="custom-font text-3xl text-secondary-500 font-semibold whitespace-nowrap mb-3">
            Passendes Zubehör
          </h2>
          <NuxtLazyHydrate when-visible>
            <ProductRecommendedProducts :category-id="productGetters.getCategoryIds(product)[0]" />
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
import { productGetters, reviewGetters, categoryTreeGetters } from '@plentymarkets/shop-api';

definePageMeta({
  layout: false,
  path: '/:slug*_:itemId',
  name: 'custom-single-meta',
});

const { t } = useI18n();
const route = useRoute();

const { setCurrentProduct } = useProducts();
const { setProductMetaData, setProductRobotsMetaData, setProductCanonicalMetaData } = useStructuredData();
const { buildProductLanguagePath } = useLocalization();
const { addModernImageExtensionForGallery } = useModernImage();
const { productParams, productId } = createProductParams(route.params);
const { data: product, fetchProduct, setProductMeta, setBreadcrumbs, breadcrumbs } = useProduct(productId);
const { data: productReviews, fetchProductReviews } = useProductReviews(Number(productId));
const { data: categoryTree } = useCategoryTree();
const { open, openDrawer } = useProductLegalDetailsDrawer();

const countsProductReviews = computed(() => reviewGetters.getReviewCounts(productReviews.value));

await fetchProduct(productParams);

if (Object.keys(product.value).length === 0) {
  throw new Response(null, {
    status: 404,
    statusText: 'Not found',
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
</script>
