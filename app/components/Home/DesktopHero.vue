<template>
    <HomeAppBar
        style="position: fixed; top: 0; left: 0; right: 0; z-index: 1000"
    />
    <v-parallax :src="backgroundImage" height="800">
        <HomeCarousel v-model="backgroundImage" />
    </v-parallax>
</template>

<script setup lang="ts">
const backgroundImage = ref(
    "https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg",
);
</script>
