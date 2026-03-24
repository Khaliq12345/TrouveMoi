<template>
  <v-sheet class="pa-0 py-6" color="transparent">
    <div v-if="!id">
      <v-skeleton-loader type="image"></v-skeleton-loader>
    </div>

    <div v-else-if="pending" class="d-flex justify-center py-10">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <div v-else-if="error" class="text-center text-error py-10">
      Une erreur est survenue lors du chargement des données.
    </div>

    <div v-else-if="metas">
      <template v-for="category in categories" :key="category.key">
        <div
          v-if="metas[category.key] && metas[category.key].length > 0"
          class="mb-12"
        >
          <div class="d-flex align-center justify-space-between mb-6 px-4">
            <h2 class="text-h5 font-weight-bold">{{ category.label }}</h2>
            <v-btn
              variant="text"
              color="primary"
              class="text-none"
              append-icon="mdi-chevron-right"
              @click="openModal(category)"
            >
              Voir tout
            </v-btn>
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
                        <div
                          class="d-flex justify-space-between align-start mb-2"
                        >
                          <span
                            class="text-h6 font-weight-bold text-white text-truncate mr-2"
                          >
                            {{ item.title || "Sans titre" }}
                          </span>
                          <span
                            v-if="item.price"
                            class="text-h6 font-weight-black text-white"
                          >
                            {{ item.price }}€
                          </span>
                        </div>
                        <div class="text-body-2 text-white text-truncate">
                          {{
                            item.description || "Aucune description disponible."
                          }}
                        </div>
                      </div>
                    </v-img>

                    <div v-else class="pa-5 w-100">
                      <div
                        class="d-flex justify-space-between align-start mb-2"
                      >
                        <span
                          class="text-h6 font-weight-bold text-white text-truncate mr-2"
                        >
                          {{ item.title || "Sans titre" }}
                        </span>
                        <span
                          v-if="item.price"
                          class="text-h6 font-weight-black text-white"
                        >
                          {{ item.price }}€
                        </span>
                      </div>
                      <div class="text-body-2 text-white text-truncate">
                        {{
                          item.description || "Aucune description disponible."
                        }}
                      </div>
                    </div>
                  </v-card>
                </v-hover>
              </div>
            </v-carousel-item>
            <!-- modal -->
            <DetailMetaModal
              v-model="isModalOpen"
              :category-label="modalCategoryLabel"
              :items="modalItems"
            />
          </v-carousel>
        </div>
      </template>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: string; // ID de l'entreprise
}>();

const isModalOpen = ref(false);
const modalCategoryLabel = ref("");
const modalItems = ref<any[]>([]);

// Récupération des données depuis le composable
const { data: metas, pending, error } = useBusinessMeta(props.id);

// Définition des catégories à afficher
const categories = [
  { key: "menu", label: "Menu" },
  { key: "service", label: "Services" },
  { key: "portfolio", label: "Portfolio" },
  { key: "vibes", label: "Vibes" },
];

// Fonction utilitaire pour vérifier si un élément possède une image valide
const hasImage = (item: any): boolean => {
  return item.link && Array.isArray(item.link) && item.link.length > 0;
};

// Ouvre la modal avec les données de la catégorie cliquée
const openModal = (category: { key: string; label: string }) => {
  if (metas.value?.[category.key]) {
    modalCategoryLabel.value = category.label;
    modalItems.value = metas.value[category.key];
    isModalOpen.value = true;
  }
};
</script>
