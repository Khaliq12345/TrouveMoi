<template>
    <v-sheet class="py-2" color="transparent">
        <v-slide-group show-arrows class="align-center">
            <!-- Bouton Plus - même hauteur que le v-menu -->
            <v-slide-group-item>
                <v-btn
                    @click="emit('showDrawer')"
                    variant="outlined"
                    rounded="pill"
                    size="small"
                    class="text-none mx-1 border-sm px-3"
                    style="height: 32px"
                    prepend-icon="mdi-filter-variant"
                    color="primary"
                >
                    Plus
                </v-btn>
            </v-slide-group-item>

            <v-slide-group-item>
                <v-menu>
                    <template v-slot:activator="{ props }">
                        <v-btn
                            v-bind="props"
                            variant="outlined"
                            rounded="pill"
                            size="small"
                            class="text-none mx-1 px-3"
                            color=""
                            append-icon="mdi-chevron-down"
                        >
                            <span class="text-caption font-weight-bold">{{
                                select || "Région"
                            }}</span>
                        </v-btn>
                    </template>
                    <v-list density="compact">
                        <v-list-item
                            v-for="item in [
                                'California',
                                'Colorado',
                                'Florida',
                                'Georgia',
                                'Texas',
                                'Wyoming',
                            ]"
                            :key="item"
                            :title="item"
                            @click="select = item"
                        />
                    </v-list>
                </v-menu>
            </v-slide-group-item>

            <!-- Chips simples -->
            <v-slide-group-item>
                <v-chip-group
                    v-model="selectedFilters"
                    variant="outlined"
                    class="mx-1"
                    selected-class="bg-primary text-white"
                >
                    <v-chip
                        v-for="i in 4"
                        :key="i"
                        :value="`Filter ${i}`"
                        size="small"
                        rounded="pill"
                        class="text-caption"
                        filter
                    >
                        Filter {{ i }}
                    </v-chip>
                </v-chip-group>
            </v-slide-group-item>

            <!-- Chips groupés -->
            <v-slide-group-item>
                <v-chip-group
                    v-model="selectedFiltersGrouped"
                    variant="tonal"
                    class="mx-1"
                    multiple
                    selected-class="bg-primary text-white"
                >
                    <v-chip
                        v-for="i in 4"
                        :key="i"
                        :value="`Filter grouped ${i}`"
                        size="small"
                        rounded="pill"
                        class="text-caption"
                        filter
                    >
                        Grouped {{ i }}
                    </v-chip>
                </v-chip-group>
            </v-slide-group-item>
        </v-slide-group>
    </v-sheet>
</template>

<script setup lang="ts">
const emit = defineEmits(["showDrawer"]);

const selectedFilters = ref([]);
const selectedFiltersGrouped = ref([]);
const select = ref("Texas");
</script>

<style scoped>
/* Uniquement pour forcer l'alignement vertical du slide group */
:deep(.v-slide-group__content) {
    align-items: center;
}
</style>
