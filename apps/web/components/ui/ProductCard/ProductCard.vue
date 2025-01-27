<template>
  <div
    :class="[
      hasNewProperty
        ? 'hover:shadow-lg border-25 flex flex-col product-card relative fs-new'
        : 'hover:shadow-lg border-25 flex flex-col product-card relative',
    ]"
    data-testid="product-card"
  >
    <div class="relative overflow-hidden item-image pt-5">
      <UiBadges
        :class="['absolute', isFromWishlist ? 'mx-2' : 'm-2']"
        :product="product"
        :use-availability="isFromWishlist"
      />

      <SfLink
        :tag="NuxtLink"
        rel="preload"
        :to="productPath"
        :class="{ 'size-48': isFromSlider }"
        as="image"
        class="flex items-center justify-center"
      >
        <NuxtImg
          :src="imageUrl"
          :alt="imageAlt"
          :title="imageTitle"
          :loading="lazy && !priority ? 'lazy' : 'eager'"
          :fetchpriority="priority ? 'high' : 'auto'"
          :preload="priority || false"
          :width="getWidth()"
          :height="getHeight()"
          class="object-contain rounded-md aspect-square w-full"
          data-testid="image-slot"
        />
      </SfLink>

      <div v-if="specialProperty" class="property-badge absolute">
        <span class="badge-content uppercase text-xs font-semibold p-0.5 pr-2">
          {{ specialProperty?.values?.value || 'Standardwert' }}
        </span>
      </div>
    </div>

    <div class="thumb-content typography-text-sm px-2 pt-2 pb-5 flex flex-col flex-auto">
      <div class="new mx-auto" v-if="hasNewProperty">
        <span class="text-white custom-font text-3xl">Jetzt Neu!</span>
      </div>

      <SfLink
        :tag="NuxtLink"
        :to="productPath"
        class="no-underline line-clamp-2 font-bold text-secondary-500 mb-2"
        variant="secondary"
      >
        {{ name }}
      </SfLink>
      <LowestPrice :product="product" />
      <div v-if="showBasePrice" class="mb-2">
        <BasePriceInLine :base-price="basePrice" :unit-content="unitContent" :unit-name="unitName" />
      </div>

      <div
        class="flex items-start flex-row items-end mt-auto"
        :class="hasNewProperty ? 'justify-center' : 'justify-between'"
      >
        <div v-if="!hasNewProperty" class="availability whitespace-nowrap">
          <p class="text-xs availability-preview text-center tt-wrap relative">
            <SfIconCircle
              class="mr-1"
              size="xs"
              :class="[
                'availability-' + product.variation.availability.id,
                { 'text-primary-500': product.variation.availability.id === 1 },
              ]"
            />
            <span class="text-secondary-500 font-semibold hidden md:inline">
              {{
                [1, 2].includes(product.variation.availability.id)
                  ? 'Auf Lager'
                  : [3, 4].includes(product.variation.availability.id)
                    ? 'Bald verfügbar'
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
            <span v-if="!productGetters.canBeAddedToCartFromCategoryPage(product)" class="mr-1">
              {{ t('account.ordersAndReturns.orderDetails.priceFrom') }}
            </span>
            <span class="text-3xl">{{ n(price, 'currency') }}</span>
            <span v-if="showNetPrices">{{ t('asterisk') }} </span>
          </span>
          <span v-if="crossedPrice" :class="hasNewProperty ? 'text-center' : 'text-right'" class="line-through">
            {{ n(crossedPrice, 'currency') }}
          </span>
        </div>
      </div>
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
    product.variationProperties?.some((props) => props.properties?.some((vproperties) => vproperties.id === 9)) || false
  );
});

const specialProperty = computed(() => {
  return product.variationProperties
    ?.flatMap((props) => props.properties || [])
    .find((vproperties) => vproperties.id === 10);
});

const localePath = useLocalePath();
const { t, n } = useI18n();
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

const { data: categoryTree } = useCategoryTree();
const { openQuickCheckout } = useQuickCheckout();
const { addToCart } = useCart();
const { price, crossedPrice } = useProductPrice(product);
const { send } = useNotification();
const loading = ref(false);

const { showNetPrices } = useCustomer();

const path = computed(() => productGetters.getCategoryUrlPath(product, categoryTree.value));
const productSlug = computed(() => productGetters.getSlug(product) + `_${productGetters.getItemId(product)}`);
const productPath = computed(() => localePath(`${path.value}/${productSlug.value}`));
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

const NuxtLink = resolveComponent('NuxtLink');
</script>
