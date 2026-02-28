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
defineProps({
    categories: { type: Array, default: () => [] },
});
</script>

<style scoped>
.transition-swing {
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1) !important;
}
</style>
