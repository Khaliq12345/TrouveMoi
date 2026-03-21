<template>
    <v-list-item v-if="!mini" class="pa-4 bg-transparent">
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
    <v-chip
        v-else
        @click="toggleOpenNow"
        size="small"
        variant="outlined"
        class="mx-1 text-caption"
        :color="isOpenNow ? 'primary' : undefined"
    >
        Ouvert
    </v-chip>
</template>

<script setup lang="ts">
const props = defineProps<{
    mini?: boolean;
}>();
const { updateURL, getURLFilter } = useFilterURL();

const isOpenNow = ref(getURLFilter("is_open").includes("open"));

const toggleOpenNow = () => {
    // Inversion de l'état local
    isOpenNow.value = !isOpenNow.value;

    if (isOpenNow.value) {
        // Si on veut filtrer les établissements ouverts
        updateURL("is_open", ["open"]);
    } else {
        // Si on veut filtrer les établissements fermés (ou simplement retirer le filtre)
        updateURL("is_open", [""]);
    }
};
</script>
