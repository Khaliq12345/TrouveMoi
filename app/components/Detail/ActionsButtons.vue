<template>
  <div class="d-flex justify-center w-100 mb-md-6">
    <v-slide-group class="pa-2" center-active show-arrows="desktop">
      <v-slide-group-item>
        <div class="d-flex ga-3 px-2">
          <v-btn
            color="#E00707"
            size="large"
            flat
            class="text-none font-weight-bold rounded-lg text-white"
          >
            <v-icon start size="20">mdi-star-outline</v-icon>
            Write a Review
          </v-btn>

          <v-btn
            v-for="(btn, i) in secondaryButtons"
            :key="i"
            variant="outlined"
            size="large"
            color="grey-darken-1"
            class="text-none font-weight-bold rounded-lg bg-white"
            :min-width="btn.iconOnly ? '48' : undefined"
          >
            <v-icon :start="!btn.iconOnly" size="20">{{ btn.icon }}</v-icon>
            {{ btn.text }}
          </v-btn>
        </div>
      </v-slide-group-item>
    </v-slide-group>
  </div>
</template>

<script setup>
const secondaryButtons = [
  { text: "Add photo", icon: "mdi-camera-plus-outline" },
  { text: "Share", icon: "mdi-share-variant-outline" },
  { text: "Save", icon: "mdi-bookmark-outline" },
  { text: "", icon: "mdi-dots-horizontal", iconOnly: true },
];
</script>
