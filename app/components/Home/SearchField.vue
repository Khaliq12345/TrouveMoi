<template>
  <v-text-field
    v-model="model"
    density="compact"
    variant="solo"
    :label="label"
    append-inner-icon="mdi-magnify"
    single-line
    hide-details
    :class="customClass"
  ></v-text-field>
</template>

<script setup>
const model = defineModel()

defineProps({
  label: {
    type: String,
    default: 'Rechercher...'
  },
  customClass: {
    type: String,
    default: ''
  }
})
</script>