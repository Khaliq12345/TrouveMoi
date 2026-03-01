<template>
    <v-sheet
        class="mx-auto relative overflow-hidden"
        :width="isMobile ? 415 : 600"
        :height="isMobile ? 800 : 799"
    >
        <v-carousel
            v-model="currentIndex"
            direction="vertical"
            progress="red"
            vertical-arrows="left"
            vertical-delimiters="right"
            hide-delimiter-background
            :width="isMobile ? 415 : 600"
            :cycle="true"
            :height="isMobile ? 800 : 799"
        >
            <v-carousel-item
                v-for="(item, i) in AuthorItems"
                :key="i"
                :src="item.src"
                cover
            ></v-carousel-item>

            <v-overlay
                :scrim="false"
                content-class="w-100 h-100 d-flex flex-column align-center justify-end pointer-pass-through py-3"
                contained
                model-value
                no-click-animation
                persistent
            >
                <v-scroll-x-transition mode="out-in" appear>
                    <v-sheet :key="currentIndex" rounded="xl">
                        <v-list-item
                            :prepend-avatar="`https://randomuser.me/api/portraits/${currentItem.avatarId}.jpg`"
                            :subtitle="currentItem.subtitle"
                            :title="currentItem.authorName"
                            class="pa-1 pr-6"
                        ></v-list-item>
                    </v-sheet>
                </v-scroll-x-transition>
            </v-overlay>
        </v-carousel>
    </v-sheet>
</template>

<script setup lang="ts">
// Setup all prop(s)
const backgroundImage = defineModel();

// Define all reactive variables
const currentIndex = shallowRef(0);
const currentItem = toRef(() => AuthorItems[currentIndex.value]);

// Setup all provided variables
const isMobile = inject("isMobile");

// Define data
const AuthorItems = [
    {
        authorName: "Bettany Nichols",
        avatarId: "women/31",
        subtitle: "31k followers",
        src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
    },
    {
        authorName: "Greg Kovalsky",
        avatarId: "men/61",
        subtitle: "412 followers",
        src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
    },
    {
        authorName: "Emma Kathleen",
        avatarId: "women/34",
        subtitle: "521 followers",
        src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
    },
    {
        authorName: "Anthony McKenzie",
        avatarId: "men/78",
        subtitle: "6k followers",
        src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
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

watch(currentIndex, (newValue) => {
    backgroundImage.value = AuthorItems[newValue]?.src;
});
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
