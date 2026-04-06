<!-- Mobile view with map/video toggle and results button -->
<template>
    <!-- Main container (mobile only) -->
    <v-main class="d-md-none fill-height">
        <v-sheet class="fill-height d-flex flex-column bg-transparent">
            <!-- Top controls bar -->
            <v-sheet
                color="transparent"
                class="d-flex justify-end align-center pa-4 ga-2"
            >
                <!-- Button to open results bottom sheet -->
                <v-btn
                    rounded="pill"
                    size="small"
                    variant="tonal"
                    @click="resultsSheet = true"
                >
                    Résultats
                </v-btn>
            </v-sheet>

            <!-- Main content area (map or video view) -->
            <v-sheet color="transparent" class="flex-grow-1 overflow-hidden">
                <!-- Video view -->
                <SearchMobileVideoView />
            </v-sheet>

            <!-- The bottom section for the mobile screen, it contains the data -->
            <search-mobile-bottom-section
                v-model:resultsSheet="resultsSheet"
            ></search-mobile-bottom-section>
        </v-sheet>
    </v-main>
</template>

<script setup lang="ts">
// Component props and events
const resultsSheet = ref(false); // Mobile results sheet visibility
const viewMode = ref("carte"); // Mobile view mode: 'carte' or 'video
</script>
