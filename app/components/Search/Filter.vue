<template>
  <v-card class="d-flex flex-column h-100" flat tile color="transparent">
    <v-card-item class="border-b pa-4" color="transparent">
      <div class="d-flex align-center justify-space-between w-100">
        <v-card-title class="text-h6 font-weight-bold pa-0">Filtres</v-card-title>
        <v-btn
          v-if="activeFiltersCount > 0"
          variant="text"
          size="small"
          color="primary"
          class="text-none font-weight-bold"
          @click="clearAllFilters"
        >
          Tout effacer
        </v-btn>
      </div>
      <v-card-subtitle class="pa-0 mt-1">
        {{ activeFiltersCount }} filtre{{ activeFiltersCount > 1 ? "s" : "" }} actif
      </v-card-subtitle>
    </v-card-item>

    <v-card-text class="flex-grow-1 overflow-y-auto pa-0" color="transparent">
      <v-list lines="one" select-strategy="classic" class="pa-0 bg-transparent">
        <v-list-item class="pa-4 bg-transparent">
          <v-list-item-title class="text-subtitle-2 font-weight-bold mb-3">
            Prix
          </v-list-item-title>
          <v-btn-toggle
            v-model="selectedPrice"
            multiple
            divided
            color="primary"
            variant="outlined"
            class="w-100 border-none bg-transparent"
          >
            <v-btn
              v-for="n in 4"
              :key="n"
              :value="n"
              class="flex-grow-1"
              height="40"
            >
              <span class="text-body-2">{{ "€".repeat(n) }}</span>
            </v-btn>
          </v-btn-toggle>
        </v-list-item>

        <v-divider />

        <v-list-group value="categories" class="pa-0 bg-transparent">
          <template #activator="{ props }">
            <v-list-item v-bind="props" class="px-4 bg-transparent">
              <v-list-item-title class="text-subtitle-1 font-weight-bold">Catégories</v-list-item-title>
            </v-list-item>
          </template>

          <div class="px-4 pb-4 bg-transparent">
            <v-text-field
              v-model="categorySearch"
              placeholder="Rechercher..."
              variant="solo"
              flat
              bg-color="transparent"
              density="compact"
              hide-details
              rounded="lg"
              class="mb-4"
              prepend-inner-icon="mdi-magnify"
            />

            <v-chip-group
              v-model="selectedCategories"
              column
              multiple
              class="pa-0 bg-transparent"
            >
              <v-chip
                v-for="cat in displayedCategoriesList"
                :key="cat.id"
                :value="cat.id"
                variant="outlined"
                color="orange-darken-2"
                size="small"
                rounded="xl"
                class="font-weight-medium px-3"
                :class="selectedCategories.includes(cat.id) ? 'bg-orange-darken-2 text-white' : 'bg-transparent'"
                :prepend-icon="selectedCategories.includes(cat.id) ? 'mdi-check' : undefined"
              >
                {{ cat.name }}
              </v-chip>
            </v-chip-group>

            <v-btn
              v-if="filteredCategories.length > 6"
              variant="text"
              size="small"
              color="orange-darken-2"
              class="text-none mt-1 px-0 font-weight-bold"
              @click="toggleShowAllCategories"
            >
              + {{ filteredCategories.length - 6 }} autres
            </v-btn>
          </div>
        </v-list-group>

        <v-divider />

        <v-list-group value="features" class="bg-transparent">
          <template #activator="{ props }">
            <v-list-item v-bind="props" class="px-4 bg-transparent">
              <v-list-item-title class="text-subtitle-2 font-weight-bold">
                Équipements & Services
              </v-list-item-title>
            </v-list-item>
          </template>

          <div class="px-4 pb-2 bg-transparent">
            <v-checkbox
              v-for="feature in features"
              :key="feature.id"
              v-model="selectedFeatures"
              :value="feature.id"
              hide-details
              density="compact"
              color="orange-darken-2"
              class="ma-0 pa-0 bg-transparent"
            >
              <template #label>
                <div class="d-flex align-center">
                  <v-icon size="small" class="me-3" color="grey-darken-4">
                    {{ feature.icon }}
                  </v-icon>
                  <span class="text-body-2 text-grey-darken-4 font-weight-medium">
                    {{ feature.label }}
                  </span>
                </div>
              </template>
            </v-checkbox>
          </div>
        </v-list-group>

        <v-divider />

        <v-list-item class="pa-4 bg-transparent">
          <v-list-item-title class="text-subtitle-2 font-weight-bold mb-2">
            Note minimum
          </v-list-item-title>
          <div class="d-flex flex-column bg-transparent">
            <v-btn
              v-for="rating in [4, 3, 2, 1]"
              :key="rating"
              variant="text"
              class="justify-start px-2 text-none"
              @click="toggleRating(rating)"
              :color="minRating === rating ? 'primary' : ''"
              :variant="minRating === rating ? 'tonal' : 'text'"
            >
              <v-rating
                :model-value="rating"
                color="amber-darken-2"
                density="compact"
                size="x-small"
                readonly
              />
              <span class="text-caption text-medium-emphasis ms-2">& plus</span>
            </v-btn>
          </div>
        </v-list-item>

        <v-divider />

        <v-list-item class="pa-4 bg-transparent">
          <template #prepend>
            <v-icon color="success" class="me-n2">mdi-clock-outline</v-icon>
          </template>
          <v-list-item-title class="text-body-2 ms-4">Ouvert maintenant</v-list-item-title>
          <template #append>
            <v-switch
              v-model="isOpenNow"
              hide-details
              density="compact"
              color="success"
              inset
            />
          </template>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import { ref, computed, watch, inject } from "vue";

