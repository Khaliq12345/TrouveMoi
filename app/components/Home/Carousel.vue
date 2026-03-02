<!-- Vertical carousel displaying images with author information and navigation controls -->
<template>
    <!-- Responsive container for carousel -->
    <v-sheet
        class="mx-auto relative overflow-hidden"
        :width="isMobile ? 415 : 600"
        :height="isMobile ? 800 : 750"
    >
        <!-- Vertical scrolling carousel with auto-cycle -->
        <v-carousel
            v-model="currentIndex"
            direction="vertical"
            progress="red"
            vertical-arrows="left"
            vertical-delimiters="right"
            hide-delimiter-background
            :width="isMobile ? 415 : 600"
            :height="isMobile ? 800 : 750"
            :cycle="true"
        >
            <!-- Carousel items with cover images -->
            <v-carousel-item
                v-for="(item, i) in items"
                :key="i"
                :src="item.src"
                cover
            ></v-carousel-item>

            <!-- Overlay for author info and counter -->
            <v-overlay
                :scrim="false"
                content-class="w-100 h-100 d-flex flex-column align-center justify-space-between pointer-pass-through py-3"
                contained
                model-value
                no-click-animation
                persistent
            >
                <!-- Author card with transition effect -->
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
                <!-- Current slide counter -->
                <v-chip
                    :text="`${currentIndex + 1} / ${items.length}`"
                    color="#eee"
                    size="small"
                    variant="flat"
                ></v-chip>
            </v-overlay>
        </v-carousel>
    </v-sheet>
</template>

<script setup lang="ts">
// Component props
defineProps({
    items: Array,
});

// Current slide index
const currentIndex = shallowRef(0);
// Reactive reference to current item data
const currentItem = toRef(() => items[currentIndex.value]);

// Inject mobile state from parent
const isMobile = inject("isMobile");

// Sample carousel data with author info
const items = [
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
</script>

<style scoped>
/* Hide scrollbar for webkit browsers */
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
/* Hide scrollbar for other browsers */
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
