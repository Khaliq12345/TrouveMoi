<template>
  <v-container class="pa-0 py-8 px-4">
    <!-- Section title -->
    <h2 class="text-h5 font-weight-bold mb-6">Proposé / Sur les lieux</h2>

    <!-- Amenities grid -->
    <v-row>
      <v-col
        v-for="(slot, i) in slots"
        :key="slot.id"
        cols="12"
        sm="6"
        class="py-2"
      >
        <!-- Amenity item with text only -->
        <div class="d-flex align-center">
          <!-- Text content -->
          <div>
            <!-- Feature name -->
            <div class="text-body-1 font-weight-medium text-grey-darken-4">
              {{ slot.feature }}
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { FeaturedSlot } from "~/types/bussness";
const props = defineProps<{
  id: string;
  featuredSlots: FeaturedSlot[];
}>();
const slots = props.featuredSlots;
</script>

<style scoped>
/* Primary blue color for highlighted items */
.text-primary-dark {
  color: #0073bb;
}

/* Button hover effect */
.v-btn--variant-outlined:hover {
  background-color: rgba(0, 0, 0, 0.03);
}
</style>
