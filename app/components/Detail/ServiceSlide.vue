<template>
    <v-sheet class="pa-0 py-6" color="transparent">
        <div class="d-flex align-center justify-space-between mb-6 px-4">
            <h2 class="text-h5 font-weight-bold">Popular Dishes</h2>
            <v-btn
                variant="text"
                color="primary"
                class="text-none"
                append-icon="mdi-chevron-right"
            >
                View full menu
            </v-btn>
        </div>

        <v-carousel
            height="400"
            show-arrows="hover"
            hide-delimiters
            cycle
            interval="5000"
        >
            <v-carousel-item v-for="(dish, n) in dishes" :key="n">
                <div class="d-flex justify-center align-center h-100">
                    <v-card
                        class="rounded-xl custom-card"
                        width="90%"
                        max-width="400"
                        height="320"
                        flat
                    >
                        <v-img
                            :src="dish.image"
                            height="100%"
                            cover
                            class="d-flex align-end"
                        >
                            <div class="position-absolute w-100" style="top: 0">
                                <v-chip
                                    v-if="dish.isPopular"
                                    size="x-small"
                                    color="white"
                                    class="ma-3 font-weight-black"
                                    variant="flat"
                                >
                                    POPULAR
                                </v-chip>
                            </div>

                            <div class="blur-content ma-2 pa-3 rounded-xl">
                                <div
                                    class="d-flex justify-space-between align-center mb-1"
                                >
                                    <span
                                        class="text-h6 font-weight-bold text-white"
                                    >
                                        {{ dish.name }}
                                    </span>
                                    <span
                                        class="text-h6 font-weight-black text-white"
                                    >
                                        {{ dish.price }}€
                                    </span>
                                </div>

                                <div
                                    class="d-flex align-center text-caption text-white"
                                    style="opacity: 0.9"
                                >
                                    <v-icon
                                        size="16"
                                        color="amber-darken-2"
                                        class="mr-1"
                                        >mdi-star</v-icon
                                    >
                                    <span
                                        class="font-weight-bold text-body-2"
                                        >{{ dish.rating }}</span
                                    >
                                    <span class="mx-1">•</span>
                                    <span class="text-body-2"
                                        >{{ dish.reviews }} reviews</span
                                    >
                                </div>
                            </div>
                        </v-img>
                    </v-card>
                </div>
            </v-carousel-item>
        </v-carousel>
    </v-sheet>
</template>

<script setup>
// Popular dishes data
const dishes = [
    {
        name: "Mushroom Ravioli",
        price: 18.5,
        rating: 4.8,
        reviews: 124,
        isPopular: true,
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600",
    },
    {
        name: "Calamari Fritti",
        price: 14.0,
        rating: 4.5,
        reviews: 89,
        isPopular: false,
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600",
    },
    {
        name: "Italian Sausage",
        price: 16.0,
        rating: 4.9,
        reviews: 56,
        isPopular: true,
        image: "https://images.unsplash.com/photo-1541529086526-db283c563270?w=600",
    },
    {
        name: "Caesar Salad",
        price: 12.5,
        rating: 4.2,
        reviews: 210,
        isPopular: false,
        image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=600",
    },
    {
        name: "Margherita Pizza",
        price: 15.0,
        rating: 4.7,
        reviews: 342,
        isPopular: true,
        image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=600",
    },
    {
        name: "Truffle Pasta",
        price: 22.0,
        rating: 5.0,
        reviews: 45,
        isPopular: true,
        image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=600",
    },
    {
        name: "Beef Carpaccio",
        price: 19.0,
        rating: 4.6,
        reviews: 78,
        isPopular: false,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600",
    },
    {
        name: "Grilled Octopus",
        price: 24.5,
        rating: 4.8,
        reviews: 92,
        isPopular: true,
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600",
    },
    {
        name: "Lasagna Classica",
        price: 17.0,
        rating: 4.4,
        reviews: 156,
        isPopular: false,
        image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=600",
    },
    {
        name: "Panna Cotta",
        price: 9.0,
        rating: 4.9,
        reviews: 67,
        isPopular: false,
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600",
    },
];
</script>

<style scoped>
/* Card hover animation */
.custom-card {
    transition: all 0.3s ease;
}

.custom-card:hover {
    transform: translateY(-8px);
}

/* White text with shadow for readability */
.text-white {
    color: white !important;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
