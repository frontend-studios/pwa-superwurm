<template>
  <div class="fs-homepage px-1 md:px-md-0">
    <div class="max-w-screen-2xl relative mx-auto border-25 video-container">
      <video id="introVideo" class="border-25 mb-2" autoplay loop muted>
        <source
          src="https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/prev_images/Superwurm_Website.mp4"
          type="video/mp4"
        />
        Dein Browser unterstützt kein HTML5-Video.
      </video>
      <div class="wrapper absolute">
        <span class="mb-0 block font-bold">SUPERWURM</span>
        <span class="custom-font text-4xl xl:text-7xl font-bold block">Deutschlands größte Wurmfarm</span>
      </div>
    </div>

    <div class="max-w-screen-2xl relative mx-auto my-5 lg:my-10 text-center">
      <span class="mb-0 block font-bold text-secondary-500 xl:text-2xl">Willkommen bei Superwurm</span>
      <span class="custom-font text-4xl text-secondary-500 xl:text-5xl font-bold block"
        >Finde die perfekten Produkte für deinen Garten, <br />deine Tiere und dein Hobby
      </span>
    </div>

    <NuxtLazyHydrate when-visible>
      <div class="max-w-screen-2xl relative mx-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        <div class="relative hero md:row-span-2 md:col-span-2 mb-2 md:mb-0">
          <a href="/angelwuermer"
            ><img
              class="border-25"
              src="https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/prev_images/angelwuermer-fischer-boot-nebel.png"
              alt="Ein Fischer in einem kleinen Boot auf einem ruhigen See, umgeben von Nebel, perfekt für das Angeln mit Angelwürmern."
              width="1024"
              height="1024"
            />
            <div class="cat-wrapper absolute">
              <span class="mb-0 block font-bold">ANGELWÜRMER</span>
              <span class="custom-font text-4xl xl:text-7xl font-bold block lg:mb-7"> Der perfekte Köder</span>
              <span class="block font-bold">Fange mehr - Entdecke unsere hochwertigen Angelwürmer!</span>
              <button
                href="/angelwuermer"
                class="btn border-25 bg-custom text-secondary-500 font-bold px-4 py-3 mt-4 hover:text-white hover:bg-secondary-500 border-2"
              >
                <span>Zu den Angelwürmern!</span>
              </button>
            </div>
          </a>
        </div>

        <div class="single-cat mb-2 md:mb-0">
          <a href="/garten-kompost/gartenwuermer"
            ><img
              class="border-25"
              src="https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/prev_images/gartenwuermer-erde-pflanzen.png"
              alt="Rote Würmer in fruchtbarer Erde zwischen frischen, grünen Pflanzen – ideale Gartenwürmer für gesunden Boden."
              width="500"
              height="360"
            />
            <div class="cat-wrapper absolute">
              <span class="custom-font text-4xl xl:text-6xl font-bold block text-wrap">Garten würmer</span>
              <button
                href="/garten-kompost/gartenwuermer"
                class="btn border-25 bg-custom text-secondary-500 font-bold px-4 py-3 mt-4 hover:text-white hover:bg-secondary-500 border-2"
              >
                <span>Zu den Gartenwürmer!</span>
              </button>
            </div>
          </a>
        </div>
        <div class="single-cat primary mb-2 md:mb-0">
          <a href="/futterwuermer"
            ><img
              class="border-25"
              src="https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/prev_images/futterwuermer-schale-natur.png"
              alt="Eine Schale mit lebenden Futterwürmern in natürlicher Umgebung, perfekt als Nahrungsquelle für Reptilien und Vögel."
              width="500"
              height="360"
            />
            <div class="cat-wrapper absolute">
              <span class="custom-font text-4xl xl:text-6xl font-bold block">Futter würmer</span>
              <button
                href="/futterwuermer"
                class="btn border-25 bg-custom text-secondary-500 font-bold px-4 py-3 mt-4 hover:text-white hover:bg-secondary-500 border-2"
              >
                <span>Zu den Futterwürmern!</span>
              </button>
            </div>
          </a>
        </div>
      </div>
    </NuxtLazyHydrate>
    <div
      class="max-w-screen-2xl mx-auto relative mt-2 mb-5 lg:mb-10 flex overflow-x-scroll scrollbar-hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-2"
    >
      <div
        v-for="{ title, title2nd, image, link, btntext, alt } in categories"
        :key="title"
        class="single-cat mb-2 md:mb-0"
      >
        <a :href="link">
          <img class="border-25" :src="image" :alt="alt" width="500" height="360" />
          <div class="cat-wrapper absolute">
            <span class="custom-font text-4xl xl:text-6xl font-bold block">{{ title }} <br />{{ title2nd }}</span>
            <button
              :href="link"
              class="btn block border-25 bg-custom text-secondary-500 font-bold px-4 py-3 mt-4 hover:text-white hover:bg-secondary-500 border-2"
            >
              <span>{{ btntext }}</span>
            </button>
          </div>
        </a>
      </div>
    </div>

    <div class="max-w-screen-2xl mx-auto relative social-icons mb-5 md:mb-10">
      <div class="grid grid-cols-4 gap-2 bg-secondary-500 border-25 md:bg-transparent md:rounded-none">
        <div
          class="bg-secondary-500 border-25 w-full text-center text-custom border-secondary-500 border-2 hover:text-secondary-500 social-item"
        >
          <a href="https://www.facebook.com/Wurmfarm/" target="_blank">
            <div class="py-2">
              <span class="font-bold flex items-center justify-center"
                ><SfIconFacebook class="mr-2" size="base" />
                <span v-if="viewport.isGreaterOrEquals('sm')">Facebook</span>
              </span>
            </div>
          </a>
        </div>
        <div
          class="bg-secondary-500 border-25 w-full text-center text-custom border-secondary-500 border-2 hover:text-secondary-500 social-item"
        >
          <a href="https://www.youtube.com/user/SuperwurmTV" target="_blank">
            <div class="py-2">
              <span class="font-bold flex items-center justify-center"
                ><SfIconYoutube class="mr-2" size="base" /> <span v-if="viewport.isGreaterOrEquals('sm')">Youtube</span>
              </span>
            </div>
          </a>
        </div>
        <div
          class="bg-secondary-500 border-25 w-full text-center text-custom border-secondary-500 border-2 hover:text-secondary-500 social-item"
        >
          <a href="https://www.instagram.com/superwurm.de/" target="_blank">
            <div class="py-2">
              <span class="font-bold flex items-center justify-center"
                ><SfIconInstagram class="mr-2" size="base" />
                <span v-if="viewport.isGreaterOrEquals('sm')">Instagram</span>
              </span>
            </div>
          </a>
        </div>
        <div
          class="bg-secondary-500 border-25 w-full text-center text-custom border-secondary-500 border-2 hover:text-secondary-500 social-item"
        >
          <a href="https://www.tiktok.com/@superwurm.de" target="_blank">
            <div class="py-2">
              <span class="font-bold flex items-center justify-center"
                ><img
                  src="https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/TikTok_SocialMediaIcon.png"
                  alt="tiktok"
                  class="mr-2"
                />
                <span v-if="viewport.isGreaterOrEquals('sm')">TikTok</span>
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>

    <NuxtLazyHydrate when-visible>
      <section class="max-w-screen-2xl mx-auto relative w-full items mb-5 md:mb-10">
        <div class="mx-3 lg:mx-0 mt-5 lg:mt-0 lg:mb-10 flex justify-between items-center">
          <div>
            <p class="mb-0 block text-secondary-500 font-bold">Bestseller</p>
            <p class="custom-font text-secondary-500 text-2xl md:text-4xl font-bold block">
              Alle Highlights auf einen Blick!
            </p>
          </div>
          <div>
            <a
              href="/haelterung-zubehoer"
              class="bg-secondary-500 border-25 w-full text-center text-custom border-secondary-500 border-2 hover:text-secondary-500 show-all py-4 px-5 hidden md:block text-sm font-bold"
              ><SfIconArrowForward class="mr-2" size="base" />Weitere Highlights</a
            >
          </div>
        </div>

        <div class="thumbs">
          <BlocksProductRecommendedProducts :text="{}" :category-id="customProductsCategoryId" />
        </div>
      </section>
    </NuxtLazyHydrate>

    <NuxtLazyHydrate when-visible>
      <section class="max-w-screen-2xl mx-auto relative w-full mb-5 md:mb-10">
        <div class="lazy-image-container">
          <a href="/garten-kompost/kompostwuermer">
            <NuxtImg :src="getImageUrl()" alt="Kompostwürmer" class="w-full border-25" loading="lazy" />
            <div class="wrapper absolute">
              <p class="custom-font text-custom text-4xl lg:text-7xl font-bold mb-0">Maden</p>
              <button
                href="/garten-kompost/kompostwuermer"
                class="btn border-25 bg-custom text-secondary-500 font-bold px-4 py-3 mt-4 hover:text-white hover:bg-secondary-500 border-2"
              >
                <span>Zu unseren Maden!</span>
              </button>
            </div>
          </a>
        </div>
      </section>
    </NuxtLazyHydrate>

    <NuxtLazyHydrate when-visible>
      <section class="max-w-screen-2xl mx-auto relative w-full items mb-5 md:mb-10">
        <div class="mx-3 lg:mx-0 mt-5 lg:mt-0 lg:mb-10 flex justify-between items-center">
          <div>
            <p class="mb-0 block text-secondary-500 font-bold">KOMPOST- UND GARTENWÜRMER</p>
            <p class="custom-font text-secondary-500 text-2xl md:text-4xl font-bold block">
              Für lockeren Boden und starken Kompost
            </p>
          </div>
          <div>
            <a
              href="/futterwuermer-zoo/futterwuermer"
              class="bg-secondary-500 border-25 w-full text-center text-custom border-secondary-500 border-2 hover:text-secondary-500 show-all py-4 px-5 hidden md:block text-sm font-bold"
              ><SfIconArrowForward class="mr-2" size="base" />Zu den Würmern</a
            >
          </div>
        </div>

        <div class="thumbs">
          <BlocksProductRecommendedProducts :text="{}" :category-id="customProductsCategoryIdBottom" />
        </div>
      </section>
    </NuxtLazyHydrate>

    <NuxtLazyHydrate when-visible>
      <div
        class="max-w-screen-2xl mx-auto relative mt-2 mb-5 lg:mb-10 flex overflow-x-scroll scrollbar-hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-2"
      >
        <div
          v-for="{ title, title2nd, image, link, btntext, alt } in bottom_categories"
          :key="title"
          class="single-cat mb-2 md:mb-0"
        >
          <a :href="link">
            <img class="border-25" :src="image" :alt="alt" width="500" height="360" />
            <div class="cat-wrapper absolute">
              <span class="custom-font text-4xl xl:text-6xl font-bold block">{{ title }} <br />{{ title2nd }}</span>
              <button
                :href="link"
                class="btn block border-25 bg-custom text-secondary-500 font-bold px-4 py-3 mt-4 hover:text-white hover:bg-secondary-500 border-2"
              >
                <span>{{ btntext }}</span>
              </button>
            </div>
          </a>
        </div>
      </div>
    </NuxtLazyHydrate>

    <NuxtLazyHydrate when-visible>
      <section class="max-w-screen-2xl relative w-full mx-auto mb-5 lg:mb-10" id="bewertung">
        <p class="custom-font text-secondary-500 text-2xl lg:text-3xl font-bold block mx-3 lg:mx-0 mb-5 lg:mb-10">
          "ECHT WURMIG!" - DAS SAGEN UNSERE KUNDEN
        </p>
        <div
          class="flex overflow-x-scroll lg:grid lg:gap-2 lg:grid-cols-5 lg:overflow-auto scrollbar-hidden ml-3 lg:ml-0"
        >
          <div
            v-for="{ stars, name, text } in feedback"
            :key="name"
            class="feedback border-25 bg-white p-3 mb-3 md:mb-0 mr-2 lg:mr-0"
          >
            <div class="headline flex flex-wrap justify-between items-center mb-2">
              <div class="leading-3">
                <SfIconStarFilled size="xs" class="text-orange-400" />
                <SfIconStarFilled size="xs" class="text-orange-400 -ml-1" />
                <SfIconStarFilled size="xs" class="text-orange-400 -ml-1" />
                <SfIconStarFilled size="xs" class="text-orange-400 -ml-1" />
                <SfIconStarFilled size="xs" class="text-orange-400 -ml-1" v-if="stars === 5" />
                <span class="text-xs text-gray-400 ml-2">{{ name }}</span>
              </div>
              <SfIconCheckCircle class="text-primary-500" size="sm" />
            </div>
            <div class="text text-sm text-secondary-500">
              <span>{{ text }}</span>
            </div>
          </div>
        </div>
      </section>
    </NuxtLazyHydrate>

    <NuxtLazyHydrate when-visible>
      <section class="max-w-screen-2xl mx-auto relative mt-2 flex justify-center about">
        <p class="custom-font text-primary-500 text-2xl md:text-4xl font-bold block">24 Jahre SUPERWURM</p>
      </section>
      <section
        class="max-w-screen-2xl mx-auto relative mt-2 mb-5 px-3 lg:px-0 lg:mb-10 flex flex-wrap md:grid md:grid-cols-2 gap-2 about text-secondary-500"
      >
        <div>
          <p>
            <strong
              >Wir liefern Kompostwürmer, Angelwürmer, Futterwürmer sowie Wurmhumus. Auf unserer Wurm-Farm züchten wir
              Riesen-Rotwürmer.</strong
            >
            <br />Für Handel, Privat und Vereine.
          </p>
          <p>
            Als spezialisiertes Unternehmen für Kompostwürmer, Angelwürmer und Futterwürmer würden wir auch Sie gerne
            als Kunden gewinnen. Nutzen Sie unser attraktives Angebot zu Ihrem Vorteil.
          </p>
          <p class="flex justify-center my-2">
            <img src="https://www.superwurm.de/images/ceres/stempel.gif" />
            <br />
          </p>
          <p>
            *Lebendgarantie gilt nur für Bestellungen innerhalb Deutschlands auf Dendrobena. Bei Temperaturen über 25°C
            wird nur auf eigenes Risiko versendet. Auslandsbestellungen laufen auf eigenes Risiko.
          </p>
        </div>
        <div>
          <p>
            <strong>Das Angebot:</strong> <br />Der Riesen-Rotwurm ist ein hervorragender Angelwurm und besticht durch
            seine Eigenschaften. Gerne und zunehmend wird er ebenso zur Kompostierung eingesetzt. Als Gartenwurm
            belüftet er den Boden, baut Schwermetalle ab, erzeugt den wertvollen Wurmhumus und dient so als natürlicher
            Bodenverbesserer. Für viele Tiere im Terrarium oder Aquarium, aber auch für Vögel, stellt der Riesen-Rotwurm
            eine sinnvolle Nahrungsergänzung dar.
          </p>
          <p>
            Für Garten: Kompostwürmer, Gartenwürmer, Wurmhumus <br />Für Angeln: Riesen-Rotwürmer (Dendrobena);
            Kanadische Tauwürmer <br />Für Zoo: Futterwürmer <br />Für Jagd: Ablenkfütterung
          </p>
        </div>
      </section>
    </NuxtLazyHydrate>
  </div>
