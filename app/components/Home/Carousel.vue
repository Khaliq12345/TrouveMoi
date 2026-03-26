<template>
    <v-container
        fluid
        class="bg-black pa-0 d-flex justify-center align-center h-100"
    >
        <v-sheet
            class="mx-auto position-relative overflow-hidden bg-transparent"
            :width="isMobile ? 415 : 600"
            :height="isMobile ? 800 : 799"
            elevation="0"
        >
            <v-carousel
                v-if="flatMediaList && flatMediaList.length"
                v-model="currentIndex"
                direction="vertical"
                :cycle="true"
                :height="isMobile ? 800 : 799"
                hide-delimiter-background
                hide-delimiters
                :show-arrows="false"
            >
                <v-carousel-item v-for="(item, i) in flatMediaList" :key="item.id">
                    <div class="w-100 h-100 d-flex justify-center align-center">
                        
                        <video
                            v-if="item.isVideo"
                            :key="'video-' + item.media_id"
                            :src="shouldLoadMedia(i) ? imgLink(item.media_id) : ''"
                            preload="none"
                            autoplay
                            loop
                            muted
                            playsinline
                            class="w-100 h-100"
                            style="object-fit: contain"
                            @loadeddata="$event.target.play()"
                        ></video>

                        <img
                            v-else
                            :key="'img-' + item.media_id"
                            :src="shouldLoadMedia(i) ? imgLink(item.media_id) : ''"
                            class="w-100 h-100"
                            style="object-fit: contain"
                            alt="Media du business"
                        />

                    </div>
                </v-carousel-item>

                <v-overlay
                    :scrim="false"
                    contained
                    model-value
                    persistent
                    no-click-animation
                    content-class="w-100 h-100 d-flex flex-column align-center justify-end pointer-pass-through py-6"
                >
                    <v-scroll-x-transition mode="out-in">
                        <v-sheet
                            :key="currentIndex"
                            rounded="pill"
                            class="pa-1 pr-6 shadow-lg"
                            elevation="4"
                            color="rgba(255, 255, 255, 0.85)"
                        >
                            <v-list-item
                                prepend-icon="mdi-map-marker-radius"
                                :title="currentItem?.business_name"
                                subtitle="A decouvrir"
                            ></v-list-item>
                        </v-sheet>
                    </v-scroll-x-transition>
                </v-overlay>
            </v-carousel>
        </v-sheet>
    </v-container>
</template>

<script setup lang="ts">
// Import du composable et des types (a ajuster selon ton arborescence)
import { useBusinessMeta } from '~/composables/useBusinessMeta';
import type { BizMetaItem } from '~/types/biz';

const isMobile = inject("isMobile");
const currentIndex = ref(0);
const backgroundImage = defineModel();

// Appel du composable pour recuperer toutes les donnees (aucun ID passe)
const { data: groupedMeta } = await useBusinessMeta();

// Creation d'une liste a une dimension contenant chaque media individuellement
const flatMediaList = computed(() => {
    // Retour de securite si les donnees ne sont pas pretes
    if (!groupedMeta.value) return [];

    const list: any[] = [];

    // Parcours de chaque cle du dictionnaire (menu, service, portfolio, vibes)
    Object.values(groupedMeta.value).forEach((group: BizMetaItem[]) => {
        // Parcours des elements de chaque categorie
        group.forEach((metaItem) => {
            // Verification que l'element possede bien des liens medias
            if (metaItem.link && metaItem.link.length > 0) {
                // Creation d'une entree independante pour chaque UUID de fichier
                metaItem.link.forEach((mediaId, index) => {
                    list.push({
                        // Generation d'un ID unique pour la boucle v-for
                        id: `${metaItem.id}-${index}`, 
                        media_id: mediaId,
                        business_name: metaItem.biz_name || "Nom inconnu",
                        business_slug: metaItem.biz_slug,
                        // Utilisation de ton type pour flagger les videos
                        isVideo: metaItem.media_type === 'video' 
                    });
                });
            }
        });
    });

    return list;
});

// Suivi de l'element actuellement affiche par le carousel
const currentItem = computed(() => flatMediaList.value?.[currentIndex.value]);

// Fonction d'optimisation (lazy loading) pour ne charger que les medias proches
const shouldLoadMedia = (index: number) => {
    if (!flatMediaList.value) return false;

    const total = flatMediaList.value.length;
    const current = currentIndex.value;

    // Si tres peu de medias, on charge tout
    if (total <= 2) return true;

    // Calcul des index precedent et suivant pour un effet boucle sans erreur
    const prev = (current - 1 + total) % total;
    const next = (current + 1) % total;

    return index === current || index === prev || index === next;
};

// Ecouteur sur l'index pour mettre a jour l'image d'arriere-plan
watch(currentIndex, (val) => {
    const item = flatMediaList.value?.[val];
    if (item) backgroundImage.value = imgLink(item.media_id);
});
</script>

<style scoped>
/* Classes utilitaires pour masquer la scrollbar native */
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>