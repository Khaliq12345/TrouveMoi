<!-- pages/events/index.vue -->
<template>
  <v-layout>
    <HomeAppBar />
    <v-main>
      <v-container class="pa-0 bg-background">
        <!-- Stats -->
        <EventStats
          :events="events"
          @filter="activeFilter = $event"
          class="mb-4"
        />

        <!-- Recherche -->
        <v-row class="mb-6" justify="center">
          <v-col cols="12" md="6" lg="4">
            <EventLocationSearch v-model="locationQuery" class="mt-2" />
          </v-col>
        </v-row>

        <!-- Grid -->
        <v-row>
          <v-col
            v-for="event in filteredEvents"
            :key="event.id"
            cols="12"
            sm="6"
            lg="4"
            xl="3"
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
<script setup>
// State
const searchQuery = ref("");
const searchFocused = ref(false);
const activeFilter = ref("all");
const locationQuery = ref("");

// Data
const events = ref([
  {
    id: 1,
    title: "Conférence Tech 2026",
    description: "Les dernières innovations en intelligence artificielle.",
    date: new Date("2026-03-15T14:00:00"),
    location: "Paris",
    participants: 234,
    category: "Technologie",
    categoryColor: "primary",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
  },
  {
    id: 2,
    title: "Live Coding Session",
    description: "Session live sur Vue.js avec la communauté.",
    date: new Date(),
    location: "En ligne",
    participants: 89,
    category: "Développement",
    categoryColor: "success",
    status: "live",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
  },
  {
    id: 3,
    title: "Workshop Design",
    description: "Créez votre design system avec Vuetify.",
    date: new Date("2026-03-20T09:00:00"),
    location: "Lyon",
    participants: 45,
    category: "Design",
    categoryColor: "secondary",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
  },
]);

// Computed
const heroImage = computed(() => {
  const live = events.value.find((e) => e.status === "live");
  return live?.image || events.value[0]?.image;
});

const filteredEvents = computed(() => {
  let result = events.value;

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q),
    );
  }

  if (locationQuery.value) {
    const loc = locationQuery.value.toLowerCase();
    result = result.filter((e) => e.location.toLowerCase().includes(loc));
  }

  if (activeFilter.value !== "all") {
    result = result.filter((e) => e.status === activeFilter.value);
  }

  return result.sort((a, b) => a.date - b.date);
});
</script>