</template>

<script lang="ts" setup>
// Adding SocialMedia Icons from https://docs.storefrontui.io/v2/vue/components/iconbase START
import {
  SfIconFacebook,
  SfIconYoutube,
  SfIconInstagram,
  SfIconArrowForward,
  SfIconCheckCircle,
  SfIconStarFilled,
} from '@storefront-ui/vue';
// Adding SocialMedia Icons from https://docs.storefrontui.io/v2/vue/components/iconbase ENDE

// Update const { data, fetchPageTemplate, dataIsEmpty } = useHomepage();
// Update const { $i18n } = useNuxtApp();

// Adding Items from specific Cat START
const { data: categoryTree } = useCategoryTree();
const customProductsCategoryId = ref('');
const customProductsCategoryIdBottom = ref('');

watch(
  () => categoryTree.value,
  async () => {
    const categoryIdTop = 847; // Hier die gewünschte category.id setzen
    const categoryIdBottom = 848; // Neue ID für customProductsCategoryIdBottom
    customProductsCategoryId.value = categoryIdTop.toString();
    customProductsCategoryIdBottom.value = categoryIdBottom.toString();
  },
  { immediate: true },
);
// Adding Items from specific Cat ENDE

// Changing Images for different ViewPorts START
const viewport = useViewport();

