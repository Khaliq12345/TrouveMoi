<template>
    <div class="details-section">
        <div
            v-if="primaryLocation"
            class="text-body-2 text-medium-emphasis mb-1 d-flex align-center"
        >
            <v-icon
                icon="mdi-map-marker"
                size="18"
                color="primary"
                class="me-1"
            />

            <span class="text-truncate">
                {{ primaryLocation }}
            </span>

            <v-tooltip v-if="otherLocationsCount > 0" location="bottom">
                <template v-slot:activator="{ props }">
                    <span
                        v-bind="props"
                        class="ms-2 text-caption text-grey-darken-1 font-weight-bold cursor-help"
                    >
                        +{{ otherLocationsCount }}
                    </span>
                </template>
                <div class="pa-1">
                    <div v-for="(loc, i) in allLocations" :key="i">
                        {{ loc }}
                    </div>
                </div>
            </v-tooltip>
        </div>

        <div
            v-if="categoryText"
            class="text-caption text-grey-darken-1 d-flex align-start mb-2"
        >
            <v-icon icon="mdi-tag-outline" size="14" class="me-1 mt-1" />
            <span class="line-clamp-1">
                {{ categoryText }}
            </span>
        </div>

        <SearchDirectionMobileDialog></SearchDirectionMobileDialog>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps(["business"]);

// Split the string by newlines and clean up extra spaces
const allLocations = computed(() => {
    const locs = props.business.locations;
    if (!locs || typeof locs !== "string") return [];
    return locs
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l.length > 0);
});

const primaryLocation = computed(() => allLocations.value[0] || null);

const otherLocationsCount = computed(() => {
    return allLocations.value.length > 1 ? allLocations.value.length - 1 : 0;
});

const categoryText = computed(() => {
    const cats = props.business.categories;
    if (!Array.isArray(cats)) return "";

    return cats
        .slice(0, 5)
        .map((c) => c.categories_new_id?.name)
        .filter((name) => !!name)
        .join(", ");
});
</script>

<style scoped>
.line-clamp-1 {
    display: -webkit-box;
    line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.cursor-help {
    cursor: help;
}
</style>
