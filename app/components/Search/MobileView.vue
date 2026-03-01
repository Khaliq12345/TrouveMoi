<template>
    <v-main class="mobileView d-md-none fill-height">
        <v-sheet class="fill-height d-flex flex-column bg-transparent">
            <v-sheet
                color="transparent"
                class="d-flex justify-end align-center pa-4 ga-2"
            >
                <v-btn-toggle
                    v-model="internalMode"
                    color="primary"
                    variant="outlined"
                    density="compact"
                    rounded="pill"
                    mandatory
                >
                    <v-btn value="carte" class="text-caption text-none"
                        >Carte</v-btn
                    >
                    <v-btn value="video" class="text-caption text-none"
                        >Vidéo</v-btn
                    >
                </v-btn-toggle>

                <v-btn
                    rounded="pill"
                    size="small"
                    variant="tonal"
                    @click="$emit('open-results')"
                >
                    Résultats
                </v-btn>
            </v-sheet>

            <v-sheet
                color="transparent"
                class="flex-grow-1 d-flex align-center justify-center"
            >
                <span class="text-h6 text-center">Vue {{ internalMode }}</span>
            </v-sheet>
        </v-sheet>
    </v-main>
</template>

<script setup>
const props = defineProps(["viewMode"]);
const emit = defineEmits(["update:viewMode", "open-results"]);

// Utilisation d'une computed ou d'un watch pour synchroniser le v-model
const internalMode = computed({
    get: () => props.viewMode,
    set: (val) => emit("update:viewMode", val),
});
</script>
