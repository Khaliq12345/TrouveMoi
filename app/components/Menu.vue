<template>
    <div class="menu-scroll-container">
        <v-menu
            v-for="(menu, idx) in menuStructure"
            :key="idx"
            open-on-hover
            location="bottom"
            :close-delay="100"
        >
            <template v-slot:activator="{ props }">
                <v-btn
                    v-bind="props"
                    :variant="isMobile ? 'tonal' : 'text'"
                    :size="isMobile ? 'small' : 'default'"
                    class="text-none font-weight-medium menu-btn rounded-pill"
                >
                    {{ menu.label }}
                    <v-icon end size="small">mdi-chevron-down</v-icon>
                </v-btn>
            </template>

            <v-list :class="{ 'category-grid': menu.type === 'more' }">
                <v-list-item
                    v-for="item in menu.items"
                    :key="item.slug"
                    :title="item.name"
                    @click="
                        () => {
                            if (menu.type === 'more') {
                                router.push({
                                    query: {
                                        ...route.query,
                                        sub_categories: '',
                                        categories: item.slug,
                                    },
                                });
                            } else {
                                router.push({
                                    query: {
                                        ...route.query,
                                        sub_categories: item.slug,
                                        categories: menu.slug,
                                    },
                                });
                            }
                        }
                    "
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
// Assure-toi que ces composables sont bien importés ou auto-importés (ex: Nuxt)
// const { updateURL } = useFilterURL();
// const { getSubcategories } = await useFetchSubCategory();

const route = useRoute();
const router = useRouter();

// Injection de la variable globale isMobile
const isMobile = inject<Ref<boolean>>('isMobile');

// Liste complète des catégories
const categories = [
    { name: "Commerce de Détail", slug: "commerce-detail" },
    { name: "Santé & Bien-être", slug: "sante-bien-etre" },
    { name: "Tourisme & Loisirs", slug: "tourisme-loisirs" },
    { name: "Banques & Assurances", slug: "banques-assurances" },
    { name: "Hébergement & Hôtels", slug: "hebergement-hotels" },
    { name: "Art & Divertissement", slug: "art-divertissement" },
    { name: "Mode & Beauté", slug: "mode-beaute" },
    { name: "Services Juridiques", slug: "services-juridiques" },
    { name: "Restauration & Gastronomie", slug: "restauration-gastronomie" },
    { name: "Transport & Logistique", slug: "transport-logistique" },
    { name: "Éducation & Formation", slug: "education-formation" },
    { name: "Café", slug: "cafe" },
    { name: "Automobile & Garage", slug: "automobile-garage" },
    { name: "Bistro", slug: "bistro" },
    { name: "Immobilier & BTP", slug: "immobilier-btp" },
    { name: "Services Informatiques", slug: "services-informatiques" },
    { name: "Agriculture & Élevage", slug: "agriculture-elevage" },
];

// Structure réactive qui s'adapte à la taille de l'écran
const menuStructure = computed(() => {
    // 3 éléments sur mobile, 5 sur desktop
    const limit = isMobile?.value ? 3 : 5;

    // 1. Catégories principales
    const primary = categories.slice(0, limit).map((cat) => ({
        type: "primary",
        label: cat.name,
        icon: "mdi-flag",
        iconSize: "default",
        slug: cat.slug,
        // Remplace le tableau vide par ton appel réel : getSubcategories(cat.slug)
        items: [], 
    }));

    // 2. Menu "Plus" avec le reste des catégories
    const more = {
        type: "more",
        label: "Plus",
        icon: "mdi-flag",
        iconSize: "small",
        slug: "",
        items: categories.slice(limit),
    };

    return [...primary, more];
});
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