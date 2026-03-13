<template>
  <v-list-item>
    <v-list-item-subtitle class="text-sm font-weight-bold">
      Sous-catégories
    </v-list-item-subtitle>
    <div class="pb-4">
      <v-chip-group
        v-model="selectedCategories"
        column
        multiple
        class="pa-0 bg-transparent"
        @update:model-value="onUpdateSelection"
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
const { $directus, $readItems } = useNuxtApp();
const { updateURL, getURLFilter } = useFilterURL();

const currentCategorySlug = computed(() => {
  const cats = getURLFilter("categories");
  // Gère string ou string[]
  if (Array.isArray(cats)) return cats[0];
  if (typeof cats === "string") return cats;
  return "";
});

// Récupère toutes les catégories avec leurs sous-catégories
const { data: categoriesWithSubs } = await useAsyncData(
  "categories_with_subs",
  async () => {
    const cats = await $directus.request(
      $readItems("categories_new", {
        fields: ["id", "name", "slug"],
      }),
    );

    const subs = await $directus.request(
      $readItems("sub_categories", {
        fields: ["id", "name", "slug", "categories_new"],
      }),
    );

    const subsMap = new Map<string, any[]>();
    for (const sub of subs) {
      const parentId = sub.categories_new;
      if (!subsMap.has(parentId)) subsMap.set(parentId, []);
      subsMap.get(parentId)!.push(sub);
    }

    return cats.map((cat) => ({
      ...cat,
      sub_categories: subsMap.get(cat.id) || [],
    }));
  },
  {
    getCachedData: (key) => {
      return useNuxtApp().payload.data[key] || useNuxtApp().static.data[key];
    },
  },
);

// Sous-catégories de la catégorie active
const currentSubCategories = computed(() => {
  if (!currentCategorySlug.value || !categoriesWithSubs.value) {
    return [];
  }

  const category = categoriesWithSubs.value.find(
    (c) => c.slug === currentCategorySlug.value,
  );

  return category?.sub_categories || [];
});

// Synchronisation propre avec l'URL
const selectedCategories = computed({
  get: () => {
    const fromURL = getURLFilter("sub_categories");
    if (Array.isArray(fromURL)) return fromURL;
    if (typeof fromURL === "string" && fromURL) return [fromURL];
    return [];
  },
  set: (val: string[]) => {
    updateURL("sub_categories", val);
  },
});

// Handler pour la mise à jour
const onUpdateSelection = (val: string[]) => {
  selectedCategories.value = val;
};

const numberToDisplay = ref(6);
</script>