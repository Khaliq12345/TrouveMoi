<!-- components/Detail/DetailFooter.vue -->
<template>
  <v-footer class="bg-grey-darken-4 text-white py-8">
    <v-container>
      <v-row>
        <v-col v-for="(column, index) in footerColumns" :key="index" cols="6" md="3">
          <div class="font-weight-bold mb-3 text-body-2">{{ column.title }}</div>
          <v-list density="compact" class="bg-transparent pa-0">
            <v-list-item v-for="link in column.links" :key="link" class="px-0 py-1">
              <a href="#" class="text-decoration-none text-grey-lighten-2 text-caption">{{ link }}</a>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
      <v-divider class="my-6 bg-grey-darken-2"></v-divider>
      <div class="text-center text-caption text-grey">
        Copyright © 2004–2024 Yelp Inc. Yelp, Yelp logo, Yelp burst and related marks are registered trademarks of Yelp.
      </div>
    </v-container>
  </v-footer>
</template>

<script setup>
const footerColumns = [
  {
    title: 'About',
    links: ['About Yelp', 'Careers', 'Press', 'Investor Relations', 'Trust & Safety']
  },
  {
    title: 'Discover',
    links: ['Yelp Project Cost Guides', 'Collections', 'Talk', 'Events', 'The Local Yelp']
  },
  {
    title: 'Yelp for Business',
    links: ['Claim your Business Page', 'Advertise on Yelp', 'Yelp for Restaurant Owners']
  },
  {
    title: 'Languages',
    links: ['English', 'Spanish', 'French', 'German', 'Italian']
  }
]
</script>