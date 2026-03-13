<template>
  <v-list-item>
    <v-list-item-subtitle class="text-sm font-weight-bold">
      Catégories
    </v-list-item-subtitle>
    <div class="pb-4">
      <v-chip-group
        v-model="selectedCategories"
        column
        multiple
        class="pa-0 bg-transparent"
        @update:model-value="updateURL('sub_categories', selectedCategories)"
      >
        <v-chip
          v-for="sub in currentSubCategories.slice(0, numberToDisplay)"
          :key="sub.id"
          :value="sub.slug"
          variant="outlined"
          color="orange-darken-2"
          size="small"
          rounded="xl"
          class="font-weight-medium px-3"
        >
          {{ sub.name }}
        </v-chip>
      </v-chip-group>

      <show-all-button
        v-if="currentSubCategories.length > 6"
        :total="currentSubCategories.length"
        v-model="numberToDisplay"
      ></show-all-button>
    </div>
  </v-list-item>
</template>

<script setup lang="ts">
const route = useRoute();
const { updateURL, getURLFilter } = useFilterURL();

const currentSubCategories = ref<any[]>([]);
const selectedCategories = ref<string[]>([]);
const numberToDisplay = ref(6);

// Fonction de chargement isolée pour pouvoir la réutiliser
async function loadChips() {
  // On utilise la clé "categories" (pluriel, sans répétition)
  const parentSlug = route.query.categories;

  // Reset de la sélection locale si on change de catégorie parente
  selectedCategories.value = (getURLFilter("sub_categories") as string[]) || [];

  if (parentSlug) {
    try {
      const data = await $fetch<any[]>("/api/directus/sub_categories", {
        method: "POST",
        body: {
          fields: ["id", "name", "slug"],
          filter: {
            categories_new: {
              slug: { _eq: parentSlug },
            },
          },
          limit: -1,
        },
      });
      currentSubCategories.value = data || [];
    } catch (e) {
      console.error("Erreur Directus sub_categories:", e);
    }
  } else {
    currentSubCategories.value = [];
  }
}

onMounted(() => {
  loadChips();
});

// Indispensable : mettre à jour les chips si l'utilisateur change de catégorie dans le header
watch(
  () => route.query.categories,
  () => {
    loadChips();
  },
);
</script>
