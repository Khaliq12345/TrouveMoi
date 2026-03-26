<template>
    <v-sheet class="flex-shrink-0" rounded="5">
        <MobileImageView
            v-if="isMobile"
            :media-list="mediaList"
            style="width: 100%; height: 140px"
        ></MobileImageView>
        <DesktopImageView
            v-else
            :media-list="mediaList"
            style="width: 240px"
        ></DesktopImageView>
    </v-sheet>
</template>

<script setup lang="ts">
// On reçoit désormais 'mediaList' au lieu de 'images'
defineProps(["mediaList"]);

const isMobile = inject("isMobile");
</script>