<template>
  <div>
    <HeaderMobile v-if="isMobile" />
    <HeaderDesktop v-else />
  </div>
</template>

<script setup lang="ts">
const isMobile = inject("isMobile");
</script>
