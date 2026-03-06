<!-- components/events/EventCard.vue -->
<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      v-bind="props"
      :elevation="isHovering ? 8 : 0"
      height="380"
      class="rounded-xl overflow-hidden position-relative"
      :class="event.status === 'live' ? 'border-error border-md' : 'border border-opacity-10'"
    >
      <!-- Image pleine -->
      <v-img
        :src="event.image"
        cover
        height="100%"
        :class="isHovering ? 'scale-110' : ''"
        class="transition-all duration-500"
      >
        <template #placeholder>
          <v-skeleton-loader type="image" height="100%" />
        </template>
      </v-img>/>

      <!-- Contenu -->
      <div class="position-absolute top-0 left-0 right-0 bottom-0 d-flex flex-column justify-space-between pa-4">
        
        <!-- Header avec status et date -->
        <div class="d-flex justify-space-between align-start">
          <!-- Status badge -->
          <v-chip
            :color="statusColor"
            size="small"
            variant="elevated"
            class="font-weight-bold text-uppercase tracking-wider"
          >
            <template v-if="event.status === 'live'">
              <span class="pulse-dot mr-1" />
              Live
            </template>
            <template v-else>
              {{ statusLabel }}
            </template>
          </v-chip>

          <!-- Date -->
          <div class="blur-content rounded-xl px-4 py-2 text-center text-white border border-white/20">
            <div class="text-h4 font-weight-bold">{{ formatDay }}</div>
            <div class="text-caption text-uppercase">{{ formatMonth }}</div>
          </div>
        </div>

        <!-- Info principale en blur -->
        <div class="blur-content rounded-xl pa-4 border border-white/10">
          <v-chip
            size="x-small"
            :color="event.categoryColor"
            variant="tonal"
            class="mb-2 font-weight-medium"
          >
            {{ event.category }}
          </v-chip>

          <h3 class="text-h6 font-weight-bold text-white mb-2 text-truncate-2">
            {{ event.title }}
          </h3>

          <p class="text-body-2 text-white text-opacity-80 text-truncate-2 mb-3">
            {{ event.description }}
          </p>

          <div class="d-flex align-center gap-4 text-caption text-white text-opacity-70">
            <span class="d-flex align-center gap-1">
              <v-icon icon="mdi-map-marker" size="14" color="white" />
              {{ event.location }}
            </span>
            <span class="d-flex align-center gap-1">
              <v-icon icon="mdi-account-group" size="14" color="white" />
              {{ event.participants }}
            </span>
          </div>

          <v-btn
            :color="event.status === 'live' ? 'error' : 'primary'"
            :variant="event.status === 'live' ? 'flat' : 'elevated'"
            :prepend-icon="event.status === 'live' ? 'mdi-access-point' : 'mdi-arrow-right'"
            block
            class="mt-4"
            size="small"
          >
            {{ event.status === 'live' ? 'Rejoindre' : 'Voir' }}
          </v-btn>
        </div>
      </div>
    </v-card>
  </v-hover>
</template>

<script setup>
const props = defineProps({
  event: { type: Object, required: true }
});

const statusColor = computed(() => {
  const colors = { live: 'error', upcoming: 'primary', past: 'grey' };
  return colors[props.event.status] || 'primary';
});

const statusLabel = computed(() => {
  const labels = { live: 'En direct', upcoming: 'À venir', past: 'Terminé' };
  return labels[props.event.status] || props.event.status;
});

const formatDay = computed(() => new Date(props.event.date).getDate());
const formatMonth = computed(() => 
  new Date(props.event.date).toLocaleString('fr-FR', { month: 'short' })
);
</script>

<style scoped>
/* Seulement pour l'animation du pulse */
.pulse-dot {
  width: 8px;
  height: 8px;
  background: currentColor;
  border-radius: 50%;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
}

/* Line clamp si pas dispo dans ton Vuetify */
.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>