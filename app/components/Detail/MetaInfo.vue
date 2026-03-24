<template>
  <div class="d-flex justify-space-between align-start mb-2">
    <span class="text-h6 font-weight-bold text-white text-truncate mr-2">
      {{ item.title || "Sans titre" }}
    </span>
    <span v-if="item.price" class="text-h6 font-weight-black text-white">
      {{ item.price }}€
    </span>
  </div>
  <div class="text-body-2 text-white text-truncate">
    {{ item.description || "Aucune description disponible." }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  item: any;
}>();
</script>
