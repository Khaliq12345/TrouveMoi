<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    max-width="750"
    scrollable
    transition="dialog-bottom-transition"
  >
    <v-card class="rounded-xl bg-white overflow-hidden">
      <!-- Header moderne et épuré -->
      <v-card-item class="pa-6 pb-4">
        <template v-slot:prepend>
          <p class="text-h5 font-weight-bold text-grey-darken-3">
            {{ categoryLabel }}
          </p>
        </template>

        <template v-slot:append>
          <v-btn
            icon="mdi-close"
            variant="text"
            color="grey-darken-1"
            size="small"
            class="rounded-lg"
            @click="$emit('update:modelValue', false)"
          />
        </template>
      </v-card-item>

      <v-divider class="mx-6" />

      <!-- Contenu scrollable -->
      <v-card-text class="pa-6 pt-4">
        <v-row>
          <v-col
            v-for="item in uniqueItems"
            :key="item.id || item.title"
            cols="12"
            class="pa-0 mb-4"
          >
            <!-- Plus de rounded (rounded-3xl) -->
            <v-card class="rounded-xl overflow-hidden border" elevation="0">
              <!-- Images seulement si présentes -->
              <template v-if="item.link && item.link.length > 0">
                <v-carousel
                  v-if="item.link.length > 1"
                  height="320"
                  hide-delimiter-background
                  show-arrows="hover"
                  color="white"
                  class="bg-grey-lighten-3"
                >
                  <v-carousel-item v-for="imageId in item.link" :key="imageId">
                    <v-img :src="imgLink(imageId)" height="100%" cover />
                  </v-carousel-item>
                </v-carousel>

                <v-img
                  v-else
                  :src="imgLink(item.link[0])"
                  height="320"
                  cover
                  class="bg-grey-lighten-3"
                />
              </template>

              <!-- Contenu -->
              <div class="pa-5">
                <!-- Titre et prix -->
                <div class="d-flex justify-space-between align-start ga-4 mb-3">
                  <h3
                    class="text-h6 font-weight-bold text-grey-darken-3 flex-grow-1"
                  >
                    {{ item.title || "Sans titre" }}
                  </h3>

                  <v-chip
                    v-if="item.price"
                    color="primary"
                    variant="flat"
                    class="font-weight-bold flex-shrink-0"
                    size="large"
                  >
                    {{ item.price }}€
                  </v-chip>
                </div>

                <!-- Description -->
                <p
                  class="text-body-1 text-grey-darken-2 mb-0"
                  style="line-height: 1.6"
                >
                  {{ item.description || "Aucune description disponible." }}
                </p>
              </div>
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
    const key = item.id || `${item.title || "item"}-${index}`;

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
        existingItem.link = Array.from(
          new Set([...existingItem.link, ...item.link]),
        );
      }
    }
  });

  // Retourne le tableau final nettoyé
  return Array.from(map.values());
});
</script>
