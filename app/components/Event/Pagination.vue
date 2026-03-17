<template>
  <v-pagination
    v-if="pageCount > 1"
    v-model="currentPage"
    :length="pageCount"
    :total-visible="7"
    :disabled="isLoading"
    class="pt-5"
  />
</template>

<script lang="ts" setup>
const route = useRoute();
const router = useRouter();

// Injection des dépendances
const { filteredTotal, PER_PAGE, countPending } = inject("eventContext") as {
  filteredTotal: Ref<number>;
  PER_PAGE: number;
  countPending: Ref<boolean>;
};

// État de chargement
const isLoading = computed(() => countPending.value);

// Page courante - utiliser v-model avec setter
const currentPage = computed({
  get: () => {
    const p = parseInt(route.query.page as string);
    return isNaN(p) || p < 1 ? 1 : p;
  },
  set: (val: number) => {
    const validPage = Math.max(1, Math.min(val, pageCount.value));
    router.push({
      query: {
        ...route.query,
        page: validPage.toString(),
      },
    });
  },
});

// Nombre total de pages - REACTIVE sur la ref directe
const pageCount = computed(() => {
  const total = filteredTotal.value;
  return total ? Math.ceil(total / PER_PAGE) : 1;
});
</script>
