<template>
  <div class="pa-4 d-flex flex-column flex-md-row justify-md-center ga-2">
    <v-card v-for="stat in allStats" :key="stat.value" elevation="0" border rounded="xl" @click="setFilter(stat.value)"
      :class="[
        'w-100 w-md-auto pa-0 cursor-pointer transition-all',
        { 'border-primary border-opacity-100': activeFilter === stat.value },
      ]" style="min-width: 160px" :variant="activeFilter === stat.value ? 'tonal' : 'text'">
      <v-card-text class="d-flex align-center pa-2 px-3">
        <v-avatar :color="stat.color" variant="tonal" size="32" rounded="md" class="me-3 flex-shrink-0">
          <v-icon :icon="stat.icon" size="16" />
        </v-avatar>

        <div class="d-flex flex-column justify-center overflow-hidden">
          <span class="font-weight-bold">
            {{ stat.label }}
          </span>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import type { Event } from "~/types/event";

// Types stricts de classification
type StatStatus = "all" | "live" | "upcoming" | "past";
type StatColor = "success" | "error" | "primary" | "grey";

// Structure d'un élément statistique
interface EventStat {
  label: string;
  value: StatStatus;
  count: number;
  icon: string;
  color: StatColor;
}

// Injection des données fournies par `index.vue`
// L'injection récupère la variable `countsData` contenant les 4 totaux depuis l'API d'agrégation
const { countsData, activeFilter } = inject("eventContext") as {
  countsData: Ref<{ all: number; live: number; upcoming: number; past: number }>;
  activeFilter: Ref<StatStatus>;
};

// Variable calculée pour structurer les données visuelles basées sur le retour de Directus
// Le calcul se met à jour automatiquement si countsData change
const allStats = computed<EventStat[]>(() => {
  // Définition d'un comportement par défaut si les données ne sont pas encore prêtes
  const counts = countsData.value || { all: 0, live: 0, upcoming: 0, past: 0 };

  return [
    {
      label: "Tous",
      value: "all",
      count: counts.all,
      icon: "mdi-view-grid",
      color: "success",
    },
    {
      label: "En cours",
      value: "live",
      count: counts.live,
      icon: "mdi-access-point",
      color: "error",
    },
    {
      label: "À venir",
      value: "upcoming",
      count: counts.upcoming,
      icon: "mdi-calendar-clock",
      color: "primary",
    },
    {
      label: "Passés",
      value: "past",
      count: counts.past,
      icon: "mdi-history",
      color: "grey",
    },
  ];
});

// Modification de l'état du filtre
const setFilter = (value: StatStatus) => {
  activeFilter.value = value;
};
</script>