<template>
  <div data-testid="product-accordion" class="product-details">
    <h2 class="custom-font text-3xl text-secondary-500 font-semibold whitespace-nowrap my-3 lg:my-6">
      {{ t('productDetails') }}
    </h2>

    <div class="no-preflight" v-html="productGetters.getDescription(product)" />

    <UiDivider v-if="technicalDataOpen && productGetters.getTechnicalData(product)?.length" class="mb-2 mt-2" />
  </div>
</template>

<script setup lang="ts">
import { productGetters } from '@plentymarkets/shop-api';
import type { ProductAccordionPropsType } from '~/components/ProductAccordion/types';

const props = defineProps<ProductAccordionPropsType>();

const { product } = toRefs(props);
const { t } = useI18n();

const productDetailsOpen = ref(true);
const technicalDataOpen = ref(false);
</script>
