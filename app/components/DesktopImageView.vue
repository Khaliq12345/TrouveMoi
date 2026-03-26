<template>
    <div class="position-relative flex-shrink-0 overflow-visible pa-5">
        <v-carousel
            height="200"
            hide-delimiters
            class="rounded-5 bg-grey-lighten-4 overflow-hidden"
            :show-arrows="mediaList && mediaList.length > 1"
        >
            <v-carousel-item
                v-for="item in mediaList"
                :key="item.id"
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
                    class="w-100 h-100"
                ></v-img>
            </v-carousel-item>
        </v-carousel>
    </div>
</template>

<script setup lang="ts">
// Typage de la nouvelle structure d'objets
defineProps<{ 
    mediaList: Array<{ id: string, url: string, isVideo: boolean, media_id: string }> 
}>();
</script>