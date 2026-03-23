import { aggregate, readItems } from "@directus/sdk";
import type { SupportTicket } from "~/types/support";

// Definition des statuts de filtre possibles
export type SupportStatusFilter = "Tous" | "En cours" | "Résolu";

export const useFetchSupportTickets = () => {
  // Initialisation des outils Nuxt pour gerer l'application et la navigation
  const { $directus } = useNuxtApp();
  const route = useRoute();
  const router = useRouter();
  
  // Constante limitant le nombre d'elements retournes par requete
  const PER_PAGE = 10;

  // Utilisation de useState pour conserver les donnees lors du rendu serveur
  const tickets = useState<SupportTicket[]>('support-tickets-list', () => []);

  // Fonction pour charger la page suivante en modifiant l'URL
  const loadMore = () => {
    // Lecture de la page courante depuis l'URL ou fallback a 1
    const currentPage = parseInt(route.query.page as string) || 1;
    router.push({ query: { ...route.query, page: (currentPage + 1).toString() } });
  };

  // Recuperation asynchrone des donnees avec execution automatique via le watcher
  const { data, status, error, refresh } = useAsyncData(
    "support-data",
    async () => {
      // Lecture synchrone des parametres depuis l'URL courante
      const currentPage = parseInt(route.query.page as string) || 1;
      const statusFilter = (route.query.status as SupportStatusFilter) || "Tous";
      const search = (route.query.search as string) || undefined;

      // Construction de l'objet de filtre pour la base de donnees
      let filter: any = undefined;
      if (statusFilter === "En cours") filter = { resolved: { _eq: false } };
      if (statusFilter === "Résolu") filter = { resolved: { _eq: true } };

      // Requetes simultanees vers Directus pour gagner en performance
      const [countRes, itemsRes] = await Promise.all([
        $directus.request(
          aggregate("supports", {
            // Demande de comptage total a Directus
            aggregate: { count: "*" },
            // CORRECTION : Les filtres et la recherche DOIVENT etre dans un objet "query" pour aggregate
            query: {
              ...(filter && { filter }),
              ...(search && { search }),
            }
          })
        ),
        $directus.request(
          readItems("supports", {
            // Tri par date pour afficher les elements les plus recents en haut
            sort: ["-date_created"],
            limit: PER_PAGE,
            page: currentPage,
            // Pour readItems, les arguments se placent directement a la racine
            ...(filter && { filter }),
            search,
            fields: ["*"],
          })
        )
      ]);

      // Typage du tableau de retour des elements
      const newItems = itemsRes as SupportTicket[];

      // Logique d'accumulation : ecrasement si nouvelle recherche, sinon ajout
      if (currentPage === 1) {
        tickets.value = newItems;
      } else {
        tickets.value.push(...newItems);
      }

      // Extraction et verification du nombre retourne par l'aggregation
      const count = Array.isArray(countRes) && countRes[0]?.count ? parseInt(countRes[0].count as string) : 0;
      
      // On retourne le compte total et la taille du dernier arrivage de donnees
      return { count, fetchedCount: newItems.length };
    },
    {
      // Relance automatique de la requete lorsque l'URL change
      watch: [
        () => route.query.page,
        () => route.query.status,
        () => route.query.search,
      ],
    }
  );

  // Affichage silencieux des erreurs dans la console
  if (error.value) console.error("Support Data Error:", error.value);

  // Propriete calculee representant le nombre total reellement filtre
  const totalCount = computed(() => data.value?.count ?? 0);

  // Verification stricte pour l'affichage de la pagination
  const hasMore = computed(() => {
    // Si la requete n'est pas encore aboutie, on masque le bouton
    if (!data.value) return false;
    
    // Si la reponse contient moins d'elements que la limite, c'est forcement la fin
    if (data.value.fetchedCount < PER_PAGE) return false;
    
    // Verification avec le vrai total filtre
    return tickets.value.length < totalCount.value;
  });

  // Retour de l'interface du composable pour les vues
  return {
    tickets,
    totalCount,
    isLoading: computed(() => status.value === "pending"),
    hasMore,
    loadMore,
    refresh,
  };
};