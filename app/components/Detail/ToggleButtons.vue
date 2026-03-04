<template>
    <v-app-bar
        flat
        v-show="!toggleButtonsIsVisible"
        class="px-2 position-fixed"
        height="70"
        border="b"
        :order="2"
    >
        <div class="w-100">
            <DetailCustomSlideGroup v-model="activeTab" :items="navItems" />
        </div>
    </v-app-bar>

    <div class="py-4" ref="toggleButtons">
        <DetailCustomSlideGroup v-model="activeTab" :items="navItems" />
    </div>
</template>

<script setup lang="ts">
import { useElementVisibility } from "@vueuse/core";

const isMobile = inject("isMobile", false);
const toggleButtons = useTemplateRef("toggleButtons");
const toggleButtonsIsVisible = useElementVisibility(toggleButtons);

// The data for your buttons
const activeTab = ref("services");
const navItems = [
    { id: "services", label: "Services", icon: "mdi-hammer-wrench" },
    { id: "amenities", label: "Infos", icon: "mdi-information-outline" },
    { id: "location", label: "Plan", icon: "mdi-map-marker-outline" },
    { id: "reviews", label: "Avis", icon: "mdi-star-outline" },
];
</script>
