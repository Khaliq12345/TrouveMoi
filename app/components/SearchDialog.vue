<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    fullscreen
    transition="fade-transition"
  >
    <v-card class="h-100 bg-surface">
      <v-toolbar color="transparent" flat class="px-2 pt-2">
        <v-btn
          icon="mdi-arrow-left"
          variant="text"
          @click="$emit('update:modelValue', false)"
        />
        <v-toolbar-title class="font-weight-bold ml-2 text-h6">
          {{ title }}
        </v-toolbar-title>
      </v-toolbar>

      <v-container class="w-100 pt-4" style="max-width: 800px">
        <v-text-field
          v-model="query"
          placeholder="Rechercher"
          density="comfortable"
          variant="solo"
          hide-details
          class="mb-3"
          autofocus
          @keyup.enter="launchSearch"
        >
          <template #prepend-inner>
            <v-icon icon="mdi-magnify" />
          </template>
          <template #append-inner>
            <v-btn
              icon="mdi-arrow-right"
              variant="text"
              color="primary"
              @click="launchSearch"
            />
          </template>
        </v-text-field>

        <v-text-field
          v-model="location"
          placeholder="Localisation"
          density="comfortable"
          variant="solo"
          hide-details
          class="mb-4"
          @keyup.enter="launchSearch"
        >
          <template #prepend-inner>
            <v-icon icon="mdi-map-marker" />
          </template>
        </v-text-field>

        <v-divider class="mb-4" />

        <v-list
          v-if="categories && categories.length > 0"
          density="comfortable"
          class="bg-transparent mt-2"
        >
          <v-list-item
            v-for="category in categories"
            :key="category.id"
            :title="category.name"
            :prepend-icon="category.icon || 'mdi-shape'"
            class="rounded-lg mb-1"
            @click="selectCategory(category)"
          />
        </v-list>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type { CategoryWithColor } from "~/types/category";

// Définition des props
defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: "Recherche",
  },
});

// Définition des événements émis (pour fermer la modal via v-model)
const emit = defineEmits(["update:modelValue"]);

const query = ref("");
const location = ref("");

// Récupération des catégories depuis Directus
const { data: categories } = await useCategories();

const router = useRouter();

const launchSearch = () => {
  const searchVal = query.value.trim();
  const locationVal = location.value.trim();

  const newQuery: Record<string, string> = {};
  if (searchVal) newQuery.search = searchVal;
  if (locationVal) newQuery.location = locationVal;

  emit("update:modelValue", false);

  router.push({
    path: "/search",
    query: newQuery,
  });
};

const selectCategory = (category: CategoryWithColor) => {
  emit("update:modelValue", false);
  router.push({
    path: "/search",
    query: { categories: category.slug },
  });
};
</script>
