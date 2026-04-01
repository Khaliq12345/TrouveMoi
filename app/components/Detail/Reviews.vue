<!-- Detailed reviews section with user info, ratings, photos, and reactions -->
<template>
  <v-container class="pa-0 py-8 px-4">
    <!-- Section title -->
    <h2 class="text-h5 font-weight-bold mb-6">Avis & Évaluations</h2>

    <!-- Statistics Block -->
    <v-row v-if="totalReviews > 0" class="align-center mb-8 mt-4">
      <v-col
        cols="12"
        md="4"
        class="d-flex flex-column align-md-start align-center text-md-left text-center mb-4 mb-md-0"
      >
        <div class="text-subtitle-1 font-weight-bold text-high-emphasis mb-1">
          Avis global
        </div>

        <v-rating
          :model-value="Number(averageRating)"
          color="deep-orange-darken-1"
          active-color="deep-orange-darken-1"
          half-increments
          readonly
          size="x-large"
          density="compact"
          class="mb-2"
        ></v-rating>

        <div class="text-body-2 text-grey-darken-1">
          {{ totalReviews }} avis
        </div>
      </v-col>

      <v-col cols="12" md="8">
        <div
          v-for="stat in ratingStats"
          :key="stat.stars"
          class="d-flex align-center mb-3"
        >
          <div
            class="text-body-2 text-grey-darken-3 text-right mr-4 text-no-wrap"
            style="width: 50px"
          >
            {{ stat.stars }} {{ stat.stars > 1 ? "stars" : "star" }}
          </div>

          <v-progress-linear
            :model-value="stat.percentage"
            :color="stat.color"
            bg-color="grey-lighten-3"
            height="12"
            rounded
          ></v-progress-linear>
        </div>
      </v-col>
    </v-row>
    <div v-else class="mb-8 text-grey">Aucun avis pour le moment.</div>

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
      <div class="text-body-1 text-grey-darken-4 mb-4 lh-relaxed">
        <span
          v-if="
            review.Comment &&
            review.Comment.length > 150 &&
            !expandedReviews[review.id]
          "
        >
          {{ review.Comment.substring(0, 150) }}...
        </span>
        <span v-else>
          {{ review.Comment }}
        </span>

        <div v-if="review.Comment && review.Comment.length > 150" class="mt-1">
          <v-btn
            variant="text"
            density="compact"
            color="red-darken-1"
            class="px-0 text-none font-weight-bold"
            @click="expandedReviews[review.id] = !expandedReviews[review.id]"
          >
            {{
              expandedReviews[review.id] ? "Afficher moins" : "Afficher tout"
            }}
          </v-btn>
        </div>
      </div>

      <!-- Aucune image dans les données → section supprimée -->

      <!-- Reaction buttons (avec comptes à 0 ou omis si non requis) -->
      <!-- ⚠️ Si vous ne stockez pas les réactions, mieux vaut les retirer entièrement -->
      <!-- Sinon, gardez-les avec des valeurs statiques (ex: 0) ou via computed -->
      <!-- Ici, on les garde mais en mode minimal (sans comptes si non fournis) -->
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
const { $directus, $readItems } = useNuxtApp();

const expandedReviews = ref<Record<string | number, boolean>>({});

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const { data: results } = await useAsyncData(
  "reviews",
  async () => {
    return $directus.request(
      $readItems("reviews", {
        filter: {
          businesses: {
            id: {
              _eq: props.id,
            },
          },
        },
      }),
    );
  },
  {
    getCachedData: (key) => {
      const nuxtApp = useNuxtApp();
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  },
);

const totalReviews = computed(() => results.value?.length || 0);

const averageRating = computed(() => {
  if (!results.value || results.value.length === 0) return "0.0";
  const sum = results.value.reduce((acc, review) => {
    return acc + (Number(review.rating) || 0);
  }, 0);
  return (sum / results.value.length).toFixed(1);
});

// NOUVEAU : Calcul dynamique des statistiques pour les barres de progression
const ratingStats = computed(() => {
  // Structure de base avec les couleurs correspondantes à la maquette
  const stats = [
    { stars: 5, color: '#DF513B', count: 0, percentage: 0 },
    { stars: 4, color: '#E46B4B', count: 0, percentage: 0 },
    { stars: 3, color: '#EAA15A', count: 0, percentage: 0 },
    { stars: 2, color: '#EDBB5B', count: 0, percentage: 0 },
    { stars: 1, color: '#F0D458', count: 0, percentage: 0 }
  ];

  if (!results.value || totalReviews.value === 0) {
    return stats;
  }

  // 1. Compter le nombre d'avis pour chaque note
  results.value.forEach((review: any) => {
    // On arrondit au cas où il y aurait des décimales
    const rating = Math.round(Number(review.rating) || 0); 
    const statItem = stats.find(s => s.stars === rating);
    
    if (statItem) {
      statItem.count += 1;
    }
  });

  // 2. Calculer le pourcentage pour chaque barre
  stats.forEach(stat => {
    stat.percentage = (stat.count / totalReviews.value) * 100;
  });

  return stats;
});
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
