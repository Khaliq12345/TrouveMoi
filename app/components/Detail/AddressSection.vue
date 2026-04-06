<template>
    <v-list :items="addressItems" item-props lines="two" class="pa-0" />
</template>

<script setup lang="ts">
const props = defineProps<{ locations?: any[] }>();

const addressItems = computed(() => {
    return [];
});
</script>
