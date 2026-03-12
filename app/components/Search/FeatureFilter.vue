<template>
  <v-list-item class="px-4">
    <v-list-item-subtitle> Équipements & Services </v-list-item-subtitle>

    <!-- The list of all features with a multiple type checkbox -->
    <div>
      <v-checkbox
        v-for="feature in featured_slots?.slice(0, numberToDisplay)"
        :key="feature.id"
        v-model="selectedFeatures"
        :value="feature.slug"
        hide-details
        density="compact"
        color="orange-darken-2"
        class="ma-0 pa-0 bg-transparent"
        @update:model-value="updateURL('featured_slots', selectedFeatures)"
      >
        <template #label>
          <div class="d-flex align-center">
            <!-- <v-icon size="small" class="me-3" color="grey-darken-4"> -->
            <!-- {{ feature.icon }} -->
            <!-- </v-icon> -->
            <span class="text-body-2 text-grey-darken-4 font-weight-medium">
              {{ feature.feature }}
            </span>
          </div>
        </template>
      </v-checkbox>
    </div>
    <!-- This is the button that controls the show more logic -->
    <show-all-button
      :total="featured_slots?.length || 0"
      v-model="numberToDisplay"
    ></show-all-button>
  </v-list-item>
</template>

<script setup lang="ts">
const { $directus, $readItems } = useNuxtApp();

const { data: featured_slots } = await useAsyncData(
  "featured_slots",
  () => {
    return $directus.request($readItems("featured_slots"));
  },
  {
    getCachedData: (key) => {
      return useNuxtApp().payload.data[key] || useNuxtApp().static.data[key];
    },
  },
);

const { updateURL, getURLFilter } = useFilterURL();

const selectedFeatures = ref<string[]>(getURLFilter("featured_slots") as string[]);
const numberToDisplay = ref(6);
</script>
