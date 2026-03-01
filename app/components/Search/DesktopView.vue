<template>
    <v-main class="desktopView d-none d-md-flex fill-height">
        <v-container fluid class="pa-0 fill-height">
            <v-row no-gutters class="fill-height">
                <v-col cols="12" md="8" class="pa-0 fill-height">
                    <v-row no-gutters class="fill-height">
                        <v-col
                            cols="4"
                            class="d-none d-lg-flex border-e fill-height"
                        >
                            <SearchFilter />
                        </v-col>

                        <v-col
                            cols="12"
                            lg="8"
                            class="d-flex flex-column"
                            style="height: 100vh; overflow: hidden"
                        >
                            <div class="px-1 flex-shrink-0">
                                <h1 class="text-h5 font-weight-bold mb-2">
                                    Liste des résultats
                                </h1>
                                <div class="d-block d-lg-none">
                                    <SearchMiniFilter
                                        @show-drawer="$emit('open-drawer')"
                                    />
                                </div>
                            </div>

                            <div class="flex-grow-1 overflow-y-auto pa-2">
                                <SearchResultList
                                    :results="results"
                                    @load="$emit('load', $event)"
                                />
                            </div>
                        </v-col>
                    </v-row>
                </v-col>

                <v-col
                    cols="4"
                    class="d-none d-md-flex bg-red-500 border-s"
                ></v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script setup>
defineProps(["results"]);
defineEmits(["load", "open-drawer"]);
</script>
