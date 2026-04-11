<template>
  <v-sheet class="mx-auto" color="transparent" max-width="800">
    <h2 class="text-h5 font-weight-bold text-grey-darken-3 mb-4">
      Explorer par catégorie
    </h2>
    <v-row dense>
      <v-col
        v-for="(category, index) in categories"
        :key="category.id"
        cols="12"
        md="3"
        class="d-flex"
        :class="{ 'd-none d-md-flex': index >= 8 }"
      >
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            :to="category.route"
            flat
            class="rounded-xl pa-3 transition-swing d-flex flex-column w-100"
            :elevation="isHovering ? 8 : 1"
            :style="{
              background: `linear-gradient(135deg, ${category.bgLight}, ${category.bgDark})`,
              transform: isHovering ? 'translateY(-8px)' : 'none',
            }"
          >
            <div class="d-flex justify-space-between align-start mb-2">
              <v-avatar
                :color="category.color"
                size="40"
                class="elevation-2 transition-swing"
                :style="{
                  transform: isHovering ? 'rotate(10deg) scale(1.1)' : 'none',
                }"
              >
                <v-icon :icon="category.icon" color="white" size="small" />
              </v-avatar>
            </div>

            <div
              class="text-subtitle-1 font-weight-bold text-grey-darken-3 line-clamp-2 mt-1"
            >
              {{ category.name }}
            </div>

            <div class="mt-1">
              <v-icon
                icon="mdi-arrow-right"
                :color="category.color"
                size="small"
                class="transition-swing"
                :class="isHovering ? 'translate-x-2' : ''"
              />
            </div>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script setup lang="ts">
import type { CategoryWithColor } from "@/types/category";

defineProps<{
  categories: CategoryWithColor[];
}>();
</script>

<style scoped>
.transition-swing {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1) !important;
}

.translate-x-2 {
  transform: translateX(8px);
}

.line-clamp-2 {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
