<template>
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

    <v-container class="w-100 mb-md-6 " ref="actionButtons">
        <DetailActions></DetailActions>
    </v-container>
</template>

<script setup lang="ts">
import { useElementVisibility } from "@vueuse/core";

// 1. Inject the responsiveness provided by your Parent/Plugin
const isMobile = inject("isMobile", false); // Added default value

// 2. Setup the Template Ref
const actionButtons = useTemplateRef("actionButtons");

// 3. Track visibility
const actionButtonsIsVisible = useElementVisibility(actionButtons);
</script>
