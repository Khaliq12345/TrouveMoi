<template>
    <v-list-item>
        <v-list-item-subtitle class="text-sm font-weight-bold"
            >Catégories</v-list-item-subtitle
        >
        <div class="pb-4">
            <!-- Chips of all subcategories -->
            <v-chip-group
                v-model="selectedCategories"
                column
                multiple
                class="pa-0 bg-transparent"
                @update:model-value="
                    updateURL('sub_category', selectedCategories)
                "
            >
                <v-chip
                    v-for="cat in subCategories.slice(0, numberToDisplay)"
                    :key="cat.id"
                    :value="cat.id"
                    variant="outlined"
                    color="orange-darken-2"
                    size="small"
                    rounded="xl"
                    class="font-weight-medium px-3"
                >
                    {{ cat.name }}
                </v-chip>
            </v-chip-group>

            <show-all-button
                :total="subCategories.length"
                v-model="numberToDisplay"
            ></show-all-button>
        </div>
    </v-list-item>
</template>

<script setup lang="ts">
interface Category {
    id: string;
    name: string;
}

const { updateURL, getURLFilter } = useFilterURL();
const subCategories = ref<Category[]>([
    { id: "restaurants", name: "Restaurants" },
    { id: "bars", name: "Bars" },
    { id: "cafes", name: "Cafés" },
    { id: "shopping", name: "Shopping" },
    { id: "beauty", name: "Beauté & Spas" },
    { id: "automotive", name: "Automobile" },
    { id: "health", name: "Santé & Médical" },
    { id: "home", name: "Maison & Jardin" },
    { id: "nightlife", name: "Vie nocturne" },
    { id: "hotels", name: "Hôtels" },
]);
const selectedCategories = ref<string[]>(
    getURLFilter("sub_category") as string[],
);

const numberToDisplay = ref(6);
</script>
