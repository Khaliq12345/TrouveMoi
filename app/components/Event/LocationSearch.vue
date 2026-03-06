<!-- components/events/LocationSearch.vue -->
<template>
  <v-card
    elevation="0"
    class="rounded-xl d-flex align-center pa-2"
  >
    <v-icon icon="mdi-map-search" class="ml-3 text-medium-emphasis" />
    <v-text-field
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      placeholder="Rechercher une zone..."
      variant="plain"
      hide-details
      density="compact"
      class="ml-2"
    />
    <v-fade-transition>
      <v-btn
        v-if="modelValue"
        icon="mdi-close"
        size="small"
        variant="text"
        @click="$emit('update:modelValue', '')"
      />
    </v-fade-transition>
  </v-card>
</template>

<script setup>
defineProps({ modelValue: String });
defineEmits(['update:modelValue']);
</script>