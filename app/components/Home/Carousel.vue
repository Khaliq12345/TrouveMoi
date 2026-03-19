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
        v-if="mediaItems && mediaItems.length" 
        v-model="currentIndex" 
        direction="vertical" 
        :cycle="true"
        :height="isMobile ? 800 : 799" 
        hide-delimiter-background
        hide-delimiters
        :show-arrows="false"
      >

        <v-carousel-item v-for="(item, i) in mediaItems" :key="item.id">
          
          <div class="w-100 h-100 d-flex justify-center align-center">

            <video
              :key="'fg-' + item.media_id"
              :src="shouldLoadVideo(i) ? imgLink(item.media_id) : ''"
              preload="none"
              autoplay
              loop
              muted
              playsinline
              class="w-100 h-100"
              style="object-fit: contain;"
              @loadeddata="$event.target.play()"
            ></video>

          </div>

        </v-carousel-item>

        <v-overlay :scrim="false" contained model-value persistent no-click-animation
          content-class="w-100 h-100 d-flex flex-column align-center justify-end pointer-pass-through py-6">

          <v-scroll-x-transition mode="out-in">
            <v-sheet :key="currentIndex" rounded="pill" class="pa-1 pr-6 shadow-lg" elevation="4" color="rgba(255, 255, 255, 0.85)">
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
  </v-container>
</template>

<script setup lang="ts">
// (Script inchangé, je l'inclus pour que le code soit fonctionnel)
const { $directus, $readItems } = useNuxtApp();
const isMobile = inject('isMobile');

const currentIndex = ref(0);
const backgroundImage = defineModel(); 

const { data: mediaItems, error } = await useAsyncData('home_media', async () => {
  try {
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

    if (!media || media.length === 0) return [];

    const businessIds = [...new Set(media.map(m => m.extra_id))];
    const businesses = await $directus.request(
      $readItems("businesses", {
        filter: { id: { _in: businessIds } },
        fields: ["id", "name"]
      })
    );

    return media.map(m => ({
      ...m,
      business_name: businesses.find(b => b.id === m.extra_id)?.name || "Nom inconnu"
    }));

  } catch (err) {
    console.error("Erreur Directus :", err);
    return [];
  }
});

const currentItem = computed(() => mediaItems.value?.[currentIndex.value]);

const shouldLoadVideo = (index: number) => {
  if (!mediaItems.value) return false;
  
  const total = mediaItems.value.length;
  const current = currentIndex.value;

  if (total <= 2) return true;

  const prev = (current - 1 + total) % total;
  const next = (current + 1) % total;

  return index === current || index === prev || index === next;
};

watch(currentIndex, (val) => {
  const item = mediaItems.value?.[val];
  if (item) backgroundImage.value = imgLink(item.media_id);
});
</script>

<style scoped>
/* Il ne reste plus que la gestion des barres de défilement (si nécessaire). 
   Le style inline h-100 sur le container parent permet de prendre la hauteur de son propre parent. */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>