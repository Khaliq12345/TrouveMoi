<template>
  <v-container
    color="transparent"
    class="pa-6 pa-md-10 rounded-xl"
    style="max-width: 1200px"
  >
    <div
      class="d-flex flex-column flex-sm-row justify-space-between align-sm-end mb-8"
    >
      <div>
        <h2 class="text-h5 font-weight-bold text-grey-darken-4 mb-1">
          Collections Sélectionnées & Incontournables Locaux
        </h2>
        <p class="text-body-2 text-grey-darken-1">
          Explorez les lieux les mieux notés et les perles locales vérifiées.
        </p>
      </div>
    </div>

    <v-row>
      <v-col cols="12" md="4">
        <HomeCollectionCard
          header-icon="mdi-star"
          header-title="Annonces Vérifiées près de Cotonou"
          footer-title="Annonces Vérifiées près de Cotonou"
          footer-subtitle="Consultez les meilleures annonces vérifiées sur notre plateforme pour une expérience sécurisée."
          :search-query="{ filter: 'verified', location: 'Cotonou' }"
        >
          <div class="d-flex align-center mb-4">
            <v-icon
              icon="mdi-check-decagram"
              color="green"
              size="small"
              class="mr-2"
            ></v-icon>
            <span class="text-caption text-grey-darken-1"
              >3 nouveaux lieux vérifiés dynamiquement</span
            >
          </div>
          <v-row dense>
            <v-col cols="4" v-for="n in 3" :key="n">
              <v-img
                :src="`https://picsum.photos/100/100?random=${n}`"
                cover
                aspect-ratio="1"
                class="rounded-lg"
              ></v-img>
            </v-col>
          </v-row>
        </HomeCollectionCard>
      </v-col>

      <v-col cols="12" md="4">
        <HomeCollectionCard
          header-icon="mdi-thumb-up"
          header-title="Les Mieux Notés à Grand-Popo"
          footer-title="Les Mieux Notés à Grand-Popo"
          footer-subtitle="Découvrez les expériences et les lieux les mieux notés autour de Grand-Popo."
          :search-query="{ filter: 'top_rated', location: 'Grand-Popo' }"
        >
          <p class="text-caption text-grey-darken-1 mb-6">
            Basé sur la distance, les notes et les avis de vrais utilisateurs.
          </p>
          <div
            class="d-flex justify-center bg-white rounded-xl pa-4 elevation-1"
          >
            <v-rating
              :model-value="5"
              color="amber-darken-2"
              active-color="amber-darken-2"
              half-increments
              readonly
            ></v-rating>
          </div>
        </HomeCollectionCard>
      </v-col>

      <v-col cols="12" md="4">
        <HomeCollectionCard
          footer-title="Mise en Avant Locale de la Semaine"
          footer-subtitle="Notre destination hautement recommandée pour cette semaine. Ne manquez pas ces favoris locaux."
          :search-query="{ filter: 'spotlight' }"
        >
          <v-card class="rounded-lg overflow-hidden" elevation="0">
            <v-img
              src="https://picsum.photos/400/250?random=10"
              cover
              height="180"
              class="align-end"
              gradient="to top right, rgba(0,0,0,0.8), rgba(0,0,0,0.1)"
            >
              <v-card-title
                class="text-white text-subtitle-2 d-flex justify-space-between align-center"
              >
                <div>
                  <div>Restaurant Awash</div>
                  <div
                    class="text-caption text-grey-lighten-1 d-flex align-center mt-1"
                  >
                    <v-icon
                      icon="mdi-map-marker"
                      size="x-small"
                      class="mr-1"
                    ></v-icon>
                    Cotonou, BJ
                  </div>
                </div>
                <v-btn
                  icon="mdi-chevron-right"
                  size="x-small"
                  variant="flat"
                  color="white"
                  class="text-black"
                  :to="{
                    path: '/search',
                    query: { place_id: 'restaurant_awash_cotonou' },
                  }"
                ></v-btn>
              </v-card-title>
            </v-img>
          </v-card>
        </HomeCollectionCard>
      </v-col>
    </v-row>
  </v-container>
</template>
