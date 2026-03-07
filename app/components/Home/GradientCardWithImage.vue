<!-- Card component displaying location with image, title, subtitle, description, and action button -->
<template>
  <v-card class="mx-auto overflow-hidden rounded-xl" variant="flat" border>
    <!-- Hero image with gradient overlay and title -->
    <v-img
      :src="image"
      height="320"
      cover
      class="align-end text-white"
      :alt="title"
    >
      <!-- Loading placeholder -->
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular indeterminate color="grey-lighten-5" />
        </v-row>
      </template>

      <!-- Title overlay on image -->
      <v-toolbar color="transparent" flat density="compact">
        <v-card-title class="text-h5 font-weight-bold pb-4 px-4">
          {{ title }}
        </v-card-title>
      </v-toolbar>

      <!-- Gradient overlay for text readability -->
      <div
        class="fill-height"
        style="
          background: linear-gradient(
            to bottom,
            transparent 50%,
            rgba(0, 0, 0, 0.8) 100%
          );
        "
      />
    </v-img>

    <!-- Location subtitle with icon -->
    <v-card-item class="pb-0">
      <v-card-subtitle
        class="text-primary font-weight-bold text-uppercase"
        style="letter-spacing: 1px"
      >
        <v-icon icon="mdi-map-marker" size="small" class="me-1" />
        {{ subtitle }}
      </v-card-subtitle>
    </v-card-item>

    <!-- Description text -->
    <v-card-text class="text-body-1 text-grey-darken-2 py-3">
      {{ description }}
    </v-card-text>

    <v-divider class="mx-4" />

    <!-- Action button -->
    <v-card-actions class="pa-4">
      <v-btn
        color="primary"
        variant="elevated"
        :to="link"
        rounded="lg"
        block
        append-icon="mdi-chevron-right"
      >
        Découvrir
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
// Component props for card content
defineProps<{
  title: string;
  subtitle: string;
  description: string;
  link: string;
  image: string;
}>();
</script>
