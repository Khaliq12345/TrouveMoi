<!-- Desktop layout with filter sidebar, results list, and map view in three-column layout -->
<template>
    <!-- Main container (desktop only) -->
    <v-main class="fill-height">
        <v-container fluid class="pa-0 fill-height">
            <v-row no-gutters class="fill-height" size="12">
                <!-- Left and center columns (filters + results) -->
                <v-col lg="9" md="8" class="">
                    <v-row no-gutters class="fill-height" size="12">
                        <!-- Filter sidebar (large screens only) -->
                        <v-col lg="3" class="d-none d-lg-flex fill-height">
                            <SearchFilter />
                        </v-col>
                        <!-- Results list column -->
                        <v-col lg="9" class="d-flex flex-column w-full pt-4">
                            <!-- Header with title and mini filter -->

                            <h1 class="text-h5 font-weight-bold">
                                Liste des résultats
                            </h1>
                            <!-- Mini filter (shown when sidebar is hidden) -->
                            <div class="d-block d-lg-none py-3">
                                <SearchMiniFilter
                                    @show-drawer="$emit('open-drawer')"
                                />
                            </div>

                            <!-- Scrollable results area -->
                            <div
                                class="flex-grow-1 overflow-y-auto pa-2"
                                style="height: 0"
                            >
                                <SearchResultList
                                    :businesses="results"
                                    @load="$emit('load', $event)"
                                    class="w-100"
                                />
                            </div>
                        </v-col>
                    </v-row>
                </v-col>

                <!-- Right column (map placeholder) -->
                <v-col cols="4" lg="3" class="border-s bg-red-500"> </v-col>
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
