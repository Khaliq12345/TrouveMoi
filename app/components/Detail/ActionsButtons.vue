<template>
    <v-app-bar
        location="bottom"
        :height="isMobile ? 76 : 84"
        flat
        :order="1"
        v-show="!actionButtonsIsVisible"
        class="glass-bar position-fixed"
    >
        <DetailActions v-model="activeTab"></DetailActions>
    </v-app-bar>

    <div class="d-flex justify-center w-100 mb-md-6" ref="actionButtons">
        <DetailActions v-model="activeTab"></DetailActions>
    </div>
</template>

<script setup lang="ts">
import { useElementVisibility } from "@vueuse/core";

// 1. Inject the responsiveness provided by your Parent/Plugin
const isMobile = inject("isMobile", false); // Added default value
const activeTab = ref("services");

// 2. Setup the Template Ref
const actionButtons = useTemplateRef("actionButtons");

// 3. Track visibility
const actionButtonsIsVisible = useElementVisibility(actionButtons);
</script>
