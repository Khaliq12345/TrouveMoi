<template>
  <v-layout>
    <HomeAppBar />
    <v-main>
      <v-container >
        <!-- Header -->
        <v-sheet
          color="transparent"
          class="d-flex flex-column flex-sm-row justify-space-between align-start align-sm-center mb-6"
        >
          <h1 class="text-h6 font-weight-bold mb-4 mb-sm-0">
            Liste des problèmes signalés
          </h1>

          <v-btn
            color="primary"
            prepend-icon="mdi-plus"
            rounded="lg"
            class="text-none w-100 w-sm-auto"
            @click="dialog = true"
          >
            Signaler un problème
          </v-btn>
        </v-sheet>

        <!-- Liste -->
        <v-sheet color="transparent">
          <v-row>
            <v-col
              v-for="ticket in tickets"
              :key="ticket.id"
              cols="12"
              sm="6"
              md="4"
              class="pa-3"
            >
              <SupportCard :ticket="ticket" />
            </v-col>
          </v-row>
        </v-sheet>
      </v-container>
    </v-main>

    <!-- Composant Dialog -->
    <SupportModal v-model="dialog" @submit="addIssue" />
  </v-layout>
</template>
<style scoped>
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
<script setup>
const dialog = ref(false);

const tickets = ref([
  {
    id: 1,
    title: "Problème de connexion API",
    description: "Impossible de se connecter à l'API depuis ce matin...",
    resolved: false,
    date: "2024-03-06",
  },
  {
    id: 2,
    title: "Demande de fonctionnalité export CSV",
    description: "Les utilisateurs demandent un export CSV...",
    resolved: true,
    date: "2024-03-01",
  },
]);

function addIssue(data) {
  tickets.value.unshift({
    id: Date.now(),
    title: data.title,
    description: data.description,
    resolved: false,
    date: new Date().toISOString().split("T")[0],
  });
}
</script>
