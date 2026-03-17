<template>
  <v-footer :app="app" class="footer-modern pa-0 overflow-hidden text-black">
    <div class="gradient-bg" />

    <v-sheet color="transparent" class="w-100 py-12">
      <v-container>
        <v-row>
          <!-- About -->
          <v-col cols="12" sm="6" md="3">
            <div class="d-flex align-center mb-6 opacity-90">
              <v-icon icon="mdi-information-outline" class="me-2" size="20" />
              <span class="text-h6 font-weight-bold">À Propos</span>
            </div>
            <p class="text-body-2 opacity-70 mb-4">
              {{ aboutText }}
            </p>
            <div class="d-flex ga-2">
              <v-chip
                v-for="tag in aboutTags"
                :key="tag"
                size="x-small"
                variant="outlined"
                class="text-caption border-opacity-25"
              >
                {{ tag }}
              </v-chip>
            </div>
          </v-col>

          <!-- Navigation -->
          <v-col cols="12" sm="6" md="3">
            <div class="d-flex align-center mb-6 opacity-90">
              <v-icon icon="mdi-compass-outline" class="me-2" size="20" />
              <span class="text-h6 font-weight-bold">Navigation</span>
            </div>
            <div class="d-flex flex-column ga-2">
              <a
                v-for="link in links"
                :key="link.to"
                :href="link.to"
                class="footer-link text-body-2 text-decoration-none text-black opacity-70 transition-swing d-flex align-center"
              >
                {{ link.title }}
                <v-icon
                  icon="mdi-arrow-top-right"
                  size="14"
                  class="ms-1 arrow-icon"
                />
              </a>
            </div>
          </v-col>

          <!-- Cities - Vertical List -->
          <v-col cols="12" sm="6" md="3">
            <div class="d-flex align-center mb-6 opacity-90">
              <v-icon icon="mdi-map-marker-radius" class="me-2" size="20" />
              <span class="text-h6 font-weight-bold">Villes du Bénin</span>
            </div>
            <div class="d-flex flex-column ga-1">
              <p
                v-for="city in cities"
                :key="city"
                class="city-item text-body-2 opacity-70 py-1 px-2 rounded transition-swing cursor-pointer hover-opacity-100 hover-pl"
              >
                {{ city }}
              </p>
            </div>
          </v-col>

          <!-- Language -->
          <v-col cols="12" sm="6" md="3">
            <div class="d-flex align-center mb-6 opacity-90">
              <v-icon icon="mdi-translate" class="me-2" size="20" />
              <span class="text-h6 font-weight-bold">Langue</span>
            </div>
            <div class="d-flex ga-3">
              <v-btn
                v-for="lang in languages"
                :key="lang.code"
                :variant="selectedLang === lang.code ? 'flat' : 'outlined'"
                color="white"
                :class="[
                  'rounded-lg border-opacity-25',
                  {
                    'bg-opacity-20': selectedLang === lang.code,
                  },
                ]"
                @click="selectedLang = lang.code"
              >
                <template v-slot:prepend>
                  <span class="text-h6 me-n1">{{ lang.flag }}</span>
                </template>
                <span class="text-caption font-weight-bold">{{
                  lang.label
                }}</span>
              </v-btn>
            </div>
          </v-col>
        </v-row>

        <v-divider class="my-8 border-opacity-25" color="white" />

        <div class="d-flex align-center justify-space-between flex-wrap ga-4">
          <span class="text-caption opacity-70">
            © {{ new Date().getFullYear() }} — Tous droits réservés
          </span>
          <div class="d-flex ga-2">
            <v-btn
              v-for="icon in ['mdi-instagram', 'mdi-twitter', 'mdi-facebook']"
              :key="icon"
              :icon="icon"
              variant="text"
              size="small"
              class="opacity-60 v-btn--active transition-swing hover-translate"
            />
          </div>
        </div>
      </v-container>
    </v-sheet>
  </v-footer>
</template>

<script setup lang="ts">
interface NavLink {
  title: string;
  to: string;
}

interface Language {
  code: LanguageCode;
  label: string;
  flag: string; // URL de l'image ou emoji
}

const props = defineProps({
  app: { type: Boolean, default: false },
});

const links: NavLink[] = [
  { title: "Accueil", to: "/" },
  { title: "Collections", to: "/collections" },
  { title: "Événements", to: "/event" },
  { title: "Support", to: "/support" },
];

const aboutText =
  "Votre plateforme de référence pour découvrir les trésors du Bénin. Nous connectons les passionnés aux artisans locaux.";
const aboutTags: string[] = ["Artisanat", "Culture", "Tourisme"];

const cities: string[] = [
  "Cotonou",
  "Porto-Novo",
  "Parakou",
  "Abomey",
  "Djougou",
  "Bohicon",
  "Kandi",
  "Lokossa",
  "Ouidah",
  "Natitingou",
  "Savalou",
  "Malanville",
];

const languages: Language[] = [
  { code: "fr", label: "FRANÇAIS", flag: "" },
  { code: "en", label: "ENGLISH", flag: "" },
];

const selectedLang = ref("fr");
</script>

<style scoped>
.footer-modern {
  position: relative;
}
.footer-content {
  position: relative;
  z-index: 1;
}

.footer-link .arrow-icon {
  opacity: 0;
  transform: translateX(-5px);
  transition: all 0.3s ease;
}

.footer-link:hover {
  opacity: 1 !important;
  padding-left: 6px;
}

.footer-link:hover .arrow-icon {
  opacity: 1;
  transform: translateX(0);
}

.city-item {
  transition: all 0.2s ease;
}

.city-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.hover-pl:hover {
  padding-left: 8px;
  opacity: 1 !important;
}

.hover-translate:hover {
  opacity: 1 !important;
  transform: translateY(-3px);
}
</style>
