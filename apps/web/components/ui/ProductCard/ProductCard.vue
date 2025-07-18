<template>
  <div
    @mouseover="showHoverImage"
    @mouseleave="showDefaultImage"
    :class="[
      hasNewProperty
        ? 'hover:shadow-lg border-25 flex flex-col product-card relative fs-new'
        : 'hover:shadow-lg border-25 flex flex-col product-card relative',
    ]"
    data-testid="product-card"
  >
    <div class="relative overflow-hidden item-image pt-5">
      <UiBadges
        :use-tags="useTagsOnCategoryPage"
        :class="['absolute', isFromWishlist ? 'mx-2' : 'm-2']"
        :product="product"
        :use-availability="isFromWishlist"
      />

      <SfLink
        :tag="NuxtLink"
        rel="preload"
        :to="productPath"
        :class="{ 'size-48 mx-auto': isFromSlider }"
        as="image"
        class="flex items-center justify-center"
        data-testid="productcard-name"
      >
        <NuxtImg
          :src="currentImageUrl"
          :alt="imageAlt"
          :title="imageTitle ? imageTitle : null"
          :loading="lazy && !priority ? 'lazy' : 'eager'"
          :fetchpriority="priority ? 'high' : 'auto'"
          :preload="priority || false"
          :width="getWidth()"
          :height="getHeight()"
          class="object-contain rounded-md aspect-square w-full"
          data-testid="image-slot"
        />
      </SfLink>

      <slot name="wishlistButton">
        <WishlistButton
          square
          class="inline-flex items-center justify-center font-medium text-base focus-visible:outline focus-visible:outline-offset rounded-md disabled:text-disabled-500 disabled:bg-disabled-300 disabled:shadow-none disabled:ring-0 disabled:cursor-not-allowed p-1.5 gap-1.5 text-primary-500 hover:bg-primary-400 hover:text-primary-800 active:bg-primary-200 active:text-primary-900 disabled:bg-transparent absolute top-2 right-2 bg-white"
          :product="product"
          :class="['hidden', isFromWishlist]"
        />
      </slot>

      <div v-if="specialProperty" class="property-badge absolute">
        <span class="badge-content uppercase text-xs font-semibold p-0.5 pr-2">
          {{ specialProperty?.values?.value || 'BELIEBT' }}
        </span>
      </div>
    </div>

    <div class="thumb-content typography-text-sm px-2 pt-2 pb-5 flex flex-col flex-auto">
      <SfLink
        :tag="NuxtLink"
        rel="preload"
        :to="productPath"
        class="no-underline hover:no-underline flex flex-col flex-auto"
      >
        <div class="new mx-auto" v-if="hasNewProperty">
          <span class="text-white custom-font text-3xl">Jetzt Neu!</span>
        </div>

        <span class="text-secondary-500 item-title font-bold line-clamp-2" v-html="name" />
        <LowestPrice :product="product" />
        <div v-if="showBasePrice" class="mb-2">
          <BasePriceInLine
            :base-price="basePrice"
            :unit-content="unitContent"
            :unit-name="unitName"
            class="text-secondary-500"
          />
        </div>

        <div class="flex flex-row items-end mt-auto" :class="hasNewProperty ? 'justify-center' : 'justify-between'">
          <div v-if="!hasNewProperty" class="availability whitespace-nowrap">
            <p class="text-xs availability-preview text-center tt-wrap relativee flex items-center">
              <SfIconCircle
                class="mr-1"
                size="xs"
                :class="[
                  'availability-' + product.variation.availability.id,
                  { 'text-primary-500': product.variation.availability.id === 1 },
                  { 'text-yellow-500': product.variation.availability.id === 2 },
                  { 'text-orange-500': product.variation.availability.id === 3 },
                  { 'text-red-500': product.variation.availability.id === 4 },
                  { 'text-black': product.variation.availability.id === 5 },
                ]"
              />
              <span class="hidden md:inline font-bold text-secondary-500">
                {{
                  [1].includes(product.variation.availability.id)
                    ? 'Auf Lager'
                    : [2].includes(product.variation.availability.id)
                      ? 'Kurzfristig verfügbar'
                      : [3].includes(product.variation.availability.id)
                        ? 'Lieferzeit ca. 2 Wochen'
                        : [4].includes(product.variation.availability.id)
                          ? 'Lieferzeit ca. 4 Wochen'
                          : [5].includes(product.variation.availability.id)
                            ? 'Auf Anfrage'
                            : [6].includes(product.variation.availability.id)
                              ? 'Nicht auf Lager'
                              : [7, 8].includes(product.variation.availability.id)
                                ? 'Vergriffen'
                                : product.variation.availability.names.name
                }}
              </span>
            </p>
          </div>
          <div class="prices flex flex-wrap justify-end flex-col-reverse justify-start h-100">
            <span
              class="block custom-font font-bold text-lg leading-4 text-secondary-500 text-right"
              data-testid="product-card-vertical-price"
            >
              <span v-if="!productGetters.canBeAddedToCartFromCategoryPage(product)" class="mr-1 text-xs">
                {{ t('account.ordersAndReturns.orderDetails.priceFrom') }}
              </span>
              <span class="text-2xl leading-none">{{ format(price) }}</span>
            </span>
            <span
              v-if="crossedPrice && differentPrices(price, crossedPrice)"
              :class="hasNewProperty ? 'text-center' : 'text-right'"
              class="line-through"
            >
              {{ format(crossedPrice) }}
            </span>
          </div>
        </div>
      </SfLink>
      <UiButton
        v-if="productGetters.canBeAddedToCartFromCategoryPage(product)"
        size="sm"
        class="min-w-[80px] w-fit"
        data-testid="add-to-basket-short"
        :disabled="loading"
        @click="addWithLoader(Number(productGetters.getId(product)))"
      >
        <template v-if="!loading" #prefix>
          <SfIconShoppingCart size="sm" />
        </template>
        <SfLoaderCircular v-if="loading" class="flex justify-center items-center" size="sm" />
      </UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { productGetters } from '@plentymarkets/shop-api';
