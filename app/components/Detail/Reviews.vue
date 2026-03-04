<!-- Detailed reviews section with user info, ratings, photos, and reactions -->
<template>
  <v-container class="pa-0 py-8 px-4">
    <!-- Section title -->
    <h2 class="text-h5 font-weight-bold mb-6">Recommended Reviews</h2>

    <!-- Reviews loop -->
    <div v-for="(review, i) in reviews" :key="i" class="mb-10">
      <!-- User info header -->
      <div class="d-flex align-center mb-4">
        <!-- User avatar -->
        <v-avatar size="64" class="mr-4">
          <v-img :src="review.userAvatar"></v-img>
        </v-avatar>
        <!-- User details -->
        <div>
          <div class="text-subtitle-1 font-weight-bold">
            {{ review.userName }}
          </div>
          <div class="text-caption text-grey-darken-1">
            {{ review.userLocation }}
          </div>
          <!-- User stats (friends, reviews, photos) -->
          <div class="d-flex align-center mt-1">
            <v-icon size="14" color="grey" class="mr-1">mdi-account-group</v-icon>
            <span class="text-caption mr-3">{{ review.friends }}</span>
            <v-icon size="14" color="grey" class="mr-1">mdi-star-outline</v-icon>
            <span class="text-caption mr-3">{{ review.reviewCount }}</span>
            <v-icon size="14" color="grey" class="mr-1">mdi-camera-outline</v-icon>
            <span class="text-caption">{{ review.photoCount }}</span>
          </div>
        </div>
        <v-spacer></v-spacer>
        <!-- More options button -->
        <v-btn icon="mdi-dots-horizontal" variant="text" color="grey"></v-btn>
      </div>

      <!-- Rating and date -->
      <div class="d-flex align-center mb-3">
        <v-rating
          :model-value="review.rating"
          color="red-darken-1"
          density="compact"
          readonly
          size="small"
        ></v-rating>
        <span class="text-caption text-grey-darken-1 ml-3">{{ review.date }}</span>
      </div>

      <!-- Review text -->
      <p class="text-body-1 text-grey-darken-4 mb-4 lh-relaxed">
        {{ review.comment }}
      </p>

      <!-- Review images (if any) -->
      <div v-if="review.images && review.images.length > 0" class="mb-4">
        <!-- Single image -->
        <v-img
          v-if="review.images.length === 1"
          :src="review.images[0]"
          width="400"
          max-height="300"
          cover
          class="rounded-lg shadow-sm"
        >
          <div class="position-absolute bottom-0 left-0 pa-2 text-white text-caption bg-black-alpha-blur w-100">
            good
          </div>
        </v-img>

        <!-- Multiple images -->
        <div v-else class="d-flex flex-wrap gap-3">
          <v-img
            v-for="(img, idx) in review.images"
            :key="idx"
            :src="img"
            width="200"
            height="150"
            cover
            class="rounded-lg shadow-sm flex-grow-0"
          ></v-img>
        </div>
      </div>

      <!-- Reaction buttons -->
      <div class="d-flex flex-wrap align-center gap-4 mt-4">
        <v-btn
          variant="outlined"
          rounded="pill"
          size="small"
          class="text-none grey-border"
          prepend-icon="mdi-lightbulb-outline"
        >
          Helpful
          <span class="ml-1 text-grey">{{ review.reactions.helpful }}</span>
        </v-btn>
        <v-btn
          variant="outlined"
          rounded="pill"
          size="small"
          class="text-none grey-border"
          prepend-icon="mdi-hand-okay"
        >
          Thanks
          <span class="ml-1 text-grey">{{ review.reactions.thanks }}</span>
        </v-btn>
        <v-btn
          variant="outlined"
          rounded="pill"
          size="small"
          class="text-none grey-border"
          prepend-icon="mdi-heart-outline"
        >
          Love this
          <span class="ml-1 text-grey">{{ review.reactions.love }}</span>
        </v-btn>
        <v-btn
          variant="outlined"
          rounded="pill"
          size="small"
          class="text-none grey-border"
          prepend-icon="mdi-emoticon-cry-outline"
        >
          Oh no <span class="ml-1 text-grey">{{ review.reactions.ohno }}</span>
        </v-btn>
      </div>

      <v-divider class="mt-8"></v-divider>
    </div>
  </v-container>
</template>

<script setup>
// Sample reviews data
const reviews = [
  {
    userName: "Emily B.",
    userAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    userLocation: "San Fernando Valley, CA",
    friends: 0,
    reviewCount: 1,
    photoCount: 1,
    rating: 5,
    date: "Jan 20, 2026",
    comment: "Really cute Italian place. I only stopped in for drinks this time, but I'm definitely coming back for a proper dinner. The pasta dishes looked amazing. The espresso martini was solid, and the staff was genuinely super friendly.",
    images: ["https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500"],
    reactions: { helpful: 1, thanks: 0, love: 0, ohno: 0 },
  },
  {
    userName: "Anh T.",
    userAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    userLocation: "San Francisco, CA",
    friends: 12,
    reviewCount: 45,
    photoCount: 10,
    rating: 5,
    date: "Feb 12, 2026",
    comment: "I recently visited Bottega in SF with a few friends, and there were quite a few standout dishes. The vodka pink pasta with chicken was creamy, flavorful, and perfectly cooked. The waiter recommended the coda alla vaccinara to us. Great spot for classic Italian dishes!",
    images: [
      "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400",
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400",
      "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=400",
    ],
    reactions: { helpful: 0, thanks: 0, love: 0, ohno: 0 },
  },
];
</script>

<style scoped>
/* Relaxed line height for readability */
.lh-relaxed {
  line-height: 1.6;
}

/* Gap utilities */
.gap-3 {
  gap: 12px;
}
.gap-4 {
  gap: 16px;
}

/* Button border styling */
.grey-border {
  border: 1px solid rgba(0, 0, 0, 0.12) !important;
}

/* Image overlay background */
.bg-black-alpha-blur {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
}

/* Image shadow */
.shadow-sm {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
