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

const isOpenNow = ref(getURLFilter("is_open").includes("open"));

const toggleOpenNow = () => {
    // Inversion de l'état local

    if (isOpenNow.value) {
        // Si on veut filtrer les établissements ouverts
        updateURL("is_open", ["open"]);
    } else {
        // Si on veut filtrer les établissements fermés (ou simplement retirer le filtre)
        updateURL("is_open", [""]);
    }
};
</script>
