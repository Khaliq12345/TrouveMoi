<template>
  <v-card 
    class="mx-auto overflow-hidden position-relative" 
    :max-width="isMobile ? '100%' : '100%'" 
    flat 
  >
    <v-carousel
      hide-delimiters
      show-arrows="hover"
      cycle
      :height="isMobile ? '450' : '600'" 
      progress="primary"
    >
      <v-carousel-item
        v-for="(image, i) in images"
        :key="i"
        :src="image.src"
        cover
      ></v-carousel-item>
    </v-carousel>

    <div class="static-overlay d-flex align-end pb-8 pb-sm-10">
      <v-container :fluid="!isMobile" class="px-4"> <v-row no-gutters>
          <v-col 
            cols="12" 
            :class="isMobile ? 'text-center' : 'text-left pl-md-10'"
            class="text-white"
          >
            <h1 
              class="font-weight-bold mb-2 shadow-text"
              :class="isMobile ? 'text-h4' : 'text-h2'"
            >
              Bottega
            </h1>
            
            <div 
              class="d-flex align-center flex-wrap gap-2 mb-3"
              :class="isMobile ? 'justify-center mx-auto' : 'justify-start'"
              style="max-width: 100%;"
            >
              <div class="d-flex align-center bg-black-alpha pa-1 px-2 rounded-pill flex-shrink-0">
                <v-rating 
                  :model-value="4.5" 
                  color="amber-darken-2" 
                  half-increments 
                  readonly 
                  size="x-small" 
                  density="compact"
                ></v-rating>
                <span class="ml-1 text-caption font-weight-bold">4.5 (425)</span>
              </div>

              <v-chip size="x-small" color="green-lighten-2" variant="flat" class="font-weight-bold flex-shrink-0">
                <v-icon start size="x-small">mdi-check-circle</v-icon>
                Claimed
              </v-chip>

              <span class="text-caption shadow-text font-weight-medium">$$$ • Italian</span>
            </div>

            <div 
              class="d-flex align-center flex-wrap gap-x-2 gap-y-1 text-caption shadow-text"
              :class="isMobile ? 'justify-center' : 'justify-start'"
            >
              <v-chip color="green-accent-3" size="x-small" variant="outlined" class="font-weight-black bg-black-alpha">OPEN</v-chip>
              <span class="font-weight-medium">11:30 AM - 10:00 PM</span>
              <v-btn variant="text" color="white" size="x-small" class="text-none pa-0 min-width-0">See hours</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-card>
</template>

<style scoped>
.static-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  /* Dégradé plus haut sur mobile pour couvrir le texte centré */
  background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 100%);
  z-index: 2;
}

.static-overlay .v-btn, 
.static-overlay .v-chip {
  pointer-events: auto;
}

/* On gère les espaces verticaux quand les éléments passent à la ligne */
.gap-2 { gap: 8px; }
.gap-x-2 { column-gap: 8px; }
.gap-y-1 { row-gap: 4px; }

.shadow-text {
  text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
}

.bg-black-alpha {
  background-color: rgba(0, 0, 0, 0.5) !important;
  backdrop-filter: blur(4px);
}

/* Empêche les boutons de prendre trop de place */
.min-width-0 {
  min-width: auto !important;
}
</style>

<script setup>
import { useDisplay } from 'vuetify'

// Injection de la responsivité Vuetify
const isMobile = inject("isMobile");

const images = [
  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200' },
  { src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200' },
  { src: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1200' },
  { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200' },
  { src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200' },
  { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200' },
  { src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200' },
  { src: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=1200' },
  { src: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200' },
  { src: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1200' },
];
</script>
