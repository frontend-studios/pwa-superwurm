<template>
  <div v-if="haveBadges" data-testid="badges">
    <ul>
      <template v-if="tagsEnabled && productTags.length > 0">
        <SfListItem
          v-for="(tag, index) in productTags"
          :key="index"
          size="sm"
          :class="[
            tagGetters.getAgenciesTagCLass(tag),
            tagGetters.getTagTextColorIsDark(tag) ? 'text-dark' : 'text-white',
          ]"
          :noClass="true"
          :style="{ backgroundColor: tagGetters.getTagBackgroundColor(tag) }"
          @click="onTagClick(tag)"
        >
          {{ tagGetters.getTagName(tag) }}
        </SfListItem>
      </template>

      <li
        v-if="availabilityEnabled && productGetters.getAvailabilityName(product)"
        class="font-bold text-sm flex items-center"
        :style="availabilityStyles"
      >
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
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { SfListItem, SfIconCircle } from '@storefront-ui/vue';
import { type ProductTag, productGetters, tagGetters } from '@plentymarkets/shop-api';
import type { BadgesProps } from '~/components/ui/Badges/types';
import { normalizeClass } from 'vue';

const localePath = useLocalePath();

const { product, useTags = true, useAvailability = false } = defineProps<BadgesProps>();
const productTags = ref([] as ProductTag[]);
const availabilityStyles = ref({});

const availabilityEnabled = useAvailability;
if (availabilityEnabled) {
  availabilityStyles.value = {
    color: productGetters.getAvailabilityTextColor(product),
  };
}

const tagsEnabled = useTags;
if (tagsEnabled) {
  productTags.value = tagGetters.getTags(product);
}

const haveBadges = computed(
  () =>
    (tagsEnabled && productTags.value.length > 0) ||
    (availabilityEnabled && productGetters.getAvailabilityName(product)),
);

const onTagClick = (tag: ProductTag) => {
  navigateTo(localePath(`/tag/${tagGetters.getTagName(tag)}_${tagGetters.getTagId(tag)}`));
};
</script>
