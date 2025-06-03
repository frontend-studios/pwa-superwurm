<template>
  <picture>
    <template v-if="imageExtension === 'svg'">
      <NuxtImg
        ref="logo"
        src="https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/prev_logo/Superwurm_Logo_horizontal_RGB_cropped.png"
        :alt="`${{ storeName }} logo`"
        class="max-w-72 py-2 px-4"
        width="250"
        height="50"
        preload
      />
    </template>
    <template v-else>
      <img
        id="logo"
        ref="logo"
        src="https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/prev_logo/Superwurm_Logo_horizontal_RGB_cropped.png"
        :alt="`${{ storeName }} logo`"
        :width="imgWidth"
        :height="imgHeight"
        class="max-h-[100px] max-w-[200px]"
        preload
      />
    </template>
  </picture>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const storeName = runtimeConfig.public.storeName;
const imageExtension = runtimeConfig.public.headerLogo.split('.').pop();

const logo = ref<HTMLImageElement | null>(null);
const imgWidth = ref<string>('');
const imgHeight = ref<string>('');
onMounted(() => {
  if (logo.value) {
    imgWidth.value = logo.value.clientWidth + '';
    imgHeight.value = logo.value.clientHeight + '';
  }
});
</script>
