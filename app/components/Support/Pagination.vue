<template>
    <div class="d-flex flex-column align-center mt-8 mb-12">
        <v-btn
            v-if="hasMore"
            color="primary"
            variant="outlined"
            rounded="xl"
            size="large"
            class="text-none px-10"
            :loading="isLoading"
            @click="loadMore"
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
import type { Ref } from 'vue';

// Injection des variables et fonctions depuis le composant parent
const { isLoading, hasMore, loadMore } = inject("support") as {
    isLoading: Ref<boolean>;
    hasMore: Ref<boolean>;
    loadMore: () => void;
};
</script>