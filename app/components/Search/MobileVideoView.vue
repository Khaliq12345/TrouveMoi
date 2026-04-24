<template>
  <ClientOnly>
    <v-sheet class="fill-height overflow-y-auto bg-transparent">
      <div
        v-if="pending"
        class="d-flex justify-center align-center fill-height"
      >
        <v-progress-circular indeterminate color="primary" />
      </div>

      <div
        v-else-if="flatVideoList.length === 0"
        class="d-flex justify-center align-center fill-height"
      >
        <v-alert type="info" text="Aucune vidéo disponible" variant="tonal" />
      </div>

      <div v-else class="pa-2">
        <div
          v-for="business in groupedByBusiness"
          :key="business.biz_slug"
          class="mb-6"
        >
          <div class="d-flex align-center mb-2 px-2">
            <v-icon icon="mdi-store" size="small" class="mr-2 text-primary" />
            <span class="text-subtitle-1 font-weight-bold">{{
              business.biz_name
            }}</span>
          </div>

          <v-slide-group class="video-slide-group">
            <v-slide-group-item
              v-for="video in business.videos"
              :key="video.id"
              v-slot="{ isSelected, toggle }"
            >
              <v-card
                width="220"
                height="380"
                class="mx-2 rounded-lg overflow-hidden position-relative cursor-pointer"
                :elevation="isSelected ? 8 : 2"
                @click="handleVideoSelect(video.id, toggle, isSelected)"
              >
                <video
                  :ref="(el) => setVideoRef(el, video.id)"
                  :src="imgLink(video.media_id)"
                  class="w-100 h-100 bg-black"
                  style="object-fit: cover"
                  :controls="false"
                  preload="metadata"
                  playsinline
                />

                <div
                  v-if="video.title"
                  class="title-overlay position-absolute bottom-0 w-100 text-center py-3 px-2 text-white"
                >
                  <span class="text-body-2 font-weight-medium line-clamp-2">
                    {{ video.title }}
                  </span>
                </div>
              </v-card>
            </v-slide-group-item>
          </v-slide-group>
        </div>
      </div>
    </v-sheet>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useBusinessMeta } from "~/composables/useBusinessMeta";
import type { BizMetaItem } from "~/types/biz";

// Récupération des entreprises trouvées dans la recherche (si contexte disponible)
const businessesData = inject("businesses-data", null) as any;
const businesses = businessesData?.businesses;

// Récupération des métadonnées des entreprises
const { data: groupedMeta, pending } = await useBusinessMeta();

// Dictionnaire pour stocker les références des éléments HTML <video>
const videoElements = ref<Record<string, HTMLVideoElement>>({});

// Fonction pour assigner dynamiquement les références vidéo lors du rendu de la boucle
const setVideoRef = (el: any, id: string) => {
  if (el) {
    videoElements.value[id] = el as HTMLVideoElement;
  }
};

// Fonction pour gérer la sélection d'une vidéo et sa lecture automatique
const handleVideoSelect = (
  videoId: string,
  toggle: () => void,
  isSelected: boolean,
) => {
  // Bascule l'état "sélectionné" dans le v-slide-group
  toggle();

  // Récupère l'élément vidéo cliqué
  const targetVideo = videoElements.value[videoId];

  if (targetVideo) {
    if (!isSelected) {
      // Si la vidéo n'était pas sélectionnée, elle le devient maintenant.
      // Étape 1 : Mettre en pause toutes les autres vidéos pour éviter les superpositions sonores
      Object.values(videoElements.value).forEach((video) => {
        if (video !== targetVideo) {
          video.pause();
        }
      });
      // Étape 2 : Lancer la lecture de la vidéo sélectionnée
      targetVideo.play().catch((err) => {
        console.warn(
          "La lecture automatique a été bloquée par le navigateur :",
          err,
        );
      });
    } else {
      // Si la vidéo était déjà sélectionnée, le clic la désélectionne, on la met en pause
      targetVideo.pause();
    }
  }
};

// Aplatissement de la liste des vidéos
const flatVideoList = computed(() => {
  if (!groupedMeta.value) return [];

  const validSlugs = businesses?.value?.map((b: any) => b.slug) || [];

  const list: Array<{
    id: string;
    media_id: string;
    biz_name: string;
    biz_slug: string;
    title?: string;
  }> = [];

  // Parcours de toutes les catégories
  Object.values(groupedMeta.value).forEach((group: BizMetaItem[]) => {
    group.forEach((metaItem) => {
      // Filtrer par les entreprises trouvées s'il y a un contexte de recherche
      if (businesses !== undefined) {
        if (!validSlugs.includes(metaItem.biz_slug)) return;
      }

      // Vérification si l'élément est une vidéo
      const isVideoItem =
        metaItem.type === "video" || metaItem.media_type === "video";

      if (isVideoItem && metaItem.link && metaItem.link.length > 0) {
        // Création d'une entrée pour chaque fichier vidéo
        metaItem.link.forEach((mediaId, index) => {
          list.push({
            id: `${metaItem.id}-${index}`,
            media_id: mediaId,
            biz_name: metaItem.biz_name || "Nom inconnu",
            biz_slug: metaItem.biz_slug || "",
            title: metaItem.title,
          });
        });
      }
    });
  });

  return list;
});

// Regroupement des vidéos par entreprise pour l'affichage vertical
const groupedByBusiness = computed(() => {
  const groups: Record<
    string,
    { biz_name: string; biz_slug: string; videos: typeof flatVideoList.value }
  > = {};

  flatVideoList.value.forEach((video) => {
    if (!groups[video.biz_slug]) {
      groups[video.biz_slug] = {
        biz_name: video.biz_name,
        biz_slug: video.biz_slug,
        videos: [],
      };
    }
    groups[video.biz_slug].videos.push(video);
  });

  return Object.values(groups);
});
</script>

<style scoped>
/* Ajustement de l'espacement interne du groupe de défilement */
.video-slide-group :deep(.v-slide-group__content) {
  padding: 16px 0;
}

/* Classe personnalisée pour l'effet de flou sombre sur le titre */
.title-overlay {
  background: rgba(0, 0, 0, 0.5); /* Fond noir semi-transparent */
  backdrop-filter: blur(8px); /* Effet de flou sur l'arrière-plan */
  -webkit-backdrop-filter: blur(
    8px
  ); /* Compatibilité avec les navigateurs basés sur WebKit (Safari) */
  z-index: 2; /* Assure que le texte reste au-dessus de la vidéo */
  transition: background 0.3s ease; /* Transition douce */
}

/* Limite le texte du titre à 2 lignes avec des points de suspension s'il est trop long */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
