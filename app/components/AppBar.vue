<!-- Top navigation bar with background image, search field, and action buttons -->
<template>
  <v-app-bar
    flat
    color="transparent"
    height="70"
    extension-height="50"
    style="backdrop-filter: blur(4px)"
    :class="`px-4 blue-content text-${color}`"
  >
    <h1 class="font-weight-bold text-h5 flex-grow-0" v-if="!isMobile">
      Trouve-moi
    </h1>

    <v-spacer />

    <div style="width: 100%; max-width: 500px">
      <v-text-field
        v-model="searchQuery"
        placeholder="Rechercher un lieu, une ville..."
        variant="solo"
        hide-details
        density="compact"
        rounded="lg"
        prepend-inner-icon="mdi-magnify"
        append-inner-icon="mdi-arrow-right"
        @keyup.enter="onEnterPressed"
      />
    </div>

    <v-spacer />

    <div class="d-flex ga-2" v-if="!isMobile">
      <v-btn icon="mdi-cog" variant="text" />
      <v-btn icon="mdi-bell" variant="text" />
      <v-btn icon="mdi-account" variant="text" />
    </div>

    <template v-slot:extension>
      <div class="w-100 d-flex justify-center pb-2">
        <SearchMenu />
      </div>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
const props = defineProps({
  color: {
    type: String,
    default: "dark",
  },
});

const { updateURL } = useFilterURL();

const router = useRouter();
const route = useRoute();

const searchQuery = ref("");
const isMobile = inject("isMobile");

function onEnterPressed() {
  const value = searchQuery.value.trim()

  const searchArray = [value]

  if (route.path !== "/search") {
    router.push({
      path: "/search",
      query: {
        ...route.query,
        search: value
      }
    })
  } else {
    updateURL("search", searchArray)
  }
}
</script>
