// composables/useFilterURL.ts
export const useFilterURL = () => {
  const router = useRouter();
  const route = useRoute();

  // Mappage des clés spéciales vers leurs noms dans Directus
  const specialKeys: Record<string, string> = {
    search: "search",
    is_open: "is_open",
    phone: "phone",
  };

  const updateURL = (key: string, values: string[]) => {
    const sorted = [...values].sort();
    router.push({
      query: {
        ...route.query,
        [key]: sorted.length ? sorted.join(",") : undefined,
      },
    });
  };

  const removeFilter = (key: string, valueToRemove?: string) => {
    if (!valueToRemove) {
      // If no specific value is provided, remove the entire key from the URL
      router.push({
        query: { ...route.query, [key]: undefined },
      });
    } else {
      // Existing logic: Remove only the specific value
      const currentFilters = getURLFilter(key);
      const updatedFilters = currentFilters.filter((v) => v !== valueToRemove);
      updateURL(key, updatedFilters);
    }
  };

  const getURLFilter = (key: string): string[] => {
    return route.query[key]
      ? String(route.query[key]).split(",").filter(Boolean)
      : [];
  };

  const getAllURLFilters = (): Record<string, any> => {
    const filters: Record<string, any> = {};

    for (const [key, value] of Object.entries(route.query)) {
      if (!value) continue;

      for (const [key, value] of Object.entries(route.query)) {
        if (!value) continue;

        if (key in specialKeys) {
          // On utilise le nom mappé (ex: is_open devient status)
          // et on stocke la valeur brute en string
          filters[specialKeys[key]] = String(value);
        } else {
          // Comportement par défaut pour les listes (catégories, etc.)
          filters[key] = String(value).split(",").filter(Boolean);
        }
      }
    }

    return filters;
  };

  return { updateURL, getURLFilter, getAllURLFilters };
};
