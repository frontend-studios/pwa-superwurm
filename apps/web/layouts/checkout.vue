<template>
  <main class="checkout" data-testid="checkout-layout">
    <NuxtLazyHydrate when-visible>
      <NarrowContainer class="px-4 md:px-0 mb-20">
        <div class="flex items-center justify-between mt-8 mb-10 md:px-0">
          <h1 class="font-bold typography-headline-3 md:typography-headline-2 md:pl-4">{{ heading }}</h1>
        </div>
        <span v-if="isLoading && !cart" class="!flex justify-center my-40 h-24">
          <SfLoaderCircular size="2xl" />
        </span>
        <slot v-else />
      </NarrowContainer>
    </NuxtLazyHydrate>
  </main>
</template>

<script setup lang="ts">
import { SfIconArrowBack, SfLoaderCircular } from '@storefront-ui/vue';
import type { CheckoutLayoutProps } from './types';

const localePath = useLocalePath();
const router = useRouter();
const { data: cart, loading: isLoading } = useCart();
const { setInitialData } = useInitialSetup();
const viewport = useViewport();
const { backToCart = true, heading, backLabelMobile, backLabelDesktop } = defineProps<CheckoutLayoutProps>();
const historyState = router.options.history.state;
const backUrl = localePath(historyState?.back?.toString() ?? paths.home);
const backHref = backUrl === localePath(router.currentRoute.value.path) ? localePath(paths.home) : backUrl;
const goToPreviousRoute = () => (backToCart ? navigateTo(localePath(paths.cart)) : navigateTo(localePath(backHref)));

onNuxtReady(async () => await setInitialData());
</script>