import { SfLink, SfIconShoppingCart, SfLoaderCircular, SfRating, SfCounter, SfIconCircle } from '@storefront-ui/vue';
import type { ProductCardProps } from '~/components/ui/ProductCard/types';
import { defaults } from '~/composables';
import Index from '~/pages/index.vue';

const hasNewProperty = computed(() => {
  return (
    product.variationProperties?.some((props) => props.properties?.some((vproperties) => vproperties.id === 24)) ||
    false
  );
});

const specialProperty = computed(() => {
  return product.variationProperties
    ?.flatMap((props) => props.properties || [])
    .find((vproperties) => vproperties.id === 10);
});

const localePath = useLocalePath();
const { format } = usePriceFormatter();
const { t } = useI18n();
const {
  product,
  name,
  imageUrl,
  imageAlt = '',
  imageTitle,
  imageWidth,
  imageHeight,
  rating,
  ratingCount,
  priority,
  lazy = true,
  unitContent,
  unitName,
  basePrice,
  showBasePrice,
  isFromWishlist = false,
  isFromSlider = false,
} = defineProps<ProductCardProps>();

//const { data: categoryTree } = useCategoryTree();
const { openQuickCheckout } = useQuickCheckout();
const { addToCart } = useCart();
const { price, crossedPrice } = useProductPrice(product);
const { send } = useNotification();
const loading = ref(false);

const config = useRuntimeConfig();
const useTagsOnCategoryPage = config.public.useTagsOnCategoryPage;
const variationId = computed(() => productGetters.getVariationId(product));

const productPath = computed(() => {
  const basePath = `/${productGetters.getUrlPath(product)}_${productGetters.getItemId(product)}`;
  const shouldAppendVariation = variationId.value && productGetters.getSalableVariationCount(product) === 1;
  return localePath(shouldAppendVariation ? `${basePath}_${variationId.value}` : basePath);
});

const getWidth = () => {
  if (imageWidth && imageWidth > 0 && imageUrl.includes(defaults.IMAGE_LINK_SUFIX)) {
    return imageWidth;
  }
  return '';
};
const getHeight = () => {
  if (imageHeight && imageHeight > 0 && imageUrl.includes(defaults.IMAGE_LINK_SUFIX)) {
    return imageHeight;
  }
  return '';
};

const currentImageUrl = ref(imageUrl);

const hoverImageUrl = computed(() => {
  return product.images?.all?.[1]?.url || imageUrl;
});

const showHoverImage = () => {
  currentImageUrl.value = hoverImageUrl.value;
};

const showDefaultImage = () => {
  currentImageUrl.value = imageUrl;
};

const addWithLoader = async (productId: number, quickCheckout = true) => {
  loading.value = true;

  try {
    await addToCart({
      productId: productId,
      quantity: 1,
    });
    if (quickCheckout) {
      openQuickCheckout(product, 1);
    } else {
      send({ message: t('addedToCart'), type: 'positive' });
    }
  } finally {
    loading.value = false;
  }
};
const differentPrices = (price: number, crossedPrice: number) => {
  return crossedPrice ? Math.round(price * 100) / 100 !== Math.round(crossedPrice * 100) / 100 : false;
};
const NuxtLink = resolveComponent('NuxtLink');
</script>
