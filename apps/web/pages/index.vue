<template>
  <div class="fs-homepage">
    <div class="max-w-screen-2xl relative mx-auto border-25 video-container">
      <a href="#asdasd">
        <video id="introVideo" class="border-25 mb-2" autoplay loop muted>
          <source
            src="https://cdn02.plentymarkets.com/5kg2d8h6ucou/frontend/SuperwurmPWAAssets/4238310-hd_1920_1080_30fps.mp4"
            type="video/mp4"
          />
          Dein Browser unterstützt kein HTML5-Video.
        </video>
        <div class="controls">
          <button onclick="document.getElementById('introVideo').play()">Play</button>
          <button onclick="document.getElementById('introVideo').pause()">Stop</button>
        </div>
        <div class="wrapper absolute">
          <span class="mb-0 block font-bold">Autoplay loop und muted</span>
          <span class="custom-font text-4xl xl:text-7xl font-bold block lg:mb-7">was ein tolles Video</span>
          <button
            href="#"
            class="btn border-25 bg-custom text-secondary-500 font-bold px-4 py-3 mt-4 hover:text-white hover:bg-secondary-500 border-2"
          >
            <span>Zum Artikel!</span>
          </button>
        </div>
      </a>
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
          <a href="#"
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
                href="#"
                class="btn border-25 bg-custom text-secondary-500 font-bold px-4 py-3 mt-4 hover:text-white hover:bg-secondary-500 border-2"
              >
                <span>Zu den Angelwürmern!</span>
              </button>
            </div>
          </a>
        </div>

        <div class="single-cat mb-2 md:mb-0">
          <a href="#"
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
                href=""
                class="btn border-25 bg-custom text-secondary-500 font-bold px-4 py-3 mt-4 hover:text-white hover:bg-secondary-500 border-2"
              >
                <span>Zu den Gartenwürmer!</span>
              </button>
            </div>
          </a>
        </div>
        <div class="single-cat primary mb-2 md:mb-0">
          <a href=""
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
                href="#"
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
      <div class="grid grid-cols-3 gap-2 bg-secondary-500 border-25 md:bg-transparent md:rounded-none">
        <div
          class="bg-secondary-500 border-25 w-full text-center text-custom border-secondary-500 border-2 hover:text-secondary-500 social-item"
        >
          <a href="" target="_blank">
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
          <a href="" target="_blank">
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
          <a href="" target="_blank">
            <div class="py-2">
              <span class="font-bold flex items-center justify-center"
                ><SfIconInstagram class="mr-2" size="base" />
                <span v-if="viewport.isGreaterOrEquals('sm')">Instagram</span>
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>

    <NuxtLazyHydrate when-visible>
      <section class="max-w-screen-2xl mx-auto relative w-full items mb-5 md:mb-10">
        <div class="mx-3 lg:mx-0 mb-5 lg:mb-10 flex justify-between items-center">
          <div>
            <p class="mb-0 block text-secondary-500 font-bold">TOPSELLER, BELIEBT UND EMPFEHLUNGEN</p>
            <p class="custom-font text-secondary-500 text-2xl md:text-4xl font-bold block">FÜR DICH ZUSAMMENGESTELLT</p>
          </div>
          <div>
            <a
              href=""
              class="bg-secondary-500 border-25 w-full text-center text-custom border-secondary-500 border-2 hover:text-secondary-500 show-all py-4 px-5 hidden md:block text-sm font-bold"
              ><SfIconArrowForward class="mr-2" size="base" />Zu den Topsellern</a
            >
          </div>
        </div>

        <div class="thumbs">
          <ProductRecommendedProducts cache-key="homepage" :category-id="customProductsCategoryId" />
        </div>
      </section>
    </NuxtLazyHydrate>

    <NuxtLazyHydrate when-visible>
      <section class="max-w-screen-2xl mx-auto relative w-full mb-5 md:mb-10">
        <div class="lazy-image-container">
          <a href="">
            <NuxtImg :src="getImageUrl()" alt="Lazy loaded image" class="w-full border-25" loading="lazy" />
            <div class="wrapper absolute">
              <p class="custom-font text-custom text-4xl lg:text-7xl font-bold mb-0">Mehlwürmer</p>
              <button
                href="#"
                class="btn border-25 bg-custom text-secondary-500 font-bold px-4 py-3 mt-4 hover:text-white hover:bg-secondary-500 border-2"
              >
                <span>Jetzt sparen!</span>
              </button>
            </div>
          </a>
        </div>
      </section>
    </NuxtLazyHydrate>

    <NuxtLazyHydrate when-visible>
      <section class="max-w-screen-2xl mx-auto relative w-full items mb-5 md:mb-10">
        <div class="mx-3 lg:mx-0 mb-5 lg:mb-10 flex justify-between items-center">
          <div>
            <p class="mb-0 block text-secondary-500 font-bold">TOPSELLER, BELIEBT UND EMPFEHLUNGEN</p>
            <p class="custom-font text-secondary-500 text-2xl md:text-4xl font-bold block">FÜR DICH ZUSAMMENGESTELLT</p>
          </div>
          <div>
            <a
              href=""
              class="bg-secondary-500 border-25 w-full text-center text-custom border-secondary-500 border-2 hover:text-secondary-500 show-all py-4 px-5 hidden md:block text-sm font-bold"
              ><SfIconArrowForward class="mr-2" size="base" />Zu den Topsellern</a
            >
          </div>
        </div>

        <div class="thumbs">
          <ProductRecommendedProducts cache-key="homepage" :category-id="customProductsCategoryIdBottom" />
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
      <section class="max-w-screen-2xl relative w-full mx-auto mb-5 lg:mb-10">
        <p class="custom-font text-secondary-500 text-2xl lg:text-3xl font-bold block mx-3 lg:mx-0 mb-5 lg:mb-10">
          "ECHT WURMIG!" - DAS SAGEN UNSERE KUNDEN
        </p>
        <div
          class="flex overflow-x-scroll lg:grid lg:gap-2 lg:grid-cols-5 lg:overflow-auto scrollbar-hidden ml-3 lg:ml-0"
        >
          <div
            v-for="{ stars, name, date, text } in feedback"
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
              </div>
              <span class="text-xs text-gray-400">{{ name }} {{ date }}</span>
              <SfIconCheckCircle class="text-primary-500" size="sm" />
            </div>
            <div class="text text-sm text-secondary-500">
              <span>{{ text }}</span>
            </div>
          </div>
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

