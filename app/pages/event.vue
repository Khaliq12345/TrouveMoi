<!-- pages/events/index.vue -->
<template>
  <v-layout class="pb-4">
    <AppBar />
    <v-main>
      <v-container class="pa-0 bg-background mx-auto" style="max-width: 1200px">
        <!-- Stats avec filtre actif -->
        <EventStats />

        <!-- Recherche -->
        <v-row class="mb-6" justify="center">
          <v-col cols="12" md="6" lg="4">
            <v-text-field
              v-model="searchQuery"
              placeholder="Rechercher..."
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              density="comfortable"
              rounded="lg"
              hide-details
              class="mt-2"
            />
          </v-col>
        </v-row>

        <div v-if="status !== 'pending'">
          <!-- Grid -->
          <v-row v-if="eventsData?.length">
            <v-col
              v-for="event in eventsData || []"
              :key="event.id"
              cols="12"
              sm="6"
              lg="4"
              xl="3"
              class="px-4"
            >
              <EventCard :event="event" />
            </v-col>
          </v-row>

          <!-- Empty -->
          <v-empty-state
            v-else
            icon="mdi-calendar-blank"
            title="Aucun événement"
            class="py-12"
          />
        </div>
        <div v-else class="py-10 d-flex justify-center">
          <v-sheet
            border
            rounded="lg"
            class="pa-4 d-flex align-center ga-4"
            max-width="400"
            color="transparent"
            :elevation="0"
          >
            <v-progress-circular
              indeterminate
              color="primary"
              size="24"
              width="3"
            ></v-progress-circular>

            <div class="d-flex flex-column">
              <span class="text-body-2 font-weight-bold"
                >Mise à jour des événements</span
              >
              <span class="text-caption text-medium-emphasis"
                >Veuillez patienter quelques instants...</span
              >
            </div>
          </v-sheet>
        </div>

        <!-- Pagination -->
        <EventPagination />
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { aggregate, readItems } from "@directus/sdk";
import type { Event } from "~/types/event";

const PER_PAGE = 10;

const { $directus } = useNuxtApp();
const route = useRoute();
const router = useRouter();

// 1. États réactifs
const searchQuery = ref("");
const activeFilter = ref<"all" | "live" | "upcoming" | "past">("all");

// OPTIMISATION 1 : Remplacer le switch par un dictionnaire (Object Mapping)
// C'est plus court à lire et tout aussi performant.
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

// On récupère tous les événements
const { data: allEventsData } = await useAsyncData<Event[]>(
  "events-all",
  () =>
    $directus.request(
      readItems("business_events", {
        sort: ["-date_created"],
        limit: -1,
        fields: ["id", "start_at", "end_at"],
      }),
    ) as Promise<Event[]>,
);

const totalEvents = computed(() => allEventsData.value?.length || 0);

// On récupère le nombre d'événements filtrés
const { data: filteredCount, status: countStatus } = await useAsyncData(
  "events-count",
  async () => {
    const filter = buildDateFilter(activeFilter.value);
    const result = (await $directus.request(
      aggregate("business_events", {
        aggregate: { count: "*" },
        query: {
          ...(filter && { filter }),
          search: searchQuery.value || undefined,
        },
      }),
    )) as any[];
    return result[0]?.count ? parseInt(result[0].count) : 0;
  },
  {
    watch: [activeFilter, searchQuery], // Se relance automatiquement au changement
    default: () => 0, // Remplace ta déclaration `ref(0)` initiale
  },
);

// Statut dérivé directement du composable Nuxt
const countPending = computed(() => countStatus.value === "pending");

// On récupère les événements paginés
const {
  data: eventsData,
  error,
  status,
} = await useAsyncData<Event[]>(
  "events",
  () => {
    const filter = buildDateFilter(activeFilter.value);
    const page = parseInt(route.query.page as string) || 1;

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

// Éviter les push inutiles dans le router, attendre que le filtre soit appliqué et réinitialiser la page à 1
watch([activeFilter, searchQuery], () => {
  if (route.query.page !== "1" && route.query.page !== undefined) {
    router.replace({ query: { ...route.query, page: "1" } });
  }
});

// 5. Partage du contexte
provide("eventContext", {
  eventsData,
  allEventsData,
  totalEvents,
  filteredTotal: filteredCount,
  activeFilter,
  PER_PAGE,
  countPending,
});

if (error.value) console.error("events error: ", error.value);
</script>
