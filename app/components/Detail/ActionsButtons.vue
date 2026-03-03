<template>
  <div class="actions-wrapper mb-6">
    <div class="d-flex gap-2 align-center justify-center justify-sm-start overflow-x-auto no-scrollbar py-2 px-4">
      
      <v-btn 
        color="#E00707" 
        size="large" 
        elevation="0"
        class="text-none font-weight-bold px-6 custom-btn main-cta"
      >
        <v-icon start size="20">mdi-star-outline</v-icon>
        Write a Review
      </v-btn>

      <v-btn variant="outlined" size="large" class="text-none font-weight-bold custom-btn secondary-btn">
        <v-icon start size="20">mdi-camera-plus-outline</v-icon>
        Add photo
      </v-btn>

      <v-btn variant="outlined" size="large" class="text-none font-weight-bold custom-btn secondary-btn">
        <v-icon start size="20">mdi-share-variant-outline</v-icon>
        Share
      </v-btn>

      <v-btn variant="outlined" size="large" class="text-none font-weight-bold custom-btn secondary-btn">
        <v-icon start size="20">mdi-bookmark-outline</v-icon>
        Save
      </v-btn>

      <v-btn variant="outlined" size="large" min-width="48" class="px-0 custom-btn secondary-btn">
        <v-icon>mdi-dots-horizontal</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
.actions-wrapper {
  width: 100%;
  display: flex;
  justify-content: center; /* Centre le conteneur lui-même */
}

/* On s'assure que le contenu flex ne se bloque pas à gauche */
.no-scrollbar {
  display: flex;
  flex-wrap: nowrap; /* Garde tout sur une ligne pour le scroll mobile */
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Pour desktop, si tu veux rester centré aussi, retire 'justify-sm-start' dans le template */
@media (min-width: 600px) {
  .gap-2 {
    gap: 16px; /* On espace un peu plus sur grand écran */
  }
}

/* Style des boutons inchangé pour garder la cohérence */
.custom-btn {
  border-radius: 8px !important;
  flex-shrink: 0; /* Empêche les boutons de rétrécir pour tenir */
}

.main-cta { color: white !important; }
.secondary-btn {
  border: 1px solid rgba(0, 0, 0, 0.25) !important;
  background-color: white !important;
}
</style>