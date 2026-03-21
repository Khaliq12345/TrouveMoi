<template>
    <v-list-item v-if="!mini" class="pa-4 bg-transparent">
        <v-list-item-subtitle>Prix</v-list-item-subtitle>
        <v-btn-toggle
            v-model="priceRange"
            multiple
            divided
            color="primary"
            variant="outlined"
            class="border-none bg-transparent"
            @update:modelValue="updateURL('price_range', priceRange)"
        >
            <v-btn
                v-for="n in 4"
                :key="n"
                :value="n"
                height="40"
                size="x-small"
            >
                <span class="text-body-2">{{ "₣".repeat(n) }}</span>
            </v-btn>
        </v-btn-toggle>
    </v-list-item>
    <v-btn-toggle
        v-else
        v-model="priceRange"
        multiple
        density="compact"
        color="primary"
        variant="outlined"
        class="border-none bg-transparent"
        @update:model-value="updateURL('price_range', priceRange)"
    >
        <v-btn
            v-for="n in 4"
            :key="n"
            :value="n"
            size="x-small"
            min-width="32"
            class="px-2 mx-1 rounded-pill text-caption"
        >
            {{ "₣".repeat(n) }}
        </v-btn>
    </v-btn-toggle>
</template>

<script setup lang="ts">
const props = defineProps<{
    mini?: boolean;
}>();
const { updateURL, getURLFilter } = useFilterURL();

const priceRange = ref<string[]>(getURLFilter("price_range"));
</script>
