<template>
    <v-layout>
        <AppBar />
        <v-main>
            <v-container class="mx-auto" style="max-width: 1200px">
                <SupportSearch />

                <SupportList />

                
            </v-container>
            <Footer />
            <SupportModal v-model="dialog" @refresh="refresh" />
        </v-main>
    </v-layout>
</template>

<script setup lang="ts">
const dialog = ref(false);

const { totalCount, isLoadingCount } = useSupportCount();
const { 
    tickets, 
    isLoadingTickets, 
    hasMore, 
    loadMore, 
    refresh 
} = useSupportTickets(totalCount);

// Fusion des etats de chargement pour l'interface utilisateur
const isLoading = computed(() => isLoadingCount.value || isLoadingTickets.value);

// Fourniture des donnees aux composants enfants
provide('support', {
    dialog,
    tickets,
    totalCount,
    isLoading,
    hasMore,
    loadMore,
    refresh,
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
