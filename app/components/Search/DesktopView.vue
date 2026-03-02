<!-- Desktop layout with filter sidebar, results list, and map view in three-column layout -->
<template>
    <!-- Main container (desktop only) -->
    <v-main class="desktopView d-none d-md-flex fill-height">
        <v-container fluid class="pa-0 fill-height">
            <v-row no-gutters class="fill-height" size="12">
                <!-- Left and center columns (filters + results) -->
                <v-col lg="9" md="8" class="pa-0 fill-height">
                    <v-row no-gutters class="fill-height" size="12">
                        <!-- Filter sidebar (large screens only) -->
                        <v-col lg="3" class="d-none d-lg-flex fill-height">
                            <SearchFilter />
                        </v-col>

                        <!-- Results list column -->
                        <v-col
                            lg="9"
                            sm="8"
                            class="d-flex flex-column w-full"
                            style="height: 100vh; overflow: hidden"
                        >
                            <!-- Header with title and mini filter -->
                            <div class="px-1 flex-shrink-0">
                                <h1 class="text-h5 font-weight-bold mb-2">
                                    Liste des résultats
                                </h1>
                                <!-- Mini filter (shown when sidebar is hidden) -->
                                <div class="d-block d-lg-none">
                                    <SearchMiniFilter
                                        @show-drawer="$emit('open-drawer')"
                                    />
                                </div>
                            </div>

                            <!-- Scrollable results area -->
                            <div class="flex-grow-1 overflow-y-auto pa-2">
                                <SearchResultList
                                    :results="results"
                                    @load="$emit('load', $event)"
                                />
                            </div>
                        </v-col>
                    </v-row>
                </v-col>

                <!-- Right column (map placeholder) -->
                <v-col md="4" lg="3" class="d-none d-md-flex border-s"> </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script setup lang="ts">
// ✅ After

// Component props and events
defineProps(["results"]);
defineEmits(["load", "open-drawer"]);
</script>
