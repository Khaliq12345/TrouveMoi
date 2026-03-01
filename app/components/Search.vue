<template>
    <!-- Barre de recherche avec glassmorphism -->
    <div class="search-container absolute left-1/2 -translate-x-1/2 p-2">
        <v-text-field
            v-model="search"
            placeholder="Rechercher un lieu, une ville..."
            variant="solo"
            hide-details
            density="comfortable"
            rounded="lg"
            prepend-inner-icon="mdi-magnify"
            append-inner-icon="mdi-arrow-right"
            class="glass-search"
        />
    </div>
</template>
<script setup>
const search = defineModel();
</script>
<style scoped>
/* Real Glassmorphism effect */
.glass-search :deep(.v-field) {
    background: rgba(255, 255, 255, 0.15) !important;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white !important;
}

.glass-search :deep(input::placeholder) {
    color: rgba(255, 255, 255, 0.8) !important;
}
</style>
