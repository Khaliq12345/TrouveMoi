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
          @click="selectCategoryAndSub(category.slug, sub.slug)"
        >
        </v-list-item>
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
const { getURLFilter } = useFilterURL();

// État et constantes
const categories = ref<any[]>([]);
const sub_categories = ref<any[]>([]);
const CAT_KEY = "categories";
const SUB_KEY = "sub_categories";

// Getters simplifiés
const getVal = (key: string) => {
  const val = getURLFilter(key);
  return Array.isArray(val) ? val[0] : val;
};

const currentCategory = computed(() => getVal(CAT_KEY));
const currentSubCategory = computed(() => getVal(SUB_KEY));

const getSubsByCategoryId = (id: string) =>
  sub_categories.value.filter((s) => s.categories_new === id);
const isActiveCategory = (slug: string) => currentCategory.value === slug;
const isActiveSub = (slug: string) => currentSubCategory.value === slug;

// Navigation
const selectCategoryAndSub = (catSlug: string, subSlug: string) => {
  const query = { ...route.query };

  if (isActiveSub(subSlug) && isActiveCategory(catSlug)) {
    delete query[CAT_KEY];
    delete query[SUB_KEY];
  } else {
    Object.assign(query, { [CAT_KEY]: catSlug, [SUB_KEY]: subSlug });
  }
  router.push({ query });
};

// Computed filtrés
const importantCategories = computed(() =>
  categories.value.filter((c) => c.important),
);
const otherCategories = computed(() =>
  categories.value.filter((c) => !c.important),
);

const isActiveFromPlus = computed(() =>
  otherCategories.value.some((cat) =>
    getSubsByCategoryId(cat.id).some((s) => isActiveSub(s.slug)),
  ),
);

onMounted(async () => {
  try {
    // Exécution parallèle des appels pour gagner en vitesse
    const [catData, subData] = await Promise.all([
      $fetch("/api/directus/categories_new", {
        method: "POST",
        body: { fields: ["id", "name", "slug", "important"] },
      }),
      $fetch("/api/directus/sub_categories", {
        method: "POST",
        body: { fields: ["id", "name", "slug", "categories_new"] },
      }),
    ]);
    categories.value = catData;
    sub_categories.value = subData;
  } catch (e) {
    console.error("Erreur chargement menus:", e);
  }
});
</script>
