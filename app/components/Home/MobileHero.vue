<template>
    <HomeAppBar
        style="position: fixed; top: 0; left: 0; right: 0; z-index: 10000"
    ></HomeAppBar>
    <v-parallax
        :src="backgroundImage"
        class="h-screen"
        style="position: relative"
    >
        <div
            class="d-flex flex-column fill-height justify-center align-center text-white"
        >
            <HomeCarousel v-model="backgroundImage" />
        </div>
    </v-parallax>
</template>

<script setup lang="ts">
const backgroundImage = ref("");
</script>
