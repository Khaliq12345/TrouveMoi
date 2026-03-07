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
          {{ ticket.resolved ? "Résolu" : "En cours" }}
        </v-chip>
      </div>

      <p class="text-body-2 mb-4 text-truncate">{{ ticket.description }}</p>

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
          @click="dialog = true"
        >
          Voir détails
        </v-btn>
      </div>
    </v-card-text>

    <!-- Dialog readonly -->

    <v-dialog
      v-model="dialog"
      max-width="450"
      scrollable
      transition="dialog-bottom-transition"
    >
      <v-card rounded="xl" class="overflow-hidden border-0 elevation-24">
        <v-carousel
          v-if="hasImages"
          height="250"
          hide-delimiters
          :show-arrows="ticket.images.length > 1 ? 'hover' : false"
          class="bg-grey-lighten-4"
        >
          <v-carousel-item
            v-for="(image, i) in ticket.images"
            :key="i"
            :src="image"
            cover
          />
          <div class="position-absolute top-0 right-0 pa-4" style="z-index: 2">
            <v-btn
              icon="mdi-close"
              variant="tonal"
              color="white"
              size="small"
              @click="dialog = false"
              class="blur-effect"
            />
          </div>
        </v-carousel>

        <v-card-text class="pa-6">
          <div class="d-flex justify-space-between align-start mb-4">
            <div>
              <h2 class="text-h6 font-weight-bold line-height-tight mb-1">
                {{ ticket.title }}
              </h2>
              <div
                class="d-flex align-center text-caption text-medium-emphasis"
              >
                <v-icon icon="mdi-calendar-range" size="14" class="mr-1" />
                {{ formatFullDate(ticket.date) }}
              </div>
            </div>
            <v-chip
              :color="ticket.resolved ? 'success' : 'warning'"
              variant="flat"
              size="small"
              class="font-weight-bold px-3"
            >
              {{ ticket.resolved ? "Terminé" : "En attente" }}
            </v-chip>
          </div>

          <v-sheet color="grey-lighten-4" rounded="lg" class="pa-4 mb-2">
            <div
              class="text-overline text-grey-darken-1 mb-1"
              style="font-size: 0.65rem !important"
            >
              Description
            </div>
            <p class="text-body-2 text-grey-darken-3 leading-relaxed">
              {{ ticket.description }}
            </p>
          </v-sheet>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script setup>
const dialog = ref(false);

const props = defineProps({
  ticket: {
    type: Object,
    required: true,
    default: () => ({
      id: "",
      title: "",
      description: "",
      resolved: false,
      date: new Date(),
      images: [],
    }),
  },
});

const hasImages = computed(() => props.ticket.images?.length > 0);

const formatDate = (date) =>
  new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
const formatFullDate = (date) =>
  new Date(date).toLocaleString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
</script>

<style scoped>
/* Petit effet de flou pour le bouton au-dessus de l'image */
.blur-effect {
  backdrop-filter: blur(8px);
  background: rgba(0, 0, 0, 0.2) !important;
}
</style>