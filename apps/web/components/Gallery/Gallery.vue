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
    <div class="md:-order-1 overflow-hidden flex-shrink-0 basis-auto">
      <SfScrollable
        ref="thumbsReference"
        wrapper-class="hidden md:inline-flex"
        direction="vertical"
        class="flex-row w-full items-center md:flex-col md:h-full md:px-0 md:scroll-pl-4 snap-y snap-mandatory flex gap-0.5 md:gap-0.5 overflow-auto scrollbar-hidden"
        :active-index="activeIndex"
        :prev-disabled="activeIndex === 0"
        :next-disabled="activeIndex === images.length - 1"
      >
        <template #previousButton>
          <UiButton
            variant="secondary"
            size="sm"
            square
            class="absolute !rounded-full bg-white z-10 top-4 rotate-90 disabled:!hidden !ring-neutral-500 !text-neutral-500"
            :class="{ hidden: firstVisibleThumbnailIntersected }"
            :aria-label="$t('gallery.prev')"
          >
            <template #prefix>
              <SfIconChevronLeft />
            </template>
          </UiButton>
        </template>

        <button
          v-for="(image, index) in images"
          :key="`imagebutton-${index}-thumbnail`"
          :ref="(el) => assignReference(el, index)"
          type="button"
          :aria-current="activeIndex === index"
          :aria-label="$t('gallery.thumb', index)"
          class="w-20 relative shrink-0 pb-1 snap-start cursor-pointer transition-colors flex-grow-0"
          @click="onChangeIndex(index)"
          @focus="onChangeIndex(index)"
        >
          <NuxtImg
            :alt="productImageGetters.getImageAlternate(image) || productImageGetters.getCleanImageName(image) || ''"
            class="object-contain"
            :width="80"
            :height="80"
            :src="productImageGetters.getImageUrlPreview(image)"
            :quality="80"
            loading="lazy"
          />
        </button>

        <template #nextButton>
          <UiButton
            variant="secondary"
            size="sm"
            square
            class="absolute !rounded-full bg-white z-10 bottom-4 rotate-90 disabled:!hidden !ring-neutral-500 !text-neutral-500"
            :class="{ hidden: lastVisibleThumbnailIntersected }"
            :aria-label="$t('gallery.next')"
          >
            <template #prefix>
              <SfIconChevronRight />
            </template>
          </UiButton>
        </template>
      </SfScrollable>
      <div class="flex md:hidden gap-0.5" role="group">
        <button
          v-for="(image, index) in images"
          :key="productImageGetters.getImageUrl(image)"
          type="button"
          :aria-current="activeIndex === index"
          :aria-label="$t('gallery.thumb', index + 1)"
          class="relative shrink-0 pb-1 border-b-4 cursor-pointer transition-colors flex-grow"
          :class="[activeIndex === index ? 'border-primary-500' : 'border-neutral-200']"
          @click="onChangeIndex(index)"
        />
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

const thumbsReference = ref<HTMLElement>();
const firstThumbReference = ref<HTMLButtonElement>();
const lastThumbReference = ref<HTMLButtonElement>();
const firstVisibleThumbnailIntersected = ref(true);
const lastVisibleThumbnailIntersected = ref(true);

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
const assignReference = (element: Element | ComponentPublicInstance | null, index: number) => {
  if (!element) return;

  if (index === props.images.length - 1) {
    lastThumbReference.value = element as HTMLButtonElement;
    return;
  }

  if (index === 0) firstThumbReference.value = element as HTMLButtonElement;
};
</script>
