<!-- pages/events/index.vue -->
<template>
  <ClientOnly>
    <v-layout>
      <HomeAppBar />
      <v-main>
        <v-container
          class="pa-0 bg-background mx-auto"
          style="max-width: 1200px"
        >
          <!-- Stats -->
          <EventStats :events="events" @filter="activeFilter = $event" />

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
  </ClientOnly>
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
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
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
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  },
  {
    id: 3,
    title: "Workshop Design",
    description: "Créer un design system moderne avec Vuetify.",
    date: new Date("2026-03-20T09:00:00"),
    location: "Lyon",
    participants: 45,
    category: "Design",
    categoryColor: "secondary",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
  },
  {
    id: 4,
    title: "Startup Pitch Night",
    description:
      "Des startups présentent leurs projets devant des investisseurs.",
    date: new Date("2026-03-18T18:00:00"),
    location: "Berlin",
    participants: 120,
    category: "Business",
    categoryColor: "warning",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
  },
  {
    id: 5,
    title: "Hackathon IA",
    description: "48h pour construire une application basée sur l'IA.",
    date: new Date("2026-03-25T10:00:00"),
    location: "Amsterdam",
    participants: 310,
    category: "Technologie",
    categoryColor: "primary",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
  },
  {
    id: 6,
    title: "Frontend Meetup",
    description: "Rencontre des développeurs frontend de la communauté.",
    date: new Date("2026-03-10T19:00:00"),
    location: "Bruxelles",
    participants: 76,
    category: "Développement",
    categoryColor: "success",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b",
  },
  {
    id: 7,
    title: "UI/UX Bootcamp",
    description: "Formation intensive sur les bonnes pratiques UX.",
    date: new Date("2026-04-02T09:30:00"),
    location: "Madrid",
    participants: 60,
    category: "Design",
    categoryColor: "secondary",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d",
  },
  {
    id: 8,
    title: "Tech Leadership Summit",
    description: "Conférence sur le management dans les équipes tech.",
    date: new Date("2026-03-12T13:00:00"),
    location: "Londres",
    participants: 410,
    category: "Management",
    categoryColor: "info",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2",
  },
  {
    id: 9,
    title: "DevOps Meetup",
    description: "Discussion autour des pipelines CI/CD modernes.",
    date: new Date("2026-03-14T18:30:00"),
    location: "Montréal",
    participants: 98,
    category: "Infrastructure",
    categoryColor: "warning",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
  },
  {
    id: 10,
    title: "Product Design Talk",
    description: "Comment concevoir des produits numériques efficaces.",
    date: new Date("2026-03-16T11:00:00"),
    location: "San Francisco",
    participants: 142,
    category: "Design",
    categoryColor: "secondary",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72",
  },
  {
    id: 11,
    title: "Open Source Day",
    description: "Contribution collective à plusieurs projets open source.",
    date: new Date("2026-03-22T10:00:00"),
    location: "En ligne",
    participants: 520,
    category: "Communauté",
    categoryColor: "success",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  },
  {
    id: 12,
    title: "AI Ethics Panel",
    description:
      "Débat sur l'éthique et la régulation de l'intelligence artificielle.",
    date: new Date("2026-03-19T17:00:00"),
    location: "Genève",
    participants: 210,
    category: "Technologie",
    categoryColor: "primary",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998",
  },
  {
    id: 13,
    title: "Cloud Architecture Workshop",
    description: "Architecture cloud scalable avec Kubernetes.",
    date: new Date("2026-04-05T09:00:00"),
    location: "Dublin",
    participants: 64,
    category: "Infrastructure",
    categoryColor: "warning",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
  },
  {
    id: 14,
    title: "Mobile Dev Conference",
    description: "Les nouvelles tendances du développement mobile.",
    date: new Date("2026-03-27T09:00:00"),
    location: "Barcelone",
    participants: 350,
    category: "Développement",
    categoryColor: "success",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
  },
  {
    id: 15,
    title: "Data Science Meetup",
    description: "Rencontre autour du machine learning et des données.",
    date: new Date("2026-03-21T18:00:00"),
    location: "Zurich",
    participants: 130,
    category: "Data",
    categoryColor: "info",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
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
