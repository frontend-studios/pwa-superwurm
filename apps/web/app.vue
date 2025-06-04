<template>
  <component :is="Toolbar" v-if="$isPreview" :style="`font-family: ${config.font}`" />
  <div
    class="w-100 relative md:flex"
    :class="{
      'lg:flex-row-reverse': placement !== 'left',
      'md:max-lg:w-[calc(100%-54px)]': disableActions && drawerOpen && $isPreview,
      'md:max-lg:w-[calc(100%-66px)]': disableActions && !drawerOpen && $isPreview,
    }"
  >
    <component
      :is="SettingsToolbar"
      v-if="$isPreview && disableActions"
      :class="{
        'order-first': placement === 'left',
        'order-last': placement === 'right',
        'mr-3': !drawerOpen || placement === 'right',
      }"
    />

    <component
      :is="SiteConfigurationDrawer"
      v-if="drawerOpen"
      class="absolute lg:relative bg-white"
      :class="{ 'mr-3': placement === 'left', 'ml-3': placement === 'right' }"
      :style="`font-family: ${config.font}`"
    />

    <div
      class="w-full relative"
      :class="{ 'lg:w-3/4': drawerOpen, 'lg:w-[calc(100%-66px)]': $isPreview && !drawerOpen && disableActions }"
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
  <component :is="PageModal" v-if="$isPreview" />
  <component :is="UnlinkCategoryModal" v-if="$isPreview" />
</template>

<script setup lang="ts">
import { useExternalScripts } from '~/composables/useExternalScripts/useExternalScripts';

const { $pwa, $isPreview } = useNuxtApp();
const bodyClass = ref('');
const route = useRoute();
const { disableActions } = useEditor();
const { drawerOpen, currentFont, placement } = useSiteConfiguration();

const config = useRuntimeConfig().public;
const { setStaticPageMeta } = useCanonical();
const { setInitialDataSSR } = useInitialSetup();
const { loadScript, addInlineScript } = useExternalScripts();

await callOnce(async () => {
  await setInitialDataSSR();
});

if (route?.meta.pageType === 'static') setStaticPageMeta();
usePageTitle();

onMounted(() => {
  bodyClass.value = 'hydrated'; // Need this class for cypress testing
});

const Toolbar = defineAsyncComponent(() => import('~/components/ui/Toolbar/Toolbar.vue'));
const SettingsToolbar = defineAsyncComponent(() => import('~/components/SettingsToolbar/SettingsToolbar.vue'));
const SiteConfigurationDrawer = defineAsyncComponent(
  () => import('~/components/SiteConfigurationDrawer/SiteConfigurationDrawer.vue'),
);
const PageModal = defineAsyncComponent(() => import('~/components/ui/PageModal/PageModal.vue'));
const UnlinkCategoryModal = defineAsyncComponent(
  () => import('~/components/ui/UnlinkCategoryModal/UnlinkCategoryModal.vue'),
);

onMounted(() => {
  const pwaCookie = useCookie('pwa');

  // Funktion zum Laden des Doofinder Skripts

  loadScript('https://eu1-config.doofinder.com/2.x/a76684b8-5230-4d3c-8afe-1ce1e34195fd.js');

  // Funktion zur Ausführung des Newsletter-Formulars
  const runNewsletterForm = () => {
    addInlineScript(
      `
      function waitForElement(selector, callback, timeout = 5000) {
        const interval = 100;
        const maxAttempts = timeout / interval;
        let attempts = 0;

        const checkExist = setInterval(() => {
          const el = document.querySelector(selector);
          if (el) {
            clearInterval(checkExist);            
            callback(el);
          } else if (++attempts >= maxAttempts) {
            clearInterval(checkExist);
            console.error('Element wurde innerhalb des Timeouts nicht gefunden:', selector);
          }
        }, interval);
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
        
        n2g('create', 'uwzoausj-nxdo3t8z-8xn');
        n2g('subscribe:createForm', config, 'footer_newsletter2go');
      }

      if (document.readyState === 'loading') {        
        document.addEventListener('DOMContentLoaded', () => {
          waitForElement('#footer_newsletter2go', () => {            
            executeNewsletterScript();
          });
        });
      } else {        
        waitForElement('#footer_newsletter2go', () => {
          executeNewsletterScript();
        });
      }
      `,
      'n2g_script',
    );
  };

  // Initial load: Formular bei initialem Laden einfügen
  runNewsletterForm();

  // Reagiere auf Routenänderungen: Formular nach dem Seitenwechsel erneut einfügen
  const router = useRouter();
  const route = useRoute();

  // Watch für Routenänderungen, damit das Skript bei jeder Routenänderung ausgeführt wird
  watch(route, () => {
    setTimeout(() => {
      runNewsletterForm();
    }, 500); // Verzögerung, um sicherzustellen, dass der DOM nach der Routenänderung vollständig aktualisiert ist
  });
});

</script>
