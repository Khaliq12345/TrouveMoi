<template>
  <!-- Support ticket card with gradient background -->
  <v-card
    class="mx-auto overflow-hidden bg-transparent position-relative"
    max-width="480"
    elevation="0"
    rounded="xl"
  >
    <!-- Gradient background layer -->
    <div class="gradient-bg" />

    <!-- Card content -->
    <v-card-text class="position-relative pa-6">
      <!-- Header: title and status chip -->
      <div class="d-flex justify-space-between align-start mb-3">
        <!-- Ticket title -->
        <h3 class="text-h6 font-weight-bold text-truncate">
          {{ ticket.title }}
        </h3>
        
        <!-- Status chip (resolved/in progress) -->
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

      <!-- Footer: date and action button -->
      <div class="d-flex justify-space-between align-center">
        <!-- Creation date with icon -->
        <div class="d-flex align-center text-caption text-disabled">
          <v-icon size="14" class="mr-1">mdi-clock-outline</v-icon>
          {{ formatDate(ticket.date) }}
        </div>

        <!-- View details button -->
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
// Component props
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

// Format date to French locale
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}
</script>