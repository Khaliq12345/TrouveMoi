<template>
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
</template>

<script setup lang="ts">
import type { Biz } from "~/types/biz";

// Inject biz
const biz = inject<Ref<Biz | null>>("biz");

const totalReviews = computed(() => biz?.value?.reviews_count || 0);

const averageRating = computed(() => {
  if (!biz?.value?.rating) return "0.0";
  return Number(biz.value.rating).toFixed(1);
});

// Calcul dynamique des statistiques pour les barres de progression
const ratingStats = computed(() => {
  // Structure de base avec les couleurs correspondantes à la maquette
  const stats = [
    { stars: 5, color: '#DF513B', count: 0, percentage: 0 },
    { stars: 4, color: '#E46B4B', count: 0, percentage: 0 },
    { stars: 3, color: '#EAA15A', count: 0, percentage: 0 },
    { stars: 2, color: '#EDBB5B', count: 0, percentage: 0 },
    { stars: 1, color: '#F0D458', count: 0, percentage: 0 }
  ];

  // Si on n'a pas les détails des notes, on retourne les stats à 0
  if (!biz?.value?.rating_details) {
    return stats;
  }

  const details = biz.value.rating_details as Record<string, number>;

  // 1. Récupérer le nombre d'avis pour chaque note
  stats.forEach(stat => {
    stat.count = Number(details[stat.stars.toString()]) || 0;
  });

  // 2. Calculer le total réel des avis présents dans rating_details
  const actualTotal = stats.reduce((sum, stat) => sum + stat.count, 0);

  // 3. Calculer le pourcentage pour chaque barre
  stats.forEach(stat => {
    stat.percentage = actualTotal > 0 ? (stat.count / actualTotal) * 100 : 0;
  });

  return stats;
});
</script>