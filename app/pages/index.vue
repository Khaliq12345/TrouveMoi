<template>
    <v-layout class="flex flex-col">
        <HomeAppBar v-model="searchQuery" />

        <!-- Carrousel -->
        <HomeCarousel :items="carouselItems" />
        <!-- Catégories -->
        <HomeCategories :categories="beninCategories" />

        <HomeExplore />

        <HomeBottomNav v-if="isMobile" />

        <Footer v-if="!isMobile"></Footer>
    </v-layout>
</template>

<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";

const { width, height } = useWindowSize();

const searchQuery = ref("");

const isMobile = computed(() => {
    return width.value < 768;
});

// Inject variables
provide("isMobile", isMobile);

// Catégories du répertoire du Bénin
const beninCategories = [
    {
        id: 1,
        name: "Restaurants",
        tagline: "Saveurs locales & internationales",
        icon: "mdi-silverware-fork-knife",
        color: "#FF6B35",
        bgLight: "#FFF0EB",
        bgDark: "#FFD4C7",
        count: 245,
        route: "/categories/restaurants",
    },
    {
        id: 2,
        name: "Hôtels",
        tagline: "Du confort au luxe",
        icon: "mdi-bed",
        color: "#4ECDC4",
        bgLight: "#E8F8F7",
        bgDark: "#B8E8E4",
        count: 128,
        route: "/categories/hotels",
    },
    {
        id: 3,
        name: "Boutiques",
        tagline: "Shopping & artisanat",
        icon: "mdi-shopping",
        color: "#FF6B9D",
        bgLight: "#FFF0F5",
        bgDark: "#FFD4E2",
        count: 532,
        route: "/categories/boutiques",
    },
    {
        id: 4,
        name: "Services",
        tagline: "Professionnels du quotidien",
        icon: "mdi-tools",
        color: "#45B7D1",
        bgLight: "#EBF7FA",
        bgDark: "#C4E8F0",
        count: 189,
        route: "/categories/services",
    },
    {
        id: 5,
        name: "Santé",
        tagline: "Cliniques & pharmacies",
        icon: "mdi-hospital-box",
        color: "#E74C3C",
        bgLight: "#FDEDEC",
        bgDark: "#F5B7B1",
        count: 76,
        route: "/categories/sante",
    },
    {
        id: 6,
        name: "Éducation",
        tagline: "Écoles & formations",
        icon: "mdi-school",
        color: "#9B59B6",
        bgLight: "#F5EEF8",
        bgDark: "#D7BDE2",
        count: 94,
        route: "/categories/education",
    },
    {
        id: 7,
        name: "Loisirs",
        tagline: "Sorties & divertissements",
        icon: "mdi-party-popper",
        color: "#F39C12",
        bgLight: "#FEF5E7",
        bgDark: "#FAD7A0",
        count: 156,
        route: "/categories/loisirs",
    },
    {
        id: 8,
        name: "Transports",
        tagline: "Taxi, bus & location",
        icon: "mdi-car",
        color: "#27AE60",
        bgLight: "#EAFAF1",
        bgDark: "#ABEBC6",
        count: 203,
        route: "/categories/transports",
    },
];

// 10 éléments mixtes images + vidéos
const carouselItems = [
    {
        id: 1,
        type: "image",
        src: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
        title: "Bord de mer",
        description:
            "Découvrez les plus belles destinations balnéaires de la région",
        action: "Explorer",
    },
    {
        id: 2,
        type: "video",
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        title: "Nature sauvage",
        description: "Plongez au cœur de la faune et la flore",
        action: "Regarder",
    },
    {
        id: 3,
        type: "image",
        src: "https://cdn.vuetifyjs.com/images/cards/hotel.jpg",
        title: "Hôtels de luxe",
        description: "Séjournez dans les établissements les plus prestigieux",
        action: "Réserver",
    },
    {
        id: 4,
        type: "image",
        src: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
        title: "Couchers de soleil",
        description: "Les meilleurs spots pour admirer le crépuscule",
        action: "Découvrir",
    },
    {
        id: 5,
        type: "video",
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        title: "Aventure 3D",
        description: "Une expérience immersive unique",
        action: "Voir",
    },
    {
        id: 6,
        type: "image",
        src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        title: "Montagnes",
        description: "Randonnées et panoramas à couper le souffle",
        action: "Partir",
    },
    {
        id: 7,
        type: "image",
        src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800",
        title: "Lacs alpins",
        description: "Eaux cristallines au milieu des sommets",
        action: "Visiter",
    },
    {
        id: 8,
        type: "video",
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        title: "Feux d'artifice",
        description: "Spectacles pyrotechniques grandioses",
        action: "Assister",
    },
    {
        id: 9,
        type: "image",
        src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
        title: "Plages tropicales",
        description: "Sable blanc et eaux turquoise",
        action: "Profiter",
    },
    {
        id: 10,
        type: "image",
        src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
        title: "Aurores boréales",
        description: "Observer les lumières du nord",
        action: "Vivre",
    },
];
</script>
