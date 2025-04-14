<template>
  <form class="" data-testid="purchase-card" @submit.prevent="handleAddToCart()">
    <div class="relative">
      <div class="drift-zoom-image">
        <section class="p-4 xl:p-6">
          <div>
            <!--
            <span class="manufacturer font-bold mb-0 text-secondary-500 text-sm" v-if="product.item.manufacturer.name">
              {{ product.item.manufacturer.name }}</span
            >
            -->
            <h1
              class="font-bold typography-headline-4 custom-font text-secondary-500 text-lg xl:text-3xl mb-3"
              data-testid="product-name"
            >
              {{ productGetters.getName(product) }}
            </h1>

            <div v-if="reviewGetters.getTotalReviews(reviewAverage) > 0" class="inline-flex items-center mb-5">
              <SfRating
                size="xs"
                :half-increment="true"
                :value="reviewGetters.getAverageRating(reviewAverage, 'half')"
                :max="5"
              />
              <SfCounter class="ml-1" size="xs">{{ reviewGetters.getTotalReviews(reviewAverage) }}</SfCounter>
              <UiButton
                variant="tertiary"
                class="ml-2 text-xs text-neutral-500 cursor-pointer"
                data-testid="show-reviews"
                @click="scrollToReviews"
              >
                {{ t('showAllReviews') }}
              </UiButton>
            </div>

            <div class="">
              <div class="tech-data" v-html="productGetters.getTechnicalData(product)" />
              <span class="flex font-bold mb-0 text-secondary-500 text-sm w-100 justify-end mb-3 items-center">
                Der Umwelt zu liebe
                <img
                  src="https://cdn02.plentymarkets.com/ln590pyonzot/plugin/34/superwurmdevtools/images/2015_gruen.png"
                  class="ml-2 max-h-7"
                  alt="Der Umwelt zur liebe"
                />
              </span>
            </div>
          </div>

          <div class="buy-box border-25 p-5">
            <div class="price-box flex justify-between mt-5 flex-wrap xl:flex-nowrap relative">
              <ul class="single-usp flex flex-col w-full">
                <li><SfIconCheck size="xs" class="mr-1" />Top Preise</li>
                <li><SfIconCheck size="xs" class="mr-1" />Gleichbleibende Qualität</li>
                <li><SfIconCheck size="xs" class="mr-1" />Bester Service</li>
              </ul>

              <div class="single-prices flex flex-col items-end w-full">
                <WishlistButton
                  :product="product"
                  :quantity="quantitySelectorValue"
                  :square="viewport.isLessThan('lg')"
                >
                  <template v-if="viewport.isGreaterOrEquals('lg')">
                    {{
                      !isWishlistItem(productGetters.getVariationId(product))
                        ? t('addToWishlist')
                        : t('removeFromWishlist')
                    }}
                  </template>
                </WishlistButton>

                <Price :price="priceWithProperties" :crossed-price="crossedPrice" />
                <div v-if="(productBundleGetters?.getBundleDiscount(product) ?? 0) > 0" class="m-auto">
                  <UiTag :size="'sm'" :variant="'secondary'">{{
                    t('procentageSavings', { percent: productBundleGetters.getBundleDiscount(product) })
                  }}</UiTag>
                </div>

                <LowestPrice :product="product" />
                <BasePrice
                  v-if="productGetters.showPricePerUnit(product)"
                  :base-price="basePriceSingleValue"
                  :unit-content="productGetters.getUnitContent(product)"
                  :unit-name="productGetters.getUnitName(product)"
                />
                <div class="mb-4 typography-text-xs flex gap-1">
                  <span>{{ t('asterisk') }}</span>
                  <span v-if="showNetPrices">{{ t('itemExclVAT') }}</span>
                  <span v-else>{{ t('itemInclVAT') }}</span>
                  <i18n-t keypath="excludedShipping" scope="global">
                    <template #shipping>
                      <SfLink
                        :href="localePath(paths.shipping)"
                        target="_blank"
                        class="focus:outline focus:outline-offset-2 focus:outline-2 outline-secondary-600 rounded"
                      >
                        {{ $t('delivery') }}
                      </SfLink>
                    </template>
                  </i18n-t>
                </div>
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
                      { 'text-black': product.variation.availability.id === 6 },
                      { 'text-black': product.variation.availability.id === 7 },
                      { 'text-black': product.variation.availability.id === 8 },
                    ]"
                  />
                  <span class="inline font-bold text-secondary-500">
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
            </div>

            <ProductAttributes :product="product" />
            <BundleOrderItems v-if="product.bundleComponents" :product="product" />
            <OrderProperties :product="product" />
            <GraduatedPriceList :product="product" :count="quantitySelectorValue" />

            <div class="mt-4">
              <div class="flex flex-col md:flex-row flex-wrap gap-4 mb-3">
                <div class="fs-quantity bg-white border-25">
                  <UiQuantitySelector
                    :min-value="productGetters.getMinimumOrderQuantity(product)"
                    :value="quantitySelectorValue"
                    class="min-w-[145px] flex-grow-0 flex-shrink-0 basis-0"
                    @change-quantity="changeQuantity"
                  />
                </div>
                <SfTooltip
                  show-arrow
                  placement="top"
                  :label="isNotValidVariation || isSalableText"
                  class="flex-grow-[2] flex-shrink basis-auto whitespace-nowrap"
                >
                  <div class="fs-addbtn">
                    <UiButton
                      type="submit"
                      data-testid="add-to-cart"
                      size="lg"
                      class="w-full h-full"
                      :disabled="loading || !productGetters.isSalable(product)"
                    >
                      <template #prefix>
                        <div v-if="!loading" class="flex row items-center">
                          <SfIconShoppingCart size="sm" class="mr-2" />
                          {{ t('addToCart') }}
                        </div>
                        <div v-else>
                          <SfLoaderCircular size="sm" />
                        </div>
                      </template>
                    </UiButton>
                  </div>
                </SfTooltip>
              </div>
            </div>

            <div class="grid grid-cols-4 gap-2">
              <div
                class="text-secondary-500 border-25 w-full text-center hover:text-white hover:bg-secondary-500 social-item"
              >
                <a href="https://www.facebook.com/Wurmfarm/" target="_blank">
                  <div class="py-2 px-1">
                    <span class="font-bold flex items-center justify-center"
                      ><SfIconFacebook class="mr-2" size="base" />
                      <span v-if="viewport.isGreaterOrEquals('sm')">Facebook</span>
                    </span>
                  </div>
                </a>
              </div>
              <div
                class="text-secondary-500 border-25 w-full text-center hover:text-white hover:bg-secondary-500 social-item"
              >
                <a href="https://www.youtube.com/user/SuperwurmTV" target="_blank">
                  <div class="py-2 px-1">
                    <span class="font-bold flex items-center justify-center"
                      ><SfIconYoutube class="mr-2" size="base" />
                      <span v-if="viewport.isGreaterOrEquals('sm')">Youtube</span>
                    </span>
                  </div>
                </a>
              </div>
              <div
                class="text-secondary-500 border-25 w-full text-center hover:text-white hover:bg-secondary-500 social-item"
              >
                <a href="https://www.instagram.com/superwurm.de/" target="_blank">
                  <div class="py-2 px-1">
                    <span class="font-bold flex items-center justify-center"
                      ><SfIconInstagram class="mr-2" size="base" />
                      <span v-if="viewport.isGreaterOrEquals('sm')">Instagram</span>
                    </span>
                  </div>
                </a>
              </div>
              <div
                class="text-secondary-500 border-25 w-full text-center hover:text-white hover:bg-secondary-500 social-item tiktok"
              >
                <a href="https://www.tiktok.com/@superwurm.de" target="_blank tiktok">
                  <div class="py-2 px-1">
                    <span class="font-bold flex items-center justify-center">
                      <svg
                        class="mr-2 flex lg:hidden xl:flex"
                        alt="tiktok"
                        fill="#000000"
                        width="21px"
                        height="21px"
                        viewBox="0 0 512 512"
                        id="icons"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M412.19,118.66a109.27,109.27,0,0,1-9.45-5.5,132.87,132.87,0,0,1-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14,23.9,350,16,350.13,16H267.69V334.78c0,4.28,0,8.51-.18,12.69,0,.52-.05,1-.08,1.56,0,.23,0,.47-.05.71,0,.06,0,.12,0,.18a70,70,0,0,1-35.22,55.56,68.8,68.8,0,0,1-34.11,9c-38.41,0-69.54-31.32-69.54-70s31.13-70,69.54-70a68.9,68.9,0,0,1,21.41,3.39l.1-83.94a153.14,153.14,0,0,0-118,34.52,161.79,161.79,0,0,0-35.3,43.53c-3.48,6-16.61,30.11-18.2,69.24-1,22.21,5.67,45.22,8.85,54.73v.2c2,5.6,9.75,24.71,22.38,40.82A167.53,167.53,0,0,0,115,470.66v-.2l.2.2C155.11,497.78,199.36,496,199.36,496c7.66-.31,33.32,0,62.46-13.81,32.32-15.31,50.72-38.12,50.72-38.12a158.46,158.46,0,0,0,27.64-45.93c7.46-19.61,9.95-43.13,9.95-52.53V176.49c1,.6,14.32,9.41,14.32,9.41s19.19,12.3,49.13,20.31c21.48,5.7,50.42,6.9,50.42,6.9V131.27C453.86,132.37,433.27,129.17,412.19,118.66Z"
                        ></path>
                      </svg>
                      <span v-if="viewport.isGreaterOrEquals('sm')">TikTok</span>
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { productGetters, reviewGetters, productBundleGetters } from '@plentymarkets/shop-api';
import {
  SfCounter,
  SfRating,
  SfIconCheck,
  SfIconShoppingCart,
  SfLoaderCircular,
  SfTooltip,
  SfLink,
  SfIconFacebook,
  SfIconYoutube,
  SfIconInstagram,
  SfIconCircle,
} from '@storefront-ui/vue';
import type { PurchaseCardProps } from '~/components/ui/PurchaseCard/types';
import type { PayPalAddToCartCallback } from '~/components/PayPal/types';
import { paths } from '~/utils/paths';

