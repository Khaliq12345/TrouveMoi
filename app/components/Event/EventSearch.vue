<template>
    <div>
        <v-row class="mb-6" justify="center">
            <v-col cols="12" md="6" lg="4">
                <v-text-field
                    :model-value="searchQuery"
                    @update:model-value="onSearchInput"
                    placeholder="Rechercher..."
                    prepend-inner-icon="mdi-magnify"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    hide-details
                    clearable
                    class="mt-2"
                />
            </v-col>
        </v-row>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();

// 1. Sync local state with current URL on load
const searchQuery = ref((route.query.search as string) || "");

// 2. The function that actually updates the URL and wait for some seconds before applying
const updateSearchRoute = useDebounceFn((val: string) => {
    router.push({
        query: {
            ...route.query,
            search: val || undefined,
            page: 1,
        },
    });
}, 400);

// 3. Watch for manual input changes
const onSearchInput = (val: string) => {
    searchQuery.value = val;
    updateSearchRoute(val);
};
</script>
