export const useFetchBiz = async () => {
  const { $directus, $readItems } = useNuxtApp();
  const { getAllURLFilters } = useFilterURL();

  // State
  const page = ref(1);
  const limit = ref(3);
  const hasMore = ref(true); // To track if we should stop fetching
  const filterKey = computed(() => {
    const toFilter = JSON.stringify(getAllURLFilters());
    return toFilter;
  });

  const { data, error, pending, refresh } = await useAsyncData(
    "saple",
    async () => {
      const { query } = useBuildFilters();
      // 1. Fetch main data
      const response = await $directus.request(
        $readItems("businesses", {
          fields: [
            "id",
            "name",
            "description",
            "phone",
            "slug",
            "rating",
            "price_range",
            "website",
            "reviews_count",
            "categories.categories_new_id.name",
            "featuredslots.featured_slots_id.feature",
            "is_open",
            "locations",
            "audio_direction",
            "text_directions",
          ],
          filter: query.filter,
          search: query.search,
          limit: limit.value,
          page: page.value,
        }),
      );

      if (!response || response.length === 0) {
        hasMore.value = false;
        return [];
      }

      if (response.length < limit.value) {
        hasMore.value = false;
      }

      return response;
    },
    {
      watch: [page],
    },
  );

  const businesses = ref<any[]>(data.value ?? []);

  // 2. Watch when the filter changes and only reset the value
  watch(filterKey, () => {
    businesses.value = [];
    hasMore.value = true;
    if (page.value === 1) {
      refresh(); // Manually trigger if we are already on page 1
    } else {
      page.value = 1;
    }
  });

  // After every refresh, append new page to businesses
  watch(data, (newData) => {
    if (page.value === 1) {
      businesses.value = newData ?? [];
    } else {
      businesses.value.push(...(newData ?? []));
    }
  });

  return {
    businesses,
    page,
    limit,
    hasMore,
    error,
    pending,
    refresh,
  };
};
