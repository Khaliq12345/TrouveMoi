<template>
    <v-sheet color="transparent" class="d-flex align-center">
        <v-slide-group show-arrows class="align-center">
            <!-- More filters button -->
            <v-slide-group-item>
                <v-btn
                    @click="emit('showDrawer')"
                    rounded="pill"
                    size="small"
                    class="text-none mx-1 border-sm px-3"
                    style="height: 32px"
                    prepend-icon="mdi-filter-variant"
                    color="primary"
                >
                    Filtres
                </v-btn>
            </v-slide-group-item>

            <v-divider vertical class="my-auto mx-2" style="height: 20px" />

            <!-- Is Open Filter -->
            <v-slide-group-item>
                <SearchIsOpenFilter mini />
            </v-slide-group-item>

            <v-divider vertical class="my-auto mx-2" style="height: 20px" />

            <!-- Price Range Filter -->
            <v-slide-group-item>
                <SearchPriceFilter mini />
            </v-slide-group-item>

            <v-divider vertical class="my-auto mx-2" style="height: 20px" />

            <!-- Subcategories Filter -->
            <v-slide-group-item>
                <SearchCategoryFilter mini />
            </v-slide-group-item>
        </v-slide-group>
    </v-sheet>
</template>

<script setup lang="ts">
const emit = defineEmits(["showDrawer"]);
</script>

<style scoped>
:deep(.v-slide-group__content) {
    align-items: center !important;
}

:deep(.v-chip-group .v-slide-group__content) {
    padding: 0 !important;
}

:deep(.v-btn-toggle) {
    gap: 4px;
}
</style>
