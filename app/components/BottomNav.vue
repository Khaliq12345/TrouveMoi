<template>
  <ClientOnly>
    <div class="fixed bottom-0 left-0 right-0 z-50">
      <v-bottom-navigation
        v-model="value"
        color="black"
        grow
        class="!shadow-none h-16 glass-primary"
      >
        <v-btn value="home" class="flex-col gap-1" to="/">
          <v-icon size="24">mdi-home</v-icon>
          <span class="text-xs">Accueil</span>
        </v-btn>

        <v-btn value="event" class="flex-col gap-1" to="/event">
          <v-icon size="24">mdi-calendar</v-icon>
          <span class="text-xs">Événements</span>
        </v-btn>

        <v-btn value="support" class="flex-col gap-1" to="/support">
          <v-icon size="24">mdi-headphones</v-icon>
          <span class="text-xs">Support</span>
        </v-btn>
      </v-bottom-navigation>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
// État de l'onglet actif (par défaut sur home)
const value = ref("home");
</script>

<style scoped>
/* On cible uniquement les boutons qui ne sont PAS sélectionnés 
   pour leur appliquer la couleur blanche. 
*/
:deep(.v-btn:not(.v-btn--selected)) {
  color: white !important;
  opacity: 0.8; /* Légère atténuation pour la hiérarchie visuelle */
}

/* Le bouton sélectionné (.v-btn--selected) héritera naturellement 
   de la couleur "primary" définie sur le v-bottom-navigation.
*/
</style>
