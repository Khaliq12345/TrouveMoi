<!-- components/Detail/DetailBusinessHeader.vue -->
<template>
  <div class="header-container">
    <!-- Navbar qui passe de invisible à visible au scroll -->
    <div 
      class="fixed-navbar"
      :class="{ 'navbar-visible': isScrolled }"
    >
      <div class="navbar-content">
        <v-btn 
          v-if="isScrolled"
          icon="mdi-arrow-left" 
          color="black"
          variant="text"
          density="comfortable"
          class="fade-in"
        ></v-btn>
        
        <span v-if="isScrolled" class="navbar-title font-weight-bold text-truncate fade-in">
          Bottega
        </span>

        <!-- Spacer pour équilibrer quand seul le titre est là -->
        <div v-if="isScrolled" class="spacer"></div>
      </div>
    </div>

    <!-- Hero Section -->
    <div 
      class="hero-section" 
      :style="{ 
        height: isMobile ? '50vh' : '60vh', 
        minHeight: isMobile ? '350px' : '500px',
        paddingTop: isMobile ? 'env(safe-area-inset-top)' : '0'
      }"
    >
      <v-carousel
        v-model="currentSlide"
        hide-delimiters
        :show-arrows="!isMobile"
        cycle
        interval="5000"
        class="hero-carousel"
        height="100%"
        touch
      >
        <v-carousel-item
          v-for="(image, i) in images"
          :key="i"
          :src="image.src"
          cover
        ></v-carousel-item>
      </v-carousel>

      <!-- Overlay gradient -->
      <div class="hero-overlay">
        <v-container class="h-100 d-flex flex-column justify-end pb-8 text-white">
          <div :class="{ 'text-center': isMobile }">
            <h1 class="font-weight-bold mb-2 shadow-text" :class="isMobile ? 'text-h4' : 'text-h2'">
              Bottega
            </h1>
            
            <div class="d-flex align-center gap-2 flex-wrap" :class="{ 'justify-center': isMobile }">
              <div class="d-flex align-center bg-black-alpha pa-1 px-2 rounded-pill">
                <v-rating 
                  :model-value="4.5" 
                  color="amber" 
                  size="x-small" 
                  density="compact" 
                  readonly
                  half-increments
                ></v-rating>
                <span class="ml-1 text-caption font-weight-bold">4.5</span>
                <span class="ml-1 text-caption">(1.7k reviews)</span>
              </div>
              
              <v-chip size="x-small" color="success" variant="flat" class="font-weight-bold">
                <v-icon start size="x-small">mdi-check-circle</v-icon>
                Claimed
              </v-chip>
              
              <span class="text-caption bg-black-alpha px-2 py-1 rounded">$$$</span>
            </div>

            <div class="mt-2 d-flex align-center gap-2 flex-wrap" :class="{ 'justify-center': isMobile }">
              <span class="text-caption bg-black-alpha px-2 py-1 rounded">Italian, Pasta Shops, Pizza</span>
              <span class="text-caption bg-black-alpha px-2 py-1 rounded d-flex align-center">
                <v-icon size="x-small" class="mr-1">mdi-clock-outline</v-icon>
                Closed 11:00 AM - 11:00 PM
              </span>
            </div>
          </div>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, inject } from 'vue'

const isMobile = inject("isMobile", ref(false))
const currentSlide = ref(0)
const isScrolled = ref(false)
let rafId = null
let lastScrollY = 0

// Gestion du scroll avec support iOS/Android
const handleScroll = () => {
  if (rafId) return
  
  rafId = requestAnimationFrame(() => {
    // Utilise window.pageYOffset pour meilleure compatibilité mobile
    const currentScrollY = window.pageYOffset || document.documentElement.scrollTop || 0
    
    // Détecte le scroll après 80px
    if (currentScrollY > 80) {
      if (!isScrolled.value) isScrolled.value = true
    } else {
      if (isScrolled.value) isScrolled.value = false
    }
    
    lastScrollY = currentScrollY
    rafId = null
  })
}