const getImageUrl = () => {
  switch (viewport.breakpoint.value) {
    case '4xl': {
      return 'https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/prev_images/maden_desktop.jpg';
    }
    case '3xl': {
      return 'https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/prev_images/maden_desktop.jpg';
    }
    case '2xl': {
      return 'https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/prev_images/maden_desktop.jpg';
    }
    case 'xl': {
      return 'https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/prev_images/maden_desktop.jpg';
    }
    case 'lg': {
      return 'https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/prev_images/maden_desktop.jpg';
    }
    case 'md': {
      return 'https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/prev_images/maden_desktop.jpg';
    }
    case 'sm': {
      return 'https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/prev_images/maden_mobile.jpg';
    }
    default: {
      return 'https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/prev_images/maden_mobile.jpg';
    }
  }
};
// Changing Images for different ViewPorts ENDE

// Categorie Schleife
const categories = [
  {
    title: 'Mehl',
    title2nd: 'würmer',
    link: '/futterwuermer-zoo/futter-insekten/getrocknete-mehlwuermer',
    image:
      'https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/prev_images/getrocknete-mehlwuermer-schale.png',
    btntext: 'Zu den Mehlwürmern!',
    alt: 'Eine Holzschale voller getrockneter Mehlwürmer, eine proteinreiche Futterquelle für Wildvögel und Haustiere.',
  },
  {
    title: 'Wurm',
    title2nd: 'zucht',
    link: '/wurmzucht',
    image:
      'https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/prev_images/wurmzucht-haende-erde-wuermer.png',
    btntext: 'Alles zur Wurmzucht!',
    alt: 'Hände graben in dunkler, feuchter Erde voller aktiver Würmer – das perfekte Bild für die Wurmzucht.',
  },
  {
    title: 'Kompost',
    title2nd: 'würmer',
    link: '/garten-kompost/kompostwuermer',
    image:
      'https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/prev_images/kompostwuermer-erde-organisch.png',
    btntext: 'Zu den Kompostwürmern!',
    alt: 'Rote Kompostwürmer in nährstoffreichem Boden mit organischen Abfällen – für eine nachhaltige Kompostierung',
  },
];

