<!-- components/events/EventStats.vue -->
<template>
  <v-row class="mb-6">
    <v-col v-for="stat in stats" :key="stat.value" cols="6" md="4">
      <v-card
        elevation="0"
        class="rounded-xl"
        @click="$emit('filter', stat.value)"
      >
        <v-card-text class="d-flex align-center gap-3 pa-4">
          <v-avatar :color="stat.color" size="48">
            <v-icon :icon="stat.icon" color="white" />
          </v-avatar>
          <div>
            <div class="text-h5 font-weight-bold">{{ stat.count }}</div>
            <div class="text-caption text-medium-emphasis">{{ stat.label }}</div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
const props = defineProps({
  events: { type: Array, required: true }
});

defineEmits(['filter']);

const stats = computed(() => [
  { 
    label: 'En cours', 
    value: 'live',
    count: props.events.filter(e => e.status === 'live').length, 
    icon: 'mdi-access-point', 
    color: 'error' 
  },
  { 
    label: 'À venir', 
    value: 'upcoming',
    count: props.events.filter(e => e.status === 'upcoming').length, 
    icon: 'mdi-calendar-clock', 
    color: 'primary' 
  },
  { 
    label: 'Passés', 
    value: 'past',
    count: props.events.filter(e => e.status === 'past').length, 
    icon: 'mdi-history', 
    color: 'grey' 
  }
]);
</script>