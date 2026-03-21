<template>
    <v-layout class="pb-4">
        <AppBar />
        <v-main>
            <v-container
                class="pa-0 bg-background mx-auto"
                style="max-width: 1200px"
            >
                <EventStats />

                <v-row class="mb-6" justify="center">
                    <v-col cols="12" md="6" lg="4">
                        <v-text-field
                            :model-value="searchQuery"
                            @update:model-value="onSearchUpdate"
                            placeholder="Rechercher..."
                            prepend-inner-icon="mdi-magnify"
                            variant="outlined"
                            density="comfortable"
                            rounded="lg"
                            hide-details
                            class="mt-2"
                        />
                    </v-col>
                </v-row>

                <div v-if="status !== 'pending'">
                    <v-row v-if="eventsData?.length">
                        <v-col
                            v-for="event in eventsData || []"
                            :key="event.id"
                            cols="12"
                            sm="6"
                            lg="4"
                            xl="3"
                            class="px-4"
                        >
                            <EventCard :event="event" />
                        </v-col>
                    </v-row>

                    <v-empty-state
                        v-else
                        icon="mdi-calendar-blank"
                        title="Aucun événement"
                        class="py-12"
                    />
                </div>
                <div v-else class="py-10 d-flex justify-center">
                    <v-sheet
                        border
                        rounded="lg"
                        class="pa-4 d-flex align-center ga-4"
                        max-width="400"
                        color="transparent"
                        :elevation="0"
                    >
                        <v-progress-circular
                            indeterminate
                            color="primary"
                            size="24"
                            width="3"
                        ></v-progress-circular>

                        <div class="d-flex flex-column">
                            <span class="text-body-2 font-weight-bold"
                                >Mise à jour des événements</span
                            >
                            <span class="text-caption text-medium-emphasis"
                                >Veuillez patienter quelques instants...</span
                            >
                        </div>
                    </v-sheet>
                </div>

                <EventPagination />
            </v-container>
        </v-main>
    </v-layout>
</template>

<script setup lang="ts">
import { aggregate, readItems } from "@directus/sdk";
import type { Event } from "~/types/event";

// Définition de la limite par page
const PER_PAGE = 10;

// Utilisation des composables Nuxt
const { $directus } = useNuxtApp();
const route = useRoute();
const router = useRouter();

// Variables réactives d'état
const searchQuery = ref("");
const activeFilter = ref<"all" | "live" | "upcoming" | "past">("all");

// Fonction centralisée pour réinitialiser la pagination dans l'URL
// Elle est appelée manuellement lors des changements au lieu d'utiliser un watch
const resetPageToFirst = () => {
    if (route.query.page !== "1" && route.query.page !== undefined) {
        router.replace({ query: { ...route.query, page: "1" } });
    }
};

// Gestionnaire d'événement pour la mise à jour de la recherche
// Met à jour la valeur et réinitialise la page explicitement
const onSearchUpdate = (newValue: string) => {
    searchQuery.value = newValue;
    resetPageToFirst();
};

// Fonction à injecter dans l'enfant pour mettre à jour le filtre
// Permet de centraliser la logique de changement de filtre et de pagination
const updateFilter = (newFilter: typeof activeFilter.value) => {
    activeFilter.value = newFilter;
    resetPageToFirst();
};

// Fonction pour construire les filtres d'API Directus
const buildDateFilter = (filter: typeof activeFilter.value) => {
    const filters = {
        live: {
            _and: [
                { start_at: { _lte: "$NOW" } },
                { end_at: { _gte: "$NOW" } },
            ],
        },
        upcoming: { start_at: { _gt: "$NOW" } },
        past: { end_at: { _lt: "$NOW" } },
        all: undefined,
    };
    return filters[filter];
};

// Appel d'API pour le compteur unique basé sur les paramètres actuels
const {
    data: filteredCount,
    status: countStatus,
    error: errorCount,
} = await useAsyncData(
    "events-count",
    async () => {
        const filter = buildDateFilter(activeFilter.value);
        const result = (await $directus.request(
            aggregate("business_events", {
                aggregate: { count: "*" },
                query: {
                    ...(filter && { filter }),
                    search: searchQuery.value || undefined,
                },
            }),
        )) as any[];
        return result[0]?.count ? parseInt(result[0].count, 10) : 0;
    },
    {
        watch: [activeFilter, searchQuery],
        default: () => 0,
    },
);

// Log error if any
if (errorCount.value) {
    console.error("Error fetching filtered count:", errorCount.value);
}

// État calculé pour le chargement du compteur
const countPending = computed(() => countStatus.value === "pending");

// Appel d'API pour la récupération des données paginées
const {
    data: eventsData,
    error,
    status,
} = await useAsyncData<Event[]>(
    "events",
    () => {
        const filter = buildDateFilter(activeFilter.value);
        const page = parseInt(route.query.page as string) || 1;

        return $directus.request(
            readItems("business_events", {
                sort: ["-date_created"],
                limit: PER_PAGE,
                page,
                ...(filter && { filter }),
                search: searchQuery.value || undefined,
                fields: [
                    "id",
                    "title",
                    "description",
                    "start_at",
                    "end_at",
                    "image",
                    "link",
                    "date_created",
                ],
            }),
        ) as Promise<Event[]>;
    },
    { watch: [() => route.query.page, activeFilter, searchQuery] },
);

// Partage de l'état et des méthodes avec les composants enfants
provide("eventContext", {
    eventsData,
    filteredTotal: filteredCount,
    activeFilter,
    updateFilter, // On transmet la fonction de mise à jour au lieu de laisser l'enfant muter la ref directement
    PER_PAGE,
    countPending,
});

// Affichage des erreurs en console
if (error.value) console.error("events error: ", error.value);
</script>
