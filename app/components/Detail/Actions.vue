<!-- Horizontal scrollable action buttons with glassmorphism effects -->
<template>
    <v-slide-group class="w-100" center-active>
        <v-slide-group-item>
            <!-- Button container with spacing -->
            <div class="d-flex align-center ga-3 pb-2 fill-height">
                <!-- Primary action: Write review button -->
                <v-btn class="text-none font-weight-bold rounded-xl">
                    <v-icon start size="20">mdi-star-outline</v-icon>
                    Écrire un avis
                </v-btn>

                <!-- Secondary action buttons loop -->
                <v-btn
                    v-for="(btn, i) in secondaryButtons"
                    :key="i"
                    class="text-none font-weight-bold rounded-xl glass-btn-secondary"
                    :icon="btn.iconOnly"
                >
                    <v-icon :start="!btn.iconOnly" size="20">
                        {{ btn.icon }}
                    </v-icon>
                    <!-- Button text (hidden for icon-only buttons) -->
                    <template v-if="!btn.iconOnly">
                        <span>{{ btn.text }}</span>
                    </template>
                </v-btn>
            </div>
        </v-slide-group-item>
    </v-slide-group>
</template>

<script setup lang="ts">
// Secondary action buttons configuration
const secondaryButtons = [
    { text: "Partager", icon: "mdi-share-variant-outline" },
    { text: "Enregistrer", icon: "mdi-bookmark-outline" },
];
</script>
