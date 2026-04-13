<template>
  <v-btn
    color="primary"
    prepend-icon="mdi-plus"
    rounded="xl"
    elevation="0"
    class="text-none px-6 w-100 w-sm-auto align-self-center"
    height="48"
    @click="dialog = true"
  >
    Signaler
  </v-btn>
</template>

<script setup lang="ts">
const { dialog } = inject("support") as {
  dialog: Ref<boolean>;
};
</script>