// Gestion du resize pour recalculer
const handleResize = () => {
  // Force un recalcul du layout
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
}

onMounted(() => {
  // Initialisation du viewport height pour mobile
  handleResize()
  
  // Écouteurs d'événements avec capture pour être sûr de les recevoir
  window.addEventListener('scroll', handleScroll, { passive: true, capture: true })
  window.addEventListener('resize', handleResize, { passive: true })
  window.addEventListener('orientationchange', handleResize)
  
  // Fix pour iOS : écoute le touchmove aussi
  if ('ontouchstart' in window) {
    document.addEventListener('touchmove', handleScroll, { passive: true })
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll, { capture: true })
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('orientationchange', handleResize)
  
  if ('ontouchstart' in window) {
    document.removeEventListener('touchmove', handleScroll)
  }
  
  if (rafId) cancelAnimationFrame(rafId)
})

const images = [
  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200' },
  { src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200' },
  { src: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1200' },
  { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200' }
]
</script>

<style scoped>
.header-container {
  position: relative;
  width: 100%;
  /* Empêche les problèmes de scroll horizontal */
  overflow-x: hidden;
}

/* Navbar fixe - cachée par défaut, visible au scroll */
.fixed-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transform: translateY(-100%);
  transition: transform 0.25s ease-out, background-color 0.25s ease;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px); /* Support iOS */
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  /* Safe area pour iPhone X+ */
  padding-top: env(safe-area-inset-top);
  padding-left: max(16px, env(safe-area-inset-left));
  padding-right: max(16px, env(safe-area-inset-right));
}

.navbar-visible {
  transform: translateY(0);
}

.navbar-content {
  display: flex;
  align-items: center;
  height: 56px;
  max-width: 1200px;
  margin: 0 auto;
}

.navbar-title {
  flex: 1;
  margin: 0 12px;
  font-size: 1.1rem;
  color: #000;
}

.spacer {
  width: 40px; /* Même taille que le bouton pour centrer le titre */
}

.fade-in {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateX(-10px); }
  to { opacity: 1; transform: translateX(0); }
}

/* Hero section */
.hero-section {
  position: relative;
  width: 100%;
  overflow: hidden;
  /* Utilise la variable --vh si disponible, sinon fallback */
  height: calc(var(--vh, 1vh) * 50);
}

.hero-carousel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to top, 
    rgba(0,0,0,0.9) 0%, 
    rgba(0,0,0,0.5) 30%, 
    rgba(0,0,0,0.2) 60%,
    transparent 100%
  );
  z-index: 2;
  pointer-events: none;
}

.hero-overlay > * {
  pointer-events: auto;
}

.bg-black-alpha {
  background-color: rgba(0, 0, 0, 0.6) !important;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.shadow-text {
  text-shadow: 0 2px 8px rgba(0,0,0,0.9);
  letter-spacing: -0.5px;
}

/* Fix pour le carousel Vuetify sur mobile */
:deep(.v-carousel) {
  height: 100% !important;
}

:deep(.v-window__container) {
  height: 100% !important;
}

:deep(.v-window-item) {
  height: 100% !important;
}

:deep(.v-carousel__controls) {
  background: transparent !important;
  bottom: 8px;
}

:deep(.v-btn--icon.v-carousel__controls__item) {
  color: white !important;
  opacity: 0.6;
  width: 8px;
  height: 8px;
}

:deep(.v-btn--icon.v-carousel__controls__item--active) {
  opacity: 1;
}

/* Responsive */
@media (max-width: 600px) {
  .hero-section {
    border-radius: 0;
  }
  
  .navbar-content {
    height: 52px;
  }
  
  .navbar-title {
    font-size: 1rem;
  }
}

/* Fix pour Android Chrome qui cache la barre d'URL */
@media screen and (max-width: 600px) {
  .hero-section {
    /* Fallback si --vh n'est pas défini */
    height: 50vh;
    height: calc(var(--vh, 1vh) * 50);
  }
}
</style>