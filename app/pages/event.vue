<template>
    <v-layout class="flex flex-col">
        <AppBar />
        <v-main class="">
            <v-container
                class="pa-2 bg-background mx-auto"
                style="max-width: 1200px"
            >
                <EventHeader></EventHeader>
                <v-divider class="mb-6"></v-divider> <EventStats />
                <EventSearch></EventSearch>
                <EventPagination />
                <div v-if="status !== 'pending'">
                    <EventData></EventData>
                </div>
                <div v-else class="py-10 d-flex justify-center">
                    <EventLoading></EventLoading>
                </div>

                <EventPagination />
            </v-container>
        </v-main>
        <BottomNav v-if="isMobile" />
        <Footer v-else></Footer>
    </v-layout>
</template>

<script setup lang="ts">
const isMobile = inject("isMobile");

// Initialise events counts data
const { countPending, filteredCount } = await useFetchEventsCount();

// Initialize events data
const { eventsData, PER_PAGE, status } = await useFetchEvents();

// Partage de l'état et des méthodes avec les composants enfants
provide("eventContext", {
    eventsData,
    filteredTotal: filteredCount,
    PER_PAGE,
    countPending,
});
</script>
