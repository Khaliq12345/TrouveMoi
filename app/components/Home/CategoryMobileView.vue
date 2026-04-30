<template>
  <h2 class="text-h6 font-weight-bold text-grey-darken-3 mb-4">
    Explorer par catégorie
  </h2>

  <v-sheet class="mx-auto" color="transparent" max-width="800">
    <div class="scroll-x pb-2">
      <div class="d-flex ga-3">
        <v-card
          v-for="category in categories"
          :key="category.id"
          :to="category.route"
          flat
          class="rounded-xl d-flex flex-column align-center justify-center text-center pa-2 flex-shrink-0"
          height="120"
          width="100"
          :style="{
            background: `linear-gradient(135deg, ${category.bgLight}, ${category.bgDark})`,
          }"
        >
          <v-avatar
            :color="category.color"
            size="40"
            class="mb-2 flex-shrink-0"
          >
            <v-icon :icon="category.icon" color="white" size="small" />
          </v-avatar>

          <div class="text-caption line-clamp-2" style="line-height: 1.2">
            {{ category.name }}
          </div>
        </v-card>
      </div>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
import type { CategoryWithColor } from "@/types/category";

defineProps<{
  categories: CategoryWithColor[];
}>();
</script>

<style scoped>
.scroll-x {
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch; /* inertie iOS */
  scrollbar-width: none; /* Firefox */
}

.scroll-x::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
