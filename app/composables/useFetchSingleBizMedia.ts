import type { BizMedia } from "~/types/biz";

export const useFetchSingleMedia = async (biz: Ref<any>) => {
  const { $directus, $readItems } = useNuxtApp();
  const { data: businessMedia, error } = await useAsyncData<BizMedia[]>(
    `media-${biz.value?.id}`,
    async (): Promise<BizMedia[]> => {
      if (!biz.value?.id) return [];

      const results = await $directus.request(
        $readItems("buisness_media", {
          filter: {
            extra_id: {
              _eq: biz.value.id,
            },
          },
        }),
      );
      return results as BizMedia[];
    },
    {
      getCachedData: (key) => {
        const nuxtApp = useNuxtApp();
        return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
      },
    },
  );

  if (error.value) {
    console.error("Error Fetching Biz Media", error.value);
  }

  return {
    businessMedia,
  };
};
