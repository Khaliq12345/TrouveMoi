<!-- Mobile horizontal scrollable image gallery with discount badge -->
<template>
    <!-- Full-width container with background -->
    <div class="position-relative w-100 overflow-hidden">
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
                    <v-img :src="imgId" cover class="fill-height"></v-img>
                </v-card>
            </v-slide-group-item>
        </v-slide-group>
    </div>
</template>

<script setup lang="ts">
// Component props for images and optional discount
defineProps<{ images: string[] }>();
</script>
