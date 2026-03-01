<template>
    <v-container class="d-flex flex-column fill-height">
        <p class="selectedFilters-subtitle-1 mb-2">
            {{ filterCount }}
            {{ filterCount > 1 ? "filtres appliqués" : "filtre appliqué" }}
        </p>

        <v-checkbox
            v-model="selectedFilters"
            label="CheckboxFilters 1"
            value="CheckboxFilters 1"
            hide-details
            density="compact"
        ></v-checkbox>
        <v-checkbox
            v-model="selectedFilters"
            label="CheckboxFilters 2"
            value="CheckboxFilters 2"
            hide-details
            density="compact"
        ></v-checkbox>
        <v-checkbox
            v-model="selectedFilters"
            label="CheckboxFilters 3"
            value="CheckboxFilters 3"
            hide-details
            density="compact"
        ></v-checkbox>
        <v-checkbox
            v-model="selectedFilters"
            label="CheckboxFilters 4"
            value="CheckboxFilters 4"
            hide-details
            density="compact"
        ></v-checkbox>

        <v-divider class="my-2"></v-divider>

        <v-chip-group v-model="selectedFilters" column multiple>
            <v-chip
                selectedFilters="ChipsFilters 1"
                value="ChipsFilters 1"
                variant="outlined"
                filter
            >
                ChipsFilters 1
            </v-chip>
            <v-chip
                selectedFilters="ChipsFilters 2"
                value="ChipsFilters 2"
                variant="outlined"
                filter
            >
                ChipsFilters 2
            </v-chip>
            <v-chip
                selectedFilters="ChipsFilters 3"
                value="ChipsFilters 3"
                variant="outlined"
                filter
            >
                ChipsFilters 3
            </v-chip>
            <v-chip
                selectedFilters="ChipsFilters 4"
                value="ChipsFilters 4"
                variant="outlined"
                filter
            >
                ChipsFilters 4
            </v-chip>
        </v-chip-group>
        <v-btn-toggle
            v-model="selectedFilters2"
            color="deep-purple-accent-3"
            rounded="0"
            group
            multiple
        >
            <v-btn value="left"> Left </v-btn>

            <v-btn value="center"> Center </v-btn>

            <v-btn value="right"> Right </v-btn>

            <v-btn value="justify"> Justify </v-btn>
        </v-btn-toggle>

        <v-card-actions class="px-0 mt-auto">
            <v-spacer></v-spacer>

            <v-btn
                variant="selectedFilters"
                color="error"
                @click="clearFilters"
            >
                Annuler
            </v-btn>

            <v-btn variant="flat" color="primary" :disabled="filterCount === 0">
                Appliquer
            </v-btn>
        </v-card-actions>
    </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

// REACTIVE STATE: Array of strings to store selected filter values
const selectedFilters = ref<string[]>([]);

const selectedFilters2 = ref<string[]>([]);

// COMPUTED PROPERTY: Keeps track of the number of selected items
const filterCount = computed(() => selectedFilters.value.length);

// HELPER FUNCTION: Resets the selection array to empty
function clearFilters() {
    selectedFilters.value = [];
}
</script>