// Categorie Schleife
const bottom_categories = [
  {
    title: 'Terraverm',
    title2nd: 'Wurmhumus',
    link: '/garten-kompost/terraverm-wurmhumus',
    image:
      'https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/prev_images/terraverm-wurmhumus-schaufel.png',
    btntext: 'Zum Terraverm Wurmhumus!',
    alt: 'Terraverm Wurmhumus',
  },
  {
    title: 'Futter',
    title2nd: 'würmer',
    link: '/futterwuermer-zoo/futterwuermer',
    image: 'https://cdn02.plentymarkets.com/5kg2d8h6ucou/frontend/SuperwurmPWAAssets/5futterwuermer.png',
    btntext: 'Zu den Futterwürmern!',
    alt: 'Futterwürmer',
  },
  {
    title: 'Zubehör',
    title2nd: 'Artikel',
    link: '/haelterung-zubehoer',
    image: 'https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/prev_images/zubehoer_artikel.jpg',
    btntext: 'Zu unserem Zubehör!',
    alt: 'Zubehörartikel für die Wurmzucht',
  },
];

// Feedback Schleife
const feedback = [
  {
    stars: 5,
    name: 'T M',
    date: 'am 04.02.2024',
    text: 'Schöne gesunde und kräftige Dendrobena. Nach 2 Wochen finden sich bereits jede Menge Kokons im Substrat.Das Futter ist nach 2 Tagen aufgebraucht und zeugt von gesunden Appetit.',
  },
  {
    stars: 5,
    name: 'Marion B',
    date: 'am 19.10.2024',
    text: 'Ich habe eine kleine Menge Regenwürmer bestellt und die kleinen Helfer zügig erhalten. Alle sind wohlauf , Dank der guten Verpackung und obwohl die Aussentemperaturen um 0Grad liegen. Da kann ich nur sagen: gerne wieder und empfehlenswert.',
  },
  {
    stars: 5,
    name: 'Petra V',
    date: 'am 02.04.2024',
    text: 'Wir kaufen seit einigen Jahren den Wurmhumus. Nutzen wir im gesamten Garten als Dünger, Bodenverbesserer. Suuuuper.',
  },
  {
    stars: 5,
    name: 'Schildkröten Ibbenbüren',
    date: 'am 04.02.2024',
    text: 'Wir haben ein Abo und erhalten mehrmals im Monat 400 Würmer. Das funktioniert einwandfrei und die Qualität der Würmer ist super. Unsere Schildkröten freuen sich jedes Mal unheimlich auf die Lieferung. Vielen lieben Dank für die Zusammenarbeit.',
  },
  {
    stars: 5,
    name: 'Mar Vin',
    date: 'am 04.02.2024',
    text: 'Freundliche Mitarbeiter, faire Preise und die Qualität ist immer top 👍',
  },
];

