<!-- Filter panel with category chips, specifications, and apply/reset buttons -->
<template>
  <!-- Main container with full height flex layout -->
  <div class="d-flex flex-column" style="height: 100%; max-height: 100vh">
    <!-- Scrollable filter options area -->
    <div class="mt-3 flex-grow-1 overflow-y-auto px-4 pt-lg-3">
      <!-- Categories section with multi-select chips -->
      <p class="text-body-2 mb-2">Categories</p>
      <v-chip-group v-model="selectedFilters" column multiple>
        <v-chip
          v-for="i in 10"
          :key="i"
          :value="`cat${i}`"
          variant="outlined"
          size="small"
          filter
          color="primary"
        >
          Catégorie {{ i }}
        </v-chip>
      </v-chip-group>

      <v-divider class="my-4" />

      <!-- Specifications section with toggle buttons -->
      <p class="text-body-2 font-weight-medium mb-2">Spécificités</p>
      <div class="d-flex flex-column ga-2">
        <v-btn
          v-for="i in 15"
          :key="i"
          @click="toggleSpec(`spec${i}`)"
          :variant="selectedFilters2.includes(`spec${i}`) ? 'flat' : 'outlined'"
          size="small"
          class="text-none justify-start"
          color="primary"
          rounded="lg"
        >
          Specification {{ i }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Inject mobile state from parent
const isMobile = inject("isMobile");

// Define component events
const emit = defineEmits(["applyFilter", "cancel"]);

// State for category filters
const selectedFilters = ref<string[]>([]);
// State for specification filters
const selectedFilters2 = ref<string[]>([]);

// Computed total count of active filters
const filterCount = computed(
  () => selectedFilters.value.length + selectedFilters2.value.length,
);

// Toggle specification filter on/off
function toggleSpec(value: string) {
  const index = selectedFilters2.value.indexOf(value);
  if (index > -1) {
    selectedFilters2.value.splice(index, 1);
  } else {
    selectedFilters2.value.push(value);
  }
}

// Clear all selected filters
function clearFilters() {
  selectedFilters.value = [];
  selectedFilters2.value = [];
}
</script>
