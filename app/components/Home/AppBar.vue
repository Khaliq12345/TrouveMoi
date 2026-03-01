<template>
    <div
        class="w-full bg-cover bg-center bg-no-repeat"
        :class="isMobile ? 'min-h-[200px] pb-6' : 'min-h-[120px]'"
        style="background-image: url(&quot;/homebg.jpg&quot;)"
    >
        <v-app-bar
            flat
            color="transparent"
            :density="isMobile ? 'default' : 'comfortable'"
            class="!bg-transparent !shadow-none"
        >
            <!-- Titre desktop -->
            <v-app-bar-title
                class="hidden md:flex text-white font-weight-bold text-h5 drop-shadow-md"
            >
                Trouve-moi
            </v-app-bar-title>

            <v-spacer class="hidden md:block" />

            <Search v-model="search" />

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
    </div>
</template>

<script setup>
const search = ref();

const isMobile = false;
</script>

<style scoped>
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
