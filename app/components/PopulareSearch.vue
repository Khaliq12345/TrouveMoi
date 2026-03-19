<template>
  <v-container class="pa-2" color="transparent" fluid>
    <v-card variant="flat" class="pa-2 rounded-lg" color="transparent">
      <header class="mb-2">
        <h2 class="text-subtitle-1 font-weight-bold mb-0">
          Explorer les recherches au Bénin
        </h2>
        <p class="text-caption text-grey-darken-1">
          Découvrez ce que les internautes recherchent par ville
        </p>
      </header>

      <v-chip-group v-model="selectedCityIndex" mandatory selected-class="bg-primary text-white" class="mb-2">
        <v-chip v-for="city in cities" :key="city" size="small" variant="outlined" class="font-weight-medium">
          {{ city }}
        </v-chip>
      </v-chip-group>

      <v-divider class="mb-3"></v-divider>

      <section class="mb-3">
        <h3 class="text-caption font-weight-bold mb-1 text-uppercase text-grey-darken-2">
          Top recherches à {{ cities[selectedCityIndex] }}
        </h3>
        <v-row no-gutters>
          <v-col v-for="(item, index) in visibleTopSearches" :key="index" cols="6" sm="4" md="3" class="py-1">
            <a href="#" class="text-decoration-none text-grey-darken-3 text-caption d-block text-truncate">
              {{ item }}
            </a>
          </v-col>
        </v-row>
        <v-btn variant="text" color="primary" size="small" density="compact"
          class="text-none px-0 mt-1 font-weight-bold text-caption"
          :append-icon="showAllTop ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="showAllTop = !showAllTop">
          {{ showAllTop ? 'Voir moins' : 'Voir plus' }}
        </v-btn>
      </section>

      <section>
        <h3 class="text-caption font-weight-bold mb-1 text-uppercase text-grey-darken-2">
          Tendances actuelles au Bénin
        </h3>
        <v-row no-gutters>
          <v-col v-for="(item, index) in visibleTrending" :key="index" cols="6" sm="4" md="3" class="py-1">
            <a href="#" class="text-decoration-none text-grey-darken-3 text-caption d-block text-truncate">
              {{ item }}
            </a>
          </v-col>
        </v-row>
        <v-btn variant="text" color="primary" size="small" density="compact"
          class="text-none px-0 mt-1 font-weight-bold text-caption"
          :append-icon="showAllTrending ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="showAllTrending = !showAllTrending">
          {{ showAllTrending ? 'Voir moins' : 'Voir plus' }}
        </v-btn>
      </section>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedCityIndex = ref(0)
const showAllTop = ref(false)
const showAllTrending = ref(false)

const cities = [
  'Cotonou', 'Porto-Novo', 'Parakou', 'Abomey-Calavi',
  'Djougou', 'Bohicon', 'Ouidah', 'Natitingou', 'Kandi'
]

const topSearches = [
  'Location de voiture', 'Restaurants Fidjrossè', 'Pharmacies de garde', 'Mobile Money MTN',
  'Supermarché Erevan', 'Hôtels Haie Vive', 'Livraison de repas', 'Plage de Ouidah',
  'Visa Voyage', 'Université d\'Abomey-Calavi', 'E-services Bénin', 'Impôts Bénin',
  'Gozem Bénin', 'Boulangerie Cotonou', 'Canal+ Bénin', 'Sèmè City'
]

const trendingSearches = [
  'Route des Pêches', 'Ganvié Tourisme', 'Festival de Porto-Novo', 'Prix de l\'essence',
  'Recrutement Police Républicaine', 'Mariage Traditionnel', 'Résultats BEPC 2024', 'Marché Dantokpa',
  'Sèmè-Kpodji Emploi', 'Appartement à louer Calavi', 'Code du numérique', 'Zémidjan tarifs',
  'Législation foncière', 'Investir au Bénin', 'Art contemporain Béninois', 'Amazon de Cotonou'
]

// Logique pour afficher seulement les 8 premiers éléments si "Voir plus" n'est pas activé
const visibleTopSearches = computed(() => {
  return showAllTop.value ? topSearches : topSearches.slice(0, 8)
})

const visibleTrending = computed(() => {
  return showAllTrending.value ? trendingSearches : trendingSearches.slice(0, 8)
})
</script>

<style scoped>
/* Optionnel : ajout d'un petit effet de survol sur les liens */
a:hover {
  color: #1867C0 !important;
  /* Couleur primary Vuetify */
}
</style>