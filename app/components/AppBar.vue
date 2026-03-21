<template>
    <v-app-bar
        flat
        color="transparent"
        height="70"
        extension-height="50"
        style="backdrop-filter: blur(4px)"
        :class="`px-4 blue-content text-${color}`"
    >
        <h1 class="font-weight-bold text-h5 flex-grow-0" v-if="!isMobile">
            Trouve-moi
        </h1>

        <v-spacer />

        <div
            class="d-flex ga-2 align-center"
            style="width: 100%; max-width: 600px"
        >
            <!-- Term search -->
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

            <!-- Location Search -->
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
        </div>

        <v-spacer />

        <!-- Desktop actions -->
        <div class="d-flex ga-2" v-if="!isMobile">
            <v-btn icon="mdi-cog" variant="text" />
            <v-btn icon="mdi-bell" variant="text" />
            <v-btn icon="mdi-account" variant="text" />
        </div>

        <!-- Mobile and Desktop Menu -->
        <template v-slot:extension>
            <div class="w-full d-flex justify-center">
                <Menu />
            </div>
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
/* Optional: Tighten the gap between the two inputs to make them look unified */
.v-text-field :deep(.v-field) {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
}
</style>
