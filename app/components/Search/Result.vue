<script setup lang="ts">
import { ref } from "vue";

// REAL-WORLD DATA: Array of objects to easily scale or fetch from an API
const places = ref([
    {
        id: 1,
        title: "Halcyon Days",
        subtitle: "1,000 miles of wonder",
        rating: 4.4,
        reviews: 128,
        location: "Cité, 2ème carrefour après Xs",
        price: "15 000F",
        comment: "Les meilleurs plats indigènes de la ville",
        amenities: [
            { text: "Parking", icon: "mdi-car" },
            { text: "Wifi", icon: "mdi-wifi" },
            { text: "Clim", icon: "mdi-snowflake" },
        ],
        images: [10, 11, 12, 13, 14, 15], // Random IDs for picsum
    },
]);

// Current place reference (easily loopable with v-for if needed)
const item = places.value[0];
</script>

<template>
    <v-card class="mt-2 mx-auto" border max-width="600" variant="flat">
        <div class="d-flex flex-no-wrap align-stretch">
            <v-carousel
                height="200"
                style="width: 160px"
                hide-delimiters
                show-arrows="hover"
                class="flex-shrink-0 bg-grey-lighten-4"
            >
                <template v-slot:prev="{ props }">
                    <v-btn
                        v-bind="props"
                        variant="elevated"
                        icon="mdi-chevron-left"
                        size="x-small"
                        class="ms-1"
                    />
                </template>
                <template v-slot:next="{ props }">
                    <v-btn
                        v-bind="props"
                        variant="elevated"
                        icon="mdi-chevron-right"
                        size="x-small"
                        class="me-1"
                    />
                </template>

                <v-carousel-item
                    v-for="imgId in item.images"
                    :key="imgId"
                    :src="`https://picsum.photos/id/${imgId}/400/300`"
                    cover
                ></v-carousel-item>
            </v-carousel>

            <v-container class="pa-3 d-flex flex-column justify-space-between">
                <v-list-item class="pa-0 mb-n2">
                    <v-list-item-title class="text-h6 font-weight-bold">
                        {{ item.title }}
                    </v-list-item-title>
                    <v-list-item-subtitle
                        class="text-caption text-medium-emphasis"
                    >
                        {{ item.subtitle }}
                    </v-list-item-subtitle>
                </v-list-item>

                <v-sheet class="d-flex align-center ga-2 mt-1">
                    <v-rating
                        :model-value="item.rating"
                        readonly
                        half-increments
                        density="compact"
                        size="small"
                        color="amber-darken-2"
                        active-color="amber-darken-2"
                    />
                    <span
                        class="text-caption font-weight-medium text-grey-darken-1"
                    >
                        {{ item.rating }} ({{ item.reviews }} avis)
                    </span>
                </v-sheet>

                <div class="mt-2">
                    <v-list-item-subtitle
                        class="d-flex align-center text-caption opacity-90"
                    >
                        <v-icon
                            size="16"
                            icon="mdi-map-marker-outline"
                            color="primary"
                            class="me-1"
                        ></v-icon>
                        {{ item.location }}
                    </v-list-item-subtitle>

                    <v-chip
                        size="x-small"
                        variant="flat"
                        color="success"
                        class="mt-1 px-2 font-weight-bold"
                    >
                        À partir de {{ item.price }}
                    </v-chip>
                </div>

                <v-chip-group class="mt-1">
                    <v-chip
                        v-for="amenity in item.amenities"
                        :key="amenity.text"
                        size="x-small"
                        variant="tonal"
                        :prepend-icon="amenity.icon"
                        class="me-1"
                    >
                        {{ amenity.text }}
                    </v-chip>
                </v-chip-group>

                <v-sheet
                    color="grey-lighten-4"
                    rounded="sm"
                    class="d-flex align-start gx-1"
                >
                    <v-icon
                        icon="mdi-format-quote-open"
                        size="small"
                        color="grey-darken-1"
                    ></v-icon>
                    <span class="text-caption italic text-grey-darken-3">
                        {{ item.comment }}
                    </span>
                </v-sheet>

                <v-card-actions class="pa-0 mt-2">
                    <v-spacer></v-spacer>
                    <v-btn
                        variant="flat"
                        size="small"
                        color="primary"
                        class="text-none font-weight-bold rounded-lg"
                        append-icon="mdi-chevron-right"
                    >
                        Details
                    </v-btn>
                </v-card-actions>
            </v-container>
        </div>
    </v-card>
</template>

<style scoped>
/* Optional: italic for the testimonial */
.italic {
    font-style: italic;
}
</style>
