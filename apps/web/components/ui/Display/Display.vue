<template>
  <NuxtLazyHydrate when-visible>
    <div
      class="flex flex-col md:flex-row flex-wrap gap-6 max-w-screen-2xl mx-auto px-4 md:px-10 mb-10"
      data-testid="display"
    >
      <div
        v-for="item in items"
        :key="item.title"
        class="relative flex md:max-w-screen-3xl md:[&:not(:first-of-type)]:flex-1 md:first-of-type:w-full first:bg-secondary-50 last:bg-warning-200 even:bg-negative-200"
      >
        <div
          :class="[
            'flex overflow-hidden grow flex-col',
            {
              'flex-col-reverse': item.reverse,
              'md:flex-row-reverse': item.reverse,
            },
          ]"
        >
          <div class="flex flex-1 flex-col justify-center items-center md:items-start p-6 lg:p-10 max-w-1/2">
            <p :class="['uppercase typography-text-xs block font-bold tracking-widest', item.subtitleClass]">
              {{ item.subtitle }}
            </p>
            <h2 :class="['mb-4 mt-2 font-bold typography-headline-3', item.titleClass]">
              {{ item.title }}
            </h2>
            <p class="typography-text-base block text-center md:text-left mb-4">{{ item.description }}</p>
            <UiButton class="!bg-black" :tag="NuxtLink" :to="localePath(paths.category)">
              {{ item.buttonText }}
            </UiButton>
          </div>
          <NuxtImg
            :src="item.image"
            :alt="item.title"
            class="w-full md:w-1/2 self-end object-contain flex-1"
            width="300"
            height="300"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </NuxtLazyHydrate>
</template>

<script setup lang="ts">
import type { DisplayProps } from '~/components/ui/Display/types';
import { paths } from '~/utils/paths';

defineProps<DisplayProps>();

const localePath = useLocalePath();

const NuxtLink = resolveComponent('NuxtLink');
</script>
