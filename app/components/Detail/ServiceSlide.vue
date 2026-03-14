<template>
  <v-sheet class="pa-0 py-6" color="transparent">
    <div class="d-flex align-center justify-space-between mb-6 px-4">
      <h2 class="text-h5 font-weight-bold">Popular Dishes</h2>
      <v-btn
        variant="text"
        color="primary"
        class="text-none"
        append-icon="mdi-chevron-right"
      >
        View full menu
      </v-btn>
    </div>

    <v-carousel
      height="400"
      show-arrows="hover"
      hide-delimiters
      cycle
      interval="5000"
    >
      <v-carousel-item v-for="(dish, n) in media" :key="n">
        <div class="d-flex justify-center align-center h-100">
          <v-card
            class="rounded-xl custom-card"
            width="90%"
            max-width="400"
            height="320"
            flat
          >
            <v-img
              :src="dish?.link"
              height="100%"
              cover
              class="d-flex align-end"
            >
              <div class="position-absolute w-100" style="top: 0">
                <v-chip
                  v-if="dish?.isPopular || true"
                  size="x-small"
                  color="white"
                  class="ma-3 font-weight-black"
                  variant="flat"
                >
                  POPULAR
                </v-chip>
              </div>

              <div class="blur-content ma-2 pa-3 rounded-xl">
                <div class="d-flex justify-space-between align-center mb-1">
                  <span class="text-h6 font-weight-bold text-white">
                    {{ dish?.name || "No name" }}
                  </span>
                  <span class="text-h6 font-weight-black text-white">
                    {{ dish?.price || 0 }}€
                  </span>
                </div>

                <div
                  class="d-flex align-center text-caption text-white"
                  style="opacity: 0.9"
                >
                  <v-icon size="16" color="amber-darken-2" class="mr-1"
                    >mdi-star</v-icon
                  >
                  <span class="font-weight-bold text-body-2">{{
                    dish?.rating || 0
                  }}</span>
                  <span class="mx-1">•</span>
                  <span class="text-body-2"
                    >{{ dish?.reviews || 0 }} reviews</span
                  >
                </div>
              </div>
            </v-img>
          </v-card>
        </div>
      </v-carousel-item>
    </v-carousel>
  </v-sheet>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: string; // ID du Business
  media: any[]; // Le tableau d'objets media (ton JSON)
}>();
</script>

<style scoped>
/* Card hover animation */
.custom-card {
  transition: all 0.3s ease;
}

.custom-card:hover {
  transform: translateY(-8px);
}

/* White text with shadow for readability */
.text-white {
  color: white !important;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
