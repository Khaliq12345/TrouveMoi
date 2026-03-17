<!-- Business highlights grid with icons showing key features -->
<template>
  <v-container class="pa-0 py-8">
    <!-- Section header with info icon -->
    <div class="d-flex align-center mb-6 px-4">
      <h2 class="text-h5 font-weight-bold mr-2">Highlights from the Business</h2>
      <v-icon size="small" color="grey-lighten-1">mdi-information-outline</v-icon>
    </div>

    <!-- Highlights grid -->
    <v-row no-gutters class="px-2">
      <v-col 
        v-for="(highlight, i) in highlights" 
        :key="i"
        cols="4" 
        sm="2" 
        class="d-flex flex-column align-center text-center pa-2 mb-4"
      >
        <!-- Icon avatar with background -->
        <v-avatar size="56" color="grey-lighten-4" class="mb-3 rounded-xl">
          <v-icon :color="highlight.color" size="28">{{ highlight.icon }}</v-icon>
        </v-avatar>

        <!-- Highlight text -->
        <span class="text-caption font-weight-medium text-grey-darken-3 leading-tight" style="line-height: 1.2;">
          {{ highlight.text }}
        </span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
// Business highlights with icons and colors
interface Highlight {
  text: string;
  icon: string;
  color: string;
}

const highlights: Highlight[] = [
  { text: 'Outdoor seating', icon: 'mdi-umbrella-beach', color: 'teal-darken-1' },
  { text: 'Locally owned & operated', icon: 'mdi-store-check', color: 'orange-darken-2' },
  { text: 'Vegetarian friendly', icon: 'mdi-leaf', color: 'green-darken-2' },
  { text: 'Kitchen open late', icon: 'mdi-clock-night-outline', color: 'indigo-darken-1' },
  { text: 'Healthy dining', icon: 'mdi-food-apple', color: 'deep-orange-darken-1' },
  { text: 'Casual dining', icon: 'mdi-cake-variant', color: 'blue-grey-darken-2' },
];
</script>

<style scoped>
/* Force text wrapping */
.leading-tight {
  display: block;
  max-width: 90px;
}

/* Smooth hover animation */
.v-avatar {
  transition: all 0.3s ease;
  cursor: pointer;
}

.v-avatar:hover {
  transform: translateY(-5px);
  background-color: #f0f0f0 !important;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}
</style>
