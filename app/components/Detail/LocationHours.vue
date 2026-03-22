<template>
    <v-container class="pa-0 py-8 px-4">
        <v-row>
            <v-col cols="12" md="7">
                <v-card
                    variant="outlined"
                    class="rounded-xl overflow-hidden border-subtle"
                >
                    <DetailLocationSection :locations="biz?.locations" />
                    <v-divider />
                    <DetailAddressSection :locations="biz?.locations" />
                </v-card>
            </v-col>

            <v-col cols="12" md="5">
                <DetailHourSection :hours="biz?.hours" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import type { Biz } from "~/types/biz";
defineProps<{ biz: Biz | null }>();
</script>
