<template>
    <!-- Main layout container -->
    <v-layout class="flex-column fill-height">
        <!-- Top navigation bar -->
        <AppBar style="position: fixed; top: 0; left: 0; right: 0; z-index: 1000" />

        <!-- Mobile view (map/video toggle) -->
        <SearchMobileView v-show="isMobile" />

        <!-- Desktop view (filters + results + map) -->
        <SearchDesktopView v-show="!isMobile" @open-drawer="drawer = true" />
    </v-layout>

    <!-- CORRECTION: Déplacer le drawer À L'INTÉRIEUR du v-layout -->
    <v-navigation-drawer v-if="!isMobile" v-model="drawer" temporary width="320" location="left"
        class="fill-height z-50" elevation="10" style="top: 0; height: 100vh; position: fixed">
        <SearchFilter />
    </v-navigation-drawer>
    <!-- Le v-layout doit fermer APRÈS le drawer -->
</template>

<script setup lang="ts">
const route = useRoute();

// UI state management
const drawer = ref(false); // Desktop filter drawer visibility

// pagination and filters
const page = ref(1);
const limit = ref(5);
const { getAllURLFilters } = useFilterURL();

// Inject mobile state from parent
const isMobile = inject("isMobile");

const { $directus, $readItems } = useNuxtApp();
const businesses = ref([]);
const {
    data: records,
    error,
    pending,
    refresh,
} = await useAsyncData(
    "businesses",
    async () => {
        const filters = getAllURLFilters();
        console.log(filters, page.value);
        if (Object.keys(filters).length === 0) {
            console.log("Filter is empty");
            filters.categories = "cafe";
        }

        // On prépare l'objet de requête final
        let query: any = {};
        query.filter = {};

        for (const [key, value] of Object.entries(filters)) {
            if (key === "search") {
                query.search = value;
            }

            if (key === "featured_slots") {
                query.filter.featuredslots = {
                    featured_slots_id: {
                        slug: Array.isArray(value)
                            ? { _in: value }
                            : { _eq: value },
                    },
                };
            }

            if (key === "sub_categories") {
                query.filter.sub_categories = {
                    sub_categories_id: {
                        slug: Array.isArray(value)
                            ? { _in: value }
                            : { _eq: value },
                    },
                };
            }

            if (key === "categories") {
                query.filter.categories = {
                    categories_new_id: {
                        slug: Array.isArray(value)
                            ? { _in: value }
                            : { _eq: value },
                    },
                };
            }
            if (key === "price_range") {
                query.filter.price_range = {
                    _in: value,
                };
            }
            if (key === "is_open") {
                const is_open = value === "open";
                query.filter.is_open = {
                    _eq: is_open,
                };
            }
        }

        // 1. Récupération complète des businesses (Tes champs originaux sont TOUS là)
        const response = await $directus.request(
            $readItems("businesses", {
                fields: [
                    "id", // Obligatoire pour la jointure manuelle ensuite
                    "name",
                    "description",
                    "phone",
                    "slug",
                    "rating",
                    "price_range",
                    "website",
                    "reviews_count",
                    "categories.categories_new_id.name",
                    "featuredslots.featured_slots_id.feature",
                    "is_open",
                ],
                filter: query.filter,
                search: query.search,
                limit: limit.value,
                page: page.value,
            }),
        );

        // On extrait les IDs pour la suite
        const businessIds = response.map(b => b.id);

        // 2. Requête pour les localisations (La fameuse relation inverse)
        // Note : Vérifie bien si c'est "business_id" ou "bussness_id" (vu dans ton code)
        const locations = await $directus.request(
            $readItems("business_locations", {
                filter: {
                    bussness: {
                        _in: businessIds
                    }
                },
                fields: ["id", "city", "bussness"]
            })
        );

        // 3. Fusion des données pour retrouver l'objet complet
        const finalData = response.map(business => {
            return {
                ...business,
                // On réinjecte les localisations dans l'objet business correspondant
                locations: locations.filter(loc => loc.bussness === business.id)
            };
        });

        return finalData;
    },
    {
        watch: [() => route.query],
    },
);


// 4. Check for errors in your template or script
if (error.value) {
    console.log("AsyncData Error details:", error.value);
}
if (records.value) {
    businesses.value.push(...records.value);
}

provide("businesses-data", {
    businesses,
    error,
    pending,
    refresh,
    page,
    limit,
});
</script>
