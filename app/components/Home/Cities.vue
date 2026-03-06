<template>
  <v-sheet class="pa-8 rounded-xl" color="transparent">
    <!-- Header -->
    <div class="mb-6">
      <h2 class="text-h5 font-weight-bold mb-2">
        Explore searches in popular cities
      </h2>
      <p class="text-body-2 text-grey-darken-1">
        Discover what people are searching for in each city
      </p>
    </div>

    <!-- Cities chips -->
    <div class="d-flex flex-wrap ga-2">
      <v-chip
        v-for="city in cities"
        :key="city"
        :variant="selectedCity === city ? 'flat' : 'outlined'"
        :color="selectedCity === city ? 'primary' : 'grey-darken-1'"
        class="city-chip cursor-pointer transition-swing"
        size="large"
        @click="selectedCity = city"
      >
        {{ city }}
      </v-chip>
    </div>
  </v-sheet>
</template>

<script setup>
import { ref } from 'vue'

const selectedCity = ref('Los Angeles')

const cities = [
  'Los Angeles', 'New York', 'Chicago', 'Houston', 'San Diego',
  'Las Vegas', 'San Francisco', 'Dallas', 'San Jose', 'Phoenix',
  'Philadelphia', 'Atlanta', 'Austin', 'Brooklyn', 'Seattle'
]
</script>

<style scoped>
.city-chip {
  font-weight: 500;
}

.city-chip:hover {
  transform: translateY(-2px);
}
</style>