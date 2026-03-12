<template>
  <div class="d-flex ga-2">
    <!-- Catégories importantes -->
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
          @click="selectCategoryAndSub(category.slug, sub.slug)"
        >
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- Menu "Plus" -->
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
            @click="selectCategoryAndSub(cat.slug, sub.slug)"
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

// Récupère les valeurs actuelles depuis l'URL
const currentCategory = computed(() => {
  const cat = getURLFilter("category");
  return Array.isArray(cat) ? cat[0] : cat;
});

const currentSubCategory = computed(() => {
  const sub = getURLFilter("sub_category");
  return Array.isArray(sub) ? sub[0] : sub;
});

// Récupère les catégories (collection séparée)
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

// Récupère les sous-catégories (collection séparée)
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

// Récupère les sous-catégories d'une catégorie par son ID
const getSubsByCategoryId = (categoryId: string) => {
  if (!sub_categories.value) return [];
  return sub_categories.value.filter(
    (sub) => sub.categories_new === categoryId,
  );
};

// Vérifie si une catégorie est active
const isActiveCategory = (slug: string): boolean => {
  return currentCategory.value === slug;
};

// Vérifie si une sous-catégorie est active
const isActiveSub = (slug: string): boolean => {
  return currentSubCategory.value === slug;
};

// Sélectionne catégorie + sous-catégorie (remplace les deux)
const selectCategoryAndSub = (catSlug: string, subSlug: string) => {
  // Toggle: si déjà sélectionnée, on désélectionne
  if (isActiveSub(subSlug) && isActiveCategory(catSlug)) {
    updateURL("category", []);
    updateURL("sub_category", []);
    return;
  }

  // Mise à jour combinée
  const newQuery: Record<string, string[]> = {
    category: [catSlug],
    sub_category: [subSlug],
  };

  // Merge avec les autres query existantes
  const mergedQuery = {
    ...route.query,
    ...Object.fromEntries(
      Object.entries(newQuery).map(([k, v]) => [k, v.join(",")]),
    ),
  };

  router.push({ query: mergedQuery });
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

// Vérifie si une sous-catégorie du menu "Plus" est active
const isActiveFromPlus = computed(() => {
  if (!otherCategories.value.length || !sub_categories.value) return false;

  for (const cat of otherCategories.value) {
    const subs = getSubsByCategoryId(cat.id);
    if (subs.some((sub) => isActiveSub(sub.slug))) {
      return true;
    }
  }
  return false;
});
</script>
