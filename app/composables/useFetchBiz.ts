export const useFetchBiz = async () => {
  const { $directus, $readItems } = useNuxtApp();
  const route = useRoute();
  const { getAllURLFilters } = useFilterURL();

  // State
  const page = ref(1);
  const limit = ref(5);
  const hasMore = ref(true); // To track if we should stop fetching

  const { data, error, pending, refresh } = await useAsyncData(
    "businesses",
    async () => {
      console.log("PAGINATION ", page.value, limit.value);
      const filters = getAllURLFilters();
      let query: any = { filter: {}, search: undefined };

      // Build filters
      for (const [key, value] of Object.entries(filters)) {
        if (!value) continue;
        if (key === "search") {
          query.search = value;
        } else if (key === "featured_slots") {
          query.filter.featuredslots = {
            featured_slots_id: {
              slug: Array.isArray(value) ? { _in: value } : { _eq: value },
            },
          };
        } else if (key === "sub_categories") {
          query.filter.sub_categories = {
            sub_categories_id: {
              slug: Array.isArray(value) ? { _in: value } : { _eq: value },
            },
          };
        } else if (key === "categories") {
          query.filter.categories = {
            categories_new_id: {
              slug: Array.isArray(value) ? { _in: value } : { _eq: value },
            },
          };
        } else if (key === "price_range") {
          query.filter.price_range = {
            _in: Array.isArray(value) ? value : [value],
          };
        } else if (key === "is_open") {
          query.filter.is_open = { _eq: value === "open" };
        }
      }

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
          ],
          filter: query.filter,
          search: query.search,
          limit: limit.value,
          page: page.value,
        }),
      );
      console.log("BIZs", response);

      if (!response || response.length === 0) {
        hasMore.value = false;
        return [];
      }

      // 2. Fetch Locations
      const businessIds = response.map((b: any) => b.id);
      const locations = await $directus.request(
        $readItems("business_locations", {
          filter: { bussness: { _in: businessIds } },
          fields: ["id", "city", "bussness"],
        }),
      );

      // 3. Merge
      const finalData = response.map((business: any) => ({
        ...business,
        locations: locations.filter((loc: any) => loc.bussness === business.id),
      }));

      if (response.length < limit.value) {
        hasMore.value = false;
      }

      return finalData;
    },
  );

  const businesses = ref<any[]>(data.value ?? []);

  // Watch for query changes to reset pagination
  watch(
    () => route.query,
    () => {
      console.log("filter changed");
      page.value = 1;
      hasMore.value = true;
      businesses.value = [];
    },
    { deep: true },
  );

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
