export const useFetchSubCategory = async () => {
  // Récupère les sous-catégories
  const { $directus, $readItems } = useNuxtApp();
  const { data: sub_categories, error } = await useAsyncData(
    "sub_categories",
    () => {
      return $directus.request(
        $readItems("sub_categories", {
          fields: ["name", "slug", { categories_new: ["name", "slug"] }],
        }),
      );
    },
    {
      getCachedData: (key) => {
        return useNuxtApp().payload.data[key] || useNuxtApp().static.data[key];
      },
    },
  );

  if (error.value) {
    console.error("AsyncData Subcategory Error details:", error.value);
  }

  // Extract subcategory from category slug
  const getSubcategories = (catSlug: string) => {
    if (!sub_categories.value) return [];

    return sub_categories.value
      .filter((sub) => sub.categories_new?.slug === catSlug)
      .map((sub) => ({ name: sub.name, slug: sub.slug }));
  };

  return { getSubcategories };
};
