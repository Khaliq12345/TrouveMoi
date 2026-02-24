<template>
  <!-- Navigation du bas fixe en mobile avec glassmorphism -->
  <div class="backdrop-blur-md md:hidden fixed bottom-0 left-0 right-0 z-50">
    <div class="backdrop-blur-lg bg-white/80 border-t border-white/40 shadow-2xl">
      <v-bottom-navigation 
        v-model="value" 
        color="primary" 
        grow
        class="!bg-transparent !shadow-none"
      >
        <v-btn value="settings" class="flex-col">
          <v-icon>mdi-cog</v-icon>
          <span class="text-caption mt-1">Paramètres</span>
        </v-btn>

        <v-btn value="notifications" class="flex-col">
          <v-icon>mdi-bell</v-icon>
          <span class="text-caption mt-1">Alertes</span>
        </v-btn>

        <v-btn value="profile" class="flex-col">
          <v-icon>mdi-account</v-icon>
          <span class="text-caption mt-1">Profil</span>
        </v-btn>
      </v-bottom-navigation>
    </div>
  </div>
</template>

<script setup>
const value = ref('settings')
</script>