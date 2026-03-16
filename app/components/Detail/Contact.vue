<template>
  <v-card class="pa-4" color="transparent" density="compact" :elevation="0">
    <!-- ── Contacts & Website en loop ── -->
    <v-list class="bg-transparent pa-0" density="compact">
      <template v-for="(item, index) in contactItems" :key="item.type">
        <!-- Header section -->
        <v-card-title class="d-flex align-center px-0 pt-0">
          <h2 class="text-h7 font-weight-bold">{{ item.label }}</h2>
        </v-card-title>

        <!-- Valeur + action -->
        <v-list-item class="px-0">
          <v-list-item-title class="text-body-1">
            {{ item.value }}
          </v-list-item-title>

          <template #append>
            <v-btn
              :icon="item.icon"
              :color="item.color"
              variant="tonal"
              size="small"
              :href="item.href"
              :target="item.external ? '_blank' : undefined"
            />
          </template>
        </v-list-item>

        <!-- Séparateur entre items -->
        <v-divider 
          v-if="index < contactItems.length - 1" 
          class="border-opacity-100" 
          color="primary ma-1" 
        />
      </template>

      <!-- Fallback si aucun contact -->
      <v-list-item v-if="contactItems.length === 0" class="px-0">
        <v-list-item-title class="text-grey text-body-2">
          Aucun contact disponible
        </v-list-item-title>
      </v-list-item>
    </v-list>

    <!-- ── Locations ── -->
    <template v-if="hasLocations">
      <v-divider class="border-opacity-100" color="primary ma-1" />

      <v-card-title class="d-flex align-center px-0 pt-4">
        <h2 class="text-h7 font-weight-bold">Adresses</h2>
        <v-chip v-if="mainLocation" size="small" color="primary" class="ms-3">
          Principale
        </v-chip>
      </v-card-title>

      <v-list
        v-if="!isMobile"
        class="bg-transparent pa-0"
        density="compact"
      >
        <v-list-item
          v-for="(location, index) in sortedLocations"
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

          <v-divider
            v-if="index < sortedLocations.length - 1"
            class="border-opacity-100"
            color="primary ma-1"
          />
        </v-list-item>
      </v-list>
    </template>
  </v-card>
</template>

<script lang="ts" setup>
import type { BizLocation } from "~/types/biz";

// ── Injections ──
const isMobile = inject("isMobile");

// ── Props ──
const props = defineProps<{
  website?: string;
  phone?: string;
  whatsapp?: string;
  locations?: BizLocation[];
}>();

// ── Computed ──

// Items à afficher (website, phone, whatsapp) - filtrés si vides
const contactItems = computed(() => {
  const items = [];
  
  if (props.website) {
    items.push({
      type: 'website',
      label: 'Website',
      value: props.website,
      icon: 'mdi-web',
      color: 'primary',
      href: props.website,
      external: true,
    });
  }
  
  if (props.phone) {
    items.push({
      type: 'phone',
      label: 'Téléphone',
      value: props.phone,
      icon: 'mdi-phone',
      color: 'primary',
      href: `tel:${props.phone}`,
      external: false,
    });
  }
  
  // WhatsApp seulement si différent du téléphone
  if (props.whatsapp) {
    items.push({
      type: 'whatsapp',
      label: 'WhatsApp',
      value: props.whatsapp,
      icon: 'mdi-whatsapp',
      color: 'success',
      href: `https://wa.me/${props.whatsapp.replace(/\D/g, '')}`,
      external: true,
    });
  }
  
  return items;
});

const hasLocations = computed(
  () => props.locations && props.locations.length > 0,
);

const mainLocation = computed(() =>
  props.locations?.find((loc) => loc.is_main),
);

// Principale en premier
const sortedLocations = computed(() => {
  if (!props.locations) return [];
  return [...props.locations].sort((a, b) => {
    if (a.is_main === b.is_main) return 0;
    return a.is_main ? -1 : 1;
  });
});

// ── Helpers ──
const googleMapsUrl = (location: BizLocation): string => {
  const query = encodeURIComponent(`${location.address}, ${location.city}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
};
</script>

<style></style>