<template>
    <div class="menu-scroll-container">
        <v-menu
            v-for="(menu, idx) in menuStructure"
            :key="idx"
            open-on-hover
            location="bottom"
            :close-delay="100"
            :disabled="!menu.hasSub"
        >
            <template v-slot:activator="{ props }">
                <v-btn
                    v-bind="menu.hasSub ? props : {}"
                    :variant="isMobile ? 'tonal' : 'text'"
                    :size="isMobile ? 'small' : 'default'"
                    class="text-none font-weight-medium menu-btn rounded-pill"
                    @click="handleMenuClick(menu)"
                >
                    {{ menu.label }}
                    <v-icon v-if="menu.hasSub" end size="small">mdi-chevron-down</v-icon>
                </v-btn>
            </template>

            <v-list v-if="menu.hasSub" :class="{ 'category-grid': menu.type === 'more' }">
                <v-list-item
                    v-for="item in menu.items"
                    :key="item.slug"
                    :title="item.name"
                    @click="handleListItemClick(menu, item)"
                >
                    <template v-slot:prepend>
                        <v-icon icon="mdi-clock" />
                    </template>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>

<script setup lang="ts">
import { computed, inject, Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// Importation de vos types depuis le nouveau fichier
import type { GroupedCategory, SubCategory } from '~/types/category';

const route = useRoute();
const router = useRouter();

// Injection de la variable globale isMobile
const isMobile = inject<Ref<boolean>>('isMobile');

// Récupération dynamique des catégories groupées depuis l'API
const { data: categoriesGrouped, pending, error } = await useFetchCategory();

if(error.value) {
    console.error("Error fetching categories", error.value);
}

// Structure réactive qui s'adapte à la taille de l'écran et aux données réelles
const menuStructure = computed(() => {
    // Sécurité : fallback sur un tableau vide si les données ne sont pas encore là
    const categoriesList = categoriesGrouped.value || [];
    
    // Définition de la limite d'affichage (3 éléments sur mobile, 5 sur desktop)
    const limit = isMobile?.value ? 3 : 5;

    // 1. Préparation des catégories principales pour la barre de menu
    const primary = categoriesList.slice(0, limit).map((cat: GroupedCategory) => {
        const subs = cat.sub_categories || [];
        return {
            type: "primary",
            label: cat.name,
            icon: "mdi-flag",
            iconSize: "default",
            slug: cat.slug,
            items: subs, 
            hasSub: subs.length > 0 // Flag boolean pour savoir si on active le menu déroulant
        };
    });

    // 2. Gestion du menu "Plus" avec le reste des catégories non affichées
    const moreCategories = categoriesList.slice(limit);
    
    // Ajoute le menu "Plus" uniquement s'il reste des catégories à afficher
    if (moreCategories.length > 0) {
        const more = {
            type: "more",
            label: "Plus",
            icon: "mdi-flag",
            iconSize: "small",
            slug: "",
            items: moreCategories, // Ici les items sont des catégories, pas des sous-catégories
            hasSub: true // Le menu "Plus" a toujours un déroulant
        };
        return [...primary, more];
    }

    return primary;
});

// Fonction pour gérer le clic direct sur un bouton du menu (sans sous-catégories)
const handleMenuClick = (menu: any) => {
    // Vérifie si c'est une catégorie principale sans sous-catégories
    if (menu.type === 'primary') {
        // Redirige vers la page de recherche en conservant les requêtes existantes
        // On place 'categories' avant 'sub_categories' dans l'objet
        router.push({
            path: '/search',
            query: {
                ...route.query,
                categories: menu.slug,
                sub_categories: '',
            },
        });
    }
};

// Fonction pour gérer le clic sur un élément dans les listes déroulantes
const handleListItemClick = (menu: any, item: any) => {
    // Redirection vers la page de recherche avec les paramètres
    if (menu.type === 'more') {
        // Dans le menu "Plus", l'item cliqué est une catégorie principale
        router.push({
            path: '/search',
            query: {
                ...route.query,
                categories: item.slug,
                sub_categories: '',
            },
        });
    } else {
        // Dans un menu standard, l'item cliqué est une sous-catégorie
        router.push({
            path: '/search',
            query: {
                ...route.query,
                categories: menu.slug,
                sub_categories: item.slug,
            },
        });
    }
};
</script>
<style scoped>
/* Conteneur principal avec scroll horizontal */
.menu-scroll-container {
    display: flex;
    flex-wrap: nowrap; /* Empêche le passage à la ligne */
    overflow-x: auto; /* Active le scroll horizontal */
    gap: 8px; /* Espace entre les boutons */
    padding: 8px 0;
    align-items: center; /* Aligne verticalement au centre */
    
    /* Défilement fluide sur iOS */
    -webkit-overflow-scrolling: touch; 
    
    /* Masquer la barre de scroll pour un look épuré (Firefox, IE, Edge) */
    scrollbar-width: none; 
    -ms-overflow-style: none; 
}

/* Masquer la barre de scroll (Chrome, Safari, Edge récent) */
.menu-scroll-container::-webkit-scrollbar {
    display: none; 
}

/* Empêcher les boutons de s'écraser lors du scroll */
.menu-btn {
    flex: 0 0 auto; /* Conserve la largeur naturelle du bouton */
    white-space: nowrap; /* Empêche le texte de passer à la ligne */
}

/* Grille pour le menu "Plus" sur desktop */
.category-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    min-width: 600px;
    padding: 8px;
}

/* Ajustements de la liste déroulante sur mobile */
@media (max-width: 600px) {
    .category-grid {
        grid-template-columns: repeat(1, 1fr);
        min-width: 200px;
        max-height: 60vh; /* Évite que le menu ne prenne tout l'écran en hauteur */
        overflow-y: auto; /* Scroll vertical si la liste est très longue */
    }
}
</style>