<!-- components/events/EventStats.vue -->
<template>
  <div class="pa-4 d-flex flex-column flex-md-row justify-md-center ga-2">
    <v-card
      v-for="stat in stats"
      :key="stat.value"
      elevation="0"
      border
      rounded="xl"
      @click="$emit('filter', stat.value)"
      class="w-100 w-md-auto pa-0"
      style="min-width: 160px"
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
type StatStatus = "live" | "upcoming" | "past";
type StatColor = "error" | "primary" | "grey";

interface EventStat {
  label: string;
  value: StatStatus;
  count: number;
  icon: string;
  color: StatColor;
}
const props = defineProps<{
  events: any[];
}>();

defineEmits(["filter"]);

const stats = computed<EventStat[]>(() => [
  {
    label: "En cours",
    value: "live",
    count: props.events.filter((e) => e.status === "live").length,
    icon: "mdi-access-point",
    color: "error",
  },
  {
    label: "À venir",
    value: "upcoming",
    count: props.events.filter((e) => e.status === "upcoming").length,
    icon: "mdi-calendar-clock",
    color: "primary",
  },
  {
    label: "Passés",
    value: "past",
    count: props.events.filter((e) => e.status === "past").length,
    icon: "mdi-history",
    color: "grey",
  },
]);
</script>
