<template>
    <v-container class="py-8">
        <h2 class="text-h9 md:text-h6 font-weight-bold mb-6 text-grey-darken-4">
            Recherches associées à {{ route.query.location || "Cotonou" }}
        </h2>

        <v-row no-gutters>
            <v-col
                v-for="(item, index) in displayedItems"
                :key="index"
                cols="12"
                class="pb-2"
            >
                <v-btn
                    variant="text"
                    density="compact"
                    class="text-none justify-start px-0 text-body-2 font-weight-regular text-grey-darken-2 custom-wrap-btn"
                    block
                    :ripple="false"
                    @click="goToSearch(item)"
                >
                    {{ item }}
                </v-btn>
            </v-col>
        </v-row>

        <div v-if="isMobile && !showAll && allItems.length > 5" class="mt-6">
            <v-btn
                variant="outlined"
                color="primary"
                rounded="pill"
                size="small"
                class="text-none px-6"
                @click="showAll = true"
            >
                Tout voir
            </v-btn>
        </div>
    </v-container>
</template>

<script setup lang="ts">
const route = useRoute();
const isMobile = inject<Ref<Boolean>>("isMobile");
const showAll = ref(false);
const router = useRouter();

// Fonction appelée au clic pour rediriger vers la page de recherche avec les bons paramètres
const goToSearch = (item) => {
    // Amélioration de la Regex :
    const cityRegex = new RegExp(
        `\\s*(?:à|de|d'|au)?\\s*${route.query.location}\\b`,
        "i",
    );

    // Suppression de la ville et de sa préposition, puis nettoyage des espaces résiduels
    const cleanSearchTerm = item.replace(cityRegex, "").trim();

    // Navigation vers la page de recherche avec le terme parfaitement nettoyé
    router.push({
        path: "/search",
        query: {
            location: route.query.location,
            search: cleanSearchTerm,
        },
    });
};

// Récupération des données via l'utilitaire
const allItems = computed(() =>
    getCityRelatedSearches(route.query.location || "Cotonou"),
);

// Logique : Desktop = Tout / Mobile = 5 puis Tout
const displayedItems = computed(() => {
    if (!isMobile?.value) return allItems.value;
    return showAll.value ? allItems.value : allItems.value.slice(0, 5);
});
</script>

<style scoped>
/* Configuration pour le retour à la ligne forcé sans points de suspension */
.custom-wrap-btn {
    height: auto !important;
    min-height: 32px;
}

.custom-wrap-btn :deep(.v-btn__content) {
    white-space: normal !important;
    text-align: left;
    line-height: 1.4;
    word-break: break-word;
    padding: 4px 0;
}

.custom-wrap-btn:hover {
    text-decoration: underline !important;
    background-color: transparent !important;
    color: #1976d2 !important;
}
</style>
