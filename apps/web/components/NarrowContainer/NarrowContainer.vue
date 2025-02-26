<template>
  <div
    :class="[
      'max-w-screen-2xl mx-auto md:px-6 lg:px-10',
      { fssingle: route.name === 'custom-single-meta___de___default' },
    ]"
    data-testid="narrow-container"
  >
    <slot />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>
