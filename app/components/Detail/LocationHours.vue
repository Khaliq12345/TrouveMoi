<template>
    <v-container class="pa-0 py-8 px-4">
        <v-row>
            <v-col cols="12" md="7">
                <Direction
                    :audioDirection="biz?.audio_direction"
                    :textDirections="biz?.text_directions"
                ></Direction>
            </v-col>

            <v-col cols="12" md="5">
                <DetailHourSection :hours="biz?.hours" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import type { Biz } from "~/types/biz";

const biz = inject<Biz>("biz");
</script>
