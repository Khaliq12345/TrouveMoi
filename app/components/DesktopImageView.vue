<!-- Desktop image carousel with discount badge for search results -->
<template>
    <!-- Fixed-width container for carousel -->
    <div
        class="position-relative flex-shrink-0 overflow-visible"
        style="width: 280px"
    >
        <!-- Image carousel with hover arrows -->
        <v-carousel
            height="180"
            hide-delimiters
            show-arrows="hover"
            class="rounded-s-xl bg-grey-lighten-4"
        >
            <!-- Carousel items from image IDs -->
            <v-carousel-item
                v-for="imgId in images"
                :key="imgId"
                :src="imgId"
                cover
            ></v-carousel-item>
        </v-carousel>
    </div>
</template>

<script setup lang="ts">
// Component props for images and optional discount
defineProps<{ images: string[]; }>();
</script>
