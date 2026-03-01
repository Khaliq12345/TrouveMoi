<template>
    <div class="position-relative w-100 overflow-hidden bg-grey-lighten-4">
        <v-slide-group class="pa-2" center-active>
            <v-slide-group-item v-for="(imgId, i) in images" :key="i">
                <v-card
                    width="150"
                    height="110"
                    class="ma-1 rounded-lg"
                    elevation="0"
                >
                    <v-img
                        :src="`https://picsum.photos/id/${imgId}/400/300`"
                        cover
                        class="fill-height"
                    ></v-img>
                </v-card>
            </v-slide-group-item>
        </v-slide-group>

        <v-chip
            v-if="discount"
            color="success"
            size="x-small"
            variant="flat"
            class="position-absolute font-weight-bold"
            style="top: 12px; left: 12px; z-index: 2"
        >
            {{ discount }} OFF
        </v-chip>
    </div>
</template>

<script setup lang="ts">
defineProps<{ images: number[]; discount?: string }>();
</script>
