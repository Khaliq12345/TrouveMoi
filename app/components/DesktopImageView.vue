<!-- Desktop image carousel with discount badge for search results -->
<template>
    <!-- Fixed-width container for carousel -->
    <div
        class="position-relative flex-shrink-0 overflow-visible"
        style="width: 280px"
    >
        <!-- Image carousel with hover arrows -->
        <v-carousel
            height="220"
            hide-delimiters
            show-arrows="hover"
            class="rounded-s-xl bg-grey-lighten-4"
        >
            <!-- Carousel items from image IDs -->
            <v-carousel-item
                v-for="imgId in images"
                :key="imgId"
                :src="`https://picsum.photos/id/${imgId}/600/400`"
                cover
            ></v-carousel-item>
        </v-carousel>

        <!-- Discount badge overlay -->
        <v-chip
            v-if="discount"
            color="success"
            variant="flat"
            size="small"
            class="position-absolute font-weight-bold"
            style="
                bottom: 12px;
                left: 12px;
                z-index: 10 !important;
                pointer-events: none;
            "
        >
            {{ discount }} OFF
        </v-chip>
    </div>
</template>

<script setup lang="ts">
// Component props for images and optional discount
defineProps<{ images: number[]; discount?: string }>();
</script>
