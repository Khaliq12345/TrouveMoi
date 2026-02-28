<template>
    <v-container fluid class="py-12">
        <!-- Header -->
        <div class="text-center mb-10">
            <v-chip color="primary" class="mb-4" variant="flat">
                Exploration
            </v-chip>
            <h2 class="text-h5 text-md-h4 font-weight-bold mb-2">
                30 zones à explorer au Bénin
            </h2>
            <p class="text-sm text-md-lg text-grey-darken-1 max-w-2xl mx-auto">
                Culture, nature, patrimoine, plages et sites historiques.
            </p>
        </div>

        <!-- This is the section where we display all the places to explore -->
        <v-carousel hide-delimiters show-arrows="hover" height="600">
            <v-carousel-item v-for="(zone, index) in zones" :key="index">
                <gradient-card-with-image
                    :title="zone.name"
                    :subtitle="zone.location"
                    :description="zone.description"
                    :image="zone.image"
                />
            </v-carousel-item>
        </v-carousel>
    </v-container>
</template>

<script setup>
import GradientCardWithImage from "./GradientCardWithImage.vue";

const zones = [
    {
        id: 1,
        name: "Ouidah",
        location: "Atlantique",
        description: "Ville historique et mémoire de la route des esclaves.",
        image: "https://journeysbydesign.com/wp-content/uploads/2023/07/dreamstime_xl_154687278-scaled.jpg",
    },
    {
        id: 2,
        name: "Ganvié",
        location: "Lac Nokoué",
        description: "La Venise de l’Afrique, village lacustre unique.",
        image: "https://journeysbydesign.com/wp-content/uploads/2023/03/Ganvie-7-e1679323423301.jpg",
    },
    {
        id: 3,
        name: "Parc Pendjari",
        location: "Atacora",
        description: "Réserve naturelle avec éléphants et lions.",
        image: "https://journeysbydesign.com/wp-content/uploads/2023/07/IMG_7282-scaled.jpg",
    },
    {
        id: 4,
        name: "Porto-Novo",
        location: "Ouémé",
        description: "Capitale administrative riche en patrimoine.",
        image: "https://source.unsplash.com/600x400/?porto-novo",
    },
    {
        id: 5,
        name: "Abomey",
        location: "Zou",
        description: "Palais royaux classés UNESCO.",
        image: "https://source.unsplash.com/600x400/?african,kingdom",
    },
    {
        id: 6,
        name: "Grand-Popo",
        location: "Mono",
        description: "Plages paisibles et ambiance balnéaire.",
        image: "https://source.unsplash.com/600x400/?african,beach",
    },
    {
        id: 7,
        name: "Natitingou",
        location: "Atacora",
        description: "Porte d’entrée vers les montagnes.",
        image: "https://source.unsplash.com/600x400/?mountains,africa",
    },
    {
        id: 8,
        name: "Dassa-Zoumé",
        location: "Collines",
        description: "Collines sacrées et paysages rocheux.",
        image: "https://source.unsplash.com/600x400/?rocky,hills",
    },
    {
        id: 9,
        name: "Allada",
        location: "Atlantique",
        description: "Ancien royaume historique du Danxomè.",
        image: "https://source.unsplash.com/600x400/?african,heritage",
    },
    {
        id: 10,
        name: "Tanguieta",
        location: "Atacora",
        description: "Entrée principale du parc Pendjari.",
        image: "https://source.unsplash.com/600x400/?savannah",
    },
    {
        id: 11,
        name: "Lokossa",
        location: "Mono",
        description: "Culture et traditions locales.",
        image: "https://source.unsplash.com/600x400/?african,town",
    },
    {
        id: 12,
        name: "Cotonou",
        location: "Littoral",
        description: "Capitale économique dynamique.",
        image: "https://source.unsplash.com/600x400/?african,city",
    },
    {
        id: 13,
        name: "Possotomè",
        location: "Mono",
        description: "Sources thermales naturelles.",
        image: "https://source.unsplash.com/600x400/?thermal,water",
    },
    {
        id: 14,
        name: "Kandi",
        location: "Alibori",
        description: "Culture bariba et paysages sahéliens.",
        image: "https://source.unsplash.com/600x400/?african,desert",
    },
    {
        id: 15,
        name: "Bohicon",
        location: "Zou",
        description: "Carrefour stratégique et commerçant.",
        image: "https://source.unsplash.com/600x400/?african,market",
    },
    {
        id: 16,
        name: "Savalou",
        location: "Collines",
        description: "Collines verdoyantes et traditions.",
        image: "https://source.unsplash.com/600x400/?green,hills",
    },
    {
        id: 17,
        name: "Pobè",
        location: "Plateau",
        description: "Forêts classées et biodiversité.",
        image: "https://source.unsplash.com/600x400/?forest,africa",
    },
    {
        id: 18,
        name: "Comè",
        location: "Mono",
        description: "Ville côtière et artisanat local.",
        image: "https://source.unsplash.com/600x400/?coastal,africa",
    },
    {
        id: 19,
        name: "Sèmè-Podji",
        location: "Littoral",
        description: "Frontière dynamique avec le Nigeria.",
        image: "https://source.unsplash.com/600x400/?lagoon,africa",
    },
    {
        id: 20,
        name: "Banikoara",
        location: "Alibori",
        description: "Zone agricole et cotonnière.",
        image: "https://source.unsplash.com/600x400/?african,farm",
    },
    {
        id: 21,
        name: "Parakou",
        location: "Borgou",
        description: "Hub économique du nord.",
        image: "https://source.unsplash.com/600x400/?african,cityscape",
    },
    {
        id: 22,
        name: "Athiémé",
        location: "Mono",
        description: "Culture lacustre et pêche.",
        image: "https://source.unsplash.com/600x400/?fishing,africa",
    },
    {
        id: 23,
        name: "Dogbo",
        location: "Couffo",
        description: "Traditions et culture Adja.",
        image: "https://source.unsplash.com/600x400/?african,culture",
    },
    {
        id: 24,
        name: "Djougou",
        location: "Donga",
        description: "Ville cosmopolite du nord-ouest.",
        image: "https://source.unsplash.com/600x400/?african,landscape",
    },
    {
        id: 25,
        name: "Bembèrèkè",
        location: "Borgou",
        description: "Culture et agriculture locale.",
        image: "https://source.unsplash.com/600x400/?african,village",
    },
    {
        id: 26,
        name: "Malanville",
        location: "Alibori",
        description: "Ville frontalière stratégique.",
        image: "https://source.unsplash.com/600x400/?border,africa",
    },
    {
        id: 27,
        name: "Nikki",
        location: "Borgou",
        description: "Palais royal et tradition Bariba.",
        image: "https://source.unsplash.com/600x400/?royal,africa",
    },
    {
        id: 28,
        name: "Kétou",
        location: "Plateau",
        description: "Ancien royaume yoruba.",
        image: "https://source.unsplash.com/600x400/?yoruba,africa",
    },
    {
        id: 29,
        name: "Adjara",
        location: "Ouémé",
        description: "Traditions et artisanat local.",
        image: "https://source.unsplash.com/600x400/?african,craft",
    },
    {
        id: 30,
        name: "Bassila",
        location: "Donga",
        description: "Nature et biodiversité.",
        image: "https://source.unsplash.com/600x400/?african,nature",
    },
];
</script>
