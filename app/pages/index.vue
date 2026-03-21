<!-- Home page with app bar, carousel, categories, explore section, and footer -->
<template>
    <!-- Main layout container -->
    <v-layout class="flex flex-col">
        <HomeDesktopHero v-if="!isMobile"></HomeDesktopHero>
        <HomeMobileHero v-else></HomeMobileHero>
        <v-container class="mx-auto d-flex flex-column ga-10" fluid>
            <div class="d-flex justify-center">
                <HomeCategories class="section" />
            </div>

            <v-divider class="border-opacity-100"></v-divider>

            <!-- Explore zones section -->
            <HomeExplore class="section" />

            <v-divider class="border-opacity-100"></v-divider>

            <!-- Popular search section -->
            <PopulareSearch class="section" />
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

<style scoped>
.section {
    max-width: 1200px;
}
</style>
