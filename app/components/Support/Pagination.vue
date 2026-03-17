<template>
    <div class="d-flex flex-column align-center mt-8 mb-12">
        <v-btn
            v-if="page < length"
            color="primary"
            variant="outlined"
            rounded="xl"
            size="large"
            class="text-none px-10"
            :loading="loading"
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
interface Props {
    page: number;
    length: number;
    loading?: boolean;
}

const props = defineProps<Props>();
</script>
