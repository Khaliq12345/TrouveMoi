<template>
    <div class="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <v-bottom-navigation
            v-model="value"
            color="black"
            grow
            class="!shadow-none h-16 glass-primary"
        >
            <v-btn value="settings" class="flex-col gap-1">
                <v-icon size="24">mdi-cog</v-icon>
                <span class="text-xs">Paramètres</span>
            </v-btn>

            <v-btn value="notifications" class="flex-col gap-1">
                <v-icon size="24">mdi-bell</v-icon>
                <span class="text-xs">Alertes</span>
            </v-btn>

            <v-btn value="profile" class="flex-col gap-1">
                <v-icon size="24">mdi-account</v-icon>
                <span class="text-xs">Profil</span>
            </v-btn>
        </v-bottom-navigation>
    </div>
</template>

<script setup lang="ts">
// État de l'onglet actif (par défaut sur paramètres)
const value = ref("settings");
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