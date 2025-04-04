<template>
  <div class="max-w-screen-2xl relative mx-auto p-5 overflow-x-auto no-preflight text-secondary-500 os-page">
    <h1>Schlichtung</h1>
    <p>
      <span
        >Link zu OS-Plattform gemäss EU Kommission Verfügung für die außergerichtliche Beilegung von strittigen
        Online-Fällen:
        <a href="https://ec.europa.eu/consumers/odr" target="_blank">https://ec.europa.eu/consumers/odr</a></span
      >
    </p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  pageType: 'static',
});
const { setPageMeta } = usePageMeta();

const { data, fetchCategoryTemplate } = useCategoryTemplate();
const runtimeConfig = useRuntimeConfig();
await fetchCategoryTemplate(Number(runtimeConfig.public.shippingTextCategoryId));
const { t } = useI18n();

const icon = 'page';
setPageMeta(t('orderConfirmation.shipping'), icon);

const text = computed(() => data?.value?.data);
</script>
