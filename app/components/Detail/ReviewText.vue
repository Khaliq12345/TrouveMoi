<template>
  <div class="text-body-1 text-grey-darken-4 mb-4 lh-relaxed">
    <span v-if="isLongText && !isExpanded">
      {{ text.substring(0, 150) }}...
    </span>
    <span v-else>
      {{ text }}
    </span>

    <div v-if="isLongText" class="mt-1">
      <v-btn
        variant="text"
        density="compact"
        color="red-darken-1"
        class="px-0 text-none font-weight-bold"
        @click="isExpanded = !isExpanded"
      >
        {{ isExpanded ? "Afficher moins" : "Afficher tout" }}
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps({
  text: {
    type: String,
    required: true,
  }
});

const isExpanded = ref(false);

const isLongText = computed(() => {
  // Optionnellement tu peux adapter la longueur selon ta convenance
  return props.text && props.text.length > 150;
});
</script>

<style scoped>
/* Relaxed line height for readability */
.lh-relaxed {
  line-height: 1.6;
}
</style>
