<template>
    <v-list-item class="pa-4 bg-transparent">
        <v-list-item-subtitle> Prix </v-list-item-subtitle>
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
                <span class="text-body-2">{{ "€".repeat(n) }}</span>
            </v-btn>
        </v-btn-toggle>
    </v-list-item>
</template>

<script setup lang="ts">
const { updateURL, getURLFilter } = useFilterURL();

const priceRange = ref<string[]>(getURLFilter("price_range"));
</script>
