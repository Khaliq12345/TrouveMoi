<template>
  <v-card class="pa-4" color="transparent" density="compact" :elevation="0">
    <v-card-title v-if="website" class="d-flex align-center px-0 pt-0">
      <h2 class="text-h7 font-weight-bold">Website</h2>
    </v-card-title>

    <v-list-item v-if="website" class="px-0">
      <v-list-item-title class="text-body-1">
        {{ website }}
      </v-list-item-title>

      <template #append>
        <v-btn
          icon="mdi-web"
          color="primary"
          variant="tonal"
          size="small"
          :href="website"
          target="_blank"
        />
      </template>
    </v-list-item>

    <v-card-title
      v-if="phone || whatsapp"
      class="d-flex align-center px-0 pt-0"
    >
      <h2 class="text-h7 font-weight-bold">Contact</h2>
    </v-card-title>

    <v-list class="bg-transparent pa-0" density="compact">
      <v-list-item v-if="phone && whatsapp && isSameNumber" class="px-0">
        <v-list-item-title class="text-body-1">
          {{ phone }}
        </v-list-item-title>

        <template #append>
          <div class="d-flex g-2">
            <v-btn
              icon="mdi-phone"
              color="primary"
              variant="tonal"
              size="small"
              class="me-2"
              :href="`tel:${phone}`"
            />
            <v-btn
              icon="mdi-whatsapp"
              color="success"
              variant="tonal"
              size="small"
              :href="`https://wa.me/${whatsapp.replace(/\D/g, '')}`"
              target="_blank"
            />
          </div>
        </template>
      </v-list-item>

      <template v-else>
        <v-list-item v-if="phone" class="px-0">
          <v-list-item-title class="text-body-1">
            {{ phone }}
          </v-list-item-title>
          <template #append>
            <v-btn
              icon="mdi-phone"
              color="primary"
              variant="tonal"
              size="small"
              :href="`tel:${phone}`"
            />
          </template>
        </v-list-item>

        <v-divider
          v-if="phone && whatsapp"
          class="border-opacity-100"
          color="primary ma-1"
        />

        <v-list-item v-if="whatsapp" class="px-0">
          <v-list-item-title class="text-body-1">
            {{ whatsapp }}
          </v-list-item-title>

          <template #append>
            <v-btn
              icon="mdi-whatsapp"
              color="success"
              variant="tonal"
              size="small"
              :href="`https://wa.me/${whatsapp.replace(/\D/g, '')}`"
              target="_blank"
            />
          </template>
        </v-list-item>
      </template>

      <v-list-item v-if="!phone && !whatsapp" class="px-0">
        <v-list-item-title class="text-grey text-body-2">
          Aucun contact disponible
        </v-list-item-title>
      </v-list-item>
    </v-list>

    <v-card-title v-if="hasLocations" class="d-flex align-center px-0 pt-4">
      <h2 class="text-h7 font-weight-bold">Adresses</h2>
      <v-chip v-if="mainLocation" size="small" color="primary" class="ms-3">
        Principale
      </v-chip>
    </v-card-title>

    <v-divider
      v-if="hasLocations"
      class="border-opacity-100"
      color="primary ma-1"
    />

    <v-list
      v-if="hasLocations && !isMobile"
      class="bg-transparent pa-0"
      density="compact"
    >
      <v-list-item
        v-for="location in sortedLocations"
        :key="location.id"
        class="px-0 mb-1"
      >
        <v-list-item-title class="text-body-1 font-weight-medium">
          {{ location.city }}
          <v-icon
            v-if="location.is_main"
            icon="mdi-star"
            size="x-small"
            color="primary"
            class="ms-1"
          />
        </v-list-item-title>

        <v-list-item-subtitle class="text-wrap mt-1">
          {{ location.address }}
        </v-list-item-subtitle>

        <v-list-item-subtitle
          v-if="location.local_direction"
          class="text-caption text-grey mt-1"
        >
          <v-icon icon="mdi-near-me" size="x-small" class="me-1" />
          {{ location.local_direction }}
        </v-list-item-subtitle>

        <template #append>
          <v-btn
            icon="mdi-map"
            :color="location.is_main ? 'primary' : 'grey'"
            variant="tonal"
            size="small"
            :href="googleMapsUrl(location)"
            target="_blank"
          />
        </template>
        <v-divider class="border-opacity-100" color="primary ma-1" />
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts" setup>
import { computed, inject } from "vue"; // Ajout des imports explicites pour la clarté
import type { BizLocation } from "~/types/biz";

const isMobile = inject("isMobile");

const props = defineProps<{
  website?: string;
  phone?: string;
  whatsapp?: string;
  locations?: BizLocation[];
}>();

/**
 * Compare le numéro de téléphone et le numéro WhatsApp.
 * On nettoie les caractères non numériques pour une comparaison fiable.
 */
const isSameNumber = computed(() => {
  if (!props.phone || !props.whatsapp) return false;
  const cleanPhone = props.phone.replace(/\D/g, "");
  const cleanWhatsapp = props.whatsapp.replace(/\D/g, "");
  return cleanPhone === cleanWhatsapp;
});

// --- Autres Computed ---

const hasLocations = computed(
  () => props.locations && props.locations.length > 0,
);

const mainLocation = computed(() =>
  props.locations?.find((loc) => loc.is_main),
);

// Locations triées : principale d'abord
const sortedLocations = computed(() => {
  if (!props.locations) return [];
  return [...props.locations].sort((a, b) => {
    if (a.is_main === b.is_main) return 0;
    return a.is_main ? -1 : 1;
  });
});

/**
 * Génère l'URL Google Maps.
 * Correction de la template string pour le format correct.
 */
const googleMapsUrl = (location: BizLocation): string => {
  const query = encodeURIComponent(`${location.address}, ${location.city}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
};
</script>
