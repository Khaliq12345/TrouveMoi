<template>
  <div
    class="d-flex flex-column flex-sm-row align-sm-center justify-space-between pt-3 border-t mt-auto ga-3"
  >
    <div class="d-flex flex-wrap ga-2">
      <v-chip
        v-for="(slot, i) in business.featuredslots?.slice(0, 2)"
        :key="i"
        size="x-small"
        variant="tonal"
        color="secondary"
        class="font-weight-medium"
      >
        <v-icon start icon="mdi-star-outline" size="12" v-if="i === 0" />
        {{ slot.featured_slots_id.feature }}
      </v-chip>

      <span
        v-if="business.featuredslots?.length > 2"
        class="text-caption text-grey-darken-1 align-self-center"
      >
        +{{ business.featuredslots.length - 2 }}
      </span>
    </div>

    <v-btn
      v-if="business.website"
      color="primary"
      variant="elevated"
      size="small"
      class="text-none font-weight-bold rounded-lg px-4"
      append-icon="mdi-open-in-new"
      :href="business.website"
      target="_blank"
      rel="noopener noreferrer"
    >
      Visiter le site
    </v-btn>
  </div>
</template>

<script setup lang="ts">
const isMobile = inject("isMobile");

defineProps(["business"]);
</script>
