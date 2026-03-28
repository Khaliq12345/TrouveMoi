<template>
    <v-app-bar
        flat
        color="transparent"
        height="70"
        extension-height="50"
        class="glass-primary text-white"
    >
        <v-container class="d-flex align-center fill-height px-4">
            <NuxtLink class="font-weight-bold text-h5 flex-grow-0" v-if="!isMobile" to="/">
                Trouve-moi
            </NuxtLink>

            <v-spacer />

            <v-sheet
                color="transparent"
                class="d-flex ga-2 align-center mx-auto"
                width="100%"
                max-width="600"
            >
                <v-text-field
                    v-model="searchQuery"
                    placeholder="Quoi chercher ?"
                    variant="solo"
                    hide-details
                    density="compact"
                    rounded="s-lg"
                    prepend-inner-icon="mdi-magnify"
                    @keyup.enter="handleSearch"
                />

                <v-text-field
                    v-model="locationQuery"
                    placeholder="Où ? (Ville, Quartier...)"
                    variant="solo"
                    hide-details
                    density="compact"
                    rounded="e-lg"
                    prepend-inner-icon="mdi-map-marker"
                    @keyup.enter="handleSearch"
                >
                    <template v-slot:append-inner>
                        <v-btn
                            icon="mdi-arrow-right"
                            variant="text"
                            size="small"
                            color="primary"
                            @click="handleSearch"
                        />
                    </template>
                </v-text-field>
            </v-sheet>

            <v-spacer />

            <div class="d-flex ga-2" v-if="!isMobile">
                <v-btn icon="mdi-calendar" variant="text" to="/event" />
                <v-btn icon="mdi-headphones" variant="text" to="/support" />
            </div>
        </v-container>

        <template v-slot:extension>
            <v-container class="d-flex justify-center py-0">
                <Menu />
            </v-container>
        </template>
    </v-app-bar>
</template>

<script setup lang="ts">
const props = defineProps({
    color: {
        type: String,
        default: "dark",
    },
});

const { updateURL } = useFilterURL();
const router = useRouter();
const route = useRoute();

const searchQuery = ref("");
const locationQuery = ref(""); // New location ref
const isMobile = inject("isMobile");

function handleSearch() {
    const searchVal = searchQuery.value.trim();
    const locationVal = locationQuery.value.trim();

    // Prepare the new query parameters
    const newQuery = {
        ...route.query, // Keeps existing & queries automatically
    };

    if (searchVal) newQuery.search = searchVal;
    if (locationVal) newQuery.location = locationVal;

    if (route.path !== "/search") {
        router.push({
            path: "/search",
            query: newQuery,
        });
    } else {
        // Using your custom updateURL utility
        if (searchVal) updateURL("search", [searchVal]);
        if (locationVal) updateURL("location", [locationVal]);
    }
}
</script>
<style scoped>
/* Assure que tous les boutons et icônes dans la barre sont blancs.
   On utilise :deep() car ce sont des sous-composants Vuetify.
*/
:deep(.v-btn) {
  color: white !important;
}
/* Le texte à l'intérieur des inputs doit rester sombre pour être lisible 
   sur le fond blanc des champs de recherche (variant="solo").
*/
:deep(.v-field__input) {
  color: rgba(0, 0, 0, 0.87) !important;
}

/* On s'assure que l'extension de la barre hérite bien de la transparence 
   pour que le flou soit continu sur toute la hauteur (120px).
*/
:deep(.v-toolbar__content),
:deep(.v-toolbar__extension) {
  background-color: transparent !important;
}
</style>