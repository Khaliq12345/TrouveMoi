<!-- Detailed reviews section with user info, ratings, photos, and reactions -->
<template>
  <v-container class="pa-0 py-8 px-4">
    <!-- Section title -->
    <h2 class="text-h6 text-md-h5 font-weight-bold mb-6">Avis & Évaluations</h2>

    <!-- Statistics Block -->
    <DetailReviewStats />

    <!-- Reviews loop -->
    <div v-for="(review, i) in results" :key="review.id" class="mb-10">
      <!-- User info header -->
      <div class="d-flex align-center mb-4">
        <!-- User avatar -->
        <v-avatar size="48" class="mr-4" color="grey-darken-3">
          <span class="text-h6 text-white">{{
            review.author ? review.author.charAt(0).toUpperCase() : "A"
          }}</span>
        </v-avatar>

        <!-- User details -->
        <div>
          <div class="text-subtitle-1 font-weight-bold">
            {{ review.author || "Anonyme" }}
          </div>
          <!-- Pas de localisation dans les données → omis -->
        </div>

        <v-spacer></v-spacer>

        <!-- More options button -->
        <v-btn icon="mdi-dots-horizontal" variant="text" color="grey"></v-btn>
      </div>

      <!-- Rating and date -->
      <div class="d-flex align-center mb-3">
        <v-rating
          :model-value="review.rating"
          color="red-darken-1"
          density="compact"
          readonly
          size="small"
        ></v-rating>
        <span class="text-caption text-grey-darken-1 ml-3">
          {{ formatDate(review.date_created) }}
        </span>
      </div>

      <!-- Review text -->
      <DetailReviewText v-if="review.Comment" :text="review.Comment" />

      <div class="d-flex flex-wrap align-center gap-4 mt-4">
        <v-btn
          variant="outlined"
          rounded="pill"
          size="small"
          class="text-none grey-border"
          prepend-icon="mdi-lightbulb-outline"
        >
          Helpful
        </v-btn>
        <v-btn
          variant="outlined"
          rounded="pill"
          size="small"
          class="text-none grey-border"
          prepend-icon="mdi-hand-okay"
        >
          Thanks
        </v-btn>
      </div>

      <v-divider class="mt-8"></v-divider>
    </div>
  </v-container>
</template>

<script setup lang="ts">
const props = defineProps({ id: String });

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const { results } = await useFetchReviews(props.id);
</script>
<style scoped>
/* Relaxed line height for readability */
.lh-relaxed {
  line-height: 1.6;
}

/* Gap utilities */
.gap-3 {
  gap: 12px;
}
.gap-4 {
  gap: 16px;
}

/* Button border styling */
.grey-border {
  border: 1px solid rgba(0, 0, 0, 0.12) !important;
}

/* Image overlay background */
.bg-black-alpha-blur {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
}

/* Image shadow */
.shadow-sm {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
