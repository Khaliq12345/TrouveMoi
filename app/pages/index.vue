<!-- Home page with app bar, carousel, categories, explore section, and footer -->
<template>
    <!-- Main layout container -->
    <v-layout class="flex flex-col">
        <HomeDesktopHero v-if="!isMobile"></HomeDesktopHero>
        <HomeMobileHero v-else></HomeMobileHero>
        <v-container class="mx-auto d-flex flex-column ga-10" style="max-width: 1200px">
            <HomeCategories />

            <!-- Explore zones section -->
            <HomeExplore />

            <!-- Cities section -->
            <HomeCities />

            <!-- Popular search section -->
            <PopulareSearch />

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
const { $directus, $readItems } = useNuxtApp();

const { data: tags } = await useAsyncData(
    "tags",
    () => {
        return $directus.request($readItems("Tags"));
    },
    {
        getCachedData: (key) => {
            return (
                useNuxtApp().payload.data[key] || useNuxtApp().static.data[key]
            );
        },
    },
);
</script>
