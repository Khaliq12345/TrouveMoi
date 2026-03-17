<template>
    <div class="d-flex flex-column align-center mt-8 mb-12">
        <v-btn
            v-if="currentPage < totalPages"
            color="primary"
            variant="outlined"
            rounded="xl"
            size="large"
            class="text-none px-10"
            :loading="isLoading"
            @click="currentPage++"
        >
            Charger plus
            <template v-slot:append>
                <v-icon icon="mdi-chevron-down"></v-icon>
            </template>
        </v-btn>

        <p v-else class="text-caption text-grey">
            Vous avez consulté tous les signalements
        </p>
    </div>
</template>

<script setup lang="ts">
const { currentPage, totalCount, PER_PAGE, isLoading } = inject("supportContext") as {
    currentPage: Ref<number>;
    totalCount: Ref<number>;
    PER_PAGE: number;
    isLoading: Ref<boolean>;
};

/** Nombre total de pages calculé à partir du count et de PER_PAGE */
const totalPages = computed(() =>
    totalCount.value > 0 ? Math.ceil(totalCount.value / PER_PAGE) : 1
);
</script>
