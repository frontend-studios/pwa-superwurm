<template>
  <NarrowContainer class="mb-20 px-4 md:px-0" data-testid="category-layout">
    <div class="lg:flex gap-6" data-testid="category-page-content">
      <CategorySidebar :is-open="isOpen" @close="close">
        <NuxtLazyHydrate when-visible>
          <slot name="sidebar" />
        </NuxtLazyHydrate>
      </CategorySidebar>
      <div class="flex-1">
        <div class="flex justify-between items-center hidden mb-6">
          <UiButton @click="open" variant="tertiary" class="md:hidden whitespace-nowrap">
            <template #prefix>
              <SfIconTune />
            </template>
            {{ $t('listSettings') }}
          </UiButton>
        </div>

        <section
          v-if="products?.length"
          class="sm:grid sm:grid-cols-2 gap-2 md:gap-2 md:grid-cols-3 lg:grid-cols-3 3xl:grid-cols-4 mb-10 md:mb-5"
          data-testid="category-grid"
        >
          <NuxtLazyHydrate
            v-for="(product, index) in products"
            :key="productGetters.getVariationId(product)"
            when-visible
          >
            <UiProductCard
              :product="product"
              :name="productGetters.getName(product) ?? ''"
              :rating-count="productGetters.getTotalReviews(product)"
              :rating="productGetters.getAverageRating(product, 'half')"
              :image-url="addModernImageExtension(productGetters.getCoverImage(product))"
              :image-alt="
                'alt-' + productImageGetters.getImageAlternate(productImageGetters.getFirstImage(product)) ||
                productGetters.getName(product) ||
                ''
              "
              :image-title="
                productImageGetters.getImageName(productImageGetters.getFirstImage(product)) ||
                productGetters.getName(product) ||
                ''
              "
              :image-height="productGetters.getImageHeight(product) || 600"
              :image-width="productGetters.getImageWidth(product) || 600"
              :slug="productGetters.getSlug(product) + `-${productGetters.getId(product)}`"
              :priority="index < 5"
              :base-price="productGetters.getDefaultBasePrice(product)"
              :unit-content="productGetters.getUnitContent(product)"
              :unit-name="productGetters.getUnitName(product)"
              :show-base-price="productGetters.showPricePerUnit(product)"
            />
          </NuxtLazyHydrate>
        </section>
        <LazyCategoryEmptyState v-else />

        <UiPagination
          v-if="totalProducts > 0"
          :key="`${totalProducts}-${itemsPerPage}`"
          :current-page="getFacetsFromURL().page ?? 1"
          :total-items="totalProducts"
          :page-size="itemsPerPage"
          :max-visible-pages="maxVisiblePages"
        />
      </div>
    </div>
  </NarrowContainer>
</template>

<script setup lang="ts">
import { productGetters, productImageGetters } from '@plentymarkets/shop-api';
import { SfIconTune, useDisclosure, SfLink } from '@storefront-ui/vue';
import type { CategoryPageContentProps } from '~/components/CategoryPageContent/types';
import { paths } from '~/utils/paths';

const { title, totalProducts, itemsPerPage = 28, products = [] } = defineProps<CategoryPageContentProps>();

const localePath = useLocalePath();
const { getFacetsFromURL } = useCategoryFilter();
const { addModernImageExtension } = useModernImage();

const { showNetPrices } = useCustomer();

const { isOpen, open, close } = useDisclosure();
const viewport = useViewport();

const maxVisiblePages = computed(() => (viewport.isGreaterOrEquals('lg') ? 5 : 2));

if (viewport.isLessThan('md')) close();
</script>
