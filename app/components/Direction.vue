<template>
    <v-sheet
        variant="flat"
        class="rounded-xl border pa-4 mt-4"
        color="transparent"
    >
        <!-- Section title -->
        <div class="d-flex align-center mb-4">
            <v-icon icon="mdi-directions-fork" color="primary" class="me-2" />
            <span class="text-h6 font-weight-bold"
                >Indications de direction</span
            >
        </div>

        <!-- Audio direction if audio direction exists -->
        <div v-if="audioDirection" class="mb-6">
            <DirectionTitle title="Écouter l'itinéraire"></DirectionTitle>

            <v-card
                variant="flat"
                class="pa-3 rounded-lg border d-flex align-center"
            >
                <audio controls class="w-100 custom-audio">
                    <source :src="imgLink(audioDirection)" type="audio/mpeg" />
                    Votre navigateur ne supporte pas l'élément audio.
                </audio>
            </v-card>
        </div>

        <!-- Text direction if audio direction exists -->
        <div v-if="textDirections?.length">
            <DirectionTitle title="Description du trajet"></DirectionTitle>
            <v-timeline
                side="end"
                density="compact"
                align="start"
                truncate-line="both"
            >
                <v-timeline-item
                    v-for="(text, index) in textDirections"
                    :key="index"
                    dot-color="primary"
                    size="x-small"
                >
                    <div
                        class="text-body-2 text-high-emphasis pa-3 rounded-lg border shadow-sm"
                    >
                        {{ text.description }}
                    </div>
                </v-timeline-item>
            </v-timeline>
        </div>

        <!-- If no direction is available display this -->
        <div
            v-if="!audioDirection && !textDirections?.length"
            class="text-center pa-4"
        >
            <v-icon
                icon="mdi-map-marker-off"
                color="grey-lighten-1"
                size="48"
            />
            <p class="text-caption text-grey">
                Aucune indication disponible pour cet établissement
            </p>
        </div>
    </v-sheet>
</template>

<script setup lang="ts">
defineProps<{
    audioDirection?: string;
    textDirections?: any[];
}>();
</script>

<style scoped>
.custom-audio {
    height: 40px;
    /* This filter makes the default player look slightly more "premium" and dark */
    filter: brightness(95%) contrast(110%);
}

.shadow-sm {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05) !important;
}
</style>
