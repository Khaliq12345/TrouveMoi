export const useBuildFilters = () => {
  const { getAllURLFilters } = useFilterURL();
  const filters = getAllURLFilters();
  let query: any = { filter: {}, search: undefined };

  // Build filters
  for (const [key, value] of Object.entries(filters)) {
    if (!value) continue;
    if (key === "search") {
      query.search = value;
    } else if (key === "location") {
      query.filter.locations = {
        _contains: value[0],
      };
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
    } else if (key === "rating") {
      query.filter.rating = {
        _gte: value[0],
      };
    } else if (key === "is_open") {
      query.filter.is_open = { _eq: value === "open" };
    }
  }

  return {
    query,
  };
};
