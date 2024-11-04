<script setup lang="ts">
import Toaster from '@/components/ui/toast/Toaster.vue';
</script>

<template>
  <NuxtLayout class="min-h-screen">
    <NuxtLoadingIndicator />
    <NuxtPage />
    <Toaster />
  </NuxtLayout>
</template>
