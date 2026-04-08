<template>
    <v-list-item v-if="!mini" class="pa-4 bg-transparent">
        <v-list-item-subtitle>Ouvert maintenant</v-list-item-subtitle>
        <v-switch
            :model-value="isOpenNow"
            hide-details
            density="compact"
            color="primary"
            inset
            @update:model-value="onSwitchToggle"
        />
    </v-list-item>
    <v-chip
        v-else
        @click="onChipToggle"
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

// Computed pour rester synchronisé avec l'URL
const isOpenNow = computed(() => getURLFilter("is_open").includes("open"));

// Le switch passe directement la nouvelle valeur booléenne
const onSwitchToggle = (newVal: boolean) => {
    updateURL("is_open", newVal ? ["open"] : ["false"]);
};

// Le chip inverse manuellement l'état courant
const onChipToggle = () => {
    updateURL("is_open", isOpenNow.value ? ["false"] : ["open"]);
};
</script>
