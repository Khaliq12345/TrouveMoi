<!-- Desktop layout with filter sidebar, results list, and map view in three-column layout -->
<template>
    <!-- Main container (desktop only) -->
    <v-main class="desktopView d-none d-md-flex fill-height">
        <v-container fluid class="pa-0 fill-height">
            <v-row no-gutters class="fill-height">
                <!-- Left and center columns (filters + results) -->
                <v-col cols="12" md="8" class="pa-0 fill-height">
                    <v-row no-gutters class="fill-height">
                        <!-- Filter sidebar (large screens only) -->
                        <v-col
                            cols="4"
                            class="d-none d-lg-flex border-e fill-height"
                        >
                            <SearchFilter />
                        </v-col>

                        <!-- Results list column -->
                        <v-col
                            cols="12"
                            lg="8"
                            class="d-flex flex-column"
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
                <v-col
                    cols="4"
                    class="d-none d-md-flex bg-red-500 border-s"
                ></v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script setup>
// Component props and events
defineProps(["results"]);
defineEmits(["load", "open-drawer"]);
</script>
