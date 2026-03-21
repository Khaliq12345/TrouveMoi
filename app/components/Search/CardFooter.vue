<template>
    <div
        class="d-flex align-center justify-space-between pt-2 border-t mt-auto"
    >
        <div class="d-flex ga-1">
            <v-chip
                v-for="(slot, i) in business.featuredslots?.slice(0, 2)"
                :key="i"
                size="x-small"
                variant="outlined"
            >
                {{ slot.featured_slots_id.feature }}
            </v-chip>
        </div>

        <v-btn
            v-if="business.website"
            color="primary"
            variant="flat"
            size="small"
            class="text-none font-weight-bold rounded-lg"
            append-icon="mdi-arrow-right"
            :href="business.website"
        >
            Détails
        </v-btn>
    </div>
</template>

<script setup>
defineProps(["business"]);
</script>
