<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>
<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";

const { width, height } = useWindowSize();

const searchQuery = ref("");

const isMobile = computed(() => {
    return width.value < 960;
});

// Inject variables
provide("isMobile", isMobile);
</script>
