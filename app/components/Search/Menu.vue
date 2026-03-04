<template>
  <div class="d-flex ga-x-2">
    <v-menu
      v-for="n in 4"
      :key="n"
      open-on-hover
      location="bottom"
      :close-delay="100"
    >
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" variant="text" class="text-none">
          Bottom
          <v-icon end>mdi-chevron-down</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="i in 3" :key="i" :title="`Item ${i}`" @click="" />
      </v-list>
    </v-menu>
  </div>
</template>

<script setup>
// Rien de spécial ici
</script>