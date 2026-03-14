<!-- pages/events/index.vue -->
<template>
  <v-layout>
    <AppBar />
    <v-main>
      <v-container class="pa-0 bg-background mx-auto" style="max-width: 1200px">
        <!-- Stats - filtre sans reload -->
        <EventStats :events="allEvents" @filter="activeFilter = $event" />

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
        <v-row v-if="paginatedEvents.length">
          <v-col
            v-for="event in paginatedEvents"
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

        <!-- Pagination - seulement pour changer de page -->
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
import { aggregate } from "@directus/sdk";
import type { Event } from "~/types/event";

const PER_PAGE = 10;

const { $directus, $readItems } = useNuxtApp();
const route = useRoute();

// État local (pas dans l'URL)
const searchQuery = ref("");
const activeFilter = ref<"all" | "upcoming" | "past" | "live">("all");

// Page depuis URL (seule la pagination recharge)
const currentPage = computed(() => {
  const p = parseInt(route.query.page as string);
  return isNaN(p) || p < 1 ? 1 : p;
});

// 1. Count total
const { data: countData } = await useAsyncData(
  "events-count",
  () => $directus.request(aggregate("business_events", { aggregate: { count: "*" } })),
);

const totalEvents = computed(() => {
  const r = countData.value as any;
  return Array.isArray(r) && r[0]?.count ? parseInt(r[0].count) : 0;
});

const pageCount = computed(() => {
  if (!totalEvents.value) return 1;
  return Math.ceil(totalEvents.value / PER_PAGE);
});

// 2. Tous les events de la page courante (pour les stats)
const { data: eventsData } = await useAsyncData<Event[]>(
  "events",
  () => $directus.request($readItems("business_events", {
    sort: ["-date_created"],
    limit: PER_PAGE,
    page: currentPage.value,
  })) as Promise<Event[]>,
  { watch: [currentPage] },
);

const allEvents = computed(() => eventsData.value || []);

// Statut
const getStatus = (event: Event): "live" | "upcoming" | "past" => {
  const now = Date.now();
  const start = new Date(event.start_at).getTime();
  const end = new Date(event.end_at).getTime();
  if (now >= start && now <= end) return "live";
  if (now < start) return "upcoming";
  return "past";
};

// 3. Filtres côté client (sans reload)
const filteredEvents = computed(() => {
  if (!allEvents.value.length) return [];
  
  let result = [...allEvents.value];
  
  if (searchQuery.value?.trim()) {
    const q = searchQuery.value.toLowerCase().trim();
    result = result.filter(
      (e) => e.title?.toLowerCase().includes(q) || e.description?.toLowerCase().includes(q)
    );
  }
  
  if (activeFilter.value !== "all") {
    result = result.filter((e) => getStatus(e) === activeFilter.value);
  }
  
  return result;
});

// Events affichés (filtrés, pas repaginés)
const paginatedEvents = computed(() => filteredEvents.value);

// Navigation pagination (seul moment où on reload)
const goToPage = (targetPage: number) => {
  const validPage = Math.max(1, Math.min(targetPage, pageCount.value));
  const url = new URL(window.location.href);
  url.searchParams.set("page", validPage.toString());
  window.location.href = url.toString();
};
</script>