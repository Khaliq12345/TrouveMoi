<template>
    <!-- Show when you are no longer at the top of the page and only in mobile screen -->
    <v-app-bar
        flat
        v-show="!toggleButtonsIsVisible"
        v-if="isMobile"
        class="px-2 position-fixed"
        height="70"
        border="b"
        :order="2"
    >
        <div class="w-100">
            <DetailCustomSlideGroup v-model="activeTab" :items="navItems" />
        </div>
    </v-app-bar>

    <!-- Show normally when you are at the top of the screen -->
    <div class="py-4" ref="toggleButtons">
        <DetailCustomSlideGroup v-model="activeTab" :items="navItems" />
    </div>
</template>

<script setup lang="ts">
import { useElementVisibility } from "@vueuse/core";
interface NavItem {
    id: string;
    label: string;
    icon: string;
}

const isMobile = inject("isMobile", false);
const toggleButtons = useTemplateRef("toggleButtons");
const toggleButtonsIsVisible = useElementVisibility(toggleButtons);

// The data for your buttons
const activeTab = ref("services");

const navItems: NavItem[] = [
    { id: "#about", label: "About", icon: "mdi-information-outline" },
    { id: "#services", label: "Services", icon: "mdi-hammer-wrench" },
    { id: "#metas", label: "Metas", icon: "mdi-card-plus-outline" },
    {
        id: "#location",
        label: "Location/Hours",
        icon: "mdi-map-marker-outline",
    },
    { id: "#vibes", label: "Vibes", icon: "mdi-eye-settings-outline" },
    { id: "#reviews", label: "Avis", icon: "mdi-star-outline" },
    { id: "#features", label: "Features", icon: "mdi-box-search-outline" },
];
</script>
