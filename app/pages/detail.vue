<template>
  <v-app>
    <v-main class="bg-white">
      <div class="page-container">
        <DetailBusinessHeader />

        <!-- Sticky Navigation - Mobile Only -->
        <div 
          v-if="isMobile"
          ref="stickyNav"
          class="sticky-nav bg-white"
          :class="{ 'elevation-2': isScrolled }"
        >
          <!-- Titre au scroll -->
          <v-expand-transition>
            <div 
              v-show="isScrolled" 
              class="px-4 pt-2 pb-1 border-b-thin"
            >
              <span class="text-subtitle-2 font-weight-bold text-truncate d-block">
                {{ businessTitle }}
              </span>
            </div>
          </v-expand-transition>

          <!-- Tabs -->
          <div class="d-flex overflow-x-auto border-b-thin hide-scrollbar">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              class="tab-button flex-grow-1 py-3 px-4 text-body-2 font-weight-medium text-medium-emphasis text-no-wrap"
              :class="{ 'text-primary font-weight-bold tab-active': activeTab === tab.id }"
              @click="scrollToSection(tab.id)"
            >
              {{ tab.label }}
            </button>
          </div>
        </div>

        <!-- Contenu -->
        <div class="content-wrapper pb-16">
          <DetailMiniInfo v-if="isMobile" />
          <DetailActionsButtons v-else />

          <section id="services" class="scroll-section"><DetailServiceSlide /></section>
          <section id="amenities" class="scroll-section"><DetailAmenities /></section>
          <section id="location" class="scroll-section"><DetailLocationHours /></section>
          <section id="vibes" class="scroll-section"><DetailVibes /></section>
          <section id="reviews" class="scroll-section">
            <ClientOnly><DetailReviews /></ClientOnly>
          </section>

          <DetailFooter />
        </div>
      </div>

      <!-- Bottom Navigation - Mobile Only -->
      <v-bottom-navigation
        v-if="isMobile"
        v-model="bottomNav"
        grow
        elevation="10"
        height="60"
        class="bottom-nav-safe"
      >
        <v-btn value="call">
          <v-icon>mdi-phone</v-icon>
          <span>Appeler</span>
        </v-btn>
        <v-btn value="reserve" class="bg-primary text-white mx-2 rounded-lg">
          <v-icon>mdi-calendar-check</v-icon>
          <span>Réserver</span>
        </v-btn>
        <v-btn value="map">
          <v-icon>mdi-map-marker</v-icon>
          <span>Y aller</span>
        </v-btn>
      </v-bottom-navigation>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, inject, onMounted, onUnmounted } from "vue";

const isMobile = inject("isMobile");
const activeTab = ref(null);
const isScrolled = ref(false);
const stickyNav = ref(null);
const bottomNav = ref(null);
const businessTitle = ref("Nom du Business");

const tabs = [
  { id: 'services', label: 'Services' },
  { id: 'amenities', label: 'Infos' },
  { id: 'location', label: 'Plan' },
  { id: 'reviews', label: 'Avis' }
];

let rafId = null;
let lastScrollY = 0;

const handleScroll = () => {
  if (rafId) return;
  rafId = requestAnimationFrame(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY !== lastScrollY) {
      isScrolled.value = currentScrollY > 100;
      lastScrollY = currentScrollY;
      updateActiveTab();
    }
    rafId = null;
  });
};

const updateActiveTab = () => {
  const sections = tabs.map(t => document.getElementById(t.id)).filter(Boolean);
  for (const section of sections) {
    const rect = section.getBoundingClientRect();
    const offset = stickyNav.value?.offsetHeight + 20 || 140;
    if (rect.top <= offset && rect.bottom >= offset) {
      activeTab.value = section.id;
      break;
    }
  }
};

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const navHeight = stickyNav.value?.offsetHeight || 0;
  const targetY = el.getBoundingClientRect().top + window.scrollY - navHeight - 10;
  window.scrollTo({ top: targetY, behavior: 'smooth' });
  activeTab.value = id;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  if (rafId) cancelAnimationFrame(rafId);
});
</script>

<style scoped>
/* Container principal sans overflow pour sticky */
.page-container {
  min-height: 100%;
}

/* Sticky Navigation - Solution: sticky avec will-change */
.sticky-nav {
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  z-index: 100;
  will-change: transform; /* Force hardware acceleration */
  transform: translateZ(0); /* Fix Safari */
  backface-visibility: hidden; /* Fix Safari */
}

/* Cache scrollbar */
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Tab active */
.tab-button {
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
}
.tab-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: currentColor;
}

/* Sections */
.scroll-section {
  scroll-margin-top: 140px;
}

/* Bottom nav fixe - Solution: fixed avec env(safe-area-inset-bottom) */
.bottom-nav-safe {
  position: fixed !important;
  bottom: 0 !important;
  left: 0 !important;
  right: 0 !important;
  padding-bottom: env(safe-area-inset-bottom) !important;
  transform: translateZ(0) !important;
  z-index: 1000 !important;
}

/* Padding pour éviter que le contenu soit caché derrière la nav */
.content-wrapper {
  padding-bottom: calc(60px + env(safe-area-inset-bottom, 0px));
}
</style>