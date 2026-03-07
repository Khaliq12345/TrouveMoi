<!-- Home page with app bar, carousel, categories, explore section, and footer -->
<template>
    <!-- Main layout container -->
    <v-layout class="flex flex-col">
        <HomeDesktopHero v-if="!isMobile"></HomeDesktopHero>
        <HomeMobileHero v-else></HomeMobileHero>
        <v-container class="mx-auto" style="max-width: 1200px">
            <HomeCategories />

            <!-- Explore zones section -->
            <HomeExplore />
            
            <!-- Cities section -->
            <HomeCities />
        </v-container>
        <!-- Mobile bottom navigation -->
        <BottomNav v-if="isMobile" />

        <!-- Desktop footer -->
        <Footer v-if="!isMobile"></Footer>
    </v-layout>
</template>

<script setup lang="ts">
// Inject mobile state from parent
const isMobile = inject("isMobile");
</script>
