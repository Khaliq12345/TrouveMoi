<template>
    <v-layout class="flex-column">
        <HomeAppBar />

        <SearchDesktopView
            :results="results"
            @load="onLoad"
            @open-drawer="drawer = true"
        />

        <SearchMobileView
            v-model:viewMode="viewMode"
            @open-results="resultsSheet = true"
        />

        <v-navigation-drawer v-model="drawer" temporary width="320">
            <SearchFilter />
        </v-navigation-drawer>

        <v-bottom-sheet v-model="resultsSheet" inset scrollable>
            <v-card height="70vh">
                <v-card-title class="d-flex flex-column align-start pa-2">
                    <div class="d-flex align-center w-100">
                        <span class="text-h6">Résultats</span>
                        <v-spacer />
                        <v-btn
                            icon="mdi-close"
                            variant="text"
                            @click="resultsSheet = false"
                        />
                    </div>
                    <SearchMiniFilter />
                </v-card-title>
                <v-divider />
                <v-card-text class="pa-0">
                    <SearchResultList :results="results" @load="onLoad" />
                </v-card-text>
            </v-card>
        </v-bottom-sheet>
    </v-layout>
</template>

<script setup>
const drawer = ref(false);
const resultsSheet = ref(false);
const viewMode = ref("carte"); // 'carte' ou 'video'

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
