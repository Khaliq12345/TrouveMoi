<template>
  <v-container class="pa-2" color="transparent" fluid>
    <v-card variant="flat" class="pa-2 rounded-lg" color="transparent">
      <header class="mb-2">
        <h2 class="text-h6 text-md-h5 font-weight-bold text-grey-darken-4 mb-0">
          Explorer les recherches au Bénin
        </h2>
        <p class="text-body-2 text-grey">
          Découvrez ce que les internautes recherchent par ville
        </p>
      </header>

      <v-divider class="mb-3"></v-divider>

      <section
        v-for="(section, key) in sections"
        :key="key"
        class="mb-3 mb-md-6"
      >
        <h3
          class="text-caption text-md-subtitle-1 font-weight-bold mb-1 mb-md-3 text-uppercase text-grey-darken-2"
        >
          {{ getSectionTitle(section, key) }}
        </h3>

        <v-row no-gutters>
          <v-col
            v-for="(item, index) in getVisibleItems(key)"
            :key="index"
            cols="6"
            sm="4"
            md="3"
            class="py-1 py-md-2"
          >
            <NuxtLink
              :to="getSearchRoute(key, item)"
              class="text-decoration-none text-grey-darken-3 text-caption text-md-body-2 d-block text-truncate"
            >
              {{ item }}
            </NuxtLink>
          </v-col>
        </v-row>

        <v-btn
          variant="text"
          color="primary"
          :size="$vuetify.display.mdAndUp ? 'default' : 'small'"
          :density="$vuetify.display.mdAndUp ? 'default' : 'compact'"
          class="text-none px-0 mt-1 mt-md-3 font-weight-bold text-caption text-md-body-2"
          :append-icon="showAll[key] ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="showAll[key] = !showAll[key]"
        >
          {{ showAll[key] ? "Voir moins" : "Voir plus" }}
        </v-btn>
      </section>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const selectedCityIndex = ref(0);
const showAll = ref({
  top: false,
  trending: false,
});

const cities = [
  "Cotonou",
  "Porto-Novo",
  "Parakou",
  "Abomey-Calavi",
  "Djougou",
  "Bohicon",
  "Ouidah",
  "Natitingou",
  "Kandi",
];

const topSearches = [
  "Logistique",
  "Transit",
  "Transport",
  "Immobilier",
  "Location",
  "Vente",
  "Appartement",
  "Résidence",
  "Restaurant",
  "Bar",
  "Hôtel",
  "Spa",
  "Piscine",
  "Wi-fi",
  "Paiement",
  "Mobilemoney",
  "Véhicule",
  "Automobile",
  "Pièces",
  "Ciment",
  "Construction",
  "Btp",
  "Audit",
  "Conseil",
  "Juridique",
  "Fiscal",
  "Comptabilité",
  "Entrepôt",
  "Export",
  "Import",
  "Livraison",
  "Commerce",
];

const trendingSearches = [
  "Ecotourisme",
  "Tourisme",
  "Luxe",
  "Gastronomie",
  "Cocktails",
  "Grillades",
  "Cosmetique",
  "Naturel",
  "Bio",
  "Plantes",
  "Huiles",
  "Hydrolats",
  "Cajou",
  "Karité",
  "Ananas",
  "Agroindustrie",
  "Coton",
  "Textile",
  "Wax",
  "Digital",
  "Web",
  "Mobile",
  "Erp",
  "Fintech",
  "Innovation",
  "Plateforme",
  "Tracking",
  "Multimodal",
  "Investissement",
  "Premium",
];

// Configuration des sections
const sections = {
  top: {
    data: topSearches,
    title: "Top recherches à {city}",
  },
  trending: {
    data: trendingSearches,
    title: "Tendances actuelles au Bénin",
  },
};

// Génère le titre avec la ville dynamique pour la première section
const getSectionTitle = (section, key) => {
  if (key === "top") {
    return section.title.replace("{city}", cities[selectedCityIndex.value]);
  }
  return section.title;
};

// Retourne les items visibles selon l'état "voir plus"
const getVisibleItems = (key) => {
  const items = sections[key].data;
  return showAll.value[key] ? items : items.slice(0, 8);
};

// Fonction pour générer la route de recherche en fonction de la section et de l'élément cliqué
const getSearchRoute = (key, item) => {
  const queryParams = {
    search: item, // Le terme de recherche principal
  };

  // Si on est dans la section "Top recherches", on ajoute la ville sélectionnée à la requête
  if (key === "top") {
    queryParams.location = cities[selectedCityIndex.value];
  }

  // Retourne l'objet route pour NuxtLink
  return {
    path: "/search",
    query: queryParams,
  };
};
</script>

<style scoped>
/* Conserve l'effet de survol sur les liens NuxtLink (qui sont rendus comme des balises a) */
a:hover {
  color: #1867c0 !important;
}
</style>
