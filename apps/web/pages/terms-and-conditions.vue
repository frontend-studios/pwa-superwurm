<template>
  <div
    class="max-w-screen-2xl relative mx-auto p-5 overflow-x-auto no-preflight text-secondary-500"
    v-html="getHTMLTexts()"
  />
</template>

<script setup lang="ts">
const { data, getLegalTexts } = useLegalInformation();
const { getRobots, setRobotForStaticPage } = useRobots();
const { t } = useI18n();

definePageMeta({
  pageType: 'static',
});
const { setPageMeta } = usePageMeta();

const icon = 'page';
setPageMeta(t('categories.legal.subcategories.termsAndConditions'), icon);

await getLegalTexts({
  type: 'TermsConditions',
});

const getHTMLTexts = () => {
  return data.value.htmlText ?? '';
};

await getRobots();
setRobotForStaticPage('TermsAndConditions');
</script>
