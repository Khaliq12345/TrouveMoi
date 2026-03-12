<template>
  <!-- Main layout container -->
  <v-layout class="flex-column fill-height">
    <!-- Top navigation bar -->
    <AppBar />

    <!-- Mobile view (map/video toggle) -->
    <SearchMobileView
      v-show="isMobile"
      v-model:viewMode="viewMode"
      @open-results="resultsSheet = true"
    />

    <!-- Desktop view (filters + results + map) -->
    <SearchDesktopView
      v-show="!isMobile"
      :results="results"
      @load="onLoad"
      @open-drawer="drawer = true"
    />

    <!-- Mobile filter dialog -->
    <v-dialog v-if="isMobile" v-model="mobileFilter" width="auto">
      <v-card max-width="400">
        <SearchFilter @applyFilter="mobileFilter = false" />
      </v-card>
    </v-dialog>

    <!-- Mobile results bottom sheet -->
    <v-bottom-sheet
      v-if="isMobile"
      v-model="resultsSheet"
      scrollable
      class="w-100"
    >
      <v-card height="70vh" class="d-flex flex-column">
        <v-card-title class="d-flex flex-column align-start pa-2 flex-shrink-0">
          <div class="d-flex align-center w-100">
            <span class="text-h6">Results</span>
            <v-spacer />
            <v-btn
              icon="mdi-close"
              variant="text"
              @click="resultsSheet = false"
            />
          </div>
          <SearchMiniFilter
            @show-drawer="mobileFilter = true"
            class="overflow-auto w-100"
          />
        </v-card-title>

        <v-divider class="flex-shrink-0" />

        <v-card-text class="pa-1 flex-grow-1 overflow-y-auto">
          <SearchResultList :results="results" @load="onLoad" />
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </v-layout>

    <!-- CORRECTION: Déplacer le drawer À L'INTÉRIEUR du v-layout -->
    <v-navigation-drawer
      v-if="!isMobile"
      v-model="drawer"
      temporary
      width="320"
      location="left"
      class="fill-height z-50"
      elevation="10"
      style="top: 0; height: 100vh; position: fixed"
    >
      <SearchFilter />
    </v-navigation-drawer>
  <!-- Le v-layout doit fermer APRÈS le drawer -->
</template>

<script setup lang="ts">
const route = useRoute();

// UI state management
const drawer = ref(false); // Desktop filter drawer visibility
const resultsSheet = ref(false); // Mobile results sheet visibility
const viewMode = ref("carte"); // Mobile view mode: 'carte' or 'video'
const mobileFilter = ref(false); // Mobile filter dialog visibility

// Results data and pagination
const results = ref([]);
const page = ref(1);
const isEmpty = ref(false);
const isLoading = ref(false);

const { getURLFilter, getAllURLFilters } = useFilterURL();

// Inject mobile state from parent
const isMobile = inject("isMobile");

// Generate fake result items for testing
function generateFakeItems(count, startId) {
  return Array.from({ length: count }, (_, i) => ({
    id: startId + i,
    title: `Result ${startId + i}`,
    description: `Simulated description for item ${startId + i}`,
  }));
}

// Handle infinite scroll load event
function onLoad({ side, done }) {
  if (isEmpty.value || isLoading.value) {
    if (isEmpty.value) done("empty");
    return;
  }
  loadMore({ side, done });
}

// Load more results with simulated delay
async function loadMore({ done }) {
  isLoading.value = true;
  try {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Generate and append new items
    const newItems = generateFakeItems(5, results.value.length + 1);
    results.value.push(...newItems);
    page.value++;

    // Stop loading after 10 pages
    if (page.value > 10) {
      isEmpty.value = true;
      done("empty");
    } else {
      done("ok");
    }
  } finally {
    isLoading.value = false;
  }
}

const { $directus, $readItems } = useNuxtApp();

const { data: businesses } = await useAsyncData(
  "businesses",
  async () => {
    const filters = getAllURLFilters();
    console.log("Before filter is:", filters);

    // On prépare l'objet de requête final
    const query: any = {
      filter: {},
    };

    for (const [key, value] of Object.entries(filters)) {
      // Si la clé est 'search', on l'extrait du 'filter' car
      // Directus traite la recherche globale à la racine de la requête
      if (key === "search") {
        query.search = value;
        continue;
      }

      // Traitement spécial pour la relation many-to-many featured_slots
      if (key === "featured_slots" && Array.isArray(value)) {
        query.filter.featuredslots = {
          featured_slots_id: {
            slug: { _in: value }, // ← slug au lieu de _in avec IDs
          },
        };
        continue;
      }

      // Les autres clés sont traitées comme des filtres de colonnes classiques
      query.filter[key] = Array.isArray(value)
        ? { _in: value }
        : { _eq: value };
    }

    console.log("Final query is: ", query);

    // On envoie l'objet query qui contient maintenant 'filter' ET potentiellement 'search'
    return $directus.request($readItems("businesses", query));
  },
  {
    getCachedData: (key) => {
      const nuxtApp = useNuxtApp();
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  },
);
console.log("Bussnesses: ", businesses.value);

// React when the page parameter changes
watch(
  () => route.query,
  () => {
    window.location.reload();
  },
  { deep: true },
);
</script>
