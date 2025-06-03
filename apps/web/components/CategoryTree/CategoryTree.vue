<template>
  <div
    v-if="parent || (categoryTreeItem && categoryTreeGetters.getItems(categoryTreeItem)?.length)"
    class="category-tree"
  >
    <h6
      class="py-2 px-4 md:px-0 mb-0 text-xl custom-font text-secondary-500 font-bold uppercase tracking-widest rounded-none select-none"
      data-testid="category-tree"
    >
    {{ t('category') }}
    </h6>
    <template v-if="parent">
      <CategoryTreeItem
        :name="categoryTreeGetters.getName(parent)"
        :href="localePath(buildCategoryMenuLink(parent, categoryTree))"
        :count="categoryTreeGetters.getCount(parent)"
      >
        <SfIconArrowBack size="sm" class="text-neutral-500 mr-2" />
      </CategoryTreeItem>
    </template>
    <ul v-if="categoryTreeItem" class="mt-4 mb-6 md:mt-0" data-testid="categories">
      <CategoryTreeItem
        v-for="(categoryItem, index) in categoryTreeGetters.getItems(categoryTreeItem)"
        :key="index"
        :name="categoryTreeGetters.getName(categoryItem)"
        :href="localePath(buildCategoryMenuLink(categoryItem, categoryTree))"
        :count="categoryTreeGetters.getCount(categoryItem)"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { categoryGetters, categoryTreeGetters } from '@plentymarkets/shop-api';
import { SfIconArrowBack } from '@storefront-ui/vue';
import type { CategoryTreeProps } from '~/components/CategoryTree/types';

const props = defineProps<CategoryTreeProps>();

const { data: categoryTree } = useCategoryTree();
const { buildCategoryMenuLink } = useLocalization();

const localePath = useLocalePath();
const { t } = useI18n();

const categoryTreeItem = computed(() =>
  categoryTreeGetters.findCategoryById(categoryTree.value, categoryGetters.getId(props.category)),
);
const parent = computed(() =>
  categoryTreeGetters.findCategoryById(categoryTree.value, categoryGetters.getParentId(props.category)),
);
</script>
