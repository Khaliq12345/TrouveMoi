<template>
  <v-sheet color="transparent" class="py-4">
    <!-- Titre de section -->
    <div class="d-flex align-center mb-4 px-2">
      <v-icon color="primary" class="mr-2">mdi-card-multiple-outline</v-icon>
      <h2 class="text-h6 font-weight-bold">Nos services</h2>
    </div>

    <v-slide-group show-arrows>
      <v-slide-group-item
        v-for="item in allItems"
        :key="item.id"
      >
        <v-card
          class="meta-card ma-2 rounded-xl"
          width="200"
          color="transparent"
          flat
          border
        >
          <!-- Image en haut -->
          <v-img
            v-if="hasImage(item)"
            :src="getImageSrc(item)"
            height="140"
            cover
            class="rounded-t-xl"
          />
          <!-- Placeholder si pas d'image -->
          <div
            v-else
            class="no-image-placeholder rounded-t-xl d-flex align-center justify-center"
          >
            <v-icon size="40" color="grey-lighten-1">mdi-image-off-outline</v-icon>
          </div>

          <!-- Titre + description -->
          <v-card-text class="pa-3">
            <div class="d-flex align-center justify-space-between mb-1">
              <span class="text-body-2 font-weight-bold text-truncate">
                {{ item.title || "Sans titre" }}
              </span>
              <v-chip
                v-if="item.price"
                size="x-small"
                color="primary"
                variant="tonal"
                class="ml-1 flex-shrink-0"
              >
                {{ item.price }}€
              </v-chip>
            </div>
            <p class="text-caption text-medium-emphasis meta-description">
              {{ item.description || "Aucune description disponible." }}
            </p>
            <!-- Badge type -->
            <v-chip
              size="x-small"
              variant="outlined"
              class="mt-2 text-capitalize"
            >
              {{ item.type }}
            </v-chip>
          </v-card-text>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>

<script setup lang="ts">
import type { BizMetaItem, GroupedBizMeta } from "~/types/biz";

const metas = inject<Ref<GroupedBizMeta | null>>("metas");

// Uniquement les items de type "service"
const allItems = computed<BizMetaItem[]>(() => {
  return metas?.value?.service ?? [];
});

const hasImage = (item: BizMetaItem): boolean =>
  Array.isArray(item.link) && item.link.length > 0;

const getImageSrc = (item: BizMetaItem): string => {
  const uuid = item.link?.[0];
  return uuid ? imgLink(uuid) : '';
};
</script>

<style scoped>
.meta-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.meta-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12) !important;
}
.no-image-placeholder {
  height: 140px;
  background: rgba(0, 0, 0, 0.04);
}
.meta-description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
