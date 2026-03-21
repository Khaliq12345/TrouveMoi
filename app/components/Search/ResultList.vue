<!-- Infinite scroll container for search results with loading and empty states -->
<template>
    <!-- Infinite scroll wrapper -->
    <v-infinite-scroll :items="businesses" @load="onLoad" class="w-100">
        <!-- Result items loop -->

        <SearchResult
            class="mb-2 w-100"
            :bussness="bussness"
            v-for="bussness in businesses"
            :key="bussness?.id"
        />

        <!-- Loading indicator -->
        <template v-slot:loading>
            <div class="d-flex justify-center pa-4">
                <v-progress-circular indeterminate color="primary" />
            </div>
        </template>

        <!-- Empty state message -->
        <template v-slot:empty>
            <v-alert type="info" variant="plain" class="ma-2">
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
    if (pending.value && page.value === 1) {
        done("ok");
        return;
    }

    // 2. Increment pagination
    page.value++;

    // 3. Wait for the new data to fetch
    await refresh();

    // 4. Proper check for the end of the biz
    if (
        businesses.value.length === 0 ||
        businesses.value.length % limit.value !== 0
    ) {
        done("empty");
    } else {
        done("ok");
    }
}
</script>
