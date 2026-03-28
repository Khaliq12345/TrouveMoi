<template>
    <v-select
        :model-value="currentStatus"
        @update:model-value="updateStatus"
        :items="['Tous', 'En cours', 'Résolu']"
        variant="solo"
        flat
        bg-color="grey-lighten-4"
        hide-details
        density="comfortable"
        rounded="xl"
        class="flex-grow-1 flex-md-grow-0 w-100 w-md-auto"
        style="min-width: 200px;"
        prepend-inner-icon="mdi-filter-variant"
        chips
    ></v-select>

    <v-text-field
        :model-value="currentSearch"
        @update:model-value="updateSearch"
        prepend-inner-icon="mdi-magnify"
        label="Rechercher un problème..."
        variant="solo"
        flat
        bg-color="grey-lighten-4"
        hide-details
        density="comfortable"
        rounded="xl"
        class="flex-grow-1 flex-md-grow-0 w-100 w-md-auto"
        style="min-width: 200px;"
    ></v-text-field>
</template>

<script setup lang="ts">
// Initialisation de la route et du routeur
const route = useRoute();
const router = useRouter();

// Lecture simple et réactive des valeurs depuis l'URL
const currentStatus = computed(() => (route.query.status as string) || 'Tous');
const currentSearch = computed(() => (route.query.search as string) || '');

// Fonction pour mettre à jour le statut dans l'URL
const updateStatus = (val: string) => {
    router.replace({
        query: { 
            ...route.query, 
            status: val !== 'Tous' ? val : undefined, 
            page: undefined // On remet la page à zéro lors d'un filtrage
        }
    });
};

// Fonction pour mettre à jour la recherche dans l'URL
const updateSearch = (val: string) => {
    router.replace({
        query: { 
            ...route.query, 
            search: val || undefined, 
            page: undefined // On remet la page à zéro lors d'une recherche
        }
    });
};
</script>