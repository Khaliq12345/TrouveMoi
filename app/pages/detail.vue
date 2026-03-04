<template>
  <ClientOnly>
    <v-layout>
      <div class="w-100">
        <DetailMobileBusinessHeader />
        <!-- <DetailDesktopBussnessHeader v-else /> -->

        <v-main>
            <v-row>
              <!-- Colonne gauche : contenu scrollable -->
              <v-col cols="12" md="7" lg="8" class="pr-md-6 pr-lg-8">
            <DetailMiniInfo />
            <DetailActionsButtons />

            <section id="services" class="scroll-section">
              <DetailServiceSlide />
            </section>
            <section id="amenities" class="scroll-section">
              <DetailAmenities />
            </section>
            <section id="location" class="scroll-section">
              <DetailLocationHours v-if="isMobile" />
            </section>
            <section id="vibes" class="scroll-section">
              <DetailVibes />
            </section>
            <section id="reviews" class="scroll-section">
              <DetailReviews />
            </section>
              </v-col>

              <!-- Colonne droite : sidebar sticky -->
              <v-col cols="12" md="5" lg="4" class="d-none d-md-block pl-md-6 pl-lg-8 align-self-start">
                <v-sheet position="sticky" class="mt-4 bg-green">
                  <DetailLocationHours />
                </v-sheet>
              </v-col>
            </v-row>
        </v-main>

        <BottomNav v-if="isMobile" :order="2" />
      </div>
    </v-layout>
  </ClientOnly>
</template>

<script setup lang="ts">
const isMobile = inject("isMobile");
</script>
