<!-- Search result card displaying hotel/location with images, rating, price, amenities, and action buttons -->
<template>
  <div v-bind="$attrs">
    <v-hover>
      <template v-slot:default="{ isHovering, props }">
        <v-card v-bind="props" class="mt-4 rounded-xl overflow-hidden" :elevation="isHovering ? 5 : 0" border>
          <!-- Responsive flex container -->
          <div class="d-flex w-100 overflow-hidden" :class="isMobile ? 'flex-column' : 'flex-sm-row'"
            :color="isHovering ? 'primary' : undefined">
            <!-- Image section (responsive: mobile/desktop) -->
            <div class="flex-shrink-0 w-100 w-sm-auto">
              <!-- Mobile image gallery -->
              <MobileImageView v-if="isMobile" :images="images || []" :discount="item.discount" />
              <!-- Desktop image carousel -->
              <DesktopImageView v-else :images="images || []" :discount="item.discount" />
            </div>

            <!-- Content section -->
            <div class="w-100 d-flex flex-column py-2 pl-2">
              <!-- Title and rating section -->
              <div class="w-100">
                <h3 class="text-h9 font-weight-bold text-truncate" style="line-height: 1.2">
                  {{ bussness?.name }}
                </h3>
                <!-- Rating display with star icon -->
                <div class="d-flex align-center flex-nowrap ga-1">
                  <span>
                    <v-rating :model-value="bussness?.rating" color="amber-darken-2" density="compact" size="16"
                      readonly half-increments></v-rating>
                  </span>

                  <span class="text-caption font-weight-black ms-1 align-center">
                    {{ bussness?.rating }}
                  </span>

                  <span class="text-caption text-medium-emphasis" style="font-size: 0.7rem;">
                    ({{ bussness?.reviews_count }} avis)
                  </span>

                  <span class="text-caption font-weight-black text-success" v-if="bussness?.price_range">
                    •
                    {{ 'F'.repeat(bussness?.price_range || 0) }}
                  </span>


                  <span :class="bussness?.is_open ? 'text-success' : 'text-error'"
                    class="text-caption font-weight-black" style="font-size: 0.7rem !important;">
                    •
                    {{ bussness?.is_open ? 'Ouvert' : 'Fermé' }}
                  </span>
                </div>
              </div>

              <!-- Locations display -->
              <div v-if="bussness?.locations?.length" class="d-flex align-center flex-wrap ga-1 mt-1">
                <v-icon size="14" color="medium-emphasis" class="mr-n1">mdi-map-marker</v-icon>

                <span v-for="(loc, index) in bussness.locations.slice(0, 2)" :key="index"
                  class="text-caption font-weight-bold text-medium-emphasis">
                  {{ loc.city }}<span v-if="index === 0 && bussness.locations.length > 1">,</span>
                </span>
              </div>

              <!-- Categories display -->
              <div v-if="bussness?.categories?.length" class="ps-1 d-flex align-center flex-wrap ga-1 mt-1">
                <span v-for="(cat, index) in bussness.categories.slice(0, 2)" :key="index"
                  class="text-caption font-weight-bold text-medium-emphasis" style="font-size: 0.7rem !important;">
                  {{ cat.categories_new_id?.name }}<span v-if="index === 0 && bussness.categories.length > 1">,</span>
                </span>
              </div>

              <!-- Featured slots list -->
              <div v-if="bussness?.featuredslots?.length" class="d-flex flex-wrap align-center ga-1 mt-2">

                <v-chip v-for="(slot, index) in bussness.featuredslots.slice(0, 2)" :key="index" size="x-small"
                  variant="outlined" color="medium-emphasis" class="font-weight-semibold" style="height: 18px;">
                  {{ slot.featured_slots_id.feature }}
                </v-chip>
              </div>

              <!-- Action buttons row -->
              <div class="d-flex align-center pt-sm-2">
                <!-- Details button -->
                <v-btn v-if="bussness?.website" color="primary" variant="flat" size="small"
                  class="text-none font-weight-bold rounded-lg" append-icon="mdi-web">
                  Visiter le site
                </v-btn>
              </div>
            </div>
          </div>
        </v-card>
      </template>
    </v-hover>
  </div>
</template>

<script setup lang="ts">
import type { BizMedia } from '~/types/biz';

const { $directus, $readItems } = useNuxtApp();

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
const { data: businessMedia, error } = await useAsyncData<BizMedia[]>(
  `media-${props.bussness?.id}`,
  async (): Promise<BizMedia[]> => {
    if (!props.bussness?.id) return [];

    const results = await $directus.request(
      $readItems("buisness_media", {
        filter: {
          extra_id: {
            _eq: props.bussness?.id,
          },
        },
        fields: ["id", "type", "extra_type", "extra_id", "media_id"]
      }),
    );

    return results as BizMedia[];
  },
  {
    getCachedData: (key) => {
      const nuxtApp = useNuxtApp();
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  },
);

const images = computed(() => {
  const imgs = businessMedia.value?.filter((media) => media.type === "image");
  console.log("Images", imgs);
  return imgs?.map((img) => imgLink(img.media_id));
});

console.log("While getting busineses media on search result page", error.value);
</script>
