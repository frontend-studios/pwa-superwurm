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
        class="font-bold text-sm"
        :style="availabilityStyles"
      >
        <SfIconCircle
          class="mr-1"
          size="xs"
          :class="[
            'availability-' + product.variation.availability.id,
            { 'text-primary-500': product.variation.availability.id === 1 },
          ]"
        />
        {{ productGetters.getAvailabilityName(product) }}
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
