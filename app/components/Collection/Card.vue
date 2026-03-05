<template>
  <v-card
    class="mx-auto bg-transparent border-none cursor-pointer position-relative overflow-hidden"
    max-width="380"
    height="420"
    elevation="0"
    rounded="xl"
    @click="$emit('click', collection)"
    style="transition: transform 0.2s ease;"
    onmouseover="this.style.transform='translateY(-6px)'"
    onmouseout="this.style.transform='translateY(0)'"
  >
    <v-img
      :src="collection.images[0]"
      cover
      class="h-100 w-100 position-absolute top-0 left-0"
    />

    <div class="position-absolute top-0 left-0 ma-4" style="z-index: 2;">
      <v-chip
        size="small"
        color="white"
        variant="flat"
        class="font-weight-bold"
      >
        {{ collection.itemCount }} ❤️
      </v-chip>
    </div>

    <div class="blur-content position-absolute bottom-0 w-100 pa-5 rounded-b-xl" style="z-index: 1;">
      <h3 class="text-h6 font-weight-bold text-white mb-1">
        {{ collection.title }}
      </h3>

      <p class="text-body-2 text-grey-lighten-2 mb-4 text-truncate-2">
        {{ collection.description }}
      </p>

      <div class="d-flex align-center">
        <v-avatar size="24" class="me-2 border-sm border-opacity-25 border-white">
          <v-img :src="collection.authorAvatar" />
        </v-avatar>
        <span class="text-caption text-grey-lighten-1">
          By {{ collection.author }}
        </span>

        <v-spacer />

        <div class="d-flex gap-1">
          <v-avatar
            v-for="(img, index) in collection.images.slice(1, 3)"
            :key="index"
            size="32"
            rounded="lg"
            class="border-sm border-opacity-50 border-white"
          >
            <v-img :src="img" cover />
          </v-avatar>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script setup>
/* Les props restent les mêmes */
defineProps({
  collection: {
    type: Object,
    required: true,
    default: () => ({
      title: '',
      description: '',
      images: [],
      itemCount: 0,
      author: '',
      authorAvatar: ''
    })
  }
})

defineEmits(['click'])
</script>

<style scoped>

.cursor-pointer {
  cursor: pointer;
}
</style>