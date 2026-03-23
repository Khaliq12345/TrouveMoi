<template>
    <v-sheet
        border
        rounded="lg"
        class="pa-4 d-flex align-center ga-4"
        max-width="400"
        color="transparent"
        :elevation="0"
    >
        <v-progress-circular
            indeterminate
            color="primary"
            size="24"
            width="3"
        ></v-progress-circular>

        <div class="d-flex flex-column">
            <span class="text-body-2 font-weight-bold"
                >Mise à jour des événements</span
            >
            <span class="text-caption text-medium-emphasis"
                >Veuillez patienter quelques instants...</span
            >
        </div>
    </v-sheet>
</template>

<script setup lang="ts"></script>
