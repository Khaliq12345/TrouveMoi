<template>
  <header class="px-4 pt-6 pb-2">
    <div class="d-flex align-center justify-space-between flex-wrap ga-2">
      <!-- THis has the title and loader -->
      <div>
        <h1
          class="text-h6 font-weight-black d-flex align-center text-capitalize"
        >
          {{ displayTitle }}
          <v-progress-circular
            indeterminate
            size="20"
            width="2"
            color="primary"
            class="ms-3"
            v-if="pending"
          />
        </h1>

        <p class="text-caption text-grey-darken-1 mt-1">
          Trouvez les meilleurs services à
          {{ activeFilters.location || "tout lieu" }}
        </p>
      </div>
    </div>

    <div class="d-none d-md-block d-lg-none mt-4">
      <SearchMiniFilter @show-drawer="showDrawer = true" />
    </div>
  </header>
</template>

<script setup lang="ts">
interface BusinessData {
  pending: boolean;
  totalResults?: number;
}

const { pending } = inject("businesses-data") as BusinessData;
const showDrawer = inject("showDrawer");
const { getAllURLFilters } = useFilterURL();

// Get the filters from the URL
const activeFilters = computed(() => getAllURLFilters());

// 1. Logic for the Cool Dynamic Title
const displayTitle = computed(() => {
  const f = activeFilters.value;

  if (f.search) return `Résultats pour "${f.search}"`;
  if (f.sub_categories?.length) return f.sub_categories[0].replace(/-/g, " ");
  if (f.categories?.length) return f.categories[0].replace(/-/g, " ");

  return "Toutes les entreprises";
});

defineEmits<{ (e: "open-drawer"): void }>();
</script>

<style scoped>
.text-capitalize {
  text-transform: capitalize;
}
/* Softer heading */
h1 {
  letter-spacing: -0.5px !important;
  color: #2c3e50;
}
</style>
