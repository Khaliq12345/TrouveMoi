<template>
    <v-list-item class="px-4">
        <v-list-item-subtitle class="text-sm font-weight-bold">
            Équipements & Services
        </v-list-item-subtitle>

        <!-- The list of all features with a multiple type checkbox -->
        <div>
            <v-checkbox
                v-for="feature in features?.slice(0, numberToDisplay)"
                :key="feature.slug"
                v-model="selectedFeatures"
                :value="feature.slug"
                hide-details
                density="compact"
                color="orange-darken-2"
                class="ma-0 pa-0 bg-transparent"
                @update:model-value="
                    updateURL('featured_slots', selectedFeatures)
                "
            >
                <template #label>
                    <div class="d-flex align-center">
                        <span
                            class="text-body-2 text-grey-darken-4 font-weight-medium"
                        >
                            {{ feature.name }}
                        </span>
                    </div>
                </template>
            </v-checkbox>
        </div>
        <!-- This is the button that controls the show more logic -->
        <show-all-button
            :total="features?.length || 0"
            v-model="numberToDisplay"
        ></show-all-button>
    </v-list-item>
</template>

<script setup lang="ts">
const { updateURL, getURLFilter } = useFilterURL();
const { getFeatures } = await useFetchFeatures();

// Store the features and display amount
const selectedFeatures = ref<string[]>(
    getURLFilter("featured_slots") as string[],
);
const numberToDisplay = ref(6);

//it updates automatically when route.query changes
const category = computed(() => getURLFilter("categories"));

// If getSubcategories depends on the category, make it computed too
const features = computed(() => {
    const catSlug = category.value?.[0];
    return catSlug ? getFeatures(catSlug) : [];
});
</script>
