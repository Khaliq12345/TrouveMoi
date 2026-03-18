<template>
  <v-layout class="pb-4">
    <AppBar />
    <v-main>
      <v-container class="pa-0 bg-background mx-auto" style="max-width: 1200px">
        <EventStats />

        <v-row class="mb-6" justify="center">
          <v-col cols="12" md="6" lg="4">
            <v-text-field v-model="searchQuery" placeholder="Rechercher..." prepend-inner-icon="mdi-magnify"
              variant="outlined" density="comfortable" rounded="lg" hide-details class="mt-2" />
          </v-col>
        </v-row>

        <div v-if="status !== 'pending'">
          <v-row v-if="eventsData?.length">
            <v-col v-for="event in eventsData || []" :key="event.id" cols="12" sm="6" lg="4" xl="3" class="px-4">
              <EventCard :event="event" />
            </v-col>
          </v-row>

          <v-empty-state v-else icon="mdi-calendar-blank" title="Aucun événement" class="py-12" />
        </div>
        <div v-else class="py-10 d-flex justify-center">
          <v-sheet border rounded="lg" class="pa-4 d-flex align-center ga-4" max-width="400" color="transparent"
            :elevation="0">
            <v-progress-circular indeterminate color="primary" size="24" width="3"></v-progress-circular>

            <div class="d-flex flex-column">
              <span class="text-body-2 font-weight-bold">Mise à jour des événements</span>
              <span class="text-caption text-medium-emphasis">Veuillez patienter quelques instants...</span>
            </div>
          </v-sheet>
        </div>

        <EventPagination />
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { aggregate, readItems } from "@directus/sdk";
import type { Event } from "~/types/event";

// Déclaration de la constante de pagination
const PER_PAGE = 10;

// Utilisation du contexte Nuxt et Vue Router
const { $directus } = useNuxtApp();
const route = useRoute();
const router = useRouter();

// États réactifs de l'interface
const searchQuery = ref("");
const activeFilter = ref<"all" | "live" | "upcoming" | "past">("all");

// Fonction pour récupérer le filtre Directus selon le statut sélectionné
// On utilise une approche dictionnaire pour améliorer la lisibilité
const buildDateFilter = (filter: typeof activeFilter.value) => {
  const filters = {
    live: {
      _and: [{ start_at: { _lte: "$NOW" } }, { end_at: { _gte: "$NOW" } }],
    },
    upcoming: { start_at: { _gt: "$NOW" } },
    past: { end_at: { _lt: "$NOW" } },
    all: undefined,
  };
  return filters[filter];
};

// -------------------------------------------------------------------------------------------------
// APPEL 1 : AGRÉGATION (Compter le nombre d'éléments pour chaque catégorie)
// -------------------------------------------------------------------------------------------------
// On utilise Promise.all pour exécuter les 4 requêtes d'agrégation simultanément, de façon très rapide.
// Cela nous donne les totaux pour mettre à jour les statistiques dans le composant `EventStats`
const { data: countsData, status: countStatus } = await useAsyncData(
  "events-counts",
  async () => {
    // Fonction utilitaire interne pour exécuter un comptage spécifique sur Directus
    const fetchCount = async (categoryFilter: any) => {
      const result = (await $directus.request(
        aggregate("business_events", {
          aggregate: { count: "*" },
          query: {
            ...(categoryFilter && { filter: categoryFilter }),
            search: searchQuery.value || undefined,
          },
        }),
      )) as any[];
      return result[0]?.count ? parseInt(result[0].count, 10) : 0;
    };

    // On lance en parallèle les appels pour le compte global et chaque catégorie
    const [all, live, upcoming, past] = await Promise.all([
      fetchCount(buildDateFilter("all")),
      fetchCount(buildDateFilter("live")),
      fetchCount(buildDateFilter("upcoming")),
      fetchCount(buildDateFilter("past")),
    ]);

    // Retourne un objet structuré avec chaque compteur
    return { all, live, upcoming, past };
  },
  {
    // On observe la recherche textuelle car elle impacte l'ensemble des compteurs de statistiques
    watch: [searchQuery],
    default: () => ({ all: 0, live: 0, upcoming: 0, past: 0 }),
  },
);

// Calcul du statut de chargement pour les indicateurs visuels
const countPending = computed(() => countStatus.value === "pending");

// Calcul dynamique du total filtré (utilisé par la pagination) selon le filtre courant
const filteredTotal = computed(() => {
  if (!countsData.value) return 0;
  return countsData.value[activeFilter.value] || 0;
});

// -------------------------------------------------------------------------------------------------
// APPEL 2 : RÉCUPÉRATION DES DONNÉES (Pour la grille d'événements)
// -------------------------------------------------------------------------------------------------
// Appel qui ne récupère QUE les données de l'onglet actif, limitées par la pagination
const {
  data: eventsData,
  error,
  status,
} = await useAsyncData<Event[]>(
  "events",
  () => {
    const filter = buildDateFilter(activeFilter.value);
    const page = parseInt(route.query.page as string) || 1;

    // Requête Directus limitant aux colonnes strictement nécessaires
    return $directus.request(
      readItems("business_events", {
        sort: ["-date_created"],
        limit: PER_PAGE,
        page,
        ...(filter && { filter }),
        search: searchQuery.value || undefined,
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
    ) as Promise<Event[]>;
  },
  { watch: [() => route.query.page, activeFilter, searchQuery] },
);

// Réinitialisation de la pagination lors du changement de filtre ou de recherche
// On évite d'ajouter des historiques inutiles dans le navigateur avec `replace`
watch([activeFilter, searchQuery], () => {
  if (route.query.page !== "1" && route.query.page !== undefined) {
    router.replace({ query: { ...route.query, page: "1" } });
  }
});

// Partage du contexte aux composants enfants
// On fournit `countsData` pour le composant des statistiques, et `filteredTotal` pour la pagination
provide("eventContext", {
  eventsData,
  countsData,
  filteredTotal,
  activeFilter,
  PER_PAGE,
  countPending,
});

// Gestion d'erreur (affichée en console)
if (error.value) console.error("Erreur lors de la récupération des événements: ", error.value);
</script>