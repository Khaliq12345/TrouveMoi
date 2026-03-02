<!-- Home page with app bar, carousel, categories, explore section, and footer -->
<template>
    <!-- Main layout container -->
    <v-layout class="flex flex-col">
        <HomeDesktopHero v-if="!isMobile"></HomeDesktopHero>
        <HomeMobileHero v-else></HomeMobileHero>

        <HomeCategories />

        <!-- Explore zones section -->
        <HomeExplore />

        <!-- Mobile bottom navigation -->
        <HomeBottomNav v-if="isMobile" />

        <!-- Desktop footer -->
        <Footer v-if="!isMobile"></Footer>
    </v-layout>
</template>

<script setup lang="ts">
// Inject mobile state from parent
const isMobile = inject("isMobile");

const { width, height } = useWindowSize();

const isMobile = computed(() => {
    return width.value < 768;
});

// Inject variables
provide("isMobile", isMobile);
</script>
