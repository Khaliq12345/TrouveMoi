<!-- Detailed reviews section with user info, ratings, photos, and reactions -->
<template>
  <v-container class="pa-0 py-8 px-4">
    <!-- Section title -->
    <h2 class="text-h5 font-weight-bold mb-6">Recommended Reviews</h2>

    <!-- Reviews loop -->
    <div v-for="(review, i) in results" :key="review.id" class="mb-10">
      <!-- User info header -->
      <div class="d-flex align-center mb-4">
        <!-- User avatar (placeholder only — pas de champ dans les données) -->
        <v-avatar size="64" class="mr-4" color="grey-lighten-2">
          <v-icon icon="mdi-account" size="32" color="grey-darken-1"></v-icon>
        </v-avatar>

        <!-- User details -->
        <div>
          <div class="text-subtitle-1 font-weight-bold">
            {{ review.author }}
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
      <p class="text-body-1 text-grey-darken-4 mb-4 lh-relaxed">
        {{ review.Comment }}
      </p>

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

const formatDate = (isoString) => {
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
    // On envoie l'objet query qui contient maintenant 'filter' ET potentiellement 'search'
    return $directus.request(
      $readItems("reviews", {
        filter: {
          businesses: {
            // Ou 'business' selon ton renommage
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
