import { readItems } from "@directus/sdk";
import type { SupportTicket } from "~/types/support";
import type { Ref } from "vue";
import { getSupportFilters } from "#imports";

export const useSupportTickets = (totalCount: Ref<number>) => {
  const { $directus } = useNuxtApp();
  const route = useRoute();
  const router = useRouter();

  const PER_PAGE = 10;

  const tickets = useState<SupportTicket[]>("support-tickets-list", () => []);

  const loadMore = () => {
    const currentPage = parseInt(route.query.page as string) || 1;
    router.push({
      query: { ...route.query, page: (currentPage + 1).toString() },
    });
  };

  const { data, status, error, refresh } = useAsyncData(
    "support-items",
    async () => {
      const currentPage = parseInt(route.query.page as string) || 1;
      const { filter, search } = getSupportFilters(route);

      const itemsRes = await $directus.request(
        readItems("supports", {
          sort: ["-date_created"],
          limit: PER_PAGE,
          page: currentPage,
          ...(filter && { filter }),
          search,
          fields: ["*", "images.directus_files_id"],
        }),
      );

      const newItems = (itemsRes as any[]).map((ticket) => ({
        ...ticket,
        images: (ticket.images ?? []).map(
          (img: { directus_files_id: string }) => img.directus_files_id,
        ),
      })) as SupportTicket[];

      if (currentPage === 1) {
        tickets.value = newItems;
      } else {
        tickets.value.push(...newItems);
      }

      return { fetchedCount: newItems.length };
    },
    {
      watch: [
        () => route.query.page,
        () => route.query.status,
        () => route.query.search,
      ],
    },
  );

  if (error.value) console.error("Erreur useSupportTickets :", error.value);

  const hasMore = computed(() => {
    if (!data.value) return false;
    if (data.value.fetchedCount < PER_PAGE) return false;
    return tickets.value.length < totalCount.value;
  });

  return {
    tickets,
    isLoadingTickets: computed(() => status.value === "pending"),
    hasMore,
    loadMore,
    refresh,
  };
};
