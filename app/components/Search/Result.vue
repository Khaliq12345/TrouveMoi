<!-- Search result card displaying hotel/location with images, rating, price, amenities, and action buttons -->
<template>
  <div v-bind="$attrs">
    <v-hover>
      <template v-slot:default="{ isHovering, props }">
        <v-card
          v-bind="props"
          class="mt-4 rounded-xl overflow-hidden"
          :elevation="isHovering ? 5 : 0"
          border
        >
          <!-- Responsive flex container -->
          <div
            class="d-flex w-100 overflow-hidden"
            :class="isMobile ? 'flex-column' : 'flex-sm-row'"
            :color="isHovering ? 'primary' : undefined"
          >
            <!-- Image section (responsive: mobile/desktop) -->
            <div class="flex-shrink-0 w-100 w-sm-auto">
              <!-- Mobile image gallery -->
              <MobileImageView
                v-if="isMobile"
                :images="item.images"
                :discount="item.discount"
              />
              <!-- Desktop image carousel -->
              <DesktopImageView
                v-else
                :images="item.images"
                :discount="item.discount"
              />
            </div>

            <!-- Content section -->
            <v-container
              class="pa-5 d-flex flex-column flex-grow-1"
              style="min-width: 0"
            >
              <!-- Title and rating section -->
              <div class="w-100">
                <h3
                  class="text-h6 font-weight-bold mb-2 text-truncate"
                  style="line-height: 1.2"
                >
                  {{ bussness?.name }}
                </h3>
                <!-- Rating display with star icon -->
                <div class="d-flex align-center mt-1">
                  <v-rating
                    :model-value="bussness?.rating"
                    color="amber-darken-2"
                    density="compact"
                    size="small"
                    readonly
                    half-increments
                  ></v-rating>
                  <span class="text-subtitle-2 font-weight-bold ms-2">{{
                    bussness?.rating
                  }}</span>
                  <span class="text-caption text-medium-emphasis text-truncate">
                    ({{ item.reviews }}) • {{ item.tag }}
                  </span>
                </div>
              </div>

              <!-- Price and deal badge -->
              <div class="d-flex gap-2 align-center mt-2">
                <span class="text-h5 font-weight-bold"
                  >${{ item.pricePerNight }}</span
                >
                <v-chip
                  size="x-small"
                  color="primary"
                  variant="tonal"
                  class="me-2 font-weight-bold"
                  v-if="item.isDeal"
                >
                  Deal
                </v-chip>
              </div>

              <!-- Amenities list -->
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

              <!-- Spacer for desktop layout -->
              <v-spacer class="mt-4 d-none d-sm-block"></v-spacer>

              <!-- Action buttons row -->
              <div class="d-flex align-center pt-4 pt-sm-2">
                <!-- Favorite and bookmark buttons -->
                <div class="d-flex ga-2">
                  <v-btn
                    icon="mdi-heart-outline"
                    variant="outlined"
                    size="small"
                    color="grey-darken-1"
                  ></v-btn>
                  <v-btn
                    icon="mdi-bookmark-outline"
                    variant="outlined"
                    size="small"
                    color="grey-darken-1"
                  ></v-btn>
                </div>
                <v-spacer></v-spacer>
                <!-- Details button -->
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
    </v-hover>
  </div>
</template>

<script setup lang="ts">
interface HotelAmenity {
  text: string;
  icon: string;
}

interface HotelItem {
  title: string;
  rating: number;
  reviews: string;
  tag: string;
  pricePerNight: number;
  discount: `${number}%`;
  isDeal: boolean;
  amenities: HotelAmenity[];
  images: number[];
}

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({ bussness: Object });

// Sample result item data
const item = ref<HotelItem>({
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

// Inject mobile state from parent
const isMobile = inject("isMobile");
</script>
