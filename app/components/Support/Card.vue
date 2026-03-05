<template>
  <v-card
    class="mx-auto overflow-hidden bg-transparent position-relative"
    max-width="480"
    elevation="0"
    rounded="xl"
  >
    <div class="gradient-bg" />

    <v-card-text class="position-relative pa-6">
      <div class="d-flex justify-space-between align-start mb-3">
        <h3 class="text-h6 font-weight-bold text-truncate">
          {{ ticket.title }}
        </h3>
        
        <v-chip
          :color="ticket.resolved ? 'success' : 'warning'"
          size="small"
          variant="flat"
          class="font-weight-medium ml-2 flex-shrink-0"
        >
          {{ ticket.resolved ? 'Résolu' : 'En cours' }}
        </v-chip>
      </div>

      <!-- Description en blanc sans transparence -->
      <p class="text-body-2 mb-4 text-truncate">
        {{ ticket.description }}
      </p>

      <div class="d-flex justify-space-between align-center">
        <div class="d-flex align-center text-caption text-disabled">
          <v-icon size="14" class="mr-1">mdi-clock-outline</v-icon>
          {{ formatDate(ticket.date) }}
        </div>

        <v-btn
          variant="text"
          size="small"
          class="text-none"
          append-icon="mdi-arrow-right"
        >
          Voir détails
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
const props = defineProps({
  ticket: {
    type: Object,
    required: true,
    default: () => ({
      title: '',
      description: '',
      resolved: false,
      date: new Date()
    })
  }
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}
</script>