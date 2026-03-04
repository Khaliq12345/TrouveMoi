<template>
    <v-app-bar
        class="position-fixed"
        color="primary"
        v-if="!headerWithImageIsVisible"
        flat
        border
    >
        <template v-slot:prepend>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title class="font-weight-bold">
            {{ restaurantTitle }}
        </v-app-bar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
            <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
    </v-app-bar>

    <div class="position-relative" ref="headerWithImage">
        <DetailBuisnessCard
            :restaurant-title="restaurantTitle"
        ></DetailBuisnessCard>
    </div>
</template>

<script setup lang="ts">
import { useElementVisibility } from "@vueuse/core";

// 1. Inject the responsiveness provided by your Parent/Plugin
const isMobile = inject("isMobile", false); // Added default value
const restaurantTitle = "Bottega";

// 2. Setup the Template Ref
const headerWithImage = useTemplateRef("headerWithImage");

// 3. Track visibility
const headerWithImageIsVisible = useElementVisibility(headerWithImage);
</script>
