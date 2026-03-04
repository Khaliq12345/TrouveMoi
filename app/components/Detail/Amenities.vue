<template>
  <v-container class="pa-0 py-8 px-4">
    <h2 class="text-h5 font-weight-bold mb-6">Amenities and More</h2>

    <v-row>
      <v-col 
        v-for="(item, i) in amenities" 
        :key="i" 
        cols="12" 
        sm="6" 
        class="py-2"
      >
        <div class="d-flex align-start">
          <v-icon size="24" class="mr-3 mt-1 text-grey-darken-3">
            {{ item.icon }}
          </v-icon>
          
          <div>
            <div 
              class="text-body-1 font-weight-medium text-grey-darken-4"
              :class="{ 'text-primary-dark': item.isHighlight }"
            >
              {{ item.label }}
              <span v-if="item.status" class="font-weight-bold ml-1">
                {{ item.status }}
              </span>
            </div>
            
            <div v-if="item.subtext" class="text-caption text-grey">
              {{ item.subtext }}
            </div>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-btn
      variant="outlined"
      class="mt-6 text-none font-weight-bold rounded-lg px-6"
      color="grey-darken-3"
    >
      26 More Attributes
    </v-btn>
  </v-container>
</template>

<script setup>
const amenities = [
  { 
    label: 'Health Score', 
    status: 'Pass', 
    subtext: 'Powered by Health Department Intelligence',
    icon: 'mdi-plus-box-outline',
    isHighlight: true 
  },
  { label: 'Offers delivery', icon: 'mdi-moped-outline' },
  { label: 'Offers take-out', icon: 'mdi-basket-outline' },
  { label: 'Wheelchair accessible', icon: 'mdi-wheelchair-accessibility' }
];
</script>

<style scoped>
.text-primary-dark {
  color: #0073bb; /* Bleu type Yelp */
}

/* Effet au survol du bouton */
.v-btn--variant-outlined:hover {
  background-color: rgba(0,0,0,0.03);
}
</style>