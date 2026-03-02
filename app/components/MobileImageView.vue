<!-- Mobile horizontal scrollable image gallery with discount badge -->
<template>
    <!-- Full-width container with background -->
    <div class="position-relative w-100 overflow-hidden bg-grey-lighten-4">
        <!-- Horizontal scrolling image group -->
        <v-slide-group class="pa-2" center-active>
            <v-slide-group-item v-for="(imgId, i) in images" :key="i">
                <!-- Individual image card -->
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

        <!-- Discount badge overlay (top-left) -->
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
// Component props for images and optional discount
defineProps<{ images: number[]; discount?: string }>();
</script>
