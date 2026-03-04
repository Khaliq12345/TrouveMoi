<!-- pages/biz/[id].vue (Page principale) -->
<template>
  <v-app>
    <v-main class="bg-white">
      <v-container>
        <v-row>
          <!-- Left Content -->
          <v-col cols="12" lg="8">
            <DetailBusinessHeader />
            <DetailActionsButtons />
            <ServiceSlide />
            <DetailReviewHighlights />
            <DetailMenu />
            <DetailLocationHours />
            <DetailVibes />
            <DetailAmenities />
            <DetailReviewsList />
          </v-col>

          <!-- Right Sidebar -->
          <v-col cols="12" lg="4">
            <DetailSidebar />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <DetailFooter />
  </v-app>
</template>

<script setup>
import ServiceSlide from "~/components/Detail/ServiceSlide.vue";

// Import automatique des composants Detail* par Nuxt
definePageMeta({
  layout: false,
});
</script>

<style>
.border {
  border: 1px solid #e0e0e0 !important;
}
.border-b {
  border-bottom: 1px solid #e0e0e0 !important;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.gap-2 {
  gap: 8px;
}
.gap-3 {
  gap: 12px;
}
.gap-4 {
  gap: 16px;
}
.text-red {
  color: #ff1a1a !important;
}
</style>
