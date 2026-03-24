<template>
  <div class="d-flex flex-column flex-md-row justify-center justify-md-start ga-3 flex-wrap">
    
    <v-btn
      v-if="biz?.reservation_available && biz?.website"
      size="large"
      color="primary"
      class="px-8 text-none rounded-lg border-thin"
      @click="openLink(biz.website)"
    >
      Réserver
    </v-btn>

    <v-btn
      v-if="biz?.calendar_link"
      size="large"
      color="primary"
      class="px-8 text-none rounded-lg border-thin"
      @click="openLink(biz.calendar_link)"
    >
      Rendez-vous
    </v-btn>

    <template v-for="category in categories" :key="category.key">
      <v-btn
        v-if="metas && metas[category.key] && metas[category.key].length > 0"
        size="large"
        color="teal-darken-2"
        class="px-8 font-weight-bold text-none rounded-lg"
        :prepend-icon="getCategoryIcon(category.key)"
        @click="openModal(category)"
      >
        {{ category.label }}
      </v-btn>
    </template>

    <MetaModal
      v-model="isModalOpen"
      :category-label="modalCategoryLabel"
      :items="modalItems"
    />
  </div>
</template>

<script setup lang="ts">
import type { Biz } from "~/types/biz";
import MetaModal from "./MetaModal.vue";

// Récupération de l'objet business injecté
const biz = inject<Biz>("biz");

// États réactifs pour la gestion de la modale
const isModalOpen = ref(false);
const modalCategoryLabel = ref("");
const modalItems = ref<any[]>([]);

// Définition des catégories avec leurs labels
const categories = [
  { key: "menu", label: "Menu" },
  { key: "service", label: "Services" },
  { key: "portfolio", label: "Portfolio" },
];

// Fonction utilitaire pour attribuer une icône selon la catégorie
const getCategoryIcon = (key: string) => {
  const icons: Record<string, string> = {
    menu: "mdi-silverware-variant",
    service: "mdi-room-service-outline",
    portfolio: "mdi-camera-outline",
  };
  return icons[key] || "mdi-dots-horizontal";
};

// Récupération des données via le composable
const metas = inject<any>("metas");

console.log(metas.value);

// Gestion de l'ouverture des liens externes
const openLink = (url: string) => {
  window.open(url, "_blank");
};

// Logique d'ouverture de la modale avec injection des données correspondantes
const openModal = (category: { key: string; label: string }) => {
  if (metas.value?.[category.key]) {
    modalCategoryLabel.value = category.label;
    modalItems.value = metas.value[category.key];
    isModalOpen.value = true;
  }
};
</script>