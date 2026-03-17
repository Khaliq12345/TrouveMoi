<template>
    <v-main class="fill-height">
        <v-sheet class="pa-0 fill-height" border="md">
            <v-row no-gutters class="fill-height">
                <v-col cols="12" md="8" lg="9" class="fill-height">
                    <v-row no-gutters class="fill-height">
                        <v-col
                            lg="3"
                            class="d-none d-lg-flex flex-column border-e fill-height"
                        >
                            <SearchFilter />
                        </v-col>

                        <v-col
                            cols="12"
                            lg="9"
                            class="d-flex flex-column fill-height"
                        >
                            <div class="px-4 pt-4">
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

                                <div class="d-block d-lg-none py-3">
                                    <SearchMiniFilter
                                        @show-drawer="$emit('open-drawer')"
                                    />
                                </div>
                            </div>

                            <div class="flex-grow-1 overflow-y-auto pa-4">
                                <SearchResultList />
                            </div>
                        </v-col>
                    </v-row>
                </v-col>

                <v-col
                    md="4"
                    lg="3"
                    class="d-none d-md-flex bg-grey-lighten-3 border-s"
                >
                    <div class="pa-4">Map View</div>
                </v-col>
            </v-row>
        </v-sheet>
    </v-main>
</template>

<script setup lang="ts">
const { pending } = inject("businesses-data") as any;
defineEmits(["open-drawer"]);
</script>
