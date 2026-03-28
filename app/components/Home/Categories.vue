<template>
    <v-sheet class="py-4 px-2 rounded-3xl" flat color="transparent">
        <v-toolbar color="transparent" flat class="mb-2">
            <div>
                <h2 class="text-h5 font-weight-bold text-grey-darken-3">
                    Explorer par catégorie
                </h2>
            </div>
        </v-toolbar>

        <div v-if="isMobile" class="d-flex flex-column ga-2">
            <v-card
                v-for="category in formattedCategories"
                :key="category.id"
                :to="category.route"
                flat
                class="rounded-xl pa-3 d-flex align-center w-100"
                :style="{ background: `linear-gradient(135deg, ${category.bgLight}, ${category.bgDark})` }"
            >
                <v-avatar :color="category.color" size="40" class="mr-3 flex-shrink-0">
                    <v-icon :icon="category.icon" color="white" size="small" />
                </v-avatar>

                <div class="flex-grow-1 text-subtitle-1 font-weight-bold text-grey-darken-3 text-truncate">
                    {{ category.name }}
                </div>

                <div class="d-flex align-center flex-shrink-0">
                    <v-icon icon="mdi-arrow-right" :color="category.color" size="small" />
                </div>
            </v-card>
        </div>

        <v-row dense v-else>
            <v-col
                v-for="(category, index) in formattedCategories"
                :key="category.id"
                cols="12"
                md="3"
                class="d-flex"
                :class="{ 'd-none d-md-flex': index >= 8 }"
            >
                <v-hover v-slot="{ isHovering, props }">
                    <v-card
                        v-bind="props"
                        :to="category.route"
                        flat
                        class="rounded-xl pa-3 transition-swing d-flex flex-column w-100"
                        :elevation="isHovering ? 8 : 1"
                        :style="{
                            background: `linear-gradient(135deg, ${category.bgLight}, ${category.bgDark})`,
                            transform: isHovering ? 'translateY(-8px)' : 'none',
                        }"
                    >
                        <div class="d-flex justify-space-between align-start mb-2">
                            <v-avatar
                                :color="category.color"
                                size="40"
                                class="elevation-2 transition-swing"
                                :style="{
                                    transform: isHovering ? 'rotate(10deg) scale(1.1)' : 'none',
                                }"
                            >
                                <v-icon :icon="category.icon" color="white" size="small" />
                            </v-avatar>
                        </div>

                        <div class="text-subtitle-1 font-weight-bold text-grey-darken-3 line-clamp-2 mt-1">
                            {{ category.name }}
                        </div>

                        <div class="mt-1">
                            <v-icon
                                icon="mdi-arrow-right"
                                :color="category.color"
                                size="small"
                                class="transition-swing"
                                :class="isHovering ? 'translate-x-2' : ''"
                            />
                        </div>
                    </v-card>
                </v-hover>
            </v-col>
        </v-row>
    </v-sheet>
</template>

<script setup lang="ts">
import { useAsyncData, useNuxtApp } from '#imports';
import type { Category } from '~/types/category';

// Utilisation de useDisplay pour détecter la taille de l'écran et basculer entre liste et grille
const isMobile = inject('isMobile');

// Fonction pour générer une teinte (Hue) stable basée sur le slug
const getHueFromSlug = (slug: string): number => {
    let hash = 0;
    for (let i = 0; i < slug.length; i++) {
        hash = slug.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash % 360);
};

// Récupération et formatage des catégories
const { data: formattedCategories } = await useAsyncData('main-categories', async () => {
    const { $directus, $readItems } = useNuxtApp();
    const response = await $directus.request($readItems('categories_new'));
    return response as Category[];
}, {
    transform: (categories) => {
        return categories.map((category) => {
            const hue = getHueFromSlug(category.slug);
            const saturation = 75;

            return {
                ...category,
                color: `hsl(${hue}, ${saturation}%, 45%)`,
                bgLight: `hsl(${hue}, ${saturation}%, 95%)`,
                bgDark: `hsl(${hue}, ${saturation}%, 85%)`,
                icon: category.icon || 'mdi-shape',
                count: 0,
                route: `/search?categories=${category.slug}`
            };
        });
    }
});
</script>

<style scoped>
/* Animations fluides */
.transition-swing {
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1) !important;
}

/* Déplacement de la flèche au survol */
.translate-x-2 {
    transform: translateX(8px);
}

/* Limitation du titre à deux lignes pour éviter de casser les cartes sur desktop */
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>