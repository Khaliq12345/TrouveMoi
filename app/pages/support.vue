<template>
  <!-- Main layout container -->
  <v-layout>
    <!-- App bar component -->
    <HomeAppBar />

    <!-- Main content area -->
    <v-main>
      <v-container class="mx-auto" style="max-width: 1200px">
        <!-- Header section with title and action button -->
        <v-sheet
          color="transparent"
          class="d-flex flex-column flex-sm-row justify-space-between align-start align-sm-center mb-6"
        >
          <!-- Page title -->
          <h1 class="text-h6 font-weight-bold mb-4 mb-sm-0">
            Liste des problèmes signalés
          </h1>

          <!-- Button to open report dialog -->
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

        <!-- Tickets list section -->
        <v-sheet color="transparent">
          <!-- Responsive grid for ticket cards -->
          <v-row>
            <v-col
              v-for="ticket in tickets"
              :key="ticket.id"
              cols="12"
              sm="6"
              md="4"
              class="pa-3"
            >
              <!-- Individual ticket card component -->
              <SupportCard :ticket="ticket" />
            </v-col>
          </v-row>
        </v-sheet>

        <!-- Pagination controls -->
        <v-pagination :length="5" class="pt-5"></v-pagination>
      </v-container>
    </v-main>

    <!-- Modal dialog for reporting new issues -->
    <SupportModal v-model="dialog" @submit="addIssue" />
  </v-layout>
</template>

<script setup lang="ts">
interface SupportTicket {
  id: number;
  title: string;
  description: string;
  resolved: boolean;
  date: string; // Format "YYYY-MM-DD"
  images: string[];
}
// Dialog visibility state
const dialog = ref(false);

// List of support tickets
const tickets = ref<SupportTicket[]>([
  {
    id: 1,
    title: "Problème de connexion API",
    description: "Impossible de se connecter à l'API depuis ce matin.",
    resolved: false,
    date: "2024-03-06",
    images: [
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f",
    ],
  },
  {
    id: 2,
    title: "Demande de fonctionnalité export CSV",
    description: "Les utilisateurs demandent un export CSV pour les rapports.",
    resolved: true,
    date: "2024-03-01",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    ],
  },
  {
    id: 3,
    title: "Erreur 500 sur dashboard",
    description: "Le tableau de bord retourne une erreur serveur aléatoire.",
    resolved: false,
    date: "2024-02-28",
    images: [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd",
    ],
  },
  {
    id: 4,
    title: "Bug affichage mobile",
    description: "Les cartes dépassent de l'écran sur mobile.",
    resolved: false,
    date: "2024-02-25",
    images: [
      "https://images.unsplash.com/photo-1551650975-87deedd944c3",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    ],
  },
  {
    id: 5,
    title: "Temps de réponse trop lent",
    description: "Certaines requêtes dépassent 3 secondes.",
    resolved: false,
    date: "2024-02-24",
    images: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
    ],
  },
  {
    id: 6,
    title: "Erreur authentification OAuth",
    description: "Connexion Google échoue pour certains comptes.",
    resolved: true,
    date: "2024-02-21",
    images: [
      "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3",
    ],
  },
  {
    id: 7,
    title: "Recherche trop lente",
    description: "La recherche globale prend plusieurs secondes.",
    resolved: false,
    date: "2024-02-20",
    images: [
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
      "https://images.unsplash.com/photo-1526378722484-bd91ca387e72",
    ],
  },
  {
    id: 8,
    title: "Notification email non envoyée",
    description: "Les notifications email ne partent plus.",
    resolved: false,
    date: "2024-02-19",
    images: [
      "https://images.unsplash.com/photo-1529336953121-a9f66e1e6d8f",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    ],
  },
  {
    id: 9,
    title: "Problème pagination",
    description: "La pagination saute certaines pages.",
    resolved: true,
    date: "2024-02-17",
    images: [
      "https://images.unsplash.com/photo-1522252234503-e356532cafd5",
      "https://images.unsplash.com/photo-1518770660439-4636190af475",
    ],
  },
  {
    id: 10,
    title: "Upload image échoue",
    description: "Certaines images ne se téléversent pas.",
    resolved: false,
    date: "2024-02-15",
    images: [
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
      "https://images.unsplash.com/photo-1559028012-481c04fa702d",
    ],
  },
  {
    id: 11,
    title: "Erreur permission utilisateur",
    description: "Certains utilisateurs voient des pages interdites.",
    resolved: true,
    date: "2024-02-12",
    images: [
      "https://images.unsplash.com/photo-1521791136064-7986c2920216",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984",
    ],
  },
  {
    id: 12,
    title: "Bug tri des données",
    description: "Le tri par date ne fonctionne pas correctement.",
    resolved: false,
    date: "2024-02-10",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    ],
  },
  {
    id: 13,
    title: "Session utilisateur expire trop vite",
    description: "Les sessions expirent après quelques minutes.",
    resolved: false,
    date: "2024-02-08",
    images: [
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f",
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
    ],
  },
  {
    id: 14,
    title: "Logs serveur incomplets",
    description: "Certaines erreurs ne sont pas loggées.",
    resolved: true,
    date: "2024-02-05",
    images: [
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    ],
  },
  {
    id: 15,
    title: "Bug dark mode",
    description: "Le thème sombre casse certaines couleurs.",
    resolved: false,
    date: "2024-02-03",
    images: [
      "https://images.unsplash.com/photo-1526378722484-bd91ca387e72",
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
    ],
  },
]);

// Add new issue to the beginning of tickets list
function addIssue(data: { title: string; description: string }) {
  tickets.value.unshift({
    id: Date.now(),
    title: data.title,
    description: data.description,
    resolved: false,
    date: new Date().toISOString().split("T")[0],
  });
}
</script>

<style scoped>
/* Modern gradient background (unused in current template) */
/* Dégradé moderne appliqué directement sur le conteneur */
.gradient-bg {
  /* Fusion de l'overlay (en premier) et des 4 vagues */
  background:
    /* Calque Overlay (anciennement ::after) */
    radial-gradient(circle at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.1) 100%),
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