export const useFetchFeatures = async () => {
  const { $directus, $readItems } = useNuxtApp();

  const { data: categories, error } = await useAsyncData("categories", () => {
    return $directus.request(
      $readItems("categories_new", {
        fields: [
          "slug",
          "name",
          "description",
          {
            features: [
              {
                featured_slots_id: ["slug", "feature"],
              },
            ],
          },
        ],
      }),
    );
  });

  if (error.value) {
    console.error("AsyncData Features Error details:", error.value);
  }

  // Updated filter logic:
  const getFeatures = (catSlug: string) => {
    if (!categories.value) return [];

    // 1. Find the specific category object that matches the slug
    const category = categories.value.find((c) => c.slug === catSlug);

    // 2. If not found, return empty
    if (!category || !category.features) return [];

    // 3. Map through the junction items to return the feature data
    return category.features.map((junction) => ({
      name: junction.featured_slots_id.feature,
      slug: junction.featured_slots_id.slug,
    }));
  };

  return { getFeatures };
};
