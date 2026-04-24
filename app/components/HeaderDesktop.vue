<template>
  <v-app-bar
    flat
    color="transparent"
    height="70"
    extension-height="50"
    class="glass-primary text-white"
  >
    <v-container class="d-flex align-center fill-height px-4">
      <NuxtLink class="font-weight-bold text-h5 flex-grow-0" to="/">
        Trouve-moi
      </NuxtLink>

      <v-spacer />

      <v-sheet
        color="transparent"
        class="d-flex ga-2 align-center mx-auto cursor-pointer"
        width="100%"
        max-width="600"
        @click="openSearch = true"
      >
        <v-text-field
          readonly
          class="search-input"
          placeholder="Quoi chercher ?"
          variant="solo"
          hide-details
          density="compact"
          rounded="s-lg"
          prepend-inner-icon="mdi-magnify"
        />

        <v-text-field
          readonly
          class="search-input"
          placeholder="Où ? (Ville, Quartier...)"
          variant="solo"
          hide-details
          density="compact"
          rounded="e-lg"
          prepend-inner-icon="mdi-map-marker"
        >
          <template v-slot:append-inner>
            <v-btn
              icon="mdi-arrow-right"
              variant="text"
              size="small"
              color="primary"
              @click.stop="openSearch = true"
            />
          </template>
        </v-text-field>
      </v-sheet>

      <SearchDialog v-model="openSearch" title="Que voulez-vous chercher ?" />

      <v-spacer />

      <div class="d-flex ga-2">
        <v-btn icon="mdi-calendar" variant="text" to="/event" />
        <v-btn icon="mdi-headphones" variant="text" to="/support" />
      </div>
    </v-container>

    <!-- This is the menu section  -->
    <template v-slot:extension>
      <v-container class="d-flex justify-center py-0">
        <ClientOnly>
          <Menu />

          <template #fallback>
            <div class="menu-loading-placeholder" style="height: 48px"></div>
          </template>
        </ClientOnly>
      </v-container>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
const openSearch = ref(false);
</script>

<style scoped>
:deep(.v-btn) {
  color: white !important;
}

:deep(.v-field__input) {
  color: rgba(0, 0, 0, 0.87) !important;
}

:deep(.v-toolbar__content),
:deep(.v-toolbar__extension) {
  background-color: transparent !important;
}

:deep(.search-input input) {
  font-size: 16px;
}
</style>
