<template>
    <v-list-item class="px-4">
        <v-list-item-subtitle> Équipements & Services </v-list-item-subtitle>

        <!-- The list of all features with a multiple type checkbox -->
        <div>
            <v-checkbox
                v-for="feature in features.slice(0, numberToDisplay)"
                :key="feature.id"
                v-model="selectedFeatures"
                :value="feature.id"
                hide-details
                density="compact"
                color="orange-darken-2"
                class="ma-0 pa-0 bg-transparent"
                @update:model-value="updateURL('features', selectedFeatures)"
            >
                <template #label>
                    <div class="d-flex align-center">
                        <v-icon size="small" class="me-3" color="grey-darken-4">
                            {{ feature.icon }}
                        </v-icon>
                        <span
                            class="text-body-2 text-grey-darken-4 font-weight-medium"
                        >
                            {{ feature.label }}
                        </span>
                    </div>
                </template>
            </v-checkbox>
        </div>
        <!-- This is the button that controls the show more logic -->
        <show-all-button
            :total="features.length"
            v-model="numberToDisplay"
        ></show-all-button>
    </v-list-item>
</template>

<script setup lang="ts">
interface Feature {
    id: string;
    label: string;
    icon: string;
}

const { updateURL, getURLFilter } = useFilterURL();

const features = ref<Feature[]>([
    { id: "wifi", label: "Wi-Fi gratuit", icon: "mdi-wifi" },
    { id: "parking", label: "Parking", icon: "mdi-parking" },
    { id: "terrace", label: "Terrasse", icon: "mdi-table-chair" },
    { id: "delivery", label: "Livraison", icon: "mdi-truck-delivery" },
    { id: "takeout", label: "À emporter", icon: "mdi-bag-carry-on" },
    { id: "reservation", label: "Réservation", icon: "mdi-calendar-check" },
    { id: "credit_card", label: "Carte bancaire", icon: "mdi-credit-card" },
    {
        id: "wheelchair",
        label: "Accès PMR",
        icon: "mdi-wheelchair-accessibility",
    },
]);

const selectedFeatures = ref<string[]>(getURLFilter("features") as string[]);
const numberToDisplay = ref(6);
</script>
