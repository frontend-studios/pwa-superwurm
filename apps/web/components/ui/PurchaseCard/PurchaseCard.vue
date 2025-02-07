<template>
  <form class="" data-testid="purchase-card" @submit.prevent="handleAddToCart()">
    <div class="relative">
      <div class="drift-zoom-image">
        <section class="p-4 xl:p-6">
          <div class="">
            <!-- <span class="manufacturer font-bold mb-0 text-secondary-500 text-sm" v-if="product.item.manufacturer.name">
              {{ product.item.manufacturer.name }}</span
            >
            -->
            <h1
              class="font-bold typography-headline-4 custom-font text-secondary-500 text-lg xl:text-3xl"
              data-testid="product-name"
            >
              {{ productGetters.getName(product) }}
            </h1>

            <div class="inline-flex items-center mb-5">
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
                  alt="Der Umwelt zu liebe"
                />
              </span>
            </div>
          </div>

          <div class="buy-box border-25 p-5">
            <div class="price-box flex justify-between mt-5">
              <ul class="single-usp flex flex-col justify-between">
                <li>Top Preise</li>
                <li>gleichbleibende Qualität</li>
                <li>Bester Service</li>
              </ul>

              <div class="flex flex-col items-end">
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
                <UiBadges :product="product" :use-availability="true" />
              </div>
            </div>

            <ProductAttributes :product="product" />
            <BundleOrderItems v-if="product.bundleComponents" :product="product" />
            <OrderProperties :product="product" />
            <GraduatedPriceList :product="product" :count="quantitySelectorValue" />

            <div class="mt-4">
              <div class="flex flex-col md:flex-row flex-wrap gap-4">
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
                          <SfIconShoppingCart size="sm" />
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

              <template v-if="showPayPalButtons">
                <PayPalExpressButton type="SingleItem" class="mt-4" @validation-callback="paypalHandleAddToCart" />
                <PayPalPayLaterBanner placement="product" :amount="priceWithProperties * quantitySelectorValue" />
              </template>
            </div>

            <div class="grid grid-cols-3 gap-2">
              <div
                class="text-secondary-500 border-25 w-full text-center hover:text-white hover:bg-secondary-500 social-item"
              >
                <a href="" target="_blank">
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
                <a href="" target="_blank">
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
                <a href="" target="_blank">
                  <div class="py-2 px-1">
                    <span class="font-bold flex items-center justify-center"
                      ><SfIconInstagram class="mr-2" size="base" />
                      <span v-if="viewport.isGreaterOrEquals('sm')">Instagram</span>
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
  SfIconShoppingCart,
  SfLoaderCircular,
  SfTooltip,
  SfLink,
  SfIconFacebook,
  SfIconYoutube,
  SfIconInstagram,
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
