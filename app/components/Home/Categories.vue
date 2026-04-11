<template>
  <v-sheet class="py-4 px-2 rounded-3xl" flat color="transparent">
    <v-toolbar color="transparent" flat class="mb-2">
      <div class="d-md-none">
        <h2 class="text-h5 font-weight-bold text-grey-darken-3">
          Explorer par catégorie
        </h2>
      </div>
    </v-toolbar>

    <HomeCategoryMobileView
      v-if="isMobile"
      :categories="formattedCategories as CategoryWithColor[]"
    />

    <HomeCategoryDesktopView
      v-else
      :categories="formattedCategories as CategoryWithColor[]"
    />
  </v-sheet>
</template>

<script setup lang="ts">
import type { CategoryWithColor } from "~/types/category";

const isMobile = inject("isMobile");

// Récupération et formatage des catégories
const { data: formattedCategories } = await useCategories();
</script>
