<!-- pages/events/index.vue -->
<template>
  <v-layout>
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
        <div v-else class="py-10 text-center">Chargement...</div>

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

// État
const searchQuery = ref("");
const activeFilter = ref<"all" | "live" | "upcoming" | "past">("all");

// Construction du filtre Directus selon le statut
const buildDateFilter = (filter: typeof activeFilter.value) => {
  switch (filter) {
    case "live":
      return {
        _and: [{ start_at: { _lte: "$NOW" } }, { end_at: { _gte: "$NOW" } }],
      };
    case "upcoming":
      return { start_at: { _gt: "$NOW" } };
    case "past":
      return { end_at: { _lt: "$NOW" } };
    case "all":
    default:
      return undefined;
  }
};

// 1. Count total (sans filtre de date pour avoir le vrai total)
const { data: countData } = await useAsyncData("events-count", () =>
  $directus.request(
    aggregate("business_events", { aggregate: { count: "*" } }),
  ),
);

// Count filtré pour la pagination
const { data: filteredCountData } = await useAsyncData(
  "events-filtered-count",
  () => {
    const filter = buildDateFilter(activeFilter.value);
    return $directus.request(
      aggregate("business_events", {
        aggregate: { count: "*" },
        ...(filter && { filter }),
        search: searchQuery.value || undefined,
      }),
    );
  },
  { watch: [activeFilter, searchQuery] },
);

// 2. Récupération des events
const {
  data: eventsData,
  error,
  status,
} = await useAsyncData<Event[]>(
  "events",
  () => {
    const filter = buildDateFilter(activeFilter.value);
    // On récupère la page directement depuis la route ici pour l'appel API
    const page = parseInt(route.query.page as string) || 1;

    return $directus.request(
      readItems("business_events", {
        sort: ["-date_created"],
        limit: PER_PAGE,
        page: page,
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

const totalEvents = computed(() => {
  const r = countData.value as any;
  return Array.isArray(r) && r[0]?.count ? parseInt(r[0].count) : 0;
});

const filteredTotal = computed(() => {
  const r = filteredCountData.value as any;
  return Array.isArray(r) && r[0]?.count ? parseInt(r[0].count) : 0;
});

// Partage du contexte nécessaire à l'enfant pour qu'il gère SA pagination
provide("eventContext", {
  eventsData,
  totalEvents,
  filteredTotal, // L'enfant en a besoin pour calculer le nombre de pages
  activeFilter,
  searchQuery,
  PER_PAGE,
});

if (error.value) console.log("events error: ", error.value);

// Reset de la page via router quand la recherche change
watch(searchQuery, () => {
  useRouter().replace({ query: { ...route.query, page: "1" } });
});
</script>
