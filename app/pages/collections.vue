<!-- Collections page with tabs for user favorites and top-rated collections -->
<template>
  <ClientOnly>
    <v-layout>
      <!-- Top navigation bar -->
      <HomeAppBar />
      
      <v-main>
        <v-container class="mx-auto" style="max-width: 1200px">
          <v-sheet color="transparent">
            <!-- Tab navigation for switching between views -->
            <v-tabs v-model="tab" color="primary">
              <v-tab value="self">My Favorites</v-tab>
              <v-tab value="rated">Top Rated</v-tab>
            </v-tabs>

            <v-divider></v-divider>

            <!-- Tab content area -->
            <v-tabs-window v-model="tab" class="pt-4">
              <!-- Location search header -->
              <v-sheet color="transparent" class="d-flex flex-column flex-sm-row justify-space-between align-sm-center w-100 py-4">
                <!-- Current search location display -->
                <p class="text-body-1 mb-4 mb-sm-0">
                  <strong class="text-grey-darken-4">Search in</strong>
                  <span class="text-grey-darken-1 ml-2">San Francisco, CA</span>
                </p>
              
                <!-- Location search input -->
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
              
              <!-- User's personal collections tab -->
              <v-tabs-window-item value="self">
                <CollectionSelf />
              </v-tabs-window-item>
              
              <!-- Top-rated collections tab -->
              <v-tabs-window-item value="rated">
                <CollectionRated />
              </v-tabs-window-item>
            </v-tabs-window>
          </v-sheet>
          
          <!-- Pagination controls -->
          <v-pagination :length="5" class="pt-5"></v-pagination>
        </v-container>
      </v-main>
    </v-layout>
  </ClientOnly>
</template>

<script setup>
import { ref } from "vue";

// Active tab state (default: user's favorites)
const tab = ref("self");
</script>
