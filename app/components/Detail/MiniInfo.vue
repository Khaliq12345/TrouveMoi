<!-- Compact business info with status and description -->
<template>
  <v-container class="px-4 py-4">
    <v-row no-gutters>
      <v-col cols="12">
        <!-- Business name -->
        <div class="text-h6 font-weight-bold mb-1 text-grey-darken-4">
          {{ bussness?.name }}
        </div>

        <!-- Closed status -->
        <p class="text-error font-weight-bold">
          {{ bussness?.status === "opened" ? "Ouvert" : "Fermé" }}
        </p>

        <!-- Last updated timestamp -->
        <p class="text-caption text-grey mb-4">
          Dernière mise à jour
          {{ new Date(bussness?.date_updated).toLocaleDateString("fr-FR") }}
        </p>

        <!-- Business description -->
        <p class="text-body-2 text-grey-darken-3">
          {{ bussness?.description }}
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
const props = defineProps({bussness: Object})
</script>
