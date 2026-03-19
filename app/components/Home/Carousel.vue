<template>
  <!-- Background global flouté basé sur l’item courant -->
  <div class="global-blurred-bg" v-if="currentItem">

    <!-- Vidéo de fond synchronisée avec l’item courant -->
    <!-- key force le refresh, autoplay + muted requis pour lecture auto -->
    <video
      :key="'bg-' + currentItem.media_id"
      :src="imgLink(currentItem.media_id)"
      autoplay
      loop
      muted
      playsinline
      class="video-bg-fullscreen"
      @loadeddata="$event.target.play()" 
    ></video>

    <!-- Overlay visuel pour améliorer la lisibilité (darken / blur) -->
    <div class="bg-overlay"></div>
  </div>

  <!-- Conteneur principal centré, dimensions adaptatives -->
  <v-sheet 
    class="mx-auto relative overflow-hidden bg-transparent" 
    :width="isMobile ? 415 : 600" 
    :height="isMobile ? 800 : 799"
    elevation="0"
  >

    <!-- Carousel vertical des médias -->
    <!-- v-model synchronise l’index courant -->
    <v-carousel 
      v-if="mediaItems && mediaItems.length" 
      v-model="currentIndex" 
      direction="vertical" 
      :cycle="true"
      :height="isMobile ? 800 : 799" 
      hide-delimiter-background
      hide-delimiters
      :show-arrows="false"
    >

      <!-- Itération sur chaque média -->
      <v-carousel-item v-for="(item, i) in mediaItems" :key="item.id">
        
        <!-- Wrapper vidéo foreground -->
        <div class="video-container">

          <!-- Vidéo principale -->
          <!-- Chargement conditionnel pour éviter surcharge réseau -->
          <!-- preload none = pas de buffer inutile -->
          <video
            :key="'fg-' + item.media_id"
            :src="shouldLoadVideo(i) ? imgLink(item.media_id) : ''"
            preload="none"
            autoplay
            loop
            muted
            playsinline
            class="video-fg"
            @loadeddata="$event.target.play()"
          ></video>

        </div>

      </v-carousel-item>

      <!-- Overlay UI au-dessus du carousel -->
      <!-- Pas de scrim, n’intercepte pas les clics -->
      <v-overlay :scrim="false" contained model-value persistent no-click-animation
        content-class="w-100 h-100 d-flex flex-column align-center justify-end pointer-pass-through py-6">

        <!-- Animation lors du changement d’item -->
        <v-scroll-x-transition mode="out-in">

          <!-- Badge dynamique lié à l’index courant -->
          <v-sheet :key="currentIndex" rounded="pill" class="pa-1 pr-6 shadow-lg" elevation="4" color="rgba(255, 255, 255, 0.85)">

            <!-- Affichage des infos du business -->
            <v-list-item 
              prepend-icon="mdi-map-marker-radius" 
              :title="currentItem?.business_name"
              subtitle="À découvrir"
            ></v-list-item>

          </v-sheet>
        </v-scroll-x-transition>

      </v-overlay>
    </v-carousel>
  </v-sheet>
</template>

<script setup lang="ts">
// Importation des utilitaires
const { $directus, $readItems } = useNuxtApp();
const isMobile = inject('isMobile');

// Initialisation des variables réactives
const currentIndex = ref(0);
const backgroundImage = defineModel();

// Fonction de récupération des vidéos depuis Directus
const { data: mediaItems, error } = await useAsyncData('home_media', async () => {
  try {
    console.log("Tentative de récupération des vidéos...");

    // Requête principale pour les médias
    const media = await $directus.request(
      $readItems("buisness_media", {
        filter: {
          show_in_homepage: { _eq: true },
          extra_type: { _eq: "buisness" },
          type: { _eq: "video" } 
        },
        fields: ["id", "media_id", "extra_id"]
      })
    );

    if (!media || media.length === 0) {
      console.warn("Aucune vidéo trouvée.");
      return [];
    }

    // Récupération des noms d'entreprises liés
    const businessIds = [...new Set(media.map(m => m.extra_id))];
    const businesses = await $directus.request(
      $readItems("businesses", {
        filter: { id: { _in: businessIds } },
        fields: ["id", "name"]
      })
    );

    // Fusion et retour des données
    const mergedData = media.map(m => ({
      ...m,
      business_name: businesses.find(b => b.id === m.extra_id)?.name || "Nom inconnu"
    }));

    return mergedData;

  } catch (err) {
    console.error("Erreur Directus :", err);
    return [];
  }
});

// Calcul de l'élément actif pour alimenter l'arrière-plan global et les titres
const currentItem = computed(() => mediaItems.value?.[currentIndex.value]);

// --- LOGIQUE DE CHARGEMENT PARESSEUX (LAZY LOADING) ---
// Cette fonction détermine quelles vidéos doivent être rattachées au DOM et téléchargées
const shouldLoadVideo = (index: number) => {
  // Sécurité si les données ne sont pas encore chargées
  if (!mediaItems.value) return false;
  
  const total = mediaItems.value.length;
  const current = currentIndex.value;

  // S'il n'y a que 2 vidéos ou moins dans la base, on peut tout charger d'un coup
  if (total <= 2) return true;

  // Calcul mathématique pour trouver l'index précédent et suivant de manière circulaire.
  // Le carrousel tourne en boucle, donc si on est à l'index 0, le précédent est le dernier élément.
  const prev = (current - 1 + total) % total;
  const next = (current + 1) % total;

  // On autorise le chargement uniquement pour l'élément actif et ses voisins immédiats
  return index === current || index === prev || index === next;
};

// Mise à jour du composant parent
watch(currentIndex, (val) => {
  const item = mediaItems.value?.[val];
  if (item) backgroundImage.value = imgLink(item.media_id);
});
</script>

<style scoped>
/* --- Styles pour l'arrière-plan plein écran --- */
.global-blurred-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1; /* Place l'arrière-plan derrière toute l'application */
  overflow: hidden;
  background-color: #000;
}

.video-bg-fullscreen {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120%; /* Plus grand que l'écran pour cacher les bords nets du flou */
  height: 120%;
  object-fit: cover;
  transform: translate(-50%, -50%);
  filter: blur(60px) brightness(0.8); /* Flou puissant */
}

/* Couche semi-transparente pour garantir le contraste de la navigation et du texte */
.bg-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4); 
}

/* --- Styles pour le carrousel central --- */
.bg-transparent {
  background-color: transparent !important;
}

.video-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* La vidéo nette au centre */
.video-fg {
  width: 100%;
  height: 100%;
  object-fit: contain; /* Assure que la vidéo ne soit pas coupée */
}

/* Gestion des barres de défilement */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>