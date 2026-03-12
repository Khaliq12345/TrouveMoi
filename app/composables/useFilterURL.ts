// composables/useFilterURL.ts
export const useFilterURL = () => {
  const router = useRouter();
  const route = useRoute();

  const updateURL = (key: string, values: string[]) => {
    const sorted = [...values].sort();
    router.push({
      query: {
        ...route.query,
        [key]: sorted.length ? sorted.join(",") : undefined,
      },
    });
  };

  const getURLFilter = (key: string): string[] => {
    return route.query[key]
      ? String(route.query[key]).split(",").filter(Boolean)
      : [];
  };

  return { updateURL, getURLFilter };
};
