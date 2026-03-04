<!-- Hero carousel with business images, title, rating, and action buttons -->
<template>
    <!-- Image carousel with auto-cycle -->
    <v-carousel
        hide-delimiters
        show-arrows="hover"
        cycle
        :height="450"
        progress="primary"
        class="carousel-wrapper"
    >
        <!-- Carousel slides -->
        <v-carousel-item
            v-for="(image, i) in images"
            :key="i"
            :src="image.src"
            cover
        />

        <!-- Overlay content with gradient background -->
        <div class="carousel-overlay">
            <div class="text-center text-white carousel-content">
              <!-- Business name -->
              <h1 class="text-h3 font-weight-black mb-1 title-text">
                  {{ restaurantTitle }}
              </h1>
              
                <!-- Rating display -->
                <div class="d-flex align-center justify-center mb-2">
                    <v-rating
                        :model-value="4.5"
                        color="amber-darken-2"
                        density="compact"
                        size="x-small"
                        half-increments
                        readonly
                    />
                    <span class="ms-2 text-caption font-weight-bold rating-text">
                        4.5 (425 Reviews)
                    </span>
                </div>

                <!-- Business info (price, category, hours) -->
                <p class="text-body-2 font-weight-bold mb-2 subtitle-text">
                    $$$ • Italian • 11:30 AM - 10:00 PM
                </p>

                <!-- Description -->
                <p class="text-caption mb-4 mx-auto description-text">
                    Discover authentic flavors and hand-crafted pasta in the
                    heart of the city.
                </p>

                <!-- Action buttons -->
                <div class="d-flex justify-center gap-3">
                    <v-btn
                        variant="flat"
                        color="teal-darken-2"
                        class="px-6 font-weight-bold"
                    >
                        Book Table
                    </v-btn>
                    <v-btn variant="outlined" color="white" class="menu-btn">
                        Menu
                    </v-btn>
                </div>
            </div>
        </div>
    </v-carousel>
</template>

<script setup lang="ts">
defineProps<{
    restaurantTitle: string;
}>();

// Carousel images array
const images = [
    { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200" },
    { src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200" },
    { src: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1200" },
    { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200" },
    { src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200" },
    { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200" },
    { src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200" },
    { src: "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=1200" },
    { src: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200" },
    { src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1200" },
];
</script>

<style scoped>
.carousel-wrapper {
    position: relative;
}

/* Gradient overlay for text readability */
.carousel-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.75) 0%,
        rgba(0, 0, 0, 0.2) 55%,
        transparent 100%
    );
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 40px;
    pointer-events: none;
}

/* Enable pointer events for interactive content */
.carousel-content {
    pointer-events: all;
}

/* Text shadows for better readability */
.rating-text,
.subtitle-text {
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.9);
}

.title-text {
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.9);
    letter-spacing: 1px;
}

.description-text {
    max-width: 320px;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.9);
    opacity: 0.9;
}

/* Menu button border styling */
.menu-btn {
    border-color: rgba(255, 255, 255, 0.8);
}
</style>
