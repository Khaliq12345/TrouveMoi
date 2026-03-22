<template>
    <v-slide-group
        v-model="activeTab"
        class="pa-2"
        selected-class="bg-primary-lighten-4"
        mandatory
    >
        <v-slide-group-item
            v-for="item in items"
            :key="item.id"
            :value="item.id"
            v-slot="{ isSelected, toggle, selectedClass }"
        >
            <v-btn
                :class="['ma-1 text-none font-weight-medium', selectedClass]"
                :variant="isSelected ? 'elevated' : 'text'"
                :color="isSelected ? 'primary' : 'grey-darken-1'"
                rounded="xl"
                elevation="0"
                @click="toggle"
                :prepend-icon="item.icon"
                :to="item.id"
            >
                {{ item.label }}
            </v-btn>
        </v-slide-group-item>
    </v-slide-group>
</template>
<script setup lang="ts">
const props = defineProps<{ items: any }>();
const activeTab = defineModel("activeTab");
</script>
