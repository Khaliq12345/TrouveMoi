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

        <!-- Grid -->
        <v-row v-if="filteredEvents.length">
          <v-col
            v-for="event in filteredEvents"
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

        <!-- Pagination -->
        <v-pagination
          v-if="pageCount > 1"
          :model-value="currentPage"
          :length="pageCount"
          :total-visible="7"
          class="pt-5"
          @update:model-value="goToPage"
        />
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

// État
const searchQuery = ref("");
const activeFilter = ref<"all" | "live" | "upcoming" | "past">("all");

// Page depuis URL
const currentPage = computed(() => {
  const p = parseInt(route.query.page as string);
  return isNaN(p) || p < 1 ? 1 : p;
});

// Construction du filtre Directus selon le statut
const buildDateFilter = (filter: typeof activeFilter.value) => {
  switch (filter) {
    case "live":
      // En cours: start_at <= NOW ET end_at >= NOW
      return {
        _and: [{ start_at: { _lte: "$NOW" } }, { end_at: { _gte: "$NOW" } }],
      };
    case "upcoming":
      // À venir: start_at > NOW
      return { start_at: { _gt: "$NOW" } };
    case "past":
      // Passés: end_at < NOW
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
const { data: filteredCountData, error: filtererr } = await useAsyncData(
  "events-filtered-count",
  () => {
    const filter = buildDateFilter(activeFilter.value);
    return $directus.request(
      aggregate("business_events", {
        aggregate: { count: "*" },
        ...(filter && { filter }),
      }),
    );
  },
  { watch: [activeFilter] },
);

console.log("filter error: ", filtererr.value);

const totalEvents = computed(() => {
  const r = countData.value as any;
  return Array.isArray(r) && r[0]?.count ? parseInt(r[0].count) : 0;
});

const filteredTotal = computed(() => {
  const r = filteredCountData.value as any;
  return Array.isArray(r) && r[0]?.count ? parseInt(r[0].count) : 0;
});

const pageCount = computed(() => {
  const total = filteredTotal.value;
  return total ? Math.ceil(total / PER_PAGE) : 1;
});

// 2. Récupération des events avec filtre serveur
// Extraction de 'refresh' pour le passer au composant enfant
const { data: eventsData, error } = await useAsyncData<Event[]>(
  "events",
  () => {
    const filter = buildDateFilter(activeFilter.value);

    return $directus.request(
      readItems("business_events", {
        sort: ["-date_created"],
        limit: PER_PAGE,
        page: currentPage.value,
        ...(filter && { filter }),
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
  {
    watch: [currentPage, activeFilter],
  },
);

// Partage du contexte avec les composants enfants (EventStats)
provide("eventContext", {
  eventsData,
  totalEvents,
  activeFilter,
});

console.log("events error: ", error.value);

const allEvents = computed(() => eventsData.value || []);

// Filtre client pour la recherche texte uniquement
const filteredEvents = computed(() => {
  if (!allEvents.value.length) return [];

  if (!searchQuery.value?.trim()) return allEvents.value;

  const q = searchQuery.value.toLowerCase().trim();
  return allEvents.value.filter(
    (e) =>
      e.title?.toLowerCase().includes(q) ||
      e.description?.toLowerCase().includes(q),
  );
});

// Navigation pagination
const goToPage = (targetPage: number) => {
  const validPage = Math.max(1, Math.min(targetPage, pageCount.value));
  router.push({ query: { ...route.query, page: validPage.toString() } });
};
</script>
