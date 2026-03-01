<template>
    <v-app-bar
        flat
        color="transparent"
        :density="isMobile ? 'default' : 'comfortable'"
        class="!shadow-none"
        :class="
            isMobile
                ? 'w-full bg-cover bg-center bg-no-repeat relative min-h-[30px]'
                : 'w-full bg-cover bg-center bg-no-repeat relative before:absolute before:inset-0 before:bg-black/50 min-h-[60px]'
        "
        style="
            background: linear-gradient(
                to bottom,
                rgba(0, 0, 0, 0.6),
                transparent
            ) !important;
            backdrop-filter: blur(4px);
        "
    >
        <!-- Titre desktop -->
        <v-app-bar-title
            class="hidden md:flex text-white font-weight-bold text-h5 drop-shadow-md"
        >
            Trouve-moi
        </v-app-bar-title>

        <v-spacer class="hidden md:block" />

        <!-- Barre de recherche avec glassmorphism -->
        <div class="search-container absolute left-1/2 -translate-x-1/2 p-2">
            <v-text-field
                v-model="searchQuery"
                placeholder="Rechercher un lieu, une ville..."
                variant="solo"
                hide-details
                density="comfortable"
                rounded="lg"
                prepend-inner-icon="mdi-magnify"
                append-inner-icon="mdi-arrow-right"
                class="glass-search"
            />
        </div>

        <v-spacer class="hidden md:block" />

        <!-- Boutons desktop -->
        <div class="backrop-blur-md hidden md:flex gap-2">
            <v-btn
                icon="mdi-cog"
                color="white"
                variant="text"
                class="drop-shadow-md"
            />
            <v-btn
                icon="mdi-bell"
                color="white"
                variant="text"
                class="drop-shadow-md"
            />
            <v-btn
                icon="mdi-account"
                color="white"
                variant="text"
                class="drop-shadow-md"
            />
        </div>
    </v-app-bar>
</template>

<script setup lang="ts">
const searchQuery = ref("");

const isMobile = inject("isMobile");
</script>

<style scoped>
/* Real Glassmorphism effect */
.glass-search :deep(.v-field) {
    background: rgba(255, 255, 255, 0.15) !important;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white !important;
}

.glass-search :deep(input::placeholder) {
    color: rgba(255, 255, 255, 0.8) !important;
}

.search-container {
    width: 100%;
    max-width: 500px;
}

.text-shadow {
    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
}

.bg-black-30 {
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
</style>
