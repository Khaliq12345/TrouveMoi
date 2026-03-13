<template>
  <div class="d-flex ga-2">
    <v-menu
      v-for="category in importantCategories"
      :key="category.id"
      open-on-hover
      location="bottom"
      :close-delay="100"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          variant="text"
          class="text-none font-weight-medium"
          :color="isActiveCategory(category.slug) ? 'primary' : undefined"
        >
          {{ category.name }}
          <v-icon end>mdi-chevron-down</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="sub in getSubsByCategoryId(category.id)"
          :key="sub.id"
          :title="sub.name"
          :active="isActiveSub(sub.slug)"
          @click="selectCategoriesAndSub(category.slug, sub.slug)"
        />
      </v-list>
    </v-menu>

    <v-menu
      v-if="otherCategories.length"
      open-on-hover
      location="bottom"
      :close-delay="100"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          variant="text"
          class="text-none font-weight-medium"
          :color="isActiveFromPlus ? 'primary' : undefined"
        >
          Plus
          <v-icon end>mdi-chevron-down</v-icon>
        </v-btn>
      </template>

      <v-list>
        <template v-for="cat in otherCategories" :key="cat.id">
          <v-list-subheader>{{ cat.name }}</v-list-subheader>
          <v-list-item
            v-for="sub in getSubsByCategoryId(cat.id)"
            :key="sub.id"
            :title="sub.name"
            :active="isActiveSub(sub.slug)"
            @click="selectCategoriesAndSub(cat.slug, sub.slug)"
          >
            <template v-slot:append v-if="isActiveSub(sub.slug)">
              <v-icon color="primary">mdi-check</v-icon>
            </template>
          </v-list-item>
          <v-divider class="my-2" />
        </template>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const { $directus, $readItems } = useNuxtApp();
const { updateURL, getURLFilter } = useFilterURL();

// Valeurs actuelles depuis l'URL
const currentCategories = computed(() => {
  const cat = getURLFilter("categories");
  return Array.isArray(cat) ? cat : cat ? [cat] : [];
});

const currentSubCategories = computed(() => {
  const sub = getURLFilter("sub_categories");
  return Array.isArray(sub) ? sub : sub ? [sub] : [];
});

// Récupère les catégories
const { data: categories } = await useAsyncData(
  "categories",
  () => {
    return $directus.request(
      $readItems("categories_new", {
        fields: ["id", "name", "slug", "important"],
      }),
    );
  },
  {
    getCachedData: (key) => {
      return useNuxtApp().payload.data[key] || useNuxtApp().static.data[key];
    },
  },
);

// Récupère les sous-catégories
const { data: sub_categories } = await useAsyncData(
  "sub_categories",
  () => {
    return $directus.request($readItems("sub_categories"));
  },
  {
    getCachedData: (key) => {
      return useNuxtApp().payload.data[key] || useNuxtApp().static.data[key];
    },
  },
);

// Sous-catégories d'une catégorie
const getSubsByCategoryId = (categoryId: string) => {
  if (!sub_categories.value) return [];
  return sub_categories.value.filter(
    (sub) => sub.categories_new === categoryId,
  );
};

// Vérifie si actif
const isActiveCategory = (slug: string): boolean => {
  return currentCategories.value.includes(slug);
};

const isActiveSub = (slug: string): boolean => {
  return currentSubCategories.value.includes(slug);
};

const selectCategoriesAndSub = (catSlug: string, subSlug: string) => {
  // Déjà sélectionné ? On nettoie l'URL
  if (isActiveSub(subSlug)) {
    const query = { ...route.query };
    delete query.categories;
    delete query.sub_categories;
    router.push({ query });
    return;
  }

  // On prépare la nouvelle query avec les deux valeurs
  const newQuery = {
    ...route.query,
    categories: catSlug,
    sub_categories: subSlug,
  };

  // Une seule navigation pour mettre à jour les deux clés d'un coup
  router.push({ query: newQuery });
};
// Catégories importantes
const importantCategories = computed(() => {
  if (!categories.value) return [];
  return categories.value.filter((c) => c.important === true);
});

// Autres catégories
const otherCategories = computed(() => {
  if (!categories.value) return [];
  return categories.value.filter((c) => c.important !== true);
});

// Vérifie si "Plus" est actif
const isActiveFromPlus = computed(() => {
  if (!otherCategories.value.length) return false;
  for (const cat of otherCategories.value) {
    const subs = getSubsByCategoryId(cat.id);
    if (subs.some((sub) => isActiveSub(sub.slug))) return true;
  }
  return false;
});
</script>
