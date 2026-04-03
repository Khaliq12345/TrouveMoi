export const useFetchReviews = async (businessId: string | undefined) => {
  const { $directus, $readItems } = useNuxtApp();

  const { data: results, error } = await useAsyncData(
    `reviews-${businessId || "all"}`,
    async () => {
      if (!businessId) return [];

      return $directus.request(
        $readItems("reviews", {
          filter: {
            businesses: {
              id: {
                _eq: businessId,
              },
            },
          },
        }),
      );
    },
    {
      getCachedData: (key) => {
        const nuxtApp = useNuxtApp();
        return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
      },
    },
  );

  if (error.value) {
    console.error("Error fetching reviews:", error.value);
  }

  return { results, error };
};
