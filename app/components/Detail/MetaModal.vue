<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    max-width="800"
    scrollable
    transition="dialog-bottom-transition"
  >
    <v-card class="rounded-xl bg-grey-lighten-4">
      <v-toolbar color="white" flat class="px-2 border-b">
        <v-toolbar-title class="text-h5 font-weight-bold">
          {{ categoryLabel }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          icon="mdi-close"
          variant="text"
          color="grey-darken-2"
          @click="$emit('update:modelValue', false)"
        ></v-btn>
      </v-toolbar>

      <v-card-text class="pa-4 pa-sm-6">
        <v-row>
          <v-col v-for="item in items" :key="item.id" cols="12">
            <v-card
              class="rounded-lg overflow-hidden border"
              elevation="0"
              color="white"
            >
              <v-carousel
                v-if="item.link && item.link.length > 1"
                height="300"
                hide-delimiter-background
                show-arrows="hover"
                color="primary"
              >
                <v-carousel-item v-for="imageId in item.link" :key="imageId">
                  <v-img
                    :src="imgLink(imageId)"
                    height="100%"
                    cover
                    class="bg-grey-lighten-2"
                  ></v-img>
                </v-carousel-item>
              </v-carousel>

              <v-img
                v-else-if="item.link && item.link.length === 1"
                :src="imgLink(item.link[0])"
                height="300"
                cover
                class="bg-grey-lighten-2"
              ></v-img>

              <v-card-item class="pt-4">
                <template v-slot:title>
                  <div
                    class="d-flex justify-space-between align-center flex-wrap ga-2"
                  >
                    <span class="text-h6 font-weight-bold text-grey-darken-4">
                      {{ item.title || "Sans titre" }}
                    </span>
                    <span
                      v-if="item.price"
                      class="text-h6 font-weight-black text-primary"
                    >
                      {{ item.price }}€
                    </span>
                  </div>
                </template>
              </v-card-item>

              <v-card-text class="text-body-1 text-grey-darken-1 pb-4">
                {{
                  item.description ||
                  "Aucune description détaillée n'est disponible pour cet élément."
                }}
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

defineProps<{
  modelValue: boolean;
  categoryLabel: string;
  items: BizMetaItem[];
}>();

// Déclaration des événements émis pour la synchronisation du v-model
defineEmits(["update:modelValue"]);
</script>