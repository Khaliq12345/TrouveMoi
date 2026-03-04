<template>
  <v-container class="bg-white px-4 py-4">
    <v-row no-gutters>
      <v-col cols="12">
        <div class="text-h6 font-weight-bold mb-1 text-grey-darken-4">
          Cuisine du Szechuan
        </div>
        
        <div class="d-flex align-center text-body-2 mb-1">
          <span class="text-error font-weight-bold">Fermé</span>
          <span class="text-grey-lighten-1 mx-2">•</span>
          <v-btn 
            variant="text" 
            color="cyan-darken-2" 
            class="text-none pa-0 font-weight-bold"
            density="compact"
          >
            See hours
          </v-btn>
        </div>

        <div class="text-caption text-grey mb-4">
          Updated over 3 months ago
        </div>

        <p class="text-body-2 text-grey-darken-3">
          Casual takeout spot focusing on spicy Szechuan dishes with popular crab rangoon.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>