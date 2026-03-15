<!-- Mobile sticky header that appears when hero scrolls out of view -->
<template>
  <!-- Fixed top app bar (mobile only, shown when hero is not visible) -->
  <v-app-bar
    class="position-fixed"
    color="primary"
    v-show="!headerWithImageIsVisible"
    v-if="isMobile"
    flat
    border
  >
    <!-- Menu icon -->
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <!-- Restaurant name -->
    <v-app-bar-title class="font-weight-bold">
      {{ biz?.name }}
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <!-- Action icons -->
    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-app-bar>

  <!-- Hero section with image carousel (tracked for visibility) -->
  <div class="position-relative" ref="headerWithImage">
    <DetailBuisnessCard
      :restaurant-title="biz?.name || ''"
      :review="biz?.reviews_count || 0"
      :rating="biz?.rating || 0.0"
      :isOpen="biz?.is_open || false"
      :description="biz?.description || ''"
      :images="images"
    ></DetailBuisnessCard>
  </div>
</template>

<script setup lang="ts">
import type { Biz, GroupedBizMedia } from "~/types/biz";

import { useElementVisibility } from "@vueuse/core";

const props = defineProps<{
  biz: Biz | undefined;
  media: GroupedBizMedia | undefined;
}>();

// Créer une liste avec tous les liens de chaque tableau dans media
const images = Object.values(props?.media)
  .flat()
  .map((item) => item.link);

// Inject mobile state from parent
const isMobile = inject("isMobile", false);

// Template ref for visibility tracking
const headerWithImage = useTemplateRef("headerWithImage");

// Track if hero section is visible
const headerWithImageIsVisible = useElementVisibility(headerWithImage);
</script>
