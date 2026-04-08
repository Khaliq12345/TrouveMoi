<!-- Sidebar with contact info, about, community questions, and similar businesses -->
<template>
  <div>
    <!-- Contact information card -->
    <v-card class="mb-4 border" flat>
      <v-list>
        <!-- Website link -->
        <v-list-item>
          <template v-slot:prepend>
            <v-icon color="red">mdi-web</v-icon>
          </template>
          <v-list-item-title class="text-body-2">
            <a href="#" class="text-decoration-none text-primary">bottegasf.com</a>
          </v-list-item-title>
        </v-list-item>
        <!-- Phone number -->
        <v-list-item>
          <template v-slot:prepend>
            <v-icon color="red">mdi-phone</v-icon>
          </template>
          <v-list-item-title class="text-body-2">(415) 555-0123</v-list-item-title>
        </v-list-item>
        <!-- Address with directions link -->
        <v-list-item>
          <template v-slot:prepend>
            <v-icon color="red">mdi-map-marker</v-icon>
          </template>
          <v-list-item-title class="text-body-2">
            <a href="#" class="text-decoration-none text-primary">Itinéraire</a>
          </v-list-item-title>
          <v-list-item-subtitle class="text-caption">1132 Valencia St<br>San Francisco, CA 94110</v-list-item-subtitle>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <!-- Order online button -->
      <v-card-actions class="pa-4">
        <v-btn block color="red" variant="flat" class="text-none font-weight-bold" style="background-color: #ff1a1a;">
          Commander en ligne
        </v-btn>
      </v-card-actions>
      <v-divider></v-divider>
      <!-- Reservation button -->
      <v-card-actions class="pa-4">
        <v-btn block variant="outlined" class="text-none">Réserver</v-btn>
      </v-card-actions>
    </v-card>

    <!-- About section -->
    <v-card class="mb-4 pa-4 border" flat>
      <div class="text-subtitle-1 font-weight-bold mb-3">À propos</div>
      <p class="text-body-2 mb-3">
        Bottega is a neighborhood Italian restaurant in the heart of the Mission District.
      </p>
      <v-btn variant="text" color="primary" class="text-none pa-0" size="small">Lire la suite</v-btn>
    </v-card>

    <!-- Community questions section -->
    <v-card class="mb-4 pa-4 border" flat>
      <div class="text-subtitle-1 font-weight-bold mb-3">Questions de la communauté</div>
      <!-- Questions list -->
      <v-list density="compact" class="pa-0 bg-transparent">
        <v-list-item v-for="question in communityQuestions" :key="question.id" class="px-0 py-2">
          <div class="text-body-2 font-weight-medium mb-1">{{ question.text }}</div>
          <div class="text-caption text-grey">{{ question.answers }} réponses</div>
        </v-list-item>
      </v-list>
      <v-btn variant="text" color="primary" class="text-none mt-2" size="small">Poser une question</v-btn>
    </v-card>

    <!-- Similar businesses section -->
    <v-card class="mb-4 pa-4 border" flat>
      <div class="text-subtitle-1 font-weight-bold mb-3">Vous aimerez aussi</div>
      <!-- Similar businesses list -->
      <div v-for="business in similarBusinesses" :key="business.name" class="d-flex gap-3 mb-4">
        <v-img :src="business.image" width="80" height="80" cover class="rounded flex-shrink-0"></v-img>
        <div>
          <div class="font-weight-medium text-body-2">
            <a href="#" class="text-decoration-none text-primary">{{ business.name }}</a>
          </div>
          <div class="d-flex align-center">
            <v-rating :model-value="business.rating" color="amber-darken-2" readonly size="x-small" density="compact"></v-rating>
            <span class="text-caption text-grey ml-1">{{ business.reviewCount }}</span>
          </div>
          <div class="text-caption text-grey">{{ business.category }}</div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
interface CommunityQuestion {
  id: number;
  text: string;
  answers: number;
}

interface SimilarBusiness {
  name: string;
  image: string;
  rating: number; 
  reviewCount: number;
  category: string | 'Italian' | 'French' | 'Pizza'; // On peut mixer string et littéraux
}

// Community questions data
const communityQuestions: CommunityQuestion[] = [
  { id: 1, text: 'Y a-t-il des places en terrasse ?', answers: 3 },
  { id: 2, text: 'Prennent-ils les réservations pour les grands groupes ?', answers: 2 },
  { id: 3, text: 'Quel est le meilleur plat ici ?', answers: 8 }
]

// Similar businesses data
const similarBusinesses: SimilarBusiness[] = [
  { name: 'Flour + Water', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200', rating: 4.5, reviewCount: 892, category: 'Italien' },
  { name: 'Delfina', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200', rating: 4, reviewCount: 567, category: 'Italien' }
]
</script>
