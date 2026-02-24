<template>
  <v-sheet class="py-8 px-4 rounded-3xl bg-grey-lighten-4">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <div class="text-h5 font-weight-bold text-grey-darken-3">Explorer par catégorie</div>
        <div class="text-body-2 text-grey mt-1">Trouvez les meilleures adresses du Bénin</div>
      </div>
      <v-btn
        variant="text"
        color="primary"
        class="hidden md:flex rounded-lg"
        append-icon="mdi-arrow-right"
      >
        Voir tout
      </v-btn>
    </div>

    <!-- Grille -->
    <v-row dense>
      <v-col
        v-for="category in visibleCategories"
        :key="category.id"
        cols="6"
        md="3"
        class="pa-3"
      >
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            :to="category.route"
            class="rounded-xl pa-4 h-40 d-flex flex-column justify-space-between transition-all duration-500 ease-out border-0"
            :class="isHovering ? 'shadow-2xl -translate-y-3 scale-[1.02]' : 'shadow-md'"
            :style="{ 
              background: `linear-gradient(135deg, ${category.bgLight}, ${category.bgDark})`
            }"
            flat
          >
            <!-- Top: Titre + Count -->
            <div>
              <div class="d-flex align-center gap-2 mb-1">
                <span 
                  class="text-h6 font-weight-bold text-grey-darken-3 transition-transform duration-300"
                  :class="isHovering ? 'translate-x-1' : ''"
                >
                  {{ category.name }}
                </span>
                <v-chip
                  size="x-small"
                  :color="category.color"
                  variant="flat"
                  class="text-white font-weight-bold transition-all duration-300"
                  :class="isHovering ? 'scale-110' : ''"
                  label
                >
                  {{ category.count }}+
                </v-chip>
              </div>
              <div 
                class="text-caption text-grey-darken-2 line-clamp-2 transition-opacity duration-300"
                :class="isHovering ? 'opacity-100' : 'opacity-80'"
              >
                {{ category.tagline }}
              </div>
            </div>

            <!-- Bottom: Flèche + Icône -->
            <div class="d-flex align-center justify-space-between">
              <v-btn
                icon="mdi-arrow-right"
                variant="flat"
                size="small"
                rounded="circle"
                :color="category.color"
                class="w-8 h-8 transition-all duration-300"
                :class="isHovering ? 'translate-x-2 bg-white/50' : ''"
              />
              
              <v-avatar
                :color="category.color"
                size="56"
                class="shadow-lg transition-all duration-500"
                :class="isHovering ? 'scale-115 rotate-6 shadow-xl' : ''"
              >
                <v-icon 
                  :icon="category.icon" 
                  color="white" 
                  size="28"
                  class="transition-transform duration-300"
                  :class="isHovering ? 'scale-110' : ''"
                />
              </v-avatar>
            </div>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>

    <!-- Mobile button -->
    <div class="d-flex justify-center mt-6 md:hidden">
      <v-btn
        color="primary"
        variant="flat"
        rounded="pill"
        append-icon="mdi-arrow-right"
        class="transition-transform duration-300 hover:scale-105"
      >
        Toutes les catégories
      </v-btn>
    </div>
  </v-sheet>
</template>

<script setup>
const props = defineProps({
  categories: {
    type: Array,
    default: () => []
  }
})

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

const visibleCategories = computed(() => {
  return isMobile.value ? props.categories.slice(0, 5) : props.categories
})
</script>