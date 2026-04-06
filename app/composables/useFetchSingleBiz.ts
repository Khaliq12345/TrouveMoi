import type { Biz, BizLocation } from "~/types/biz";

export const useFetchSingleBiz = async (slug: string) => {
  const { $directus, $readItems } = useNuxtApp();

  const { data: businessWithSlots, error: bizerr } =
    await useAsyncData<Biz | null>(
      `business-${slug}`,
      async (): Promise<Biz | null> => {
        // 1. Récupère le business avec toutes ses relations
        const results = await $directus.request(
          $readItems("businesses", {
            filter: {
              slug: { _eq: slug },
            },
            fields: [
              "*",
              "featuredslots.featured_slots_id.*",
              "sub_categories.sub_categories_id.*",
            ],
          }),
        );

        if (!results?.length) return null;

        const business = results[0] as Biz & {
          featuredslots?: any[];
          sub_categories?: any[];
          locations?: any[]; // ou business_locations
        };

        // Transforme les featured slots
        const featuredSlots =
          business?.featuredslots?.map(
            (junction: any) => junction.featured_slots_id,
          ) || [];

        // Transforme les sub_categories
        const subCategories =
          business?.sub_categories?.map(
            (junction: any) => junction.sub_categories_id,
          ) || [];

        return {
          ...business,
          featured_slots: featuredSlots,
          subcategories: subCategories,
        };
      },
      {
        getCachedData: (key) => {
          const nuxtApp = useNuxtApp();
          return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
        },
      },
    );

  if (bizerr.value)
    console.error("While getting busineses on detail page", bizerr.value);

  return {
    businessWithSlots,
  };
};
