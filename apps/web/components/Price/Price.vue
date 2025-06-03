<template>
  <div class="text-sm py-1 flex flex-col-reverse">
    <span class="custom-font text-5xl text-secondary-500 font-bold font-headings" data-testid="price">
      <span>{{ format(price) }}</span>
    </span>
    <span v-if="crossedPrice && differentPrices" class="text-base font-normal text-neutral-500 line-through">
      {{ format(crossedPrice) }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { PriceProps } from '~/components/Price/types';

const props = defineProps<PriceProps>();
const { format } = usePriceFormatter();
const { t } = useI18n();
const differentPrices = computed(() => {
  return props.crossedPrice
    ? Math.round(props.price * 100) / 100 !== Math.round(props.crossedPrice * 100) / 100
    : false;
});
</script>
