<template>
  <v-pagination
    v-if="pageCount > 1"
    :model-value="currentPage"
    :length="pageCount"
    :total-visible="7"
    class="pt-5"
    @update:model-value="goToPage"
  />
</template>
<script lang="ts" setup>
const route = useRoute();
const router = useRouter();

// Injection des dépendances
const { filteredTotal, PER_PAGE } = inject("eventContext") as {
  filteredTotal: ComputedRef<number>;
  PER_PAGE: number;
};

// Logique de pagination exclusive au composant
const currentPage = computed(() => {
  const p = parseInt(route.query.page as string);
  return isNaN(p) || p < 1 ? 1 : p;
});

const pageCount = computed(() => {
  const total = filteredTotal.value;
  return total ? Math.ceil(total / PER_PAGE) : 1;
});

const goToPage = (targetPage: number) => {
  const validPage = Math.max(1, Math.min(targetPage, pageCount.value));
  router.push({ 
    query: { 
      ...route.query, 
      page: validPage.toString() 
    } 
  });
};
</script>
