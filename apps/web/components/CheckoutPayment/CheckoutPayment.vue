<template>
  <fieldset class="md:mx-4 my-6" data-testid="checkout-payment">
    <legend class="text-neutral-900 text-lg font-bold mb-4">{{ t('checkoutPayment.heading') }}</legend>
    <div v-if="paymentMethods?.list && paymentMethods.list.length > 0" class="grid gap-4 grid-cols-2">
      <label v-for="paymentMethod in paymentMethods.list" :key="paymentMethod.id" class="relative">
        <input
          type="radio"
          name="payment_method"
          class="peer sr-only"
          :value="paymentMethod.id"
          :data-testid="`payment-method-${paymentMethod.id}`"
          :checked="isPaymentMethodChecked(paymentMethod)"
          :disabled="isPaymentMethodDisabled(paymentMethod)"
          @click.prevent="handlePaymentMethodChange(paymentMethod)"
        />
        <span
          :class="{
            'peer-focus:border-primary-300 peer-focus:bg-primary-50': !paymentProviderGetters.isPaymentMethodExcluded(
              selectedShippingMethod,
              paymentMethod.id,
            ),
          }"
          class="peer-focus:border-primary-300 peer-focus:bg-primary-50 h-20 flex flex-col items-center justify-center py-4 px-4 cursor-pointer rounded-md border border-secondary-500 -outline-offset-2 hover:border-primary-300 active:border-primary-100 active:bg-primary-300 peer-checked:outline peer-checked:outline-2 peer-checked:outline-primary-500 peer-disabled:opacity-50 peer-disabled:bg-neutral-100 peer-disabled:border-neutral-200 peer-disabled:cursor-not-allowed peer-disabled:[&_img]:grayscale"
        >
          <span v-if="paymentMethod.id === -1">
            <SfIconCreditCard class="mr-2" />
            <span class="font-medium">{{ t('checkoutPayment.creditCard') }}</span>
          </span>
          <NuxtImg v-else :src="paymentMethod.icon" :alt="paymentMethod.name" class="!h-[40px]" loading="lazy" />
          <span class="text-xs mt-2 text-neutral-500">{{ paymentMethod.name }}</span>
        </span>
      </label>
    </div>
    <div
      v-else
      class="flex items-start bg-warning-100 shadow-md pr-2 pl-4 ring-1 ring-warning-200 typography-text-sm md:typography-text-base py-1 rounded-md"
      data-testid="no-payment-method-available"
    >
      <SfIconWarning class="mt-2 mr-2 text-warning-700 shrink-0" />
      <div class="py-2 mr-2">
        <p>{{ t('checkoutPayment.noMethodsAvailable') }}</p>
      </div>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import { paymentProviderGetters, type PaymentMethod } from '@plentymarkets/shop-api';
import { SfIconCreditCard, SfIconWarning } from '@storefront-ui/vue';
import type { CheckoutPaymentEmits, CheckoutPaymentProps } from '~/components/CheckoutPayment/types';

const { disabled = false } = defineProps<CheckoutPaymentProps>();
const emit = defineEmits<CheckoutPaymentEmits>();

const { t } = useI18n();
const { send } = useNotification();
const { data: cart } = useCart();
const { selectedMethod: selectedShippingMethod } = useCartShippingMethods();
const { paymentMethods } = useCheckoutPagePaymentAndShipping();

const isPaymentMethodChecked = (paymentMethod: PaymentMethod): boolean =>
  !paymentProviderGetters.isPaymentMethodExcluded(selectedShippingMethod.value, paymentMethod.id) &&
  paymentMethod.id === cart.value.methodOfPaymentId;

const isPaymentMethodDisabled = (paymentMethod: PaymentMethod): boolean =>
  !paymentMethod.isSelectable ||
  disabled ||
  paymentProviderGetters.isPaymentMethodExcluded(selectedShippingMethod.value, paymentMethod.id);

const emitActivePaymentUpdate = (paymentMethod: PaymentMethod) => {
  if (!selectedShippingMethod.value || !paymentMethod.isSelectable || disabled) return;
  emit('update:activePayment', paymentMethod.id);
};

const handlePaymentMethodChange = (paymentMethod: PaymentMethod) => {
  paymentProviderGetters.isPaymentMethodExcluded(selectedShippingMethod.value, paymentMethod.id)
    ? send({ message: t('billing.methodChanged'), type: 'warning' })
    : emitActivePaymentUpdate(paymentMethod);
};
</script>
