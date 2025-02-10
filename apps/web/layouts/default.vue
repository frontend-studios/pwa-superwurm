<template>
  <div>
    <UiHeader />
    <!-- Breadcrumb nicht singleItem anzeigen -->
    <div v-if="route.name != 'custom-single-meta___de___default'">
      <NarrowContainer v-if="breadcrumbs?.length" class="p-4 md:px-0">
        <LazyUiBreadcrumbs :breadcrumbs="breadcrumbs" />
      </NarrowContainer>
    </div>
    <main>
      <slot />
    </main>
    <UiNavbarBottom v-if="viewport.isLessThan('lg')" />
    <Cookiebar />
    <PreviewMode />
    <NuxtLazyHydrate when-visible>
      <UiFooter />
    </NuxtLazyHydrate>

    <QuickCheckout v-if="isOpen" :product="product" />
  </div>
</template>

<script setup lang="ts">
import type { DefaultLayoutProps } from '~/layouts/types';
defineProps<DefaultLayoutProps>();
const { setLogoMeta } = useStructuredData();
const { isOpen, product } = useQuickCheckout();
const viewport = useViewport();
setLogoMeta();

const route = useRoute();
</script>
