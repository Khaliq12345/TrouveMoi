<template>
  <v-sheet class="mx-auto" color="transparent" max-width="800">
    <v-slide-group class="pb-2" mobile-breakpoint="sm">
      <v-slide-group-item v-for="category in categories" :key="category.id">
        <v-card
          :to="category.route"
          flat
          class="rounded-xl mx-2 d-flex flex-column align-center justify-center text-center pa-2"
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

          <div
            class="text-caption line-clamp-2"
            style="line-height: 1.2"
          >
            {{ category.name }}
          </div>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>

<script setup lang="ts">
import type { CategoryWithColor } from "@/types/category";
// On attend les catégories depuis le composant parent
defineProps<{
  categories: CategoryWithColor[];
}>();
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
