<template>
  <!-- This shows the rating of the buisness -->
  <div class="d-flex align-center justify-center justify-md-start mb-3">
    <v-rating
      :model-value="biz?.rating"
      color="amber-darken-2"
      density="compact"
      size="small"
      half-increments
      readonly
    />
    <!-- The review -->
    <span class="ms-2 text-subtitle-2 font-weight-bold shadow-text">
      {{ biz?.rating }} ({{ biz?.reviews_count }} Reviews)
    </span>
  </div>

  <!-- This show the business type, subcategories and open hours -->
  <p class="text-subtitle-1 font-weight-medium mb-2 shadow-text">
    {{ "₣".repeat(biz?.price_range || 0) }}
    <span v-if="biz?.subcategories?.length">
      •
      {{ biz?.subcategories.map((sub: any) => sub.name).join(" • ") }}
    </span>
    • {{ biz?.is_open ? "Ouvert" : "Fermé" }}
  </p>

  <!-- Short description of the buisness -->
  <p class="text-body-2 text-md-body-1 mb-6 description-text">
    {{
      biz?.description?.length > 100
        ? biz.description.substring(0, 100) + "..."
        : biz?.description
    }}
  </p>
</template>

<script setup lang="ts">
import type { Biz } from "~/types/biz";

const biz = inject<Biz>("biz");
</script>
