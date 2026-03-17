<template>
    <v-card class="d-flex flex-column h-100" flat tile color="transparent">
        <!-- Filter title and count section with action -->
        <v-card-item class="border-b pa-4" color="transparent">
            <div class="d-flex align-center justify-space-between w-100">
                <v-card-title class="text-h6 font-weight-bold pa-0"
                    >Filtres</v-card-title
                >
                <v-btn
                    v-if="activeFiltersCount > 0"
                    variant="text"
                    size="small"
                    color="primary"
                    class="text-none font-weight-bold"
                    @click="clearAllFilters"
                >
                    Tout effacer
                </v-btn>
            </div>
            <v-card-subtitle class="pa-0 mt-1">
                {{ activeFiltersCount }} filtre{{
                    activeFiltersCount > 1 ? "s" : ""
                }}
                actif
            </v-card-subtitle>
        </v-card-item>

        <!-- All filters section -->

        <v-card-item color="transparent">
            <div style="height: 800px; overflow-y: auto">
                <v-list
                    lines="one"
                    select-strategy="classic"
                    class="pa-0 bg-transparent"
                >
                    <search-is-open-filter />
                    <v-divider />
                    <search-price-filter />
                    <v-divider />
                    <search-category-filter />
                    <v-divider />
                    <search-feature-filter />
                    <v-divider />
                </v-list>
            </div>
        </v-card-item>
    </v-card>
</template>

<script setup lang="ts">
const isMobile = inject("isMobile", ref(false));
const route = useRoute();
const router = useRouter();

const activeFiltersCount = computed(() => {
    const filterKeys = ["sub_category", "price_range", "features", "is_open"];

    return filterKeys.reduce((count, key) => {
        if (!route.query[key]) return count;
        return (
            count + String(route.query[key]).split(",").filter(Boolean).length
        );
    }, 0);
});

const clearAllFilters = () => {
    router.push({ query: {} });
};
</script>
