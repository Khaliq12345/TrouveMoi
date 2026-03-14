<template>
  <!-- Display the media of the buisness -->
  <v-carousel
    hide-delimiters
    show-arrows="hover"
    cycle
    :height="isMobile ? 500 : 600"
    class="carousel-wrapper"
  >
    <v-carousel-item
      v-for="(image, i) in images"
      :key="i"
      :src="image"
      cover
    />

    <div class="carousel-overlay">
      <v-container class="h-100 d-flex align-end pb-10">
        <div class="carousel-content w-100 text-center text-md-left text-white">
          <!-- this show the name of the buisness -->
          <h1 class="text-h4 text-md-h2 font-weight-black mb-2 title-text">
            {{ restaurantTitle }}
          </h1>

          <!-- This shows the rating of the buisness -->
          <div class="d-flex align-center justify-center justify-md-start mb-3">
            <v-rating
              :model-value="rating"
              color="amber-darken-2"
              density="compact"
              size="small"
              half-increments
              readonly
            />
            <!-- The review -->
            <span class="ms-2 text-subtitle-2 font-weight-bold shadow-text">
              {{ rating }} ({{ review }} Reviews)
            </span>
          </div>

          <!-- This show the business type and open hours -->
          <p class="text-subtitle-1 font-weight-medium mb-2 shadow-text">
            $$$ • Italian Cuisine •
            {{ isOpen === "opened" ? "Ouvert" : "Fermé" }}
          </p>

          <!-- Short description of the buisness -->
          <p class="text-body-2 text-md-body-1 mb-6 description-text">
            {{ description }}
          </p>

          <!-- This are the action buttons -->
          <div
            class="d-flex flex-column flex-md-row justify-center justify-md-start ga-3"
          >
            <v-btn
              size="large"
              color="teal-darken-2"
              class="px-8 font-weight-bold"
              flat
            >
              Book a Table
            </v-btn>
            <v-btn size="large" variant="outlined" color="white" class="px-8">
              View Menu
            </v-btn>
          </div>
        </div>
      </v-container>
    </div>
  </v-carousel>
</template>

<script setup lang="ts">
const props = defineProps<{
  restaurantTitle: string;
  review: number;
  rating: number;
  isOpen: string;
  description: string;
  images: String[];
}>();

const isMobile = inject("isMobile");
</script>

<style scoped>
.carousel-wrapper {
  position: relative;
}

.carousel-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  /* Default Mobile Gradient (Bottom to Top) */
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.2) 60%,
    transparent 100%
  );
}

/* Desktop Specific Adjustments */
@media (min-width: 960px) {
  .carousel-overlay {
    /* Desktop Gradient (Left to Right) */
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0.1) 70%,
      transparent 100%
    );
  }
}

.carousel-content {
  pointer-events: all;
}

.title-text {
  text-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

.shadow-text {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
}

.description-text {
  /* On mobile, center the max-width. On desktop, let it grow slightly. */
  margin-left: auto;
  margin-right: auto;
  max-width: 320px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
}

@media (min-width: 960px) {
  .description-text {
    margin-left: 0;
    max-width: 500px;
  }
}

/* Vuetify 'ga-3' might need manual gap if using older version */
.ga-3 {
  gap: 12px;
}
</style>
