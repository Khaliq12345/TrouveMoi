<template>
  <v-sheet color="transparent" class="d-flex align-center">
    <v-slide-group
      show-arrows
      class="align-center"
    >
      <v-slide-group-item>
        <div class="d-flex align-center">
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
                  {{ select || "Région" }}
                </span>
              </v-btn>
            </template>
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

      <v-slide-group-item>
        <v-chip-group
          v-model="singleFilter"
          mandatory
          class="pa-0"
        >
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

      <v-slide-group-item>
        <v-chip-group
          v-model="multiFilters"
          multiple
          class="pa-0"
        >
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
import { ref } from 'vue';

const emit = defineEmits(["showDrawer"]);

const regions = ['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming'];
const select = ref("Texas");

// Un état pour chaque logique de sélection
const singleFilter = ref(1);        // Choix unique
const multiFilters = ref([]);       // Choix multiple
</script>

<style scoped>
/* Force l'alignement horizontal parfait au pixel près */
:deep(.v-slide-group__content) {
  align-items: center !important;
}

/* Supprime les marges par défaut des chip-groups pour un alignement propre */
:deep(.v-chip-group .v-slide-group__content) {
  padding: 0 !important;
}
</style>