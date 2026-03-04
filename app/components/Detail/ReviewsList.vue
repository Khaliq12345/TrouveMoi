<!-- Reviews list with sorting and load more functionality -->
<template>
  <v-card flat class="pa-4 border">
    <!-- Header with sort dropdown -->
    <div class="d-flex justify-space-between align-center mb-4">
      <div class="text-h6 font-weight-bold">Recommended Reviews</div>
      <!-- Sort selector -->
      <v-select 
        v-model="sortBy" 
        :items="['Recommended', 'Newest', 'Highest Rated']" 
        variant="outlined" 
        density="compact" 
        hide-details 
        style="max-width: 150px;"
      ></v-select>
    </div>

    <!-- Reviews loop -->
    <div v-for="review in allReviews" :key="review.id" class="mb-6 pb-6 border-b">
      <!-- User info -->
      <div class="d-flex gap-3 mb-3">
        <v-avatar size="48">
          <v-img :src="review.avatar"></v-img>
        </v-avatar>
        <div class="flex-grow-1">
          <div class="d-flex justify-space-between align-start">
            <div>
              <div class="font-weight-medium">{{ review.author }}</div>
              <div class="text-caption text-grey">{{ review.location }} • {{ review.reviewCount }} reviews</div>
            </div>
            <v-btn icon="mdi-dots-horizontal" variant="text" size="small"></v-btn>
          </div>
        </div>
      </div>
      
      <!-- Rating and date -->
      <div class="d-flex align-center gap-2 mb-2">
        <v-rating :model-value="review.rating" color="amber-darken-2" readonly size="small" density="compact"></v-rating>
        <span class="text-caption text-grey">{{ review.date }}</span>
      </div>

      <!-- Review text -->
      <p class="text-body-1 mb-3">{{ review.text }}</p>

      <!-- Action buttons -->
      <div class="d-flex align-center gap-4">
        <v-btn variant="text" size="small" class="text-none">
          <v-icon start size="small">mdi-thumb-up-outline</v-icon>
          Helpful
        </v-btn>
        <v-btn variant="text" size="small" class="text-none">
          <v-icon start size="small">mdi-comment-outline</v-icon>
          Comment
        </v-btn>
      </div>
    </div>

    <!-- Load more button -->
    <v-btn variant="outlined" block class="text-none mt-4">Show more reviews</v-btn>
  </v-card>
</template>

<script setup>
// Sort state
const sortBy = ref('Recommended')

// Reviews data
const allReviews = [
  {
    id: 1,
    author: 'Jennifer L.',
    avatar: 'https://i.pravatar.cc/150?img=5',
    location: 'San Francisco, CA',
    reviewCount: 47,
    rating: 5,
    date: '3 days ago',
    text: 'This place never disappoints! The ambiance is perfect for date night...'
  },
  {
    id: 2,
    author: 'David K.',
    avatar: 'https://i.pravatar.cc/150?img=8',
    location: 'Oakland, CA',
    reviewCount: 12,
    rating: 4,
    date: '1 week ago',
    text: 'Solid Italian spot in the Mission. The pasta is clearly house-made...'
  }
]
</script>
