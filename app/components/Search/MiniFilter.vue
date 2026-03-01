<template>
    <v-sheet class="" max-width="600">
        <v-slide-group show-arrows>
            <v-btn @click="emit('showDrawer')">Plus</v-btn>
            <v-select
                clearable
                label="Select"
                v-model="select"
                :items="[
                    'California',
                    'Colorado',
                    'Florida',
                    'Georgia',
                    'Texas',
                    'Wyoming',
                ]"
            ></v-select>
            <v-btn-toggle
                v-model="selectedFilters2"
                color="deep-purple-accent-3"
                rounded="0"
                group
                multiple
            >
                <v-btn value="left"> Left </v-btn>

                <v-btn value="center"> Center </v-btn>
            </v-btn-toggle>
            <v-chip-group
                v-model="selectedFilters"
                selected-class="text-primary"
                mandatory
            >
                <v-chip
                    text="ChipsFilters 1"
                    value="ChipsFilters 1"
                    variant="outlined"
                    filter
                ></v-chip>

                <v-chip
                    text="ChipsFilters 2"
                    value="ChipsFilters 2"
                    variant="outlined"
                    filter
                ></v-chip>

                <v-chip
                    text="ChipsFilters 3"
                    value="ChipsFilters 3"
                    variant="outlined"
                    filter
                ></v-chip>

                <v-chip
                    text="ChipsFilters 4"
                    value="ChipsFilters 4"
                    variant="outlined"
                    filter
                ></v-chip>
            </v-chip-group>
        </v-slide-group>
    </v-sheet>
</template>
<script setup lang="ts">
const emit = defineEmits(["showDrawer"]);
// État réactif pour stocker les sélections (Tableau de chaînes)
const selectedFilters = ref<string[]>([]);

const selectedFilters2 = ref<string[]>([]);

const select = ref("");

// Calcul dynamique du compteur
const filterCount = computed(() => selectedFilters.value.length);

// Fonction pour vider les filtres
function clearFilters() {
    selectedFilters.value = [];
}
</script>