//neu nach Update
import { watchDebounced } from '@vueuse/core';
const { t } = useI18n();
const {
  isClicked,
  clickedBlockIndex,
  isTablet,
  isPreview,
  blockHasData,
  tabletEdit,
  deleteBlock,
  changeBlockPosition,
  isLastBlock,
  togglePlaceholder,
} = useBlockManager();

const { settingsIsDirty, openDrawerWithView, updateNewBlockPosition } = useSiteConfiguration();

const { data, fetchPageTemplate, dataIsEmpty, initialBlocks } = useHomepage();

const { isEditingEnabled, disableActions } = useEditor();
const { getRobots, setRobotForStaticPage } = useRobots();

const { setPageMeta } = usePageMeta();

const icon = 'home';
setPageMeta(t('homepage.title'), icon);
const openBlockList = (index: number, position: number) => {
  const insertIndex = (position === -1 ? index : index + 1) || 0;
  togglePlaceholder(index, position === -1 ? 'top' : 'bottom');
  updateNewBlockPosition(insertIndex);
  openDrawerWithView('blocksList');
};

await getRobots();
setRobotForStaticPage('Homepage');

onMounted(() => {
  isEditingEnabled.value = false;
  window.addEventListener('beforeunload', handleBeforeUnload);
});

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload);
});

const hasUnsavedChanges = () => {
  return !isEditingEnabled.value && !settingsIsDirty.value;
};

const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  if (hasUnsavedChanges()) return;
  event.preventDefault();
};

fetchPageTemplate();

watchDebounced(
  () => data.value.blocks,
  () => {
    isEditingEnabled.value = !deepEqual(initialBlocks.value, data.value.blocks);
  },
  { debounce: 100, deep: true },
);
</script>
