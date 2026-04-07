<template>
    <v-dialog
        v-model="showDirections"
        transition="dialog-bottom-transition"
        fullscreen
    >
        <template v-slot:activator="{ props }">
            <v-btn
                v-bind="props"
                variant="tonal"
                color="primary"
                size="small"
                block
                class="text-none font-weight-bold rounded-lg"
                prepend-icon="mdi-directions"
            >
                Itinéraire détaillé
            </v-btn>
        </template>

        <v-card>
            <v-toolbar color="transparent" flat border>
                <v-btn icon="mdi-close" @click="showDirections = false"></v-btn>
                <v-toolbar-title class="text-subtitle-1 font-weight-bold">
                    Comment s'y rendre
                </v-toolbar-title>
            </v-toolbar>

            <div class="pa-4">
                <Direction
                    :textDirections="biz?.text_directions"
                    :audioDirection="biz?.audio_direction"
                ></Direction>
            </div>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
const biz = inject<any>("biz");
const showDirections = ref(false);
</script>