const { data, fetchPageTemplate, dataIsEmpty } = useHomepage();

const { $i18n } = useNuxtApp();

// Adding Items from specific Cat START
const { data: categoryTree } = useCategoryTree();
const customProductsCategoryId = ref('');
const customProductsCategoryIdBottom = ref('');

watch(
  () => categoryTree.value,
  async () => {
    const categoryIdTop = 486; // Hier die gewünschte category.id setzen
    const categoryIdBottom = 510; // Neue ID für customProductsCategoryIdBottom
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
    case 'lg': {
      return 'https://cdn02.plentymarkets.com/5kg2d8h6ucou/frontend/SuperwurmPWAAssets/7salebanner.png';
    }
    case 'md': {
      return 'https://picsum.photos/seed/picsum/1024/250';
    }
    default: {
      return 'https://picsum.photos/seed/picsum/550/550';
    }
  }
};
// Changing Images for different ViewPorts ENDE

// Categorie Schleife
const categories = [
  {
    title: 'Mehl',
    title2nd: 'würmer',
    link: '#Neuheiten',
    image:
      'https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/prev_images/getrocknete-mehlwuermer-schale.png',
    btntext: 'Zu den Mehlwürmern!',
    alt: 'Eine Holzschale voller getrockneter Mehlwürmer, eine proteinreiche Futterquelle für Wildvögel und Haustiere.',
  },
  {
    title: 'Wurm',
    title2nd: 'zucht',
    link: '#Topseller',
    image:
      'https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/prev_images/wurmzucht-haende-erde-wuermer.png',
    btntext: 'Alles zur Wurmzucht!',
    alt: 'Hände graben in dunkler, feuchter Erde voller aktiver Würmer – das perfekte Bild für die Wurmzucht.',
  },
  {
    title: 'Kompost',
    title2nd: 'würmer',
    link: '#Kategorie3',
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
    link: '#Neuheiten',
    image:
      'https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/prev_images/terraverm-wurmhumus-schaufel.png',
    btntext: 'Zu den Terraverm Wurmhumus!',
    alt: 'Eine Schaufel steckt in dunklem, nährstoffreichem Wurmhumus, umgeben von gesunden Pflanzen.',
  },
  {
    title: 'Wurmie',
    title2nd: 'Maskottchen',
    link: '#Topseller',
    image: 'https://cdn02.plentymarkets.com/5kg2d8h6ucou/frontend/SuperwurmPWAAssets/5futterwuermer.png',
    btntext: 'Zu den Futterwürmern!',
    alt: 'altText',
  },
  {
    title: 'Fehlende',
    title2nd: 'würmer',
    link: '#Kategorie3',
    image: 'https://cdn02.plentymarkets.com/5kg2d8h6ucou/frontend/SuperwurmPWAAssets/6mehlwuermer.png',
    btntext: 'Zu den Mehrwürmern!',
    alt: 'altText',
  },
];

// Feedback Schleife
const feedback = [
  {
    stars: 4,
    name: 'Jacqueline',
    date: 'am 04.02.2024',
    text: 'elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.olor sit amet.',
  },
  {
    stars: 5,
    name: 'Simon',
    date: 'am 19.10.2024',
    text: 'elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.olor sit amet, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
  },
  {
    stars: 5,
    name: 'Sylvia',
    date: 'am 02.04.2024',
    text: 'elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.olor sit amet, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
  },
  {
    stars: 5,
    name: 'Michael',
    date: 'am 04.02.2024',
    text: 'elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.olor sit amet, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
  },
  {
    stars: 5,
    name: 'Bruno',
    date: 'am 04.02.2024',
    text: 'elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.olor sit amet, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
  },
];
</script>
