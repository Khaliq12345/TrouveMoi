<!-- About the business section with description and read more button -->
<template>
  <v-container class="pa-0 py-8 px-4">
    <!-- Section title -->
    <h2 class="text-h5 font-weight-bold mb-4">About the Business</h2>

    <!-- Content wrapper -->
    <div class="about-content">
      <!-- Business description with line clamp -->
      <p class="text-body-1 text-grey-darken-3 mb-4 description-text">
        We are a group of young Italians, born and raised in different parts of Italy, 
        who came to San Francisco sharing the same passion, cooking and eating delicious food. 
        We decided to put our ideas and knowledge together to create Bottega. 
        Our mission is to reinvent our most authentic grandma...
      </p>

      <!-- Read more button -->
      <v-btn
        variant="outlined"
        color="grey-darken-3"
        class="text-none font-weight-bold rounded-lg px-6"
      >
        Read more
      </v-btn>
    </div>
    
    <v-divider class="mt-8"></v-divider>
  </v-container>
</template>

<style scoped>
/* Truncate text to 3 lines with ellipsis */
.description-text {
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}

/* Outlined button border styling */
.v-btn--variant-outlined {
  border: 1px solid rgba(0, 0, 0, 0.2) !important;
}

/* Button hover effect */
.v-btn:hover {
  background-color: rgba(0, 0, 0, 0.02) !important;
}
</style>
