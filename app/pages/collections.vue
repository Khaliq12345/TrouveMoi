<template>
  <ClientOnly>
    <v-layout>
      <HomeAppBar />
      <v-main>
        <v-container>
          <v-sheet color="transparent">
            <v-tabs v-model="tab" color="primary">
              <v-tab value="self">Mes favoris</v-tab>
              <v-tab value="rated">Les plus noté</v-tab>
            </v-tabs>

            <v-divider></v-divider>

            <v-tabs-window v-model="tab" class="pt-4">
              <v-sheet color="transparent" class="d-flex flex-column flex-sm-row justify-space-between align-sm-center w-100 py-4">
                <p class="text-body-1 mb-4 mb-sm-0">
                  <strong class="text-grey-darken-4">Recherche dans</strong>
                  <span class="text-grey-darken-1 ml-2">San Francisco, CA</span>
                </p>
              
                <v-text-field
                  placeholder="San Francisco, CA"
                  variant="solo"
                  density="compact"
                  hide-details
                  flat
                  prepend-inner-icon="mdi-map-marker"
                  append-inner-icon="mdi-magnify"
                  class="elevation-1 rounded-lg w-100"
                  style="max-width: 400px"
                />
              </v-sheet>
              <v-tabs-window-item value="self">
                <CollectionSelf />
              </v-tabs-window-item>
              <v-tabs-window-item value="rated">
                <CollectionRated />
              </v-tabs-window-item>
            </v-tabs-window>
          </v-sheet>
          <v-pagination :length="5" class="pt-5"></v-pagination>
        </v-container>
      </v-main>
    </v-layout>
  </ClientOnly>
</template>
<script setup>
import { ref } from "vue";
const tab = ref("self");
</script>
