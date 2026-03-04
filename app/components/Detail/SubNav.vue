<!-- Secondary navigation bar with category links -->
<template>
  <!-- Sub navigation app bar -->
  <v-app-bar flat height="48" color="white" class="border-b">
    <v-container class="py-0">
      <!-- Navigation items -->
      <div class="d-flex gap-4">
        <v-btn
          v-for="item in navItems"
          :key="item"
          variant="text"
          class="text-none text-body-2 font-weight-medium px-2"
          :class="{ 'text-red font-weight-bold': item === 'Restaurants' }"
        >
          {{ item }}
        </v-btn>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script setup>
// Navigation items array
const navItems = ['Restaurants', 'Home Services', 'Auto Services', 'More', 'Collections', 'Talk', 'Events', 'Support']
</script>
