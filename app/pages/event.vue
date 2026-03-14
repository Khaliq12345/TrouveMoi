<!-- pages/events/index.vue -->
<template>
  <v-layout>
    <AppBar />
    <v-main>
      <v-container class="pa-0 bg-background mx-auto" style="max-width: 1200px">
        <!-- Stats -->
        <EventStats :events="businessEvents" @filter="activeFilter = $event" />

        <!-- Recherche -->
        <v-row class="mb-6" justify="center">
          <v-col cols="12" md="6" lg="4">
            <EventLocationSearch v-model="locationQuery" class="mt-2" />
          </v-col>
        </v-row>

        <!-- Grid -->
        <v-row>
          <v-col
            v-for="event in businessEvents"
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
          v-if="!filteredEvents.length"
          icon="mdi-calendar-blank"
          title="Aucun événement trouvé"
          text="Essayez de modifier vos critères de recherche"
          class="py-12"
        />

        <!-- Pagination controls -->
        <v-pagination :length="5" class="pt-5"></v-pagination>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
// Interface strictement conforme au schéma API
import type { Event } from "~/types/event";

// State
const searchQuery = ref("");
const locationQuery = ref("");
const activeFilter = ref<"all" | "upcoming" | "past">("all");

const { $directus, $readItems } = useNuxtApp();

const { data: businessEvents } = await useAsyncData<Event[]>(
  "business-events",
  async () => {
    return $directus.request(
      $readItems("business_events", {
        sort: ["-date_created"],
      }),
    );
  },
  {
    getCachedData: (key) => {
      const nuxtApp = useNuxtApp();
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  },
);

// Computed pour filtrer les événements
const filteredEvents = computed(() => {
  if (!businessEvents.value) return [];

  let result = [...businessEvents.value] as Event[];

  // Filtre recherche
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q),
    );
  }

  // Filtre par période (calculé depuis start_at/end_at)
  const now = new Date().getTime();
  if (activeFilter.value === "upcoming") {
    result = result.filter((e) => new Date(e.start_at).getTime() > now);
  } else if (activeFilter.value === "past") {
    result = result.filter((e) => new Date(e.end_at).getTime() < now);
  }

  // Tri par date de début
  return result.sort(
    (a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime(),
  );
});
</script>
