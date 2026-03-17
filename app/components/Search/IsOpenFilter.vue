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

// On initialise la ref : vrai si "opened" est présent dans les filtres
const isOpenNow = ref(getURLFilter("is_open").includes("opened"));

const toggleOpenNow = () => {
    // Inversion de l'état local

    if (isOpenNow.value) {
        // Si on veut filtrer les établissements ouverts
        // On remplace totalement les anciennes valeurs par ["opened"]
        updateURL("is_open", ["opened"]);
    } else {
        // Si on veut filtrer les établissements fermés (ou simplement retirer le filtre)
        // On remplace par ["closed"]
        updateURL("is_open", ["closed"]);
    }
};
</script>
