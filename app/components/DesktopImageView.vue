<template>
    <div class="position-relative flex-shrink-0" style="width: 280px">
        <v-carousel
            height="220"
            hide-delimiters
            show-arrows="hover"
            class="rounded-l-xl bg-grey-lighten-4"
        >
            <v-carousel-item
                v-for="imgId in images"
                :key="imgId"
                :src="`https://picsum.photos/id/${imgId}/600/400`"
                cover
            ></v-carousel-item>
        </v-carousel>

        <v-chip
            v-if="discount"
            color="success"
            class="position-absolute"
            style="bottom: 12px; left: 12px; z-index: 2"
        >
            {{ discount }} OFF
        </v-chip>
    </div>
</template>

<script setup lang="ts">
defineProps<{ images: number[]; discount?: string }>();
</script>
