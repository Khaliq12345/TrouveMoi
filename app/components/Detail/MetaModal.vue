<template>
    <v-dialog
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      max-width="900"
      scrollable
      transition="slide-y-reverse-transition"
      class="modern-modal"
    >
      <v-card class="rounded-xl bg-white overflow-hidden border-0">
        <v-card-item class="py-4 px-6 border-b">
          <div class="d-flex align-center justify-space-between w-100">
            <div>
              <h2 class="text-h6 font-weight-bold color-dark mb-0">
                {{ categoryLabel }}
              </h2>
              <span class="text-caption text-medium-emphasis">
                {{ processedItems.length }} article{{
                  processedItems.length > 1 ? "s" : ""
                }}
                au total
              </span>
            </div>
            <v-btn
              icon="mdi-close"
              variant="tonal"
              color="grey-darken-3"
              size="small"
              elevation="0"
              class="rounded-circle"
              @click="$emit('update:modelValue', false)"
            />
          </div>
        </v-card-item>
  
        <v-card-text class="pa-0 bg-grey-lighten-5">
          <div v-if="processedItems.length > 0" class="pa-4 pa-sm-6">
            <v-row>
              <v-col
                v-for="(item, index) in processedItems"
                :key="item.title || index"
                cols="12"
                class="mb-6"
              >
                <v-card
                  class="product-card rounded-xl overflow-hidden"
                  elevation="2"
                >
                  <div class="position-relative">
                    <v-carousel
                      v-if="item.link && item.link.length > 1"
                      :height="mobile ? 350 : 450"
                      hide-delimiters
                      show-arrows="hover"
                      class="bg-grey-lighten-2"
                    >
                      <v-carousel-item
                        v-for="(imageId, idx) in item.link"
                        :key="idx"
                      >
                        <v-img :src="imgLink(imageId)" cover height="100%" />
                      </v-carousel-item>
                    </v-carousel>
  
                    <v-img
                      v-else-if="item.link && item.link.length === 1"
                      :src="imgLink(item.link[0])"
                      :height="mobile ? 350 : 450"
                      cover
                      class="bg-grey-lighten-2"
                    />
  
                    <v-sheet
                      v-else
                      :height="mobile ? 200 : 300"
                      class="d-flex align-center justify-center bg-grey-lighten-3"
                    >
                      <v-icon
                        icon="mdi-image-off-outline"
                        size="48"
                        color="grey-lighten-1"
                      />
                    </v-sheet>
  
                    <div class="content-overlay">
                      <div class="d-flex align-end justify-space-between ga-4">
                        <div class="flex-grow-1 overflow-hidden">
                          <h3
                            class="text-h6 text-sm-h5 font-weight-bold text-white mb-1 truncate-1"
                          >
                            {{ item.title }}
                          </h3>
  
                          <div v-if="item.description" class="description-box">
                            <p class="text-body-2 text-white font-weight-medium mb-0">
                              {{
                                isExpanded(item.title)
                                  ? item.description
                                  : truncateText(item.description)
                              }}
                              <button
                                v-if="item.description.length > 100"
                                @click.stop="toggleExpand(item.title)"
                                class="toggle-link"
                              >
                                {{
                                  isExpanded(item.title)
                                    ? "Voir moins"
                                    : "Voir plus"
                                }}
                              </button>
                            </p>
                          </div>
                        </div>
  
                        <div v-if="isValidPrice(item.price)" class="price-tag">
                          {{ formatPrice(item.price) }}
                        </div>
                      </div>
                    </div>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </div>
  
          <div v-else class="pa-12 text-center">
            <v-icon
              icon="mdi-tray-blank"
              size="64"
              color="grey-lighten-2"
              class="mb-4"
            />
            <p class="text-body-1 text-medium-emphasis">
              Aucun élément à afficher.
            </p>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup lang="ts">
  import { computed, ref } from "vue";
  import { useDisplay } from "vuetify";
  
  const { mobile } = useDisplay();
  
  const props = defineProps<{
    modelValue: boolean;
    categoryLabel: string;
    items: any[];
  }>();
  
  defineEmits(["update:modelValue"]);
  
  const isValidPrice = (price: any): boolean => {
    if (price === null || price === undefined || price === "") return false;
    const num = typeof price === "string" ? parseFloat(price) : price;
    return !isNaN(num) && num > 0;
  };
  
  const expandedItems = ref(new Set<string>());
  const toggleExpand = (title: string) => {
    if (expandedItems.value.has(title)) expandedItems.value.delete(title);
    else expandedItems.value.add(title);
  };
  const isExpanded = (title: string) => expandedItems.value.has(title);
  
  const truncateText = (text: string) => {
    return text.length > 100 ? text.substring(0, 100) + "..." : text;
  };
  
  // Formatage en Francs
  const formatPrice = (price: number | string) => {
    return new Intl.NumberFormat("fr-FR").format(Number(price)) + " F";
  };
  
  // Logique de regroupement intacte
  const processedItems = computed(() => {
    const map = new Map();
    props.items.forEach((item) => {
      const key = item.title?.trim() || "Sans titre";
      if (!map.has(key)) {
        map.set(key, {
          ...item,
          link: Array.isArray(item.link)
            ? [...item.link]
            : item.link
              ? [item.link]
              : [],
        });
      } else {
        const existing = map.get(key);
        const newLinks = Array.isArray(item.link) ? item.link : [item.link];
        existing.link = Array.from(new Set([...existing.link, ...newLinks]));
        if (!existing.description && item.description)
          existing.description = item.description;
        if (!existing.price && item.price) existing.price = item.price;
      }
    });
    return Array.from(map.values());
  });
  
  declare function imgLink(id: string): string;
  </script>
  
  <style scoped>
  .modern-modal {
    backdrop-filter: blur(4px);
  }
  
  .product-card {
    transition: all 0.3s ease;
    border: 1px solid rgba(0, 0, 0, 0.05) !important;
  }
  
  .content-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.85) 0%,
      rgba(0, 0, 0, 0.4) 50%,
      transparent 100%
    );
    z-index: 2;
  }
  
  /* Badge de prix : Blur conservé avec contraste renforcé pour la netteté */
  .price-tag {
    background: rgba(0, 0, 0, 0.5); /* Plus sombre pour faire ressortir le texte blanc */
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    padding: 8px 16px;
    border-radius: 12px;
    font-weight: 700;
    font-size: 1.1rem;
    white-space: nowrap;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  }
  
  .toggle-link {
    color: #5bbad5;
    font-weight: 600;
    margin-left: 5px;
    text-decoration: none;
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .truncate-1 {
    display: -webkit-box;
    line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  @media (max-width: 600px) {
    .content-overlay {
      padding: 12px;
    }
    .price-tag {
      padding: 6px 12px;
      font-size: 0.95rem;
      background: rgba(0, 0, 0, 0.6); /* Encore plus de contraste sur mobile */
    }
  }
  
  .border-b {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;
  }
  </style>