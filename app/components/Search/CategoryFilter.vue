<template>
  <v-list-item>
    <v-list-item-subtitle class="text-sm font-weight-bold">
      Catégories
    </v-list-item-subtitle>
    <div class="pb-4">
      <!-- Chips des sous-catégories de la catégorie active -->
      <v-chip-group
        v-model="selectedCategories"
        column
        multiple
        class="pa-0 bg-transparent"
        @update:model-value="updateURL('sub_category', selectedCategories)"
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
const { $directus, $readItems } = useNuxtApp();
const { updateURL, getURLFilter } = useFilterURL();

// Récupère la catégorie active depuis l'URL (ex: /search?category=commerce-detail)
const currentCategorySlug = computed(() => {
  return route.query.category as string;
});

// Récupère toutes les catégories avec leurs sous-catégories
const { data: categoriesWithSubs } = await useAsyncData(
  "categories_with_subs",
  async () => {
    // Récupère les catégories
    const cats = await $directus.request(
      $readItems("categories_new", {
        fields: ["id", "name", "slug"],
      })
    );

    // Récupère les sous-catégories
    const subs = await $directus.request(
      $readItems("sub_categories", {
        fields: ["id", "name", "slug", "categories_new"],
      })
    );

    // Map des sous-catégories par catégorie
    const subsMap = new Map<string, any[]>();
    for (const sub of subs) {
      const parentId = sub.categories_new;
      if (!subsMap.has(parentId)) subsMap.set(parentId, []);
      subsMap.get(parentId)!.push(sub);
    }

    // Assemble
    return cats.map((cat) => ({
      ...cat,
      sub_categories: subsMap.get(cat.id) || [],
    }));
  },
  {
    getCachedData: (key) => {
      return useNuxtApp().payload.data[key] || useNuxtApp().static.data[key];
    },
  }
);

// Sous-catégories de la catégorie active uniquement
const currentSubCategories = computed(() => {
  if (!currentCategorySlug.value || !categoriesWithSubs.value) {
    return [];
  }

  const category = categoriesWithSubs.value.find(
    (c) => c.slug === currentCategorySlug.value
  );

  return category?.sub_categories || [];
});

// Filtres URL (slugs des sous-catégories sélectionnées)
const selectedCategories = ref<string[]>(
  getURLFilter("sub_category") as string[]
);

const numberToDisplay = ref(6);
</script>