<!-- components/events/EventStats.vue -->
<template>
  <div class="pa-4 d-flex flex-column flex-md-row justify-md-center ga-2">
    <v-card
      v-for="stat in allStats"
      :key="stat.value"
      elevation="0"
      border
      rounded="xl"
      @click="setFilter(stat.value)"
      :class="[
        'w-100 w-md-auto pa-0 cursor-pointer transition-all',
        { 'border-primary border-opacity-100': activeFilter === stat.value },
      ]"
      style="min-width: 160px"
      :variant="activeFilter === stat.value ? 'tonal' : 'text'"
    >
      <v-card-text class="d-flex align-center pa-2 px-3">
        <v-avatar
          :color="stat.color"
          variant="tonal"
          size="32"
          rounded="md"
          class="me-3 flex-shrink-0"
        >
          <v-icon :icon="stat.icon" size="16" />
        </v-avatar>

        <div class="d-flex flex-column justify-center overflow-hidden">
          <span class="text-body-2 font-weight-bold mb-n1 text-truncate">
            {{ stat.count }}
          </span>
          <span
            class="text-caption text-medium-emphasis text-truncate"
            style="font-size: 0.7rem"
          >
            {{ stat.label }}
          </span>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import type { Event } from "~/types/event";

// Types
type StatStatus = "all" | "live" | "upcoming" | "past";
type StatColor = "success" | "error" | "primary" | "grey";

interface EventStat {
  label: string;
  value: StatStatus;
  count: number;
  icon: string;
  color: StatColor;
}

// Injection des données et fonctions depuis le parent (les props et emits sont supprimés)
const { eventsData, totalEvents, activeFilter } = inject(
  "eventContext",
) as {
  eventsData: Ref<Event[]>;
  totalEvents: Ref<number>;
  activeFilter: Ref<StatStatus>;
};

// Calcul des stats dynamiques
const now = Date.now();

const getEventStatus = (event: any): Exclude<StatStatus, "all"> => {
  const start = new Date(event.start_at).getTime();
  const end = new Date(event.end_at).getTime();

  if (now >= start && now <= end) return "live";
  if (now < start) return "upcoming";
  return "past";
};

const allStats = computed<EventStat[]>(() => [
  {
    label: "Tous",
    value: "all",
    count: totalEvents.value,
    icon: "mdi-view-grid",
    color: "success",
  },
  {
    label: "En cours",
    value: "live",
    count: (eventsData.value || []).filter((e) => getEventStatus(e) === "live")
      .length,
    icon: "mdi-access-point",
    color: "error",
  },
  {
    label: "À venir",
    value: "upcoming",
    count: (eventsData.value || []).filter(
      (e) => getEventStatus(e) === "upcoming",
    ).length,
    icon: "mdi-calendar-clock",
    color: "primary",
  },
  {
    label: "Passés",
    value: "past",
    count: (eventsData.value || []).filter((e) => getEventStatus(e) === "past")
      .length,
    icon: "mdi-history",
    color: "grey",
  },
]);

// Handler de clic
const setFilter = async (value: StatStatus) => {
  activeFilter.value = value;
};
</script>
