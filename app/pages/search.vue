<template>
    <v-layout class="flex-column">
        <HomeAppBar />

        <v-main>
            <v-container fluid class="pa-0 fill-height">
                <v-row no-gutters class="fill-height">
                    <v-col cols="12" md="6" class="pa-0 fill-height">
                        <v-row no-gutters class="fill-height">
                            <v-col
                                cols="4"
                                class="bg-purple-500 d-none d-lg-flex border-e"
                            >
                                <SearchFilter />
                            </v-col>

                            <v-col
                                cols="12"
                                lg="8"
                                class="d-flex flex-column fill-height"
                                style="overflow-hidden"
                            >
                                <div class="px-1">
                                    <div class="d-flex flex-column">
                                        <h1 class="text-h5 font-weight-bold">
                                            Liste des résultats
                                        </h1>

                                        <div class="d-lg-none">
                                            <SearchMiniFilter
                                                @show-drawer="drawer = true"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div class="flex-grow-1 overflow-y-auto pa-2">
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
                        cols="6"
                        class="d-none d-md-flex bg-red-500 border-s"
                    >
                    </v-col>

                    <v-col
                        cols="12"
                        class="bg-amber-500 d-flex d-md-none align-center justify-center"
                        style="height: 60px"
                    >
                        <p class="text-caption">Vue Mobile active</p>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-layout>

    <v-navigation-drawer v-model="drawer" temporary width="320">
        <SearchFilter />
    </v-navigation-drawer>
</template>

<script setup>
const drawer = ref(false);
const infiniteScrollRef = ref(null);

// Données réactives
const results = ref([]);
const page = ref(1);
const isEmpty = ref(false);
const isLoading = ref(false);

// Générateur de faux résultats
function generateFakeItems(count, startId) {
    return Array.from({ length: count }, (_, i) => ({
        id: startId + i,
        title: `Résultat ${startId + i}`,
        description: `Description simulée pour l'élément ${startId + i}`,
    }));
}

// Handler pour l'événement load avec vérification supplémentaire
function onLoad({ side, done }) {
    // Double protection : si empty ou déjà en chargement, on ignore
    if (isEmpty.value || isLoading.value) {
        if (isEmpty.value) {
            done("empty");
        }
        return;
    }

    loadMore({ side, done });
}

// Fonction de chargement simulé
async function loadMore({ done }) {
    isLoading.value = true;

    try {
        // Simulation délai réseau
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Génère 5 éléments à chaque appel
        const newItems = generateFakeItems(5, results.value.length + 1);

        results.value.push(...newItems);
        page.value++;

        // Arrête après 2 chargements (10 éléments total)
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
