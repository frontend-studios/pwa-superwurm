<template>
  <div class="flex-col md:flex-row h-full flex relative scroll-smooth md:gap-4 relative" data-testid="gallery">
    <div class="after:block after:pt-[100%] flex-1 relative overflow-hidden w-full max-h-[600px]">
      <SfScrollable
        class="flex items-center snap-x snap-mandatory scrollbar-hidden w-full h-full"
        wrapper-class="!absolute top-0 left-0 w-full h-full gallery-wrap border-25"
        buttons-placement="none"
        :active-index="activeIndex"
        is-active-index-centered
        :drag="{ containerWidth: true }"
        @on-scroll="onScroll"
      >
        <ZoomableImage
          v-for="(image, index) in images"
          :key="`image-${index}-thumbnail`"
          :images="images"
          :image="image"
          :index="index"
          :active-index="activeIndex"
          :is-first-image="index === 0"
          @click="openLightbox(index)"
        />
      </SfScrollable>

      <!-- Dots Navigation -->
      <div
        v-if="images.length > 2"
        class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex justify-center z-10"
      >
        <span
          v-for="(image, index) in images"
          :key="`dot-${index}`"
          @click="onChangeIndex(index)"
          class="w-3 h-3 mx-1 rounded-full cursor-pointer"
          :class="{ 'bg-primary-800': activeIndex === index, 'bg-primary-500': activeIndex !== index }"
        >
        </span>
      </div>
    </div>
  </div>
  <NuxtLazyHydrate when-visible>
    <transition name="fade-overlay">
      <div
        v-if="lightboxOpen"
        class="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50"
        @click="closeLightbox"
      >
        <div class="relative max-w-3xl" @click.stop>
          <button @click="closeLightbox" class="absolute top-2 right-2 text-primary-500">
            <SfIconClose size="xl" />
          </button>
          <button
            v-if="lightboxIndex > 0"
            @click="prevImage"
            class="absolute left-2 top-1/2 transform -translate-y-1/2 text-primary-500"
          >
            <SfIconChevronLeft size="2xl" />
          </button>
          <button
            v-if="lightboxIndex < images.length - 1"
            @click="nextImage"
            class="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary-500"
          >
            <SfIconChevronRight size="2xl" />
          </button>
          <transition name="fade" mode="out-in">
            <img
              :src="productImageGetters.getImageUrl(images[lightboxIndex])"
              class="max-w-full max-h-screen border-25"
              :key="lightboxIndex"
            />
          </transition>
          <div class="text-white mt-2 text-center">Bild {{ lightboxIndex + 1 }} von {{ images.length }}</div>
        </div>
      </div>
    </transition>
  </NuxtLazyHydrate>
</template>

<script setup lang="ts">
import { SfScrollable, SfIconChevronLeft, SfIconChevronRight, SfIconClose } from '@storefront-ui/vue';
import { productImageGetters } from '@plentymarkets/shop-api';
import { clamp, type SfScrollableOnScrollData } from '@storefront-ui/shared';
import { useTimeoutFn } from '@vueuse/core';
import type { ImagesData } from '@plentymarkets/shop-api';

const props = defineProps<{ images: ImagesData[] }>();

const { isPending, start, stop } = useTimeoutFn(() => {}, 50);
const activeIndex = ref(0);
const lightboxOpen = ref(false);
const lightboxIndex = ref(0);

const onChangeIndex = (index: number) => {
  stop();
  activeIndex.value = clamp(index, 0, props.images.length - 1);
  start();
};

const onScroll = ({ left, scrollWidth }: SfScrollableOnScrollData) => {
  if (!isPending.value) onChangeIndex(Math.round(left / (scrollWidth / props.images.length)));
};

const openLightbox = (index: number) => {
  lightboxIndex.value = index;
  lightboxOpen.value = true;
};

const closeLightbox = () => {
  lightboxOpen.value = false;
};

const prevImage = () => {
  if (lightboxIndex.value > 0) {
    lightboxIndex.value--;
  }
};

const nextImage = () => {
  if (lightboxIndex.value < props.images.length - 1) {
    lightboxIndex.value++;
  }
};
</script>
