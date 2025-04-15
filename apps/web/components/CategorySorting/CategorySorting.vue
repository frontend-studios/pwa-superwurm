<template>
  <div class="w-full md:max-w-[376px] mt-4 mb-6 md:mt-0" data-testid="category-sorting">
    <h6
      class="py-2 px-4 md:px-0 mb-0 text-xl custom-font text-secondary-500 font-bold uppercase tracking-widest rounded-none select-none"
    >
      {{ $t('sortBy') }}
    </h6>
    <div class="px-4">
      <SfSelect id="sortBy" v-model="selected" :aria-label="$t('sortBy')" @change="sortingChanged">
        <option v-for="{ value, label } in options" :key="value" :value="value">
          {{ $t(`sortType.${label}`) }}
        </option>
      </SfSelect>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SfSelect } from '@storefront-ui/vue';

const { getFacetsFromURL, updateSorting } = useCategoryFilter();
const options = ref([
  {
    label: 'nameA-Z',
    value: 'texts.name1_asc',
  },
  {
    label: 'nameZ-A',
    value: 'texts.name1_desc',
  },
  {
    label: 'priceUp',
    value: 'sorting.price.avg_asc',
  },
  {
    label: 'priceDown',
    value: 'sorting.price.avg_desc',
  },
  {
    label: 'reviewsUp',
    value: 'item.feedbackDecimal_asc',
  },
  {
    label: 'reviewsDown',
    value: 'item.feedbackDecimal_desc',
  },
  {
    label: 'Position Absteigend',
    value: 'item.position_asc',
  },
]);
const selected = ref(options.value[0].value);

function sortingChanged() {
  updateSorting(selected.value);
}

function sortQueryChanged() {
  const facets = getFacetsFromURL();
  selected.value = facets.sort ?? options.value[0].value;
}

sortQueryChanged();

watch(
  () => useNuxtApp().$router.currentRoute.value.query.sort,
  () => {
    sortQueryChanged();
  },
);
</script>
