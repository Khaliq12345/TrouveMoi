<template>
    <div class="position-relative w-100 overflow-hidden">
        <v-slide-group class="pa-2" center-active>
            <v-slide-group-item v-for="item in mediaList" :key="item.id">
                
                <v-card
                    width="150"
                    height="110"
                    class="ma-1 rounded-lg overflow-hidden bg-grey-lighten-4"
                    elevation="0"
                >
                    <video
                        v-if="item.isVideo"
                        :src="item.url"
                        preload="none"
                        autoplay
                        loop
                        muted
                        playsinline
                        class="w-100 h-100"
                        style="object-fit: cover;"
                        @loadeddata="$event.target.play()"
                    ></video>

                    <v-img 
                        v-else 
                        :src="item.url" 
                        cover 
                        class="fill-height"
                    ></v-img>
                </v-card>

            </v-slide-group-item>
        </v-slide-group>
    </div>
</template>

<script setup lang="ts">
// Typage de la nouvelle structure d'objets
defineProps<{ 
    mediaList: Array<{ id: string, url: string, isVideo: boolean, media_id: string }> 
}>();
</script>