<template>
    <v-slide-group v-model="activeTab" class="pa-2 w-100" mandatory show-arrows>
        <v-slide-group-item
            v-for="item in navItems"
            :key="item.id"
            :value="item.id"
            v-slot="{ isSelected, toggle, selectedClass }"
        >
            <v-btn
                :value="item.id"
                :class="['ma-1 text-none font-weight-bold', selectedClass]"
                :variant="isSelected ? 'elevated' : 'flat'"
                :color="isSelected ? 'primary' : 'neutral'"
                :prepend-icon="!item.iconOnly ? item.icon : undefined"
                :icon="item.iconOnly ? item.icon : false"
                rounded="xl"
                @click="toggle"
            >
                <span v-if="!item.iconOnly">{{ item.label }}</span>
            </v-btn>
        </v-slide-group-item>
    </v-slide-group>
</template>

<script setup lang="ts">
const activeTab = defineModel<string>("review");

const navItems = [
    { id: "review", label: "Write a Review", icon: "mdi-star-outline" },
    { id: "photo", label: "Add photo", icon: "mdi-camera-plus-outline" },
    { id: "share", label: "Share", icon: "mdi-share-variant-outline" },
    { id: "save", label: "Save", icon: "mdi-bookmark-outline" },
    { id: "more", label: "", icon: "mdi-dots-horizontal", iconOnly: true },
];
</script>

<style scoped></style>
