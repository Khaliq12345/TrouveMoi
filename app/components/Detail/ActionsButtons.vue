<!-- Action buttons with sticky bottom bar on mobile when scrolled -->
<template>
    <!-- Fixed bottom app bar (mobile only, shown when main buttons scroll out of view) -->
    <v-app-bar
        location="bottom"
        :height="isMobile ? 76 : 84"
        flat
        :order="1"
        v-if="!actionButtonsIsVisible && isMobile"
        class="glass-bar position-fixed"
    >
        <DetailActions></DetailActions>
    </v-app-bar>

    <!-- Main action buttons container (always visible in flow) -->
    <v-container class="w-100 mb-md-6" ref="actionButtons">
        <DetailActions></DetailActions>
    </v-container>
</template>

<script setup lang="ts">
import { useElementVisibility } from "@vueuse/core";

// Inject mobile state from parent
const isMobile = inject("isMobile", false);

// Template ref for visibility tracking
const actionButtons = useTemplateRef("actionButtons");

// Track if action buttons are visible in viewport
const actionButtonsIsVisible = useElementVisibility(actionButtons);
</script>