interface Category {
  id: string;
  name: string;
}
interface Feature {
  id: string;
  label: string;
  icon: string;
}
interface FilterState {
  price: number[];
  categories: string[];
  features: string[];
  minRating: number | null;
  openNow: boolean;
}

const isMobile = inject("isMobile", ref(false));

const emit = defineEmits<{
  apply: [filters: FilterState];
  update: [filters: FilterState];
}>();

// CORRECTION: v-list-group v-model:opened doit être un tableau de strings
const openedGroups = ref<string[]>(["categories", "features"]);
const showAllCategories = ref(false);
const categorySearch = ref("");

const selectedPrice = ref<number[]>([]);
const selectedCategories = ref<string[]>([]);
const selectedFeatures = ref<string[]>([]);
const minRating = ref<number | null>(null);
const isOpenNow = ref<boolean>(false);

const categories = ref<Category[]>([
  { id: "restaurants", name: "Restaurants" },
  { id: "bars", name: "Bars" },
  { id: "cafes", name: "Cafés" },
  { id: "shopping", name: "Shopping" },
  { id: "beauty", name: "Beauté & Spas" },
  { id: "automotive", name: "Automobile" },
  { id: "health", name: "Santé & Médical" },
  { id: "home", name: "Maison & Jardin" },
  { id: "nightlife", name: "Vie nocturne" },
  { id: "hotels", name: "Hôtels" },
]);

const features = ref<Feature[]>([
  { id: "wifi", label: "Wi-Fi gratuit", icon: "mdi-wifi" },
  { id: "parking", label: "Parking", icon: "mdi-parking" },
  { id: "terrace", label: "Terrasse", icon: "mdi-table-chair" },
  { id: "delivery", label: "Livraison", icon: "mdi-truck-delivery" },
  { id: "takeout", label: "À emporter", icon: "mdi-bag-carry-on" },
  { id: "reservation", label: "Réservation", icon: "mdi-calendar-check" },
  { id: "credit_card", label: "Carte bancaire", icon: "mdi-credit-card" },
  {
    id: "wheelchair",
    label: "Accès PMR",
    icon: "mdi-wheelchair-accessibility",
  },
]);

const filteredCategories = computed<Category[]>(() => {
  if (!categorySearch.value) return categories.value;
  return categories.value.filter((c) =>
    c.name.toLowerCase().includes(categorySearch.value.toLowerCase()),
  );
});

const displayedCategoriesList = computed<Category[]>(() => {
  if (showAllCategories.value) return filteredCategories.value;
  return filteredCategories.value.slice(0, 6);
});

const activeFiltersCount = computed<number>(
  () =>
    selectedPrice.value.length +
    selectedCategories.value.length +
    selectedFeatures.value.length +
    (minRating.value ? 1 : 0) +
    (isOpenNow.value ? 1 : 0),
);

const resultsCount = computed<number>(
  () => Math.floor(Math.random() * 500) + 50,
);

function toggleShowAllCategories(): void {
  showAllCategories.value = !showAllCategories.value;
}

function toggleRating(rating: number): void {
  minRating.value = minRating.value === rating ? null : rating;
}

function clearAllFilters(): void {
  selectedPrice.value = [];
  selectedCategories.value = [];
  selectedFeatures.value = [];
  minRating.value = null;
  isOpenNow.value = false;
  categorySearch.value = "";
  showAllCategories.value = false;
}

function applyFilters(): void {
  emit("apply", {
    price: selectedPrice.value,
    categories: selectedCategories.value,
    features: selectedFeatures.value,
    minRating: minRating.value,
    openNow: isOpenNow.value,
  });
}

watch(
  [selectedPrice, selectedCategories, selectedFeatures, minRating, isOpenNow],
  () => {
    if (!isMobile.value) {
      emit("update", {
        price: selectedPrice.value,
        categories: selectedCategories.value,
        features: selectedFeatures.value,
        minRating: minRating.value,
        openNow: isOpenNow.value,
      });
    }
  },
  { deep: true },
);
</script>
