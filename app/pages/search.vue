<template>
    <v-layout class="flex-column">
        <HomeAppBar />

        <!-- Desktop -->
        <v-main class="d-none d-md-flex fill-height">
            <v-container fluid class="pa-0 fill-height">
                <v-row no-gutters class="fill-height">
                    <v-col cols="12" md="8" class="pa-0 fill-height">
                        <v-row no-gutters class="fill-height">
                            <v-col
                                cols="4"
                                class="d-none d-lg-flex border-e fill-height overflow-y-auto"
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
                                    <h1
                                        class="text-h5 font-weight-bold mb-2 mb-lg-0"
                                    >
                                        Liste des résultats
                                    </h1>
                                    <div class="d-block d-lg-none">
                                        <SearchMiniFilter
                                            @show-drawer="drawer = true"
                                        />
                                    </div>
                                </div>

                                <div
                                    class="flex-grow-1 overflow-y-auto pa-2"
                                    style="min-height: 0"
                                >
                                    <v-infinite-scroll
                                        :items="results"
                                        :onLoad="loadMore"
                                        @load="onLoad"
                                        ref="infiniteScrollRef"
                                        class="w-100"
                                    >
                                        <template
                                            v-for="item in results"
                                            :key="item.id"
                                        >
                                            <SearchResult
                                                :item="item"
                                                class="w-100 mb-2"
                                            />
                                        </template>

                                        <template v-slot:loading>
                                            <div
                                                class="d-flex justify-center pa-4"
                                            >
                                                <v-progress-circular
                                                    indeterminate
                                                    color="primary"
                                                />
                                            </div>
                                        </template>

                                        <template v-slot:empty>
                                            <v-alert
                                                type="info"
                                                variant="tonal"
                                                class="ma-2"
                                            >
                                                Plus de résultats disponibles
                                            </v-alert>
                                        </template>
                                    </v-infinite-scroll>
                                </div>
                            </v-col>
                        </v-row>
                    </v-col>

                    <v-col
                        cols="4"
                        class="d-none d-md-flex bg-red-500 border-s"
                    >
                    </v-col>
                </v-row>
            </v-container>
        </v-main>

        <!-- Mobile : Vue Amber avec bottom sheet -->
        <v-main class="d-md-none fill-height bg-amber-500">
            <v-sheet class="fill-height d-flex flex-column">
                <v-sheet class="fill-height d-flex flex-column">
                    <!-- Header avec toggle + bouton résultats -->
                    <v-sheet
                        color="transparent"
                        class="d-flex justify-end align-center pa-4 ga-2"
                    >
                        <v-btn-toggle
                            v-model="viewMode"
                            color="primary"
                            variant="outlined"
                            density="compact"
                            rounded="pill"
                            mandatory
                        >
                            <v-btn
                                value="carte"
                                class="text-caption text-none px-3"
                            >
                                Carte
                            </v-btn>
                            <v-btn
                                value="video"
                                class="text-caption text-none px-3"
                            >
                                Vidéo
                            </v-btn>
                        </v-btn-toggle>

                        <v-btn
                            rounded="pill"
                            size="small"
                            variant="tonal"
                            @click="resultsSheet = true"
                        >
                            Résultats
                        </v-btn>
                    </v-sheet>

                    <!-- Contenu (prend l'espace restant) -->
                    <v-sheet
                        color="transparent"
                        class="flex-grow-1 d-flex align-center justify-center"
                    >
                        <span class="text-h6 text-center">Vue Mobile</span>
                    </v-sheet>
                </v-sheet>
                <!-- Contenu (prend l'espace restant) -->
                <v-sheet
                    color="transparent"
                    class="flex-grow-1 d-flex align-center justify-center"
                >
                    <span class="text-h6 text-center">Vue Mobile</span>
                </v-sheet>
            </v-sheet>
        </v-main>
    </v-layout>

    <!-- Desktop drawer -->
    <v-navigation-drawer v-model="drawer" temporary width="320">
        <SearchFilter />
    </v-navigation-drawer>

    <!-- Mobile bottom sheet avec résultats -->
    <v-bottom-sheet v-model="resultsSheet" inset scrollable>
        <v-card height="70vh">
            <!-- Header -->
            <v-card-title class="d-flex flex-column align-start pa-2">
                <!-- Ligne titre + fermeture -->
                <div class="d-flex align-center w-100">
                    <span class="text-h6">Résultats</span>
                    <v-spacer />
                    <v-btn
                        icon="mdi-close"
                        variant="text"
                        @click="resultsSheet = false"
                    />
                </div>

                <!-- Filtres sous le titre -->
                <div class="w-100 pa-0">
                    <SearchMiniFilter />
                </div>
            </v-card-title>

            <v-divider />

            <!-- Liste des résultats -->
            <v-card-text class="pa-0">
                <v-infinite-scroll
                    :items="results"
                    :onLoad="loadMore"
                    @load="onLoad"
                    class="w-100"
                >
                    <template v-for="item in results" :key="item.id">
                        <SearchResult :item="item" class="ma-2" />
                    </template>

                    <template v-slot:loading>
                        <div class="d-flex justify-center pa-4">
                            <v-progress-circular
                                indeterminate
                                color="primary"
                            />
                        </div>
                    </template>

                    <template v-slot:empty>
                        <v-alert type="info" variant="tonal" class="ma-2">
                            Plus de résultats disponibles
                        </v-alert>
                    </template>
                </v-infinite-scroll>
            </v-card-text>
        </v-card>
    </v-bottom-sheet>
</template>

<script setup>
const drawer = ref(false);
const resultsSheet = ref(false);
const viewMode = ref("carte"); // 'carte' ou 'video'
const infiniteScrollRef = ref(null);

const results = ref([]);
const page = ref(1);
const isEmpty = ref(false);
const isLoading = ref(false);

function generateFakeItems(count, startId) {
    return Array.from({ length: count }, (_, i) => ({
        id: startId + i,
        title: `Résultat ${startId + i}`,
        description: `Description simulée pour l'élément ${startId + i}`,
    }));
}

function onLoad({ side, done }) {
    if (isEmpty.value || isLoading.value) {
        if (isEmpty.value) done("empty");
        return;
    }
    loadMore({ side, done });
}

async function loadMore({ done }) {
    isLoading.value = true;
    try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const newItems = generateFakeItems(5, results.value.length + 1);
        results.value.push(...newItems);
        page.value++;

        if (page.value > 10) {
            isEmpty.value = true;
            done("empty");
        } else {
            done("ok");
        }
    } finally {
        isLoading.value = false;
    }
}
</script>
