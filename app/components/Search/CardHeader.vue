<template>
    <div class="d-flex justify-space-between align-start mb-2">
        <div>
            <h3 class="text-h6 font-weight-bold mb-1 line-clamp-2">
                {{ business.name }}
            </h3>

            <div class="d-flex align-center flex-wrap ga-2">
                <v-rating
                    :model-value="business.rating"
                    color="amber-darken-2"
                    density="compact"
                    size="16"
                    readonly
                    half-increments
                />
                <span class="text-subtitle-2 font-weight-black">{{
                    business.rating
                }}</span>

                <v-chip
                    v-if="business.price_range"
                    size="x-small"
                    color="success"
                    variant="tonal"
                    class="font-weight-bold"
                >
                    {{ "₣".repeat(business.price_range) }}
                </v-chip>

                <v-chip
                    size="x-small"
                    :color="business.is_open ? 'success' : 'error'"
                    variant="flat"
                >
                    {{ business.is_open ? "Ouvert" : "Fermé" }}
                </v-chip>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps(["business"]);
</script>
