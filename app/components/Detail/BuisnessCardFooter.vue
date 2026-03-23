<template>
  <div class="d-flex flex-column flex-md-row justify-center justify-md-start ga-3">
    <v-btn
      v-if="biz?.reservation_available && biz?.website"
      size="large"
      color="teal-darken-2"
      class="px-8 font-weight-bold"
      flat
      @click="openLink(biz.website)"
    >
      Réserver
    </v-btn>

    <v-btn
      v-if="biz?.calendar_link"
      size="large"
      variant="outlined"
      color="white"
      class="px-8"
      @click="openLink(biz.calendar_link)"
    >
      Rendez-vous
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import type { Biz } from "~/types/biz";

const biz = inject<Biz>("biz");

const openLink = (url: string) => {
  window.open(url, "_blank");
};
</script>