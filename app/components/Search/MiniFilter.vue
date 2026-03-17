<!-- Horizontal scrollable filter bar with region selector and filter chips -->
<template>
  <v-sheet color="transparent" class="d-flex align-center">
    <!-- Horizontal scrolling container -->
    <v-slide-group show-arrows class="align-center">
      <!-- First group: More filters button and region selector -->
      <v-slide-group-item>
        <div class="d-flex align-center">
          <!-- Button to open full filter drawer -->
          <v-btn
            @click="emit('showDrawer')"
            rounded="pill"
            size="small"
            class="text-none mx-1 border-sm px-3"
            style="height: 32px"
            prepend-icon="mdi-filter-variant"
            color="primary"
          >
            Plus
          </v-btn>

          <!-- Region dropdown menu -->
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                variant="outlined"
                rounded="pill"
                size="small"
                class="text-none mx-1 px-3"
                style="height: 32px"
                append-icon="mdi-chevron-down"
              >
                <span class="text-caption font-weight-bold">
                  {{ select || "Region" }}
                </span>
              </v-btn>
            </template>
            <!-- Region list items -->
            <v-list density="compact">
              <v-list-item
                v-for="item in regions"
                :key="item"
                :title="item"
                @click="select = item"
              />
            </v-list>
          </v-menu>
        </div>
      </v-slide-group-item>

      <v-divider vertical class="my-auto" style="height: 20px"></v-divider>

      <!-- Second group: Single-select filter chips -->
      <v-slide-group-item>
        <v-chip-group v-model="singleFilter" mandatory class="pa-0">
          <v-chip
            v-for="i in 4"
            :key="`single-${i}`"
            :value="i"
            size="small"
            variant="outlined"
            filter
            class="mx-1 text-caption"
            selected-class="bg-primary text-white"
          >
            Filter {{ i }}
          </v-chip>
        </v-chip-group>
      </v-slide-group-item>

      <v-divider vertical class="my-auto" style="height: 20px"></v-divider>

      <!-- Third group: Multi-select filter chips -->
      <v-slide-group-item>
        <v-chip-group v-model="multiFilters" multiple class="pa-0">
          <v-chip
            v-for="i in 4"
            :key="`multi-${i}`"
            :value="i"
            size="small"
            variant="tonal"
            filter
            class="mx-1 text-caption"
            selected-class="bg-primary text-white"
          >
            Grouped {{ i }}
          </v-chip>
        </v-chip-group>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>

<script setup lang="ts">

// Component events
const emit = defineEmits(["showDrawer"]);

// Available regions for dropdown
const regions: string[] = [
  "California",
  "Colorado",
  "Florida",
  "Georgia",
  "Texas",
  "Wyoming",
];
const select = ref("Texas");

// Filter states
const singleFilter = ref(1); // Single choice filter
const multiFilters = ref([]); // Multiple choice filters
</script>

<style scoped>
/* Ensure perfect horizontal alignment */
:deep(.v-slide-group__content) {
  align-items: center !important;
}

/* Remove default padding for clean alignment */
:deep(.v-chip-group .v-slide-group__content) {
  padding: 0 !important;
}
</style>
