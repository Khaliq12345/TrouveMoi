<template>
  <v-sheet class="pa-0 py-6" color="transparent">
    <div v-if="metas">
      <template v-for="category in categories" :key="category.key">
        <div
          v-if="metas[category.key] && metas[category.key].length > 0"
          class="mb-12"
        >
          <div class="d-flex align-center justify-space-between mb-6 px-4">
            <h2 class="text-h5 font-weight-bold">{{ category.label }}</h2>
          </div>

          <v-carousel
            height="400"
            show-arrows="hover"
            hide-delimiters
            cycle
            interval="5000"
          >
            <v-carousel-item v-for="item in metas[category.key]" :key="item.id">
              <div class="d-flex justify-center align-center h-100">
                <v-hover v-slot="{ isHovering, props }">
                  <v-card
                    v-bind="props"
                    :elevation="isHovering ? 12 : 0"
                    class="rounded-xl transition-swing"
                    width="90%"
                    max-width="400"
                    :height="hasImage(item) ? 320 : 'auto'"
                    :color="hasImage(item) ? 'transparent' : 'grey-darken-4'"
                  >
                    <v-img
                      v-if="hasImage(item)"
                      :src="imgLink(item.link[0])"
                      height="100%"
                      cover
                      class="d-flex align-end"
                    >
                      <div class="blur-content ma-2 pa-4 rounded-xl w-auto">
                        <DetailMetaInfo :item="item" />
                      </div>
                    </v-img>

                    <div v-else class="pa-5 w-100">
                      <DetailMetaInfo :item="item" />
                    </div>
                  </v-card>
                </v-hover>
              </div>
            </v-carousel-item>
          </v-carousel>
        </div>
      </template>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
// Récupération des données depuis inject
const metas = inject<any>("metas");

// Définition des catégories à afficher
const categories = [
  { key: "menu", label: "Menu" },
  { key: "portfolio", label: "Portfolio" },
];

// Fonction utilitaire pour vérifier si un élément possède une image valide
const hasImage = (item: any): boolean => {
  return item.link && Array.isArray(item.link) && item.link.length > 0;
};
</script>