const { product, reviewAverage } = defineProps<PurchaseCardProps>();

const { showNetPrices } = useCustomer();
const viewport = useViewport();
const { getCombination } = useProductAttributes();
const { getPropertiesForCart, getPropertiesPrice } = useProductOrderProperties();
const { validateAllFields, invalidFields, resetInvalidFields } = useValidatorAggregator('properties');
const {
  validateAllFields: validateAllFieldsAttributes,
  invalidFields: invalidAttributeFields,
  resetInvalidFields: resetAttributeFields,
} = useValidatorAggregator('attributes');
const { clear, send } = useNotification();
const { addToCart, loading } = useCart();
const { t } = useI18n();
const quantitySelectorValue = ref(productGetters.getMinimumOrderQuantity(product));
const { isWishlistItem } = useWishlist();
const { openQuickCheckout } = useQuickCheckout();
const { crossedPrice } = useProductPrice(product);
const { reviewArea } = useProductReviews(Number(productGetters.getId(product)));
const localePath = useLocalePath();

onMounted(() => {
  resetInvalidFields();
  resetAttributeFields();
});
onBeforeRouteLeave(() => {
  if (invalidFields.value.length > 0 || invalidAttributeFields.value.length > 0) clear();
});

const priceWithProperties = computed(
  () =>
    (productGetters.getSpecialOffer(product) ||
      productGetters.getGraduatedPriceByQuantity(product, quantitySelectorValue.value)?.unitPrice.value ||
      0) + getPropertiesPrice(product),
);

