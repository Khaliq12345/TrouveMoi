<!-- Amenities and features section with icons and descriptions -->
<template>
  <v-container class="pa-0 py-8 px-4">
    <!-- Section title -->
    <h2 class="text-h5 font-weight-bold mb-6">Amenities and More</h2>

    <!-- Amenities grid -->
    <v-row>
      <v-col 
        v-for="(item, i) in amenities" 
        :key="i" 
        cols="12" 
        sm="6" 
        class="py-2"
      >
        <!-- Amenity item with icon and text -->
        <div class="d-flex align-start">
          <!-- Icon -->
          <v-icon size="24" class="mr-3 mt-1 text-grey-darken-3">
            {{ item.icon }}
          </v-icon>
          
          <!-- Text content -->
          <div>
            <!-- Label with optional status -->
            <div 
              class="text-body-1 font-weight-medium text-grey-darken-4"
              :class="{ 'text-primary-dark': item.isHighlight }"
            >
              {{ item.label }}
              <span v-if="item.status" class="font-weight-bold ml-1">
                {{ item.status }}
              </span>
            </div>
            
            <!-- Subtext (optional) -->
            <div v-if="item.subtext" class="text-caption text-grey">
              {{ item.subtext }}
            </div>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- Show more button -->
    <v-btn
      variant="outlined"
      class="mt-6 text-none font-weight-bold rounded-lg px-6"
      color="grey-darken-3"
    >
      26 More Attributes
    </v-btn>
  </v-container>
</template>

<script setup lang="ts">
// Amenities list with icons and details
interface Amenity {
  label: string;
  icon: string;
  status?: string;
  subtext?: string;
  isHighlight?: boolean;
}

const amenities: Amenity[] = [
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
/* Primary blue color for highlighted items */
.text-primary-dark {
  color: #0073bb;
}

/* Button hover effect */
.v-btn--variant-outlined:hover {
  background-color: rgba(0,0,0,0.03);
}
</style>
