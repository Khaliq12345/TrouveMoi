<!-- Mobile sticky header that appears when hero scrolls out of view -->
<template>
  <div>
    <!-- Fixed top app bar (mobile only, shown when hero is not visible) -->
    <v-app-bar
      class="position-fixed"
      color="primary"
      v-show="!headerWithImageIsVisible"
      v-if="isMobile"
      flat
      border
    >
      <!-- Restaurant name -->
      <v-app-bar-title class="font-weight-bold text-no-wrap">
        {{ biz?.name }}
      </v-app-bar-title>

      <!-- Action icons -->
      <v-btn icon to="/search">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Hero section with image carousel (tracked for visibility) -->
    <div class="position-relative" ref="headerWithImage">
      <DetailBuisnessCard />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Biz } from "~/types/biz";

import { useElementVisibility } from "@vueuse/core";

// Inject mobile state from parent
const isMobile = inject("isMobile", false);
const biz = inject<Biz | undefined | null>("biz");

// Template ref for visibility tracking
const headerWithImage = useTemplateRef("headerWithImage");

// Track if hero section is visible
const headerWithImageIsVisible = useElementVisibility(headerWithImage);
</script>
