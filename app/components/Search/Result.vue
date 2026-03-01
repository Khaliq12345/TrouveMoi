<template>
  <v-card
    
    class="mt-4 mx-2 mx-sm-auto rounded-xl overflow-hidden"
    elevation="0"
    border
    max-width="850"
  >
    <div class="d-flex flex-column flex-sm-row w-100 overflow-hidden">
      
      <div class="flex-shrink-0 w-100 w-sm-auto">
        <MobileImageView 
          v-if="$vuetify.display.xs"
          :images="item.images" 
          :discount="item.discount" 
        />
        <DesktopImageView 
          v-else
          :images="item.images" 
          :discount="item.discount" 
        />
      </div>

      <v-container class="pa-4 d-flex flex-column flex-grow-1" style="min-width: 0;">
        <div class="d-flex flex-column flex-md-row justify-space-between align-start ga-2">
          <div class="w-100">
            <h3 class="text-h6 font-weight-bold mb-0 text-truncate" style="line-height: 1.2;">
              {{ item.title }}
            </h3>
            <div class="d-flex align-center mt-1">
              <v-icon color="amber-darken-2" size="small" icon="mdi-star" class="me-1"></v-icon>
              <span class="text-subtitle-2 font-weight-bold me-1">{{ item.rating }}</span>
              <span class="text-caption text-medium-emphasis text-truncate">
                ({{ item.reviews }}) • {{ item.tag }}
              </span>
            </div>
          </div>

          <div class="text-left text-md-right w-100 w-md-auto">
            <div class="d-flex align-center justify-start justify-md-end">
              <v-chip size="x-small" color="primary" variant="tonal" class="me-2 font-weight-bold" v-if="item.isDeal">
                Deal
              </v-chip>
              <span class="text-h5 font-weight-bold">${{ item.pricePerNight }}</span>
            </div>
          </div>
        </div>

        <div class="d-flex flex-wrap ga-2 mt-3">
          <div
            v-for="amenity in item.amenities"
            :key="amenity.text"
            class="d-flex align-center text-caption text-medium-emphasis border px-2 py-1 rounded-pill"
          >
            <v-icon :icon="amenity.icon" size="14" class="me-1"></v-icon>
            {{ amenity.text }}
          </div>
        </div>

        <v-spacer class="mt-4 d-none d-sm-block"></v-spacer>

        <div class="d-flex align-center pt-4 pt-sm-2">
          <div class="d-flex ga-2">
            <v-btn icon="mdi-heart-outline" variant="outlined" size="small" color="grey-darken-1"></v-btn>
            <v-btn icon="mdi-bookmark-outline" variant="outlined" size="small" color="grey-darken-1"></v-btn>
          </div>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            variant="flat"
            size="small"
            class="text-none font-weight-bold rounded-lg px-6"
            append-icon="mdi-arrow-right"
          >
            Détails
          </v-btn>
        </div>
      </v-container>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";

const item = ref({
    title: "Kanazawa Grand Inn Hotel",
    rating: 4.8,
    reviews: "1,257",
    tag: "Excellent Location",
    pricePerNight: 48,
    discount: "50%",
    isDeal: true,
    amenities: [
        { text: "3-Star Hotel", icon: "mdi-medal-outline" },
        { text: "Free Wifi", icon: "mdi-wifi" },
        { text: "Parking", icon: "mdi-car" },
        { text: "Bar", icon: "mdi-glass-cocktail" },
    ],
    images: [10, 11, 12, 13],
});
</script>
