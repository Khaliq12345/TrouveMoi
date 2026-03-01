<template>
    <v-layout class="flex-column fill-height">
        <HomeAppBar />

        <SearchMobileView
            v-if="isMobile"
            v-model:viewMode="viewMode"
            @open-results="resultsSheet = true"
        />
        <SearchDesktopView
            v-if="!isMobile"
            :results="results"
            @load="onLoad"
            @open-drawer="drawer = true"
        />
        <ClientOnly>
            <v-navigation-drawer
                v-if="!isMobile"
                v-model="drawer"
                temporary
                width="320"
                location="left"
                class="fill-height"
                style="top: 0; height: 100vh; position: fixed"
            >
                <SearchFilter />
            </v-navigation-drawer>
        </ClientOnly>

        <v-dialog v-if="isMobile" v-model="mobileFilter" width="auto">
            <v-card max-width="400">
                <SearchFilter @applyFilter="mobileFilter = false" />
            </v-card>
        </v-dialog>

        <v-bottom-sheet v-if="isMobile" v-model="resultsSheet" inset scrollable>
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
                    <SearchMiniFilter @show-drawer="mobileFilter = true" />
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

const mobileFilter = ref(false);
const results = ref([]);
const page = ref(1);
const isEmpty = ref(false);
const isLoading = ref(false);

const isMobile = inject("isMobile");

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
