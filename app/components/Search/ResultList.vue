<!-- Infinite scroll container for search results with loading and empty states -->
<template>
    <!-- Infinite scroll wrapper -->
    <v-infinite-scroll
        :items="results"
        @load="$emit('load', $event)"
        class="w-100"
    >
        <!-- Result items loop -->
        <template v-for="item in results" :key="item.id">
            <SearchResult class="mb-2 w-100"/>
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

<script setup>
// Component props and events
defineProps(["results"]);
defineEmits(["load"]);
</script>
