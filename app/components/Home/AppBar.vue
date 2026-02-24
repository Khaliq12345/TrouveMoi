<template>
  <div 
    class="w-full bg-cover bg-center bg-no-repeat"
    :class="isMobile ? 'min-h-[200px] pb-6' : 'min-h-[120px]'"
    style="background-image: url('/homebg.jpg')"
  >
    <v-app-bar 
      flat
      color="transparent"
      :density="isMobile ? 'default' : 'comfortable'"
      class="!bg-transparent !shadow-none"
    >
      <!-- Titre desktop -->
      <v-app-bar-title class="hidden md:flex text-white font-weight-bold text-h5 drop-shadow-md">
        Trouve-moi
      </v-app-bar-title>

      <v-spacer class="hidden md:block" />

      <!-- Barre de recherche avec glassmorphism -->
      <div 
        class="w-full px-4 md:w-[500px] md:px-0"
      >
        <div class="backdrop-blur-md bg-white/20 rounded-xl border border-white/30 shadow-lg overflow-hidden">
          <v-text-field
            v-model="search"
            placeholder="Rechercher..."
            variant="plain"
            hide-details
            density="comfortable"
            class="text-white placeholder-white"
            bg-color="transparent"
          >
            <template #prepend-inner>
              <v-icon icon="mdi-magnify" color="white" class="opacity-80" />
            </template>
            <template #append-inner>
              <v-btn
                icon="mdi-arrow-right"
                variant="flat"
                size="small"
                color="white"
                class="opacity-90 hover:opacity-100"
              />
            </template>
          </v-text-field>
        </div>
      </div>

      <v-spacer class="hidden md:block" />

      <!-- Boutons desktop -->
      <div class="backrop-blur-md hidden md:flex gap-2">
        <v-btn icon="mdi-cog" color="white" variant="text" class="drop-shadow-md" />
        <v-btn icon="mdi-bell" color="white" variant="text" class="drop-shadow-md" />
        <v-btn icon="mdi-account" color="white" variant="text" class="drop-shadow-md" />
      </div>
    </v-app-bar>
  </div>
</template>

<script setup>
const search = defineModel()

const isMobile = ref(false)

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>