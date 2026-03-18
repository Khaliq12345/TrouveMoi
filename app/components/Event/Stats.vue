<template>
  <div class="pa-4 d-flex flex-column flex-md-row justify-md-center ga-2">
    <v-card
      v-for="stat in allStats"
      :key="stat.value"
      elevation="0"
      border
      rounded="xl"
      @click="updateFilter(stat.value)"
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
          <span class="font-weight-bold">
            {{ stat.label }}
            <span v-if="activeFilter === stat.value" class="text-caption ms-1">
              ({{ filteredTotal }})
            </span>
          </span>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
// Types stricts pour les statuts et les couleurs
type StatStatus = "all" | "live" | "upcoming" | "past";
type StatColor = "success" | "error" | "primary" | "grey";

// Structure de données locale pour l'interface
interface EventStat {
  label: string;
  value: StatStatus;
  icon: string;
  color: StatColor;
}

// Récupération des données et de la fonction d'action depuis le parent
// L'ajout de updateFilter permet au parent de garder le contrôle sur la logique de réinitialisation
const { filteredTotal, activeFilter, updateFilter } = inject("eventContext") as {
  filteredTotal: Ref<number>;
  activeFilter: Ref<StatStatus>;
  updateFilter: (val: StatStatus) => void;
};

// Définition de la configuration visuelle des filtres
const allStats = computed<EventStat[]>(() => {
  return [
    {
      label: "Tous",
      value: "all",
      icon: "mdi-view-grid",
      color: "success",
    },
    {
      label: "En cours",
      value: "live",
      icon: "mdi-access-point",
      color: "error",
    },
    {
      label: "À venir",
      value: "upcoming",
      icon: "mdi-calendar-clock",
      color: "primary",
    },
    {
      label: "Passés",
      value: "past",
      icon: "mdi-history",
      color: "grey",
    },
  ];
});
</script>