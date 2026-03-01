<template>
    <div class="d-flex flex-column" style="height: 100%; max-height: 100vh">
        <div class="pa-4 flex-shrink-0">
            <p class="text-caption text-medium-emphasis">
                {{ filterCount }} {{ filterCount > 1 ? "filtres" : "filtre" }}
            </p>
            <v-divider class="mt-2" />
        </div>

        <div class="flex-grow-1 overflow-y-auto pa-4 pt-0">
            <p class="text-body-2 font-weight-medium mb-2">Catégories</p>
            <v-chip-group v-model="selectedFilters" column multiple>
                <v-chip
                    v-for="i in 10"
                    :key="i"
                    :value="`cat${i}`"
                    variant="outlined"
                    size="small"
                    filter
                    color="primary"
                >
                    Catégorie {{ i }}
                </v-chip>
            </v-chip-group>

            <v-divider class="my-4" />

            <p class="text-body-2 font-weight-medium mb-2">Spécificités</p>
            <div class="d-flex flex-wrap ga-2">
                <v-btn
                    v-for="i in 15"
                    :key="i"
                    @click="toggleSpec(`spec${i}`)"
                    :variant="
                        selectedFilters2.includes(`spec${i}`)
                            ? 'flat'
                            : 'outlined'
                    "
                    size="small"
                    class="text-none"
                    color="primary"
                    rounded="lg"
                >
                    Spécificité {{ i }}
                </v-btn>
            </div>
        </div>

        <v-sheet border="t" class="pa-4 flex-shrink-0 bg-surface">
            <div class="d-flex ga-2">
                <v-btn
                    variant="text"
                    class="flex-grow-1 text-none"
                    @click="clearFilters"
                >
                    Réinitialiser
                </v-btn>
                <v-btn
                    variant="flat"
                    color="primary"
                    class="flex-grow-1 text-none"
                    :disabled="filterCount === 0"
                    @click="emit('applyFilter')"
                >
                    Appliquer
                </v-btn>
            </div>
        </v-sheet>
    </div>
</template>
<script setup lang="ts">
const isMobile = inject("isMobile");

const emit = defineEmits(["applyFilter", "cancel"]);
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
