// Fonction utilitaire pour extraire et formater les filtres depuis l'URL
import type { RouteLocationNormalizedLoaded } from "vue-router";

export const getSupportFilters = (route: RouteLocationNormalizedLoaded) => {
  // Lecture du statut depuis l'URL avec fallback sur 'Tous' par defaut
  const statusFilter = (route.query.status as string) || "Tous";
  
  // Lecture de la recherche textuelle depuis l'URL
  const search = (route.query.search as string) || undefined;

  // Initialisation du filtre de base
  let filter: any = undefined;
  
  // Application de la logique de filtrage specifique a Directus
  if (statusFilter === "En cours") filter = { resolved: { _eq: false } };
  if (statusFilter === "Résolu") filter = { resolved: { _eq: true } };

  // Retourne un objet propre pret a etre consomme par les requetes API
  return { filter, search };
};