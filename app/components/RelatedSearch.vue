<template>
  <v-container class="py-8">
    <h2 class="text-h6 font-weight-bold mb-6 text-grey-darken-4">
      Recherches associées à {{ cityName }}
    </h2>

    <v-row no-gutters>
      <v-col
        v-for="(item, index) in displayedItems"
        :key="index"
        cols="12" 
        md="4"
        class="pb-2"
      >
        <v-btn
          variant="text"
          density="compact"
          class="text-none justify-start px-0 text-body-2 font-weight-regular text-grey-darken-2 custom-wrap-btn"
          block
          :ripple="false"
        >
          {{ item }}
        </v-btn>
      </v-col>
    </v-row>

    <div v-if="isMobile && !showAll && allItems.length > 5" class="mt-6">
      <v-btn
        variant="outlined"
        color="primary"
        rounded="pill"
        size="small"
        class="text-none px-6"
        @click="showAll = true"
      >
        Tout voir
      </v-btn>
    </div>
  </v-container>
</template>

<script setup>
import { useDisplay } from 'vuetify'

const props = defineProps({
  cityName: {
    type: String,
    default: 'Cotonou'
  }
})

const { mobile: isMobile } = useDisplay()
const showAll = ref(false)

// Récupération des données via l'utilitaire
const allItems = computed(() => getCityRelatedSearches(props.cityName))

// Logique : Desktop = Tout / Mobile = 5 puis Tout
const displayedItems = computed(() => {
  if (!isMobile.value) return allItems.value
  return showAll.value ? allItems.value : allItems.value.slice(0, 5)
})
</script>

<style scoped>
/* Configuration pour le retour à la ligne forcé sans points de suspension */
.custom-wrap-btn {
  height: auto !important; /* Permet au bouton de s'agrandir en hauteur */
  min-height: 32px;
}

.custom-wrap-btn :deep(.v-btn__content) {
  white-space: normal !important; /* Autorise le retour à la ligne */
  text-align: left;
  line-height: 1.4;
  word-break: break-word; /* Casse les mots trop longs si nécessaire */
  padding: 4px 0;
}

.custom-wrap-btn:hover {
  text-decoration: underline !important;
  background-color: transparent !important;
  color: #1976D2 !important;
}
</style>