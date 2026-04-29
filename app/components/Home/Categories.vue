<template>
  <div v-if="isMobile">
    <HomeCategoryMobileView
      :categories="formattedCategories as CategoryWithColor[]"
    />
  </div>

  <HomeCategoryDesktopView
    v-else
    :categories="formattedCategories as CategoryWithColor[]"
  />
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
import type { CategoryWithColor } from "~/types/category";

const isMobile = inject("isMobile");

// Récupération et formatage des catégories
const { data: formattedCategories } = await useCategories();
</script>
