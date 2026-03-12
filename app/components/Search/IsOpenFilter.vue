<template>
    <v-list-item class="pa-4 bg-transparent">
        <v-list-item-subtitle>Ouvert maintenant</v-list-item-subtitle>
        <v-switch
            v-model="isOpenNow"
            hide-details
            density="compact"
            color="primary"
            inset
            @update:model-value="toggleOpenNow"
        />
    </v-list-item>
</template>

<script setup lang="ts">
const { updateURL, getURLFilter } = useFilterURL();

const isOpenNow = ref(getURLFilter("is_open").includes("is_open"));

const toggleOpenNow = () => {
    const features = getURLFilter("is_open") as string[];

    if (isOpenNow.value) {
        // Add is_open to features
        updateURL("is_open", [...features, "is_open"]);
    } else {
        // Remove is_open from features
        updateURL(
            "is_open",
            features.filter((f) => f !== "is_open"),
        );
    }
};
</script>
