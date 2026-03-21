<template>
    <div class="details-section">
        <div class="text-body-2 text-medium-emphasis mb-1 d-flex align-center">
            <v-icon icon="mdi-map-marker" size="16" class="me-1" />
            {{ locations }}
        </div>

        <div class="text-caption text-grey d-flex align-center mb-4">
            <v-icon icon="mdi-tag-outline" size="14" class="me-1" />
            {{ categories }}
        </div>
    </div>
</template>

<script setup>
const props = defineProps(["business"]);
const locations = computed(
    () => props.business.locations?.map((l) => l.city).join(", ") || "N/A",
);
const categories = computed(() =>
    props.business.categories
        .slice(0, 5)
        ?.map((c) => c.categories_new_id?.name)
        .join(", "),
);
</script>
