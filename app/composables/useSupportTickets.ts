import { readItems } from "@directus/sdk";
import type { SupportTicket } from "~/types/support";
import type { Ref } from "vue";
import { getSupportFilters } from "#imports";

export const useSupportTickets = (totalCount: Ref<number>) => {
  const { $directus } = useNuxtApp();
  const route = useRoute();
  const router = useRouter();

  // Definition stricte de la limite d'elements par requete
  const PER_PAGE = 10;
  
  // Utilisation de useState pour conserver la liste lors du rendu serveur (SSR) et eviter le clignotement
  const tickets = useState<SupportTicket[]>('support-tickets-list', () => []);

  // Fonction declenchee par l'utilisateur pour charger les elements suivants via l'URL
  const loadMore = () => {
    const currentPage = parseInt(route.query.page as string) || 1;
    router.push({ query: { ...route.query, page: (currentPage + 1).toString() } });
  };

  // Lancement de la requete asynchrone principale pour recuperer la liste
  const { data, status, error, refresh } = useAsyncData(
    "support-items",
    async () => {
      // Lecture de la page courante et extraction des filtres via l'utilitaire
      const currentPage = parseInt(route.query.page as string) || 1;
      const { filter, search } = getSupportFilters(route);

      // Execution de la requete de lecture via le SDK Directus
      const itemsRes = await $directus.request(
        readItems("supports", {
          // Tri descendant par date de creation
          sort: ["-date_created"],
          limit: PER_PAGE,
          page: currentPage,
          // Les filtres sont appliques a la racine de l'objet pour readItems
          ...(filter && { filter }),
          search,
          fields: ["*"],
        })
      );

      // Typage explicite des nouvelles donnees recues
      const newItems = itemsRes as SupportTicket[];

      // Accumulation des donnees : ecrasement en page 1, concatenation sinon
      if (currentPage === 1) {
        tickets.value = newItems;
      } else {
        tickets.value.push(...newItems);
      }

      // Retourne uniquement la quantite d'elements recuperee dans ce lot
      return { fetchedCount: newItems.length };
    },
    {
      // Ce watcher surveille absolument tous les parametres URL pertinents
      watch: [
        () => route.query.page,
        () => route.query.status,
        () => route.query.search,
      ],
    }
  );

  if (error.value) console.error("Erreur useSupportTickets :", error.value);

  const hasMore = computed(() => {
    if (!data.value) return false;
    
    if (data.value.fetchedCount < PER_PAGE) return false;
    
    return tickets.value.length < totalCount.value;
  });

  // Retourne l'interface complete pour la gestion de la liste
  return {
    tickets,
    isLoadingTickets: computed(() => status.value === "pending"),
    hasMore,
    loadMore,
    refresh
  };
};