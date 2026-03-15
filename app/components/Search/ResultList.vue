<!-- Infinite scroll container for search results with loading and empty states -->
<template>
    <!-- Infinite scroll wrapper -->
    <v-infinite-scroll :items="businesses" @load="onLoad" class="w-100">
        <!-- Result items loop -->
        <template v-for="bussness in businesses" :key="bussness?.id">
            <SearchResult class="mb-2 w-100" :bussness="bussness" />
        </template>

        <!-- Loading indicator -->
        <template v-slot:loading>
            <div class="d-flex justify-center pa-4">
                <v-progress-circular indeterminate color="primary" />
            </div>
        </template>

        <!-- Empty state message -->
        <template v-slot:empty>
            <v-alert type="info" variant="tonal" class="ma-2">
                Plus de résultats disponibles
            </v-alert>
        </template>
    </v-infinite-scroll>
</template>

<script setup lang="ts">
// Component props and events
const { businesses, pending, refresh, error, page, limit } = inject(
    "businesses-data",
) as any;

async function onLoad({ done }) {
    // Increment pagination and refresh data
    page.value++;
    await refresh();

    // Check if no more data
    if (
        !businesses.value ||
        businesses.value.length < page.value * limit.value
    ) {
        done("empty");
        return;
    } else {
        done("ok");
    }
}
</script>
