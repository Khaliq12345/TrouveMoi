<template>
    <div class="text-subtitle-2 font-weight-bold mb-2 text-grey-darken-2">
        <v-icon icon="mdi-volume-high" size="16" class="me-1" />
        {{ title }}
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title: string;
}>();
</script>
