<template>
    <v-container class="pa-4 py-8">
        <div class="d-flex align-center mb-6">
            <v-icon
                icon="mdi-star-face"
                color="primary"
                class="me-2"
                size="28"
            />
            <h2 class="text-h6 text-md-h5 font-weight-black text-grey-darken-4">
                Proposé / Sur les lieux
            </h2>
        </div>

        <v-row no-gutters class="ga-3">
            <v-col v-for="slot in featuredSlots" :key="slot.id" cols="auto">
                <v-chip
                    variant="tonal"
                    color="primary"
                    class="px-4 py-5 border"
                    label
                >
                    <v-icon
                        start
                        icon="mdi-check-circle-outline"
                        size="18"
                        class="opacity-70"
                    />
                    <span class="text-subtitle font-weight-medium">
                        {{ slot.feature }}
                    </span>
                </v-chip>
            </v-col>
        </v-row>

        <div
            v-if="!featuredSlots?.length"
            class="text-grey-lighten-1 text-italic"
        >
            Aucun service spécifique n'a été renseigné.
        </div>
    </v-container>
</template>

<script setup lang="ts">
import type { FeaturedSlot } from "~/types/biz";

defineProps<{
    id: string;
    featuredSlots: FeaturedSlot[];
}>();
</script>

<style scoped>
/* High-end typography feel */
h2 {
    letter-spacing: -0.5px !important;
}

/* Subtle border to define the tonal chips better */
.v-chip.border {
    border: 1px solid rgba(var(--v-theme-primary), 0.1) !important;
}

.opacity-70 {
    opacity: 0.7;
}
</style>
