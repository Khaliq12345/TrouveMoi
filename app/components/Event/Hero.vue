<!-- components/events/HeroSection.vue -->
<template>
  <div class="hero-section position-relative overflow-hidden">
    <!-- Image fond -->
    <v-img
      :src="heroImage"
      cover
      height="100%"
      class="hero-image"
      :class="{ 'blur-active': searchFocused }"
    />

    <!-- Overlay -->
    <div class="hero-overlay" />

    <!-- Contenu -->
    <v-container class="hero-content h-100 d-flex align-center position-relative">
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6" class="text-center">
          <h1 class="text-h3 font-weight-bold text-white mb-2">
            {{ title }}
          </h1>
          <p class="text-subtitle-1 text-white text-opacity-80 mb-6">
            {{ subtitle }}
          </p>

          <!-- Search -->
          <v-text-field
            :model-value="searchQuery"
            @update:model-value="$emit('update:searchQuery', $event)"
            @focus="$emit('update:searchFocused', true)"
            @blur="$emit('update:searchFocused', false)"
            placeholder="Rechercher un événement..."
            variant="solo"
            bg-color="rgba(255,255,255,0.15)"
            hide-details
            rounded="pill"
            class="hero-search"
            :class="{ 'search-focused': searchFocused }"
          >
            <template #prepend-inner>
              <v-icon icon="mdi-magnify" color="white" />
            </template>
            <template #append-inner>
              <v-fade-transition>
                <v-icon
                  v-if="searchQuery"
                  icon="mdi-close"
                  color="white"
                  class="cursor-pointer"
                  @click="$emit('update:searchQuery', '')"
                />
              </v-fade-transition>
            </template>
          </v-text-field>

          <!-- Chips -->
          <div class="d-flex justify-center gap-2 mt-4 flex-wrap">
            <v-chip
              v-for="filter in filters"
              :key="filter.value"
              :color="activeFilter === filter.value ? 'primary' : 'white'"
              :variant="activeFilter === filter.value ? 'flat' : 'outlined'"
              class="backdrop-blur"
              @click="$emit('update:activeFilter', filter.value)"
            >
              <v-icon :icon="filter.icon" start size="16" />
              {{ filter.label }}
            </v-chip>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  subtitle: String,
  heroImage: String,
  searchQuery: String,
  searchFocused: Boolean,
  activeFilter: String,
  filters: Array
});

defineEmits([
  'update:searchQuery',
  'update:searchFocused',
  'update:activeFilter'
]);
</script>

<style scoped>
.hero-section {
  height: 400px;
}

.hero-image {
  position: absolute;
  inset: 0;
  transition: all 0.5s ease;
}

.hero-image.blur-active {
  filter: blur(20px) brightness(0.7);
  transform: scale(1.1);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(var(--v-theme-primary), 0.4),
    rgba(var(--v-theme-surface), 0.95)
  );
}

.hero-search :deep(.v-field) {
  border-radius: 50px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s;
}

.hero-search.search-focused :deep(.v-field) {
  background: rgba(255, 255, 255, 0.25) !important;
  border-color: rgba(255, 255, 255, 0.4);
}

.backdrop-blur {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1) !important;
}
</style>