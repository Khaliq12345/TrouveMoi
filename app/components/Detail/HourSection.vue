<template>
  <v-sheet class="px-2" color="transparent">
    <div class="rounded-xl pa-2">
      <v-list density="compact" class="bg-transparent">
        <v-list-item
          v-for="day in formattedHours"
          :key="day.name"
          :title="day.name"
          :subtitle="day.time"
          :base-color="day.isToday ? 'primary' : undefined"
          class="rounded-lg"
        >
          <template #append v-if="day.isToday">
            <v-chip
              size="x-small"
              color="primary"
              variant="flat"
              class="font-weight-bold"
            >
              AUJOURD'HUI
            </v-chip>
          </template>
        </v-list-item>
      </v-list>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
import { computed } from "vue";

// On définit une interface pour la clarté du typage
interface BusinessHours {
  [key: string]: { open: string; close: string } | undefined;
}

const props = defineProps<{ hours?: BusinessHours }>();

const formattedHours = computed(() => {
  // Liste des jours exactement comme ils apparaissent dans tes clés JSON
  const days = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];

  // Récupérer le jour actuel en français (capitalisé) pour la comparaison
  const todayName = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
  }).format(new Date());

  // Capitaliser la première lettre car Intl peut retourner du minuscule (ex: "lundi")
  const capitalizedToday =
    todayName.charAt(0).toUpperCase() + todayName.slice(1);

  const rawData = props.hours || {};

  return days.map((day) => {
    const schedule = rawData[day]; // Accès direct par la clé (ex: rawData["Lundi"])

    return {
      name: day,
      time:
        schedule?.open && schedule?.close
          ? `${schedule.open} - ${schedule.close}`
          : "Fermé",
      isToday: day === capitalizedToday,
    };
  });
});
</script>
