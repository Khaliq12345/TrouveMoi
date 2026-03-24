<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    max-width="750"
    scrollable
    transition="dialog-bottom-transition"
  >
    <v-card class="rounded-xl bg-primary-lighten-5 overflow-hidden">
      
      <v-toolbar color="transparent" density="comfortable" class="px-4">
        <v-toolbar-title class="text-h6 font-weight-bold text-primary">
          {{ categoryLabel }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          icon="mdi-close"
          variant="tonal"
          color="primary"
          size="small"
          class="rounded-lg"
          @click="$emit('update:modelValue', false)"
        ></v-btn>
      </v-toolbar>

      <v-card-text class="pa-4">
        <v-row class="ga-1">
          <v-col v-for="item in uniqueItems" :key="item.id || item.title" cols="12" class="pa-2">
            
            <v-card class="rounded-xl elevation-2 overflow-hidden border-0">
              
              <v-carousel
                v-if="item.link && item.link.length > 1"
                height="300"
                hide-delimiter-background
                show-arrows="hover"
                color="primary"
              >
                <v-carousel-item v-for="imageId in item.link" :key="imageId">
                  <v-img :src="imgLink(imageId)" height="100%" cover class="bg-grey-lighten-4"></v-img>
                </v-carousel-item>
              </v-carousel>

              <v-img
                v-else-if="item.link && item.link.length === 1"
                :src="imgLink(item.link[0])"
                height="300"
                cover
                class="bg-grey-lighten-4"
              ></v-img>

              <v-card-item class="px-5 pt-4 pb-2">
                <template v-slot:title>
                  <div class="d-flex justify-space-between align-center flex-wrap ga-2">
                    <span class="text-h6 font-weight-bold text-grey-darken-4">
                      {{ item.title || "Sans titre" }}
                    </span>
                    <v-chip
                      v-if="item.price"
                      color="primary"
                      variant="flat"
                      class="font-weight-black"
                      size="default"
                    >
                      {{ item.price }}€
                    </v-chip>
                  </div>
                </template>
              </v-card-item>

              <v-card-text class="text-body-2 text-grey-darken-1 px-5 pb-5">
                {{ item.description || "Aucune description disponible." }}
              </v-card-text>
            </v-card>

          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type { BizMetaItem } from "~/types/biz";

const props = defineProps<{
  modelValue: boolean;
  categoryLabel: string;
  items: BizMetaItem[];
}>();

defineEmits(["update:modelValue"]);

// Logique de déduplication générale et sécurisée pour le Server Side Rendering (SSR)
const uniqueItems = computed(() => {
  if (!props.items || !Array.isArray(props.items)) return [];

  const map = new Map();

  props.items.forEach((item, index) => {
    // Définition d'une clé d'unicité basée sur l'ID
    // En cas d'absence d'ID, on utilise le titre et l'index pour éviter les conflits SSR
    const key = item.id || `${item.title || 'item'}-${index}`;

    if (!map.has(key)) {
      // Clonage de l'objet pour ne pas muter les données parentes
      const newItem = { ...item };
      
      // Suppression des images dupliquées à l'intérieur d'un même item
      if (Array.isArray(newItem.link)) {
        newItem.link = Array.from(new Set(newItem.link));
      }
      
      map.set(key, newItem);
    } else {
      // Si l'objet existe déjà (doublon), on fusionne les images additionnelles
      // Cela permet de récupérer toutes les photos si un même item est divisé en plusieurs blocs
      const existingItem = map.get(key);
      if (Array.isArray(existingItem.link) && Array.isArray(item.link)) {
        existingItem.link = Array.from(new Set([...existingItem.link, ...item.link]));
      }
    }
  });

  // Retourne le tableau final nettoyé
  return Array.from(map.values());
});
</script>