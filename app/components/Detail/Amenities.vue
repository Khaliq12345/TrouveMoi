<template>
  <v-container class="pa-0 py-8 px-4">
    <!-- Section title -->
    <h2 class="text-h5 font-weight-bold mb-6">Proposé / Sur les lieux</h2>

    <!-- Amenities grid -->
    <v-row>
      <v-col
        v-for="(slot, i) in featuredSlots"
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
const props = defineProps<{ 
  id: string; 
  featuredSlots: number[] 
}>();

const { $directus, $readItems } = useNuxtApp();

// Interface pour les featured slots
interface FeaturedSlot {
  id: string;
  feature: string;
  slug: string;
  categories: string | null;
}

const { data: featuredSlots } = await useAsyncData<FeaturedSlot[]>(
  "featured-slots",
  async () => {

    if (!props.featuredSlots?.length) {
      return [];
    }

    // Récupère les entrées de la table de jonction
    const junctionEntries = await $directus.request(
      $readItems("businesses_featured_slots_1", {
        filter: {
          id: {
            _in: props.featuredSlots,
          },
        },
        fields: ["featured_slots_id.*"],
      }),
    );

    // Extrait uniquement les données de featured_slots_id
    const slots = junctionEntries?.map((entry: any) => entry.featured_slots_id) || [];

    return slots;
  },
  {
    getCachedData: (key) => {
      const nuxtApp = useNuxtApp();
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  },
);
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
