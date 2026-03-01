<template>
    <v-layout class="flex-column">
        <HomeAppBar />

        <v-main>
            <v-container fluid class="pa-0 fill-height">
                <v-row no-gutters class="fill-height">
                    <v-col cols="6" class="d-none d-md-flex pa-0">
                        <v-row no-gutters class="fill-height">
                            <v-col
                                cols="4"
                                class="bg-purple-500 d-none d-lag-flex"
                            >
                                <SearchFilter />
                            </v-col>

                            <v-col cols="8" md="12" lg="8" class="bg-blue-500">
                                <h1>Liste des résultats</h1>
                                <div class="d-none d-md-flex d-lg-none">
                                    <SearchMiniFilter
                                        @show-drawer="drawer = true"
                                    />
                                </div>

                                <v-infinite-scroll
                                    :items="results"
                                    :onLoad="loadMore"
                                    @load="onLoad"
                                    ref="infiniteScrollRef"
                                >
                                    <template
                                        v-for="(item, index) in results"
                                        :key="item.id"
                                    >
                                        <SearchResult :item="item" />
                                    </template>

                                    <template v-slot:loading>
                                        <v-progress-circular
                                            indeterminate
                                            color="primary"
                                        />
                                    </template>

                                    <template v-slot:empty>
                                        <v-alert type="info"
                                            >Plus de résultats
                                            disponibles</v-alert
                                        >
                                    </template>
                                </v-infinite-scroll>
                            </v-col>
                        </v-row>
                    </v-col>

                    <v-col cols="6" class="d-none d-md-flex bg-red-500">
                    </v-col>

                    <v-col
                        cols="12"
                        class="bg-amber-500 d-flex d-md-none"
                        style="height: 100px"
                    >
                        <p>Vue Mobile (Amber)</p>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-layout>
    <v-navigation-drawer v-model="drawer" temporary>
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
