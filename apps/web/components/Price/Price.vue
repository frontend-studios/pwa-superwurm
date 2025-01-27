<template>
  <div class="text-sm py-1 flex flex-col-reverse">
    <span class="custom-font text-5xl text-secondary-500 font-bold font-headings" data-testid="price">
      {{ $n(price, 'currency') }}
      <span v-if="showNetPrices">{{ $t('asterisk') }} </span>
    </span>
    <span v-if="crossedPrice" class="text-base font-normal text-neutral-500 line-through text-right">
      {{ $n(crossedPrice, 'currency') }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { PriceProps } from '~/components/Price/types';

defineProps<PriceProps>();

const { showNetPrices } = useCustomer();
</script>
