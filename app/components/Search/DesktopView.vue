<!-- Desktop layout with filter sidebar, results list, and map view in three-column layout -->
<template>
    <!-- Main container (desktop only) -->
    <v-main class="fill-height">
        <v-sheet fluid class="pa-0 fill-height" border="md">
            <v-row no-gutters class="fill-height" size="12">
                <!-- Left and center columns (filters + results) -->
                <v-col lg="9" md="8">
                    <v-row no-gutters class="fill-height" size="12">
                        <!-- Filter sidebar (large screens only) -->
                        <v-col md="3" class="d-none d-lg-flex fill-height">
                            <SearchFilter />
                        </v-col>

                        <v-divider
                            class="border-opacity-100"
                            color="primary"
                            vertical
                        ></v-divider>
                        <!-- Results list column -->
                        <v-col
                            md="9"
                            class="d-flex flex-column w-full px-4 pt-4"
                        >
                            <!-- Header with title and mini filter -->

                            <v-breadcrumbs
                                :items="['Foo', 'Bar']"
                            ></v-breadcrumbs>
                            <h1
                                class="text-h5 font-weight-bold d-flex align-center"
                            >
                                Liste des résultats

                                <v-progress-circular
                                    v-if="pending"
                                    indeterminate
                                    size="20"
                                    width="2"
                                    color="primary"
                                    class="ms-3"
                                ></v-progress-circular>
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
                                <SearchResultList class="w-100" />
                            </div>
                        </v-col>
                    </v-row>
                </v-col>

                <!-- Right column (map placeholder) -->
                <v-col cols="4" md="3" class="border-s bg-red-500"> </v-col>
            </v-row>
        </v-sheet>
    </v-main>
</template>

<script setup lang="ts">
const { pending } = inject("businesses-data") as any;
defineEmits(["open-drawer"]);
</script>
