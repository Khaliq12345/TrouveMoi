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
        <h2 class="text-h6 text-md-h5 font-weight-bold text-grey-darken-4 mb-1">
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
          footer-subtitle="Consultez les meilleures annonces pour découvrir des lieux exceptionnels."
          :search-query="{ location: 'Cotonou' }"
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
            <!-- images link from origineterre.com -->
            <v-col
              cols="4"
              v-for="n in [
                'https://i0.wp.com/origineterre.com/wp-content/uploads/2020/09/savon-cacao-papaye-origine-terre.jpeg?resize=650%2C740&ssl=1',
                'https://i0.wp.com/origineterre.com/wp-content/uploads/2018/07/mangue-cannelle.jpeg?w=536&ssl=1',
                'https://i0.wp.com/origineterre.com/wp-content/uploads/2019/03/tchayo-basilic-savon-antibacterien-rafraichissant-1000px.jpg?fit=1000%2C1000&ssl=1',
              ]"
              :key="n"
            >
              <v-img :src="n" cover aspect-ratio="1" class="rounded-lg"></v-img>
            </v-col>
          </v-row>
        </HomeCollectionCard>
      </v-col>

      <v-col cols="12" md="4">
        <HomeCollectionCard
          header-icon="mdi-thumb-up"
          header-title="Restaurants Les Mieux Notés à Cotonou"
          footer-title="Restaurants Les Mieux Notés à Cotonou"
          footer-subtitle="Découvrez les expériences sur les restaurants les mieux notés à Cotonou."
          :search-query="{ categories: 'restaurants', location: 'Cotonou' }"
        >
          <p class="text-caption text-grey-darken-1 mb-6">
            Basé sur les notes et les avis de vrais utilisateurs.
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
          footer-title="Top des hôtels actuellement ouverts"
          footer-subtitle="Découvrez les hôtels qui ne ferment jamais pour vous offrir un séjour mémorable."
          :search-query="{ categories: 'hotellerie-et-tourisme' }"
        >
          <v-card class="rounded-lg overflow-hidden" elevation="0">
            <v-img
              src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              cover
              height="180"
              class="align-end"
              gradient="to top right, rgba(0,0,0,0.8), rgba(0,0,0,0.1)"
            >
              <v-card-title
                class="text-white text-subtitle-2 d-flex justify-space-between align-center"
              >
                <div>
                  <div>Hôtels ouverts</div>
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
