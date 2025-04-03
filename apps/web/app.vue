<template>
  <UiToolbar v-if="isPreview" :style="`font-family: ${config.font}`" />
  <div
    class="w-100 relative md:flex"
    :class="{
      'lg:flex-row-reverse': placement !== 'left',
      'md:max-lg:w-[calc(100%-54px)]': disableActions && drawerOpen,
      'md:max-lg:w-[calc(100%-66px)]': disableActions && !drawerOpen,
    }"
  >
    <SettingsToolbar
      v-if="isPreview && disableActions"
      :class="{
        'order-first': placement === 'left',
        'order-last': placement === 'right',
        'mr-3': !drawerOpen || placement === 'right',
      }"
    />

    <SiteConfigurationDrawer
      v-if="drawerOpen"
      class="absolute lg:relative bg-white"
      :class="{ 'mr-3': placement === 'left', 'ml-3': placement === 'right' }"
      :style="`font-family: ${config.font}`"
    />

    <div
      class="w-full"
      :class="{ 'lg:w-3/4': drawerOpen, 'lg:w-[calc(100%-66px)]': isPreview && !drawerOpen && disableActions }"
    >
      <Body class="font-body bg-editor-body-bg" :class="bodyClass" :style="currentFont" />
      <UiNotifications />
      <VitePwaManifest v-if="$pwa?.isPWAInstalled" />
      <NuxtLoadingIndicator color="repeating-linear-gradient(to right, #008ebd 0%,#80dfff 50%,#e0f7ff 100%)" />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
  <UiPageModal />
</template>

<script setup lang="ts">
import type { Locale } from '#i18n';
import { useExternalScripts } from '~/composables/useExternalScripts/useExternalScripts';

const { $pwa } = useNuxtApp();
const bodyClass = ref('');
const { getCategoryTree } = useCategoryTree();
const { setInitialDataSSR } = useInitialSetup();
const { setVsfLocale } = useLocalization();
const route = useRoute();
const { locale } = useI18n();
const { setStaticPageMeta } = useCanonical();

const { drawerOpen, currentFont, placement } = useSiteConfiguration();
const { disableActions } = useEditor();

const isPreview = ref(false);
const config = useRuntimeConfig().public;
const showConfigurationDrawer = config.showConfigurationDrawer;

const { loadScript, addInlineScript } = useExternalScripts();

onMounted(() => {
  const pwaCookie = useCookie('pwa');
  isPreview.value = !!pwaCookie.value || (showConfigurationDrawer as boolean);

  try {
    loadScript('https://eu1-config.doofinder.com/2.x/a76684b8-5230-4d3c-8afe-1ce1e34195fd.js').then(() => {});
    addInlineScript(
      `
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        
        executeNewsletterScript();
      });
    } else {
      
      executeNewsletterScript();
    }

    function executeNewsletterScript() {
      
      (function (e, t, n, c, r, a, i) {
        e.Newsletter2GoTrackingObject = r;
        e[r] = e[r] || function () {
          (e[r].q = e[r].q || []).push(arguments);
        };
        e[r].l = 1 * new Date();
        a = t.createElement(n);
        i = t.getElementsByTagName(n)[0];
        a.async = 1;
        a.src = c;
        i.parentNode.insertBefore(a, i);
      })(window, document, 'script', 'https://static.newsletter2go.com/utils.js', 'n2g');

      
      var config = {
        container: { type: 'div', class: '', style: '' },
        row: { type: 'div', class: '', style: 'margin-top: 15px;' },
        columnLeft: { type: 'div', class: '', style: '' },
        columnRight: { type: 'div', class: '', style: '' },
        label: { type: 'label', class: '', style: '' },
      };

      const targetElement = document.getElementById('footer_newsletter2go');
      if (targetElement) {
        
        n2g('create', 'uwzoausj-nxdo3t8z-8xn');
        n2g('subscribe:createForm', config, 'footer_newsletter2go');
      } else {
        console.error('Target element does not exist');
      }
    }
    `,
      'n2g_script',
    );
  } catch (error) {
    //eslint-disable-next-line no-console
    console.error('Error loading global scripts:', error);
  }
});

await setInitialDataSSR();
setVsfLocale(locale.value);

if (route?.meta.pageType === 'static') setStaticPageMeta();
usePageTitle();

onNuxtReady(async () => {
  bodyClass.value = 'hydrated'; // Need this class for cypress testing
});

watch(
  () => locale.value,
  async (locale: Locale) => {
    setVsfLocale(locale);
    await getCategoryTree();
  },
);
</script>
