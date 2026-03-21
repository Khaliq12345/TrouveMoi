<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card v-bind="props" :elevation="isHovering ? 4 : 0" class="d-flex flex-column pa-5 rounded-xl transition-swing"
      border height="100%" color="white">
      <div v-if="headerTitle" class="d-flex align-center mb-4">
        <v-icon v-if="headerIcon" :icon="headerIcon" color="orange-darken-3" size="x-large" class="mr-3 mt-1"></v-icon>
        <h3 class="text-h8 font-weight-bold text-grey-darken-4">
          {{ headerTitle }}
        </h3>
      </div>

      <div class="flex-grow-1 d-flex flex-column justify-center mb-6">
        <slot></slot>
      </div>

      <div class="mt-auto">
        <h4 class="text-subtitle-1 font-weight-bold text-grey-darken-4 mb-1">
          {{ footerTitle }}
        </h4>
        <p class="text-caption text-grey-darken-1 mb-3">
          {{ footerSubtitle }}
        </p>
        <v-btn icon="mdi-arrow-right" variant="text" color="orange-darken-3" size="small" density="comfortable"
          :to="{ path: '/search', query: searchQuery }"></v-btn>
      </div>
    </v-card>
  </v-hover>
</template>

<script setup>
// Definition des proprietes attendues par le composant pour personnaliser son affichage
defineProps({
  // Icone Material Design a afficher dans l'en-tete (ex: mdi-star)
  headerIcon: {
    type: String,
    default: null
  },
  // Titre principal affiche en haut de la carte
  headerTitle: {
    type: String,
    default: null
  },
  // Titre affiche dans la section du bas (requis)
  footerTitle: {
    type: String,
    required: true
  },
  // Texte descriptif affiche sous le titre du bas
  footerSubtitle: {
    type: String,
    default: ''
  },
  // Objet contenant les parametres d'URL pour la redirection du bouton (ex: { filter: 'verified', location: 'Cotonou' })
  searchQuery: {
    type: Object,
    default: () => ({})
  }
})
</script>