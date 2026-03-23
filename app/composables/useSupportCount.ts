import { aggregate } from "@directus/sdk";
import { getSupportFilters } from "#imports";

export const useSupportCount = () => {
  const { $directus } = useNuxtApp();
  const route = useRoute();

  const { data, status, error } = useAsyncData(
    "support-count",
    async () => {
      const { filter, search } = getSupportFilters(route);

      const countRes = await $directus.request(
        aggregate("supports", {
          aggregate: { count: "*" },
          query: {
            ...(filter && { filter }),
            ...(search && { search }),
          }
        })
      );

      // Extraction et conversion securisee du resultat en nombre entier
      return Array.isArray(countRes) && countRes[0]?.count ? parseInt(countRes[0].count as string) : 0;
    },
    {
      // Ce watcher ignore volontairement les changements de page (route.query.page)
      // Il ne relance le comptage que si les criteres de recherche changent
      watch: [
        () => route.query.status,
        () => route.query.search,
      ],
    }
  );

  // Trace d'erreur dans la console si la requete echoue
  if (error.value) console.error("Erreur useSupportCount :", error.value);

  // Retourne le total et l'etat de chargement sous forme de proprietes reactives
  return {
    totalCount: computed(() => data.value ?? 0),
    isLoadingCount: computed(() => status.value === "pending")
  };
};