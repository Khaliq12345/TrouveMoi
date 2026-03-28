<template>
  <div v-bind="$attrs">
    <v-hover v-slot:default="{ isHovering, props }">
      <v-card
        v-bind="props"
        :elevation="isHovering ? 4 : 0"
        class="mt-4 rounded-xl overflow-hidden"
        border
      >
        <NuxtLink
          :to="`/details/${biz?.slug}`"
          target="_blank"
          class="text-decoration-none"
        >
          <div :class="['d-flex w-100', isMobile ? 'flex-column' : 'flex-row']">
            <SearchCardMedia :media-list="flatMediaList" />

            <v-card-text class="d-flex flex-column flex-grow-1 pa-4">
              <SearchCardHeader :business="biz" />
              <SearchCardDetails :business="biz" />
              <v-spacer />
              <SearchCardFooter :business="biz" />
            </v-card-text>
          </div>
        </NuxtLink>
      </v-card>
    </v-hover>
  </div>
</template>

<script setup lang="ts">
import { useBusinessMeta } from "~/composables/useBusinessMeta"; // Ajuste le chemin si besoin

const props = defineProps({ biz: Object });
defineOptions({
  inheritAttrs: false,
});
const isMobile = inject("isMobile");

// 1. Récupération des médias principaux du business
const { businessMedia } = await useFetchSingleMedia(ref(props.biz));

// 2. Récupération des métas du business (avec notre nouveau composable)
const { data: groupedMeta } = await useBusinessMeta(props.biz?.id);

// 3. Aplatissement de tous les médias (Principaux + Métas)
const flatMediaList = computed(() => {
  const list: Array<{
    id: string;
    url: string;
    isVideo: boolean;
    media_id: string;
  }> = [];

  // --- Ajout des médias principaux ---
  if (businessMedia.value && businessMedia.value.length > 0) {
    businessMedia.value.forEach((m, index) => {
      list.push({
        id: `main-${m.id || index}`,
        media_id: m.media_id,
        url: imgLink(m.media_id),
        isVideo: m.type === "video",
      });
    });
  }

  // --- Ajout des médias issus des métas ---
  if (groupedMeta.value) {
    Object.values(groupedMeta.value).forEach((group: any[]) => {
      group.forEach((metaItem) => {
        if (metaItem.link && metaItem.link.length > 0) {
          metaItem.link.forEach((mediaId: string, index: number) => {
            list.push({
              id: `meta-${metaItem.id}-${index}`,
              media_id: mediaId,
              url: imgLink(mediaId),
              isVideo: metaItem.media_type === "video",
            });
          });
        }
      });
    });
  }

  return list;
});
</script>
