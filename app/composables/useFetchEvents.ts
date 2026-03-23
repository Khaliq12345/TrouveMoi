import { readItems } from "@directus/sdk"; // Changed from readItem
// Import your type specifically, don't use typeof activeFilter.value here
import type { StatStatus } from "~/types/event";

export const useFetchEvents = async () => {
  const { $directus } = useNuxtApp();
  const route = useRoute();
  const PER_PAGE = 10;

  const {
    data: eventsData,
    error,
    status,
  } = await useAsyncData(
    "events",
    () => {
      const page = parseInt(route.query.page as string) || 1;
      const eventStatus = route.query.status as StatStatus | undefined;
      const search = route.query.search as string | undefined;

      // Use your helper to build the filter object
      const dateFilter = buildDateFilter(eventStatus);

      return $directus.request(
        readItems("business_events", {
          // Plural
          sort: ["-date_created"],
          limit: PER_PAGE,
          page,
          // Merge your date filter into the filter object
          filter: dateFilter || {},
          search: search || undefined,
          fields: [
            "id",
            "title",
            "description",
            "start_at",
            "end_at",
            "image",
            "link",
            "date_created",
          ],
        }),
      );
    },
    {
      // Watch specifically for the query params you care about
      watch: [
        () => route.query.page,
        () => route.query.status,
        () => route.query.search,
      ],
    },
  );

  if (error.value) console.error("events error: ", error.value);

  return {
    eventsData,
    PER_PAGE,
    status,
  };
};
