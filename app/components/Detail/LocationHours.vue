<!-- Location map and business hours section -->
<template>
  <v-container class="pa-0 py-8 px-4">
    <!-- Map card with address -->
    <v-card flat class="rounded-xl overflow-hidden border mb-4">
      <!-- Static map image -->
      <v-img
        src="https://maps.googleapis.com/maps/api/staticmap?center=6.4969,2.6289&zoom=7&size=600x300&key=VOTRE_CLE_API"
        height="200"
        cover
      ></v-img>

      <!-- Locations list -->
      <v-card-text class="pa-0">
        <v-list density="compact" class="pa-0">
          <v-list-item
            v-for="location in locations"
            :key="location?.id"
            class="px-4 py-3 border-b"
            :class="{
              'border-b-0': location === locations?.[locations.length - 1],
            }"
          >
            <div class="d-flex justify-space-between align-center w-100">
              <div>
                <!-- Street address -->
                <div
                  class="text-subtitle-1 font-weight-bold text-blue-darken-2"
                >
                  {{ location.address }}
                </div>
                <!-- City -->
                <div class="text-body-2 font-weight-bold">
                  {{ location.city }}
                </div>
                <!-- Coordinates -->
                <div class="text-caption text-grey">
                  {{ location.latitude }}, {{ location.longitude }}
                </div>
              </div>
            </div>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>

    <!-- Business hours table -->
    <v-table density="compact" class="hours-table">
      <tbody>
        <tr v-for="(schedule, i) in businessHours" :key="i">
          <td class="font-weight-bold py-1 border-0" width="120">
            {{ schedule.day }}
          </td>

          <td
            class="py-1 border-0"
            :class="schedule.hours === 'Fermé' ? 'text-grey' : ''"
          >
            {{ schedule.hours }}
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script setup lang="ts">
import type { Biz, BusinessLocations, BizLocation } from "~/types/biz";
const props = defineProps<{ biz: Biz | null }>();

const { $directus, $readItems } = useNuxtApp();

const businessHours = computed(() => {
  // On récupère le premier objet du tableau "hours"
  const rawHours = props.biz?.hours[0] || {};

  // On transforme l'objet en tableau pour le v-for
  return Object.entries(rawHours).map(([day, times]: [string, any]) => {
    const isOpen = times.open && times.close;
    return {
      day: day,
      hours: isOpen ? `${times.open} - ${times.close}` : "Fermé",
    };
  });
});

// Récupération des données
// 1. Utilise le type tableau BusinessLocations[] ou BizLocation[]
const { data: locations } = await useAsyncData<BizLocation[]>(
  `locations-${props.biz?.id}`,
  // 2. Ajoute async et le typage de retour explicite
  async (): Promise<BizLocation[]> => {
    const response = await $directus.request(
      $readItems("business_locations", {
        filter: {
          bussness: { // Garde cette typo si elle est ainsi dans ta DB
            id: {
              _eq: props.biz?.id,
            },
          },
        },
      }),
    );
    
    // 3. Cast la réponse pour garantir à TS que c'est le bon type
    return response as BizLocation[];
  },
  {
    getCachedData: (key) => {
      const nuxtApp = useNuxtApp();
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  },
);
</script>

<style scoped>
/* Transparent table background */
.hours-table {
  background: transparent !important;
}

/* Remove hover effect */
.hours-table :deep(tr:hover) {
  background-color: transparent !important;
}

/* Clickable address link styling */
.text-blue-darken-2 {
  color: #0073bb !important;
  cursor: pointer;
}

.text-blue-darken-2:hover {
  text-decoration: underline;
}
</style>
