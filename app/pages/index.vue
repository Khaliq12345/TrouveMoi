<template>
    <v-layout class="flex flex-col">
        <HomeDesktopHero v-if="!isMobile"></HomeDesktopHero>
        <HomeMobileHero v-else></HomeMobileHero>

        <HomeCategories />

        <HomeExplore />

        <HomeBottomNav v-if="isMobile" />

        <Footer v-if="!isMobile"></Footer>
    </v-layout>
</template>

<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";

const { width, height } = useWindowSize();

const isMobile = computed(() => {
    return width.value < 768;
});

// Inject variables
provide("isMobile", isMobile);
</script>
