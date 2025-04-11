<template>
  <UiButton
    size="sm"
    :aria-label="
      isWishlistItem(variationId)
        ? t('removeProductFromWishlist', { label: productName })
        : t('addProductToWishlist', { label: productName })
    "
    class="single-wish font-bold mb-0 text-secondary-500 text-sm flex flex-row-reverse hover:underline"
    :noClass="true"
    :disabled="wishlistLoading"
    data-testid="wishlist-trigger"
    @click="onWishlistClick"
  >
    <SfLoaderCircular v-if="actionLoading" class="flex justify-center items-center ml-1" size="sm" />
    <template v-else>
      <SfIconClose v-if="isCloseButton" size="sm" class="ml-1 wishlistRemoveButton" />
      <SfIconFavoriteFilled v-else-if="isWishlistItem(variationId)" size="sm" class="ml-1" />
      <SfIconFavorite v-else size="sm" class="ml-1" />
      <slot />
    </template>
  </UiButton>
</template>

<script setup lang="ts">
import type { WishlistButtonProps } from '~/components/WishlistButton/types';
import { SfIconFavorite, SfIconFavoriteFilled, SfLoaderCircular, SfIconClose } from '@storefront-ui/vue';
import { productGetters } from '@plentymarkets/shop-api';

const { product, quantity = 1, discard = false } = defineProps<WishlistButtonProps>();
const { t } = useI18n();
const { isWishlistItem, interactWithWishlist, loading: wishlistLoading } = useWishlist();
const actionLoading = ref(false);

const productName = computed(() => productGetters.getName(product));
const variationId = computed(() => productGetters.getVariationId(product));
const isCloseButton = computed(() => isWishlistItem(variationId.value) && discard);
const onWishlistClick = async () => {
  actionLoading.value = true;
  await interactWithWishlist(variationId.value, quantity);
  actionLoading.value = false;
};
</script>
