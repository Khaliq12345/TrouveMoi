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

                <SupportPagination
                    v-if="tickets.length > 0"
                    v-model:page="currentPage"
                    :length="totalPages"
                    :loading="status === 'pending'"
                />
            </v-container>
            <SupportModal v-model="dialog" @submit="addIssue" />
        </v-main>
    </v-layout>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { aggregate, readItems, createItem, uploadFiles } from "@directus/sdk";
import { useNuxtApp, useAsyncData } from "#imports";
import type { SupportTicket, CreateSupportTicketPayload, SupportModalSubmitPayload } from "~/types/support";

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

const totalPages = computed(() => {
    const r = countData.value as any;
    const count = Array.isArray(r) && r[0]?.count ? parseInt(r[0].count) : 0;
    return Math.ceil(count / PER_PAGE);
});

// Safe typed unwrap of ticketsData (Ref<SupportTicket[] | null>)
const tickets = computed<SupportTicket[]>(() => ticketsData.value ?? []);

// Reset page when search or filter change
watch([searchQuery, statusFilter], () => {
    currentPage.value = 1;
});

async function addIssue(data: SupportModalSubmitPayload) {
    try {
        const itemData: CreateSupportTicketPayload = {
            title: data.title,
            description: data.description,
            resolved: false,
            image_id: [],
        };

        if (data.photo && Array.isArray(data.photo) && data.photo.length > 0) {
            const uploadedUuids: string[] = [];
            
            for (const file of data.photo) {
                const formData = new FormData();
                formData.append("title", file.name);
                formData.append("file", file);
                
                // ENVOI DANS LE DOSSIER "supports"
                // Remplacez 'votre-uuid-de-dossier' par l'ID réel du dossier dans Directus
                formData.append("folder", "votre-uuid-de-dossier"); 

                try {
                    const uploadResult = await $directus.request(uploadFiles(formData));
                    
                    // On récupère l'UUID (id) du fichier uploadé
                    const fileId = Array.isArray(uploadResult) ? uploadResult[0]?.id : uploadResult?.id;
                    
                    if (fileId) {
                        uploadedUuids.push(fileId);
                    }
                } catch (uploadErr) {
                    console.error("Erreur upload fichier:", file.name, uploadErr);
                }
            }
            
            // On injecte directement le tableau d'UUIDs dans le champ JSON
            itemData.image_id = uploadedUuids;
        }

        // Création de l'item dans la collection 'supports'
        await $directus.request(createItem("supports", itemData));
        
        // Actions de fin
        dialog.value = false; 
        await refresh();
        console.log("Ticket créé avec succès !");
        
    } catch (err) {
        console.error("Erreur lors de la création du ticket:", err);
    }
}
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
