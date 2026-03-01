<template>
    <v-container class="d-flex flex-column fill-height pa-3">
        <!-- Compteur -->
        <p class="text-caption text-medium-emphasis mb-2">
            {{ filterCount }} {{ filterCount > 1 ? "filtres" : "filtre" }}
        </p>

        <v-divider class="my-2" />

        <!-- Catégories -->
        <p class="text-body-2 font-weight-medium mb-2">Catégories</p>
        <v-chip-group v-model="selectedFilters" column multiple>
            <v-chip
                v-for="i in 4"
                :key="i"
                :value="`cat${i}`"
                variant="outlined"
                size="small"
                class="text-caption ma-1"
                filter
                color="primary"
            >
                Catégorie {{ i }}
            </v-chip>
        </v-chip-group>

        <v-divider class="my-2" />

        <!-- Spécificités -->
        <p class="text-body-2 font-weight-medium mb-2">Spécificités</p>
        <div class="d-flex flex-wrap ga-2">
            <v-btn
                v-for="i in 4"
                :key="i"
                v-model="selectedFilters2"
                :value="`spec${i}`"
                :variant="
                    selectedFilters2.includes(`spec${i}`) ? 'flat' : 'outlined'
                "
                size="small"
                class="text-caption text-none"
                color="primary"
                rounded="lg"
                @click="toggleSpec(`spec${i}`)"
            >
                Spécificité {{ i }}
            </v-btn>
        </div>

        <v-spacer />

        <!-- Actions -->
        <v-card-actions class="px-0 pt-4">
            <v-spacer />
            <v-btn
                variant="text"
                size="small"
                class="text-caption mr-2"
                @click="clearFilters"
            >
                Réinitialiser
            </v-btn>
            <v-btn
                variant="flat"
                color="primary"
                size="small"
                class="text-caption"
                :disabled="filterCount === 0"
            >
                Appliquer
            </v-btn>
        </v-card-actions>
    </v-container>
</template>

<script setup lang="ts">
const selectedFilters = ref<string[]>([]);
const selectedFilters2 = ref<string[]>([]);

const filterCount = computed(
    () => selectedFilters.value.length + selectedFilters2.value.length,
);

function toggleSpec(value: string) {
    const index = selectedFilters2.value.indexOf(value);
    if (index > -1) {
        selectedFilters2.value.splice(index, 1);
    } else {
        selectedFilters2.value.push(value);
    }
}

function clearFilters() {
    selectedFilters.value = [];
    selectedFilters2.value = [];
}
</script>
