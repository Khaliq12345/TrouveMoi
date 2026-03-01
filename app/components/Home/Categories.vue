<template>
    <v-sheet class="py-8 px-4 rounded-3xl bg-grey-lighten-4" flat>
        <v-toolbar color="transparent" flat class="mb-4">
            <div>
                <h2 class="text-h5 font-weight-bold text-grey-darken-3">
                    Explorer par catégorie
                </h2>
                <p class="text-body-2 text-grey">
                    Trouvez les meilleures adresses du Bénin
                </p>
            </div>
            <v-spacer />
            <v-btn
                variant="text"
                color="primary"
                append-icon="mdi-arrow-right"
                class="hidden-sm-and-down"
            >
                Voir tout
            </v-btn>
        </v-toolbar>

        <v-row dense>
            <v-col
                v-for="(category, index) in categories"
                :key="category.id"
                cols="6"
                sm="4"
                md="3"
                :class="{ 'd-none d-md-block': index >= 5 }"
            >
                <v-hover v-slot="{ isHovering, props }">
                    <v-card
                        v-bind="props"
                        :to="category.route"
                        flat
                        class="rounded-xl pa-4 transition-swing"
                        :elevation="isHovering ? 8 : 1"
                        :style="{
                            background: `linear-gradient(135deg, ${category.bgLight}, ${category.bgDark})`,
                            transform: isHovering ? 'translateY(-8px)' : 'none',
                        }"
                    >
                        <div
                            class="d-flex justify-space-between align-start mb-4"
                        >
                            <v-chip
                                :color="category.color"
                                size="x-small"
                                class="text-white font-weight-bold"
                            >
                                {{ category.count }}+
                            </v-chip>
                            <v-avatar
                                :color="category.color"
                                size="48"
                                class="elevation-3 transition-swing"
                                :style="{
                                    transform: isHovering
                                        ? 'rotate(10deg) scale(1.1)'
                                        : 'none',
                                }"
                            >
                                <v-icon :icon="category.icon" color="white" />
                            </v-avatar>
                        </div>

                        <div
                            class="text-h6 font-weight-bold text-grey-darken-3"
                        >
                            {{ category.name }}
                        </div>
                        <div
                            class="text-caption text-grey-darken-1 text-truncate"
                        >
                            {{ category.tagline }}
                        </div>

                        <v-icon
                            icon="mdi-arrow-right"
                            :color="category.color"
                            class="mt-2 transition-swing"
                            :class="isHovering ? 'translate-x-2' : ''"
                        />
                    </v-card>
                </v-hover>
            </v-col>
        </v-row>

        <v-btn
            block
            color="primary"
            variant="flat"
            rounded="pill"
            class="mt-6 hidden-md-and-up"
            append-icon="mdi-arrow-right"
        >
            Toutes les catégories
        </v-btn>
    </v-sheet>
</template>

<script setup>
// Catégories du répertoire du Bénin
const categories = [
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
</script>

<style scoped>
.transition-swing {
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1) !important;
}
</style>
