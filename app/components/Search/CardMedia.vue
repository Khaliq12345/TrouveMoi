<template>
    <v-sheet class="flex-shrink-0" rounded="5">
        <MobileImageView
            :images="images"
            v-if="isMobile"
            style="width: 100%; height: 140px"
        ></MobileImageView>
        <DesktopImageView
            :images="images"
            style="width: 240px"
            v-else
        ></DesktopImageView>
    </v-sheet>
</template>

<script setup lang="ts">
defineProps(["images"]);

const isMobile = inject("isMobile");
</script>