const basePriceSingleValue = computed(
  () =>
    productGetters.getGraduatedPriceByQuantity(product, quantitySelectorValue.value)?.basePrice ??
    productGetters.getDefaultBasePrice(product),
);

const handleValidationErrors = (): boolean => {
  send({
    message: [
      t('errorMessages.missingOrWrongProperties'),
      '',
      ...invalidAttributeFields.value.map((field) => field.name),
      ...invalidFields.value.map((field) => field.name),
      '',
      t('errorMessages.pleaseFillOutAllFields'),
    ],
    type: 'negative',
  });

  return false;
};

const handleAddToCart = async (quickCheckout = true) => {
  await validateAllFieldsAttributes();
  await validateAllFields();

  if (invalidFields.value.length > 0 || invalidAttributeFields.value.length > 0) {
    return handleValidationErrors();
  }

  if (!getCombination()) {
    send({ message: t('productAttributes.notValidVariation'), type: 'negative' });
    return false;
  }

  const addedToCart = await addToCart({
    productId: Number(productGetters.getId(product)),
    quantity: Number(quantitySelectorValue.value),
    basketItemOrderParams: getPropertiesForCart(),
  });

  if (addedToCart) {
    quickCheckout === true
      ? openQuickCheckout(product, quantitySelectorValue.value)
      : send({ message: t('addedToCart'), type: 'positive' });
  }

  return addedToCart;
};

const paypalHandleAddToCart = async (callback: PayPalAddToCartCallback) => {
  const added = await handleAddToCart(false);

  callback(added);
};

const changeQuantity = (quantity: string) => {
  quantitySelectorValue.value = Number(quantity);
};

const isReviewsAccordionOpen = () => {
  const customerReviewsAccordionDetailsElement = document.querySelector('#customerReviewsAccordion')
    ?.firstChild as HTMLDetailsElement;

  return customerReviewsAccordionDetailsElement.open;
};

const openReviewsAccordion = () => {
  const customerReviewsClickElement = document.querySelector('#customerReviewsClick') as HTMLElement;
  customerReviewsClickElement?.click();
};

const isSalableText = computed(() => (productGetters.isSalable(product) ? '' : t('itemNotAvailable')));
const isNotValidVariation = computed(() => (getCombination() ? '' : t('productAttributes.notValidVariation')));
const showPayPalButtons = computed(() => Boolean(getCombination()) && productGetters.isSalable(product));

const scrollToReviews = () => {
  if (!isReviewsAccordionOpen()) {
    openReviewsAccordion();
  }

  if (reviewArea.value) {
    reviewArea.value.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>
