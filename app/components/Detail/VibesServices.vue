<template>
    <v-container class="pa-0 py-8">
        <!-- Title of the section -->
        <div class="d-flex align-center justify-space-between mb-6 px-4">
            <div>
                <h2 class="text-h4 font-weight-bold mb-1">{{ title }}</h2>
                <p class="text-body-2 text-grey-darken-1">
                    {{ subtitle }}
                </p>
            </div>
            <v-btn
                v-if="hasNodes"
                variant="text"
                color="primary"
                class="text-none"
                append-icon="mdi-chevron-right"
                @click="openFullModal"
            >
                Voir tout
            </v-btn>
        </div>

        <!-- The subsection of the section, contains the content -->
        <v-row class="px-2">
            <v-col v-for="group in groupes" :key="group.title" cols="12" sm="4">
                <v-card
                    class="rounded-xl overflow-hidden vibe-card"
                    flat
                    height="350"
                    @click="openCategoryModal(group)"
                >
                    <v-img
                        :src="imgLink(group.displayImage)"
                        height="100%"
                        cover
                        class="d-flex align-end bg-grey-lighten-2"
                    >
                        <div class="vibe-overlay pa-6 w-100">
                            <h3
                                class="text-h5 font-weight-bold text-white mb-1"
                            >
                                {{ group.title }}
                            </h3>
                            <p class="text-body-2 text-white-70">
                                {{ group.totalImages }} photos
                            </p>
                        </div>
                    </v-img>
                </v-card>
            </v-col>
        </v-row>

        <MetaModal
            v-model="isModalOpen"
            :category-label="modalTitle"
            :items="modalItems"
        />
    </v-container>
</template>

<script setup lang="ts">
import MetaModal from "./MetaModal.vue";

const props = defineProps<{
    title: string;
    subtitle: string;
    type: "vibes" | "service" | "menu" | "portfolio";
}>();

// Injection sécurisée des métadonnées provenant du composant parent
const metas = inject<any>("metas");

// Variables réactives pour contrôler l'état de la modale
const isModalOpen = ref(false);
const modalTitle = ref("");
const modalItems = ref<any[]>([]);

// Vérification de sécurité pour afficher ou masquer le bouton "Voir tout"
const hasNodes = computed(() => {
    return (metas?.value?.[props.type]?.length || 0) > 0;
});

// Logique de groupement avec déduplication stricte
const groupes = computed(() => {
    const nodes = metas?.value?.[props.type] || [];
    const groups: Record<string, any> = {};

    nodes.forEach((item: any) => {
        // Ignorer les éléments sans titre valide
        if (!item.title) return;

        // Normalisation pour regrouper indépendamment de la casse
        const normalizedTitle = item.title.trim();
        const key = normalizedTitle.toLowerCase();

        // Création de la structure du groupe si elle n'existe pas encore
        if (!groups[key]) {
            groups[key] = {
                title: normalizedTitle,
                items: [],
                // Utilisation d'un Set pour stocker uniquement les identifiants d'images uniques
                allImagesSet: new Set<string>(),
            };
        }

        // Ajout de l'objet item uniquement s'il n'a pas déjà été ajouté (déduplication par ID)
        const isDuplicateItem = groups[key].items.some(
            (existingItem: any) => existingItem.id === item.id,
        );
        if (!isDuplicateItem) {
            groups[key].items.push(item);
        }

        // Extraction et déduplication des liens d'images
        if (Array.isArray(item.link)) {
            item.link.forEach((id: string) => {
                // Le Set ignore automatiquement les identifiants qui sont déjà présents
                groups[key].allImagesSet.add(id);
            });
        }
    });

    // Transformation de l'objet en tableau pour l'itération dans le template
    return Object.values(groups).map((group) => {
        // Conversion du Set en tableau standard pour accéder aux éléments par index
        const uniqueImages = Array.from(group.allImagesSet);

        return {
            title: group.title,
            // La longueur correspond exactement au nombre de photos uniques réelles
            totalImages: uniqueImages.length,
            // Prise de la première image trouvée pour garantir un rendu statique identique (SSR)
            displayImage: uniqueImages[0] || null,
            items: group.items,
        };
    });
});

// Fonction d'ouverture de la modale pour une catégorie précise
const openCategoryModal = (group: any) => {
    modalTitle.value = group.title;
    modalItems.value = group.items;
    isModalOpen.value = true;
};

// Fonction d'ouverture de la modale avec toutes les données brutes
const openFullModal = () => {
    modalTitle.value = "Toutes les photos";
    modalItems.value = metas?.value?.[props.type] || [];
    isModalOpen.value = true;
};
</script>

<style scoped>
/* Animation au survol pour les cartes de la grille */
.vibe-card {
    cursor: pointer;
    transition: transform 0.4s ease;
}

.vibe-card:hover {
    transform: scale(1.02);
}

/* Application du dégradé linéaire pour faire ressortir le texte blanc */
.vibe-overlay {
    background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.7) 0%,
        transparent 100%
    );
}

/* Classe utilitaire pour une opacité spécifique du texte */
.text-white-70 {
    color: rgba(255, 255, 255, 0.85);
}
</style>
