<template>
    <v-infinite-scroll
        :items="results"
        @load="$emit('load', $event)"
        class="w-100"
    >
        <template v-for="item in results" :key="item.id">
            <SearchResult :item="item" class="mb-2" />
        </template>

        <template v-slot:loading>
            <div class="d-flex justify-center pa-4">
                <v-progress-circular indeterminate color="primary" />
            </div>
        </template>

        <template v-slot:empty>
            <v-alert type="info" variant="tonal" class="ma-2">
                Plus de résultats disponibles
            </v-alert>
        </template>
    </v-infinite-scroll>
</template>

<script setup>
defineProps(["results"]);
defineEmits(["load"]);
</script>
