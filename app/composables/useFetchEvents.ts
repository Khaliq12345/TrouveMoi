// Importation de readItems depuis le SDK de Directus
import { readItems } from "@directus/sdk";
// Importation de votre type spécifique, sans utiliser typeof
import type { StatStatus } from "~/types/event";

// Composable pour récupérer les événements commerciaux
export const useFetchEvents = async () => {
  // Récupération de l'instance Directus injectée par le plugin Nuxt
  const { $directus } = useNuxtApp();
  // Utilisation de useRoute pour accéder aux paramètres d'URL actifs
  const route = useRoute();
  // Constante pour définir le nombre d'éléments par page
  const PER_PAGE = 10;

  // Utilisation de useAsyncData pour effectuer la requête asynchrone côté serveur/client
  const {
    data: eventsData,
    error,
    status,
  } = await useAsyncData(
    "events",
    () => {
      // Extraction de la page courante depuis l'URL, par défaut à 1
      const page = parseInt(route.query.page as string) || 1;
      // Extraction du statut de l'événement depuis l'URL
      const eventStatus = route.query.status as StatStatus | undefined;
      // Extraction de la chaîne de recherche depuis l'URL
      const search = route.query.search as string | undefined;

      // Utilisation de votre fonction utilitaire pour construire le filtre de date
      const dateFilter = buildDateFilter(eventStatus);

      // Exécution de la requête Directus vers la collection "business_events"
      return $directus.request(
        readItems("business_events", {
          // Tri par date de création, du plus récent au plus ancien
          sort: ["-date_created"],
          // Limitation du nombre de résultats pour la pagination
          limit: PER_PAGE,
          // Numéro de la page à récupérer
          page,
          // Fusion du filtre de date dans la requête, avec un objet vide par défaut
          filter: dateFilter || {},
          // Application de la recherche textuelle si le paramètre existe
          search: search || undefined,
          // Définition stricte des champs à retourner par l'API
          fields: [
            "id",
            "title",
            "description",
            "start_at",
            "end_at",
            "image",
            // AJOUT: Le champ media que vous venez de créer dans le modèle de données
            "media", 
            "link",
            "date_created",
          ],
        }),
      );
    },
    {
      // Relance automatique de la requête si l'un de ces paramètres d'URL change
      watch: [
        () => route.query.page,
        () => route.query.status,
        () => route.query.search,
      ],
    },
  );

  // Enregistrement de l'erreur dans la console si la requête échoue
  if (error.value) console.error("events error: ", error.value);

  // Retourne les données formatées et le statut pour l'interface utilisateur
  return {
    eventsData,
    PER_PAGE,
    status,
  };
};