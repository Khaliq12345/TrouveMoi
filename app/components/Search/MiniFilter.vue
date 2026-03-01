<template>
    <v-sheet class="py-2 px-4 d-flex align-center" color="transparent">
        <v-slide-group show-arrows class="flex-grow-1">
            <!-- Bouton Plus compact -->
            <v-slide-group-item>
                <v-btn
                    @click="emit('showDrawer')"
                    variant="text"
                    density="comfortable"
                    size="small"
                    class="text-caption mr-2"
                    prepend-icon="mdi-filter-variant"
                >
                    Plus
                </v-btn>
            </v-slide-group-item>

            <!-- Select compact -->
            <v-slide-group-item>
                <v-select
                    v-model="select"
                    :items="[
                        'California',
                        'Colorado',
                        'Florida',
                        'Georgia',
                        'Texas',
                        'Wyoming',
                    ]"
                    placeholder="Région"
                    variant="plain"
                    density="compact"
                    hide-details
                    class="text-caption mr-4"
                    style="min-width: 120px; max-width: 140px"
                    clearable
                />
            </v-slide-group-item>

            <!-- Toggle buttons sobres -->
            <v-slide-group-item>
                <v-btn-toggle
                    v-model="selectedFilters2"
                    color="primary"
                    variant="text"
                    density="compact"
                    class="mr-4"
                    multiple
                >
                    <v-btn value="left" size="small" class="text-caption px-3">
                        Left
                    </v-btn>
                    <v-btn
                        value="center"
                        size="small"
                        class="text-caption px-3"
                    >
                        Center
                    </v-btn>
                </v-btn-toggle>
            </v-slide-group-item>

            <!-- Chips compacts -->
            <v-slide-group-item>
                <v-chip-group
                    v-model="selectedFilters"
                    color="primary"
                    variant="outlined"
                    class="gap-1"
                >
                    <v-chip
                        v-for="i in 4"
                        :key="i"
                        :value="`Filter ${i}`"
                        size="small"
                        class="text-caption"
                        filter
                    >
                        Filter {{ i }}
                    </v-chip>
                </v-chip-group>
            </v-slide-group-item>
        </v-slide-group>

        <!-- Compteur de filtres actifs -->
        <v-chip
            v-if="filterCount > 0"
            color="primary"
            size="x-small"
            class="ml-2"
            closable
            @click:close="clearFilters"
        >
            {{ filterCount }}
        </v-chip>
    </v-sheet>
</template>

<script setup lang="ts">
const emit = defineEmits(["showDrawer"]);

const selectedFilters = ref<string[]>([]);
const selectedFilters2 = ref<string[]>([]);
const select = ref("");

const filterCount = computed(
    () =>
        selectedFilters.value.length +
        selectedFilters2.value.length +
        (select.value ? 1 : 0),
);

function clearFilters() {
    selectedFilters.value = [];
    selectedFilters2.value = [];
    select.value = "";
}
</script>

<style scoped>
:deep(.v-slide-group__content) {
    gap: 4px;
    align-items: center;
}

:deep(.v-field__input) {
    min-height: 32px !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
}

:deep(.v-chip--selected) {
    background-color: rgb(var(--v-theme-primary));
    color: white;
}

.gap-1 {
    gap: 4px;
}
</style>
