<template>
    <v-layout>
        <AppBar />
        <v-main>
            <v-container class="mx-auto" style="max-width: 1200px">
                <SupportHeader
                    v-model:search="searchQuery"
                    v-model:statusFilter="statusFilter"
                    @show-dialog="dialog = true"
                />

                <div v-if="status === 'pending' && !tickets.length" class="text-center py-10">
                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </div>
                <template v-else>
                    <v-row v-if="tickets.length > 0">
                        <v-col
                            v-for="ticket in tickets"
                            :key="ticket.id"
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <SupportCard :ticket="ticket" />
                        </v-col>
                    </v-row>
                    <v-empty-state
                        v-else
                        icon="mdi-ticket-outline"
                        title="Aucun signalement"
                        class="py-12"
                    />
                </template>

                <SupportPagination v-if="tickets.length > 0" />
            </v-container>
            <SupportModal v-model="dialog" @refresh="refresh" />
        </v-main>
    </v-layout>
</template>

<script setup lang="ts">
import { aggregate, readItems } from "@directus/sdk";
import { useNuxtApp, useAsyncData } from "#imports";
import type { SupportTicket } from "~/types/support";

const { $directus } = useNuxtApp();
const PER_PAGE = 10;

// Dialog visibility state
const dialog = ref(false);

// Pagination & filters variables
const currentPage = ref(1);
const searchQuery = ref("");
const statusFilter = ref("Tous");

const buildFilter = (filter: string) => {
    if (filter === "En cours") return { resolved: { _eq: false } };
    if (filter === "Résolu") return { resolved: { _eq: true } };
    return undefined;
};

// Count filtré pour la pagination
const { data: countData, error: countErr } = await useAsyncData(
    "support-count",
    () => {
        const filter = buildFilter(statusFilter.value);
        return $directus.request(
            aggregate("supports", {
                aggregate: { count: "*" },
                ...(filter && { filter }),
                search: searchQuery.value || undefined,
            })
        );
    },
    { watch: [statusFilter, searchQuery] }
);

if (countErr.value) console.log("Support Count Error:", countErr.value);

// Fetch items
const {
    data: ticketsData,
    status,
    error: itemsErr,
    refresh
} = await useAsyncData<SupportTicket[]>(
    "support-items",
    () => {
        const filter = buildFilter(statusFilter.value);
        return $directus.request(
            readItems("supports", {
                sort: ["-date_created"],
                limit: PER_PAGE * currentPage.value,
                ...(filter && { filter }),
                search: searchQuery.value || undefined,
                fields: ["*"],
            })
        ) as Promise<SupportTicket[]>;
    },
    { watch: [currentPage, statusFilter, searchQuery] }
);

if (itemsErr.value) console.log("Support Items Error:", itemsErr.value);

// Reset page to 1 only when search or filter changes (NOT on page increment)
watch([searchQuery, statusFilter], () => {
    currentPage.value = 1;
});


// Raw count extracted from Directus aggregate response
const totalCount = computed(() => {
    const r = countData.value as any;
    return Array.isArray(r) && r[0]?.count ? parseInt(r[0].count) : 0;
});

// Safe typed unwrap of ticketsData (Ref<SupportTicket[] | null>)
const tickets = computed<SupportTicket[]>(() => ticketsData.value ?? []);

// Provide context to child components (Pagination)
provide("supportContext", {
    currentPage,
    totalCount,
    PER_PAGE,
    isLoading: computed(() => status.value === "pending"),
});

</script>

<style scoped>
/* Modern gradient background (unused in current template) */
/* Dégradé moderne appliqué directement sur le conteneur */
.gradient-bg {
    /* Fusion de l'overlay (en premier) et des 4 vagues */
    background:
    /* Calque Overlay (anciennement ::after) */
        radial-gradient(
            circle at 50% 50%,
            transparent 0%,
            rgba(0, 0, 0, 0.1) 100%
        ),
        /* Vague 1 - primary dense */
        radial-gradient(
                ellipse 80% 50% at 20% 40%,
                rgb(var(--v-theme-primary)) 0%,
                rgba(var(--v-theme-primary), 0.8) 25%,
                transparent 50%
            ),
        /* Vague 2 - primary plus clair */
        radial-gradient(
                ellipse 60% 40% at 60% 60%,
                rgba(var(--v-theme-primary), 0.9) 0%,
                rgba(var(--v-theme-primary), 0.5) 30%,
                transparent 60%
            ),
        /* Vague 3 - transition white */
        radial-gradient(
                ellipse 70% 60% at 80% 30%,
                rgba(var(--v-theme-primary), 0.6) 0%,
                rgba(255, 255, 255, 0.4) 40%,
                transparent 70%
            ),
        /* Vague 4 - white diffuse */
        radial-gradient(
                ellipse 50% 50% at 40% 80%,
                rgba(255, 255, 255, 0.3) 0%,
                transparent 50%
            );

    /* Comme on ne peut pas utiliser filter: blur() sans flouter le texte,
     on utilise backdrop-filter si le fond est transparent ou on joue sur
     la diffusion des gradients. */
    background-blend-mode: normal;
    opacity: 0.75;
}
</style>
