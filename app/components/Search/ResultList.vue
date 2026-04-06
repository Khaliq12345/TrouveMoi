<!-- Infinite scroll container for search results with loading and empty states -->
<template>
    <ClientOnly>
        <v-infinite-scroll
            :key="JSON.stringify(route.query)"
            :items="businesses"
            @load="onLoad"
            class="w-100"
            :style="!isMobile ? 'max-height: 900px; overflow-y: auto;' : ''"
        >
            <!-- Result items loop -->

            <SearchResult
                class="mb-2 w-100"
                :biz="biz"
                v-for="biz in businesses"
                :key="biz?.id"
            />

            <!-- Loading indicator -->
            <template v-slot:loading>
                <div class="d-flex justify-center pa-4">
                    <v-progress-circular indeterminate color="primary" />
                </div>
            </template>

            <RelatedSearch />
        </v-infinite-scroll>
    </ClientOnly>
</template>

<script setup lang="ts">
const route = useRoute();
// 1. Destructure hasMore from your injected data
const { businesses, pending, refresh, page, hasMore } = inject(
    "businesses-data",
) as any;

const isMobile = inject("isMobile");

async function onLoad({ done }) {
    // 1. Guard: If we are already fetching or there's no more data, stop.
    if (pending.value || !hasMore.value) {
        done(hasMore.value ? "ok" : "empty");
        return;
    }

    // 2. Increment the page
    // Because 'page' is watched in useAsyncData, this triggers the fetch automatically
    page.value++;

    // 3. Wait for the fetch to actually complete
    // useAsyncData's refresh returns the new data or a promise
    await nextTick();
    await until(pending).toBe(false);
    await nextTick();

    // 4. Use the reactive 'hasMore' from the composable to tell Vuetify when to stop
    if (!hasMore.value) {
        done("empty");
    } else {
        done("ok");
    }
}
</script>
