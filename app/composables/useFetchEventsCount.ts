import { aggregate } from "@directus/sdk";
import type { activeFilter } from "~/types/event";

export const useFetchEventsCount = async () => {
  const { $directus } = useNuxtApp();
  const route = useRoute();

  // Appel d'API pour le compteur unique basé sur les paramètres actuels
  const {
    data: filteredCount,
    status: countStatus,
    error: errorCount,
  } = await useAsyncData(
    "events-count",
    async () => {
      const status = route.query.status;
      const filter = buildDateFilter(
        status as typeof activeFilter.value | undefined,
      );
      const search = route.query.search;
      const result = (await $directus.request(
        aggregate("business_events", {
          aggregate: { count: "*" },
          query: {
            ...(filter && { filter }),
            search: search as string | undefined,
          },
        }),
      )) as any[];
      return result[0]?.count ? parseInt(result[0].count, 10) : 0;
    },
    {
      watch: [() => route.query],
      default: () => 0,
    },
  );
  // Log error if any
  if (errorCount.value) {
    console.error("Error fetching filtered count:", errorCount.value);
  }

  // État calculé pour le chargement du compteur
  const countPending = computed(() => countStatus.value === "pending");

  return {
    countPending,
    filteredCount,
  };
};
