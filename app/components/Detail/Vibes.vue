<!-- Photo galleries section showing different atmosphere categories -->
<template>
  <v-container class="pa-0 py-8">
    <!-- Section header -->
    <div class="d-flex align-center justify-space-between mb-6 px-4">
      <div>
        <h2 class="text-h4 font-weight-bold mb-1">What's the vibe?</h2>
        <p class="text-body-2 text-grey-darken-1">
          Explore the atmosphere through our galleries
        </p>
      </div>
    </div>

    <!-- Vibe categories grid -->
    <v-row class="px-2">
      <v-col v-for="(vibe, i) in vibes" :key="i" cols="12" sm="4">
        <!-- Vibe card with image -->
        <v-card class="rounded-xl overflow-hidden vibe-card" flat height="350">
          <v-img :src="vibe.image" height="100%" cover class="d-flex align-end">
            <!-- Gradient overlay with text -->
            <div class="vibe-overlay pa-6 w-100">
              <h3 class="text-h5 font-weight-bold text-white mb-1">
                {{ vibe.title }}
              </h3>
              <p class="text-body-2 text-white-70">{{ vibe.count }} photos</p>
            </div>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
// Vibe categories with photo counts

interface Vibe {
  title: string;
  count: number | string;
  image: string;
}

const vibes: Vibe[] = [
  {
    title: "Inside",
    count: 444,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
  },
  {
    title: "Outside",
    count: 83,
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800",
  },
  {
    title: "All photos",
    count: "3,143",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
  },
];
</script>

<style scoped>
/* Card hover animation */
.vibe-card {
  cursor: pointer;
  transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.vibe-card:hover {
  transform: scale(1.02);
}

/* Gradient overlay for text readability */
.vibe-overlay {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
}

/* Semi-transparent white text */
.text-white-70 {
  color: rgba(255, 255, 255, 0.8);
}

/* Image zoom on hover */
.vibe-card :deep(.v-img__img) {
  transition: transform 0.6s ease;
}

.vibe-card:hover :deep(.v-img__img) {
  transform: scale(1.1);
}
</style>
