<template>
    <v-sheet
        color="transparent"
        class="d-flex flex-column flex-md-row align-center align-md-end justify-space-between mb-8 ga-6"
    >
        <!-- Title with sutitle -->
        <div class="text-center text-md-left">
            <h1
                class="text-h5 font-weight-bold text-grey-darken-4 tracking-tight"
            >
                Liste des problèmes signalés
            </h1>
            <p class="text-caption text-grey-darken-1 mb-0">
                Consultez et gérez les signalements en temps réel
            </p>
        </div>

        <!-- Here we have the filters and action button -->
        <div
            class="d-flex flex-column flex-sm-row ga-3 align-center w-100 w-md-auto justify-end"
        >
            <v-select
                v-model="statusFilter"
                :items="['Tous', 'En cours', 'Résolu']"
                variant="solo"
                flat
                bg-color="grey-lighten-4"
                hide-details
                density="comfortable"
                rounded="xl"
                class="status-select"
                prepend-inner-icon="mdi-filter-variant"
                chips
            ></v-select>
            <v-text-field
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                label="Rechercher un problème..."
                variant="solo"
                flat
                bg-color="grey-lighten-4"
                hide-details
                density="comfortable"
                rounded="xl"
                class="search-field"
            ></v-text-field>

            <v-btn
                color="primary"
                prepend-icon="mdi-plus"
                rounded="xl"
                elevation="0"
                class="text-none px-6 w-100 w-sm-auto"
                height="48"
                @click="$emit('showDialog')"
            >
                Signaler
            </v-btn>
        </div>
    </v-sheet>
</template>

<script setup lang="ts">
defineEmits(["showDialog"]);
const search = ref("");
const statusFilter = ref("Tous");
</script>

<style scoped>
.tracking-tight {
    letter-spacing: -0.025em !important;
}

.status-select {
    width: 100%;
}

.search-field {
    width: 100%;
}

@media (min-width: 600px) {
    .status-select {
        width: 160px !important;
    }
    .search-field {
        width: 300px !important;
    }
}
</style>
