<!-- Main navigation header with search and user actions -->
<template>
  <!-- Top navigation bar -->
  <v-app-bar flat color="white" height="64" class="border-b">
    <v-container class="d-flex align-center">
      <!-- Logo/Brand -->
      <v-btn variant="text" class="text-h5 font-weight-bold mr-4" style="color: #ff1a1a;">
        Yelp
      </v-btn>

      <!-- Search bar container -->
      <v-card class="flex-grow-1 mr-4" flat>
        <v-row no-gutters>
          <!-- Search query input -->
          <v-col cols="5">
            <v-text-field
              v-model="searchQuery"
              placeholder="tacos, cheap dinner, Max's"
              variant="solo"
              density="comfortable"
              hide-details
              class="rounded-0 rounded-s"
              bg-color="grey-lighten-4"
            >
              <template v-slot:prepend-inner>
                <v-icon color="red" size="small">mdi-magnify</v-icon>
              </template>
            </v-text-field>
          </v-col>
          <!-- Location input -->
          <v-col cols="5">
            <v-text-field
              v-model="locationQuery"
              placeholder="San Francisco, CA"
              variant="solo"
              density="comfortable"
              hide-details
              class="rounded-0"
              bg-color="grey-lighten-4"
            >
              <template v-slot:prepend-inner>
                <v-icon color="red" size="small">mdi-map-marker</v-icon>
              </template>
            </v-text-field>
          </v-col>
          <!-- Search button -->
          <v-col cols="2">
            <v-btn color="red" height="40" class="rounded-0 rounded-e w-100" style="background-color: #ff1a1a;">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>

      <!-- Navigation links and auth buttons -->
      <div class="d-flex align-center gap-2">
        <v-btn variant="text" class="text-none font-weight-medium">For Businesses</v-btn>
        <v-btn variant="text" class="text-none font-weight-medium">Write a Review</v-btn>
        <v-divider vertical class="mx-2"></v-divider>
        <v-btn variant="text" class="text-none font-weight-medium">Log In</v-btn>
        <v-btn color="red" variant="flat" class="text-none font-weight-medium" style="background-color: #ff1a1a;">
          Sign Up
        </v-btn>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
// Search state
const searchQuery = ref('Restaurants')
const locationQuery = ref('San Francisco, CA')
</script>
