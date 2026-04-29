<template>
  <v-dialog v-model="internalValue" max-width="600" scrollable>
    <v-card class="rounded-xl pa-2">
      <v-card-title class="d-flex align-center justify-space-between pa-4">
        <span class="text-h5 font-weight-black">À propos</span>
        <v-btn icon="mdi-close" variant="text" @click="internalValue = false" />
      </v-card-title>

      <v-divider />

      <v-card-text
        class="pa-3 text-body-1 text-grey-darken-3"
        style="line-height: 1.6"
      >
        {{ fullText }}
      </v-card-text>

      <v-divider />

      <v-card-actions class="pa-4 d-flex justify-space-between align-center">
        <v-btn
          color="error"
          variant="flat"
          class="rounded-lg px-4 text-none font-weight-bold"
          size="large"
          @click="internalValue = false"
        >
          Fermer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
  fullText: string;
}>();

const emit = defineEmits(["update:modelValue"]);

// Sync internal state with v-model
const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
</script>
