<template>
  <v-app-bar flat color="transparent" class="glass-primary text-white">
    <div class="w-100 text-center">
      <NuxtLink
        class="font-weight-bold text-h5 text-white text-decoration-none"
        to="/"
      >
        Trouve-moi
      </NuxtLink>
    </div>

    <template v-slot:append>
      <v-btn icon="mdi-magnify" variant="text" @click="openSearch = true" />
    </template>
  </v-app-bar>

  <SearchDialog v-model="openSearch" title="Que voulez chercher ?" />
</template>

<script setup lang="ts">
// État qui gère l'ouverture du composant enfant
const openSearch = ref(false);
</script>
<style scoped>
</style>