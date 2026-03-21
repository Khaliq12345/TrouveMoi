<template>
    <v-list-item v-if="!mini">
        <v-list-item-subtitle class="text-sm font-weight-bold">
            Sous-catégories
        </v-list-item-subtitle>
        <div class="pb-4">
            <v-chip-group
                v-model="selectedCategories"
                column
                multiple
                class="pa-0 bg-transparent"
                @update:model-value="
                    updateURL('sub_categories', selectedCategories)
                "
            >
                <v-chip
                    v-for="sub in subcategories.slice(0, numberToDisplay)"
                    :key="sub.slug"
                    :value="sub.slug"
                    variant="outlined"
                    color="orange-darken-2"
                    size="small"
                    rounded="xl"
                    class="font-weight-medium px-3"
                >
                    {{ sub.name }}
                </v-chip>
            </v-chip-group>

            <show-all-button
                v-if="subcategories.length > 6"
                :total="subcategories.length"
                v-model="numberToDisplay"
            ></show-all-button>
        </div>
    </v-list-item>
    <v-chip-group
        v-else
        v-model="selectedCategories"
        multiple
        class="pa-0"
        @update:model-value="updateURL('sub_categories', selectedCategories)"
    >
        <v-chip
            v-for="sub in subcategories.slice(0, 4)"
            :key="sub.slug"
            :value="sub.slug"
            size="small"
            variant="outlined"
            filter
            class="mx-1 text-caption"
            selected-class="bg-primary text-white"
        >
            {{ sub.name }}
        </v-chip>
    </v-chip-group>
</template>

<script setup lang="ts">
const props = defineProps<{
    mini?: boolean;
}>();
const { updateURL, getURLFilter } = useFilterURL();
const { getSubcategories } = await useFetchSubCategory();

// Store the subcategories and display amount
const selectedCategories = ref<string[]>(
    getURLFilter("sub_categories") as string[],
);
const numberToDisplay = ref(6);

//it updates automatically when route.query changes
const category = computed(() => getURLFilter("categories"));

// If getSubcategories depends on the category, make it computed too
const subcategories = computed(() => {
    const catSlug = category.value?.[0];
    return catSlug ? getSubcategories(catSlug) : [];
});
</script>
