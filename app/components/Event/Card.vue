<!-- components/events/EventCard.vue -->
<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      v-bind="props"
      :elevation="isHovering ? 8 : 0"
      height="380"
      class="rounded-xl overflow-hidden position-relative border border-opacity-10"
    >
      <!-- Image -->
      <v-img
        :src="imgLink(event.image) || 'https://blocks.astratic.com/img/general-img-landscape.png'"
        cover
        height="100%"
        :class="isHovering ? 'scale-110' : ''"
        class="transition-all duration-500"
      >
        <template #placeholder>
          <v-skeleton-loader type="image" height="100%" />
        </template>
      </v-img>

      <!-- Contenu -->
      <div
        class="position-absolute top-0 left-0 right-0 bottom-0 d-flex flex-column justify-space-between pa-4"
      >
        <!-- Header -->
        <div class="d-flex justify-space-between align-start">
          <!-- Date -->
          <div
            class="blur-content rounded-xl px-4 py-2 text-center text-white border border-white/20"
          >
            <div class="text-h4 font-weight-bold">
              {{ formatDay }}
            </div>
            <div class="text-caption text-uppercase">
              {{ formatMonth }}
            </div>
          </div>
        </div>

        <!-- Info -->
        <div class="blur-content rounded-xl pa-2 border border-white/10">
          <h3 class="text-h7 font-weight-bold text-white mb-2 text-truncate-2">
            {{ event.title }}
          </h3>

          <p
            class="text-body-2 text-white text-opacity-80 text-truncate-2 mb-3"
          >
            {{ event.description }}
          </p>

          <div
            class="d-flex align-center gap-4 text-caption text-white text-opacity-70"
          >
            <span class="d-flex align-center gap-1">
              <v-icon icon="mdi-clock-outline" size="14" color="white" />
              {{ formatTimeRange }}
            </span>
          </div>

          <v-btn
            color="primary"
            variant="elevated"
            prepend-icon="mdi-arrow-right"
            block
            class="mt-4"
            size="small"
            v-if="event.link"
            @click="emit('click', event.id)"
          >
            Voir
          </v-btn>
        </div>
      </div>
    </v-card>
  </v-hover>
</template>

<script setup lang="ts">
import type { Event } from '~/types/event';
const props = defineProps<{
  event: Event;
}>();

const emit = defineEmits<{
  (e: 'click', id: string): void;
}>();

const startDate = computed(() => new Date(props.event.start_at));
const endDate = computed(() => new Date(props.event.end_at));

const formatDay = computed(() => startDate.value.getDate());

const formatMonth = computed(() =>
  startDate.value.toLocaleString('fr-FR', { month: 'short' })
);

const formatTimeRange = computed(() => {
  const start = startDate.value.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const end = endDate.value.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return `${start} - ${end}`;
});
</script>

<style scoped>
.text-truncate-2 {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>