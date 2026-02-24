<template>
  <v-sheet class="h-[85vh] md:h-[80vh] bg-black relative overflow-hidden">
    
    <!-- Controles droite -->
    <div class="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
      <v-btn icon="mdi-chevron-up" color="white" variant="text" size="small" @click="prev" />
      <v-btn icon="mdi-chevron-down" color="white" variant="text" size="small" @click="next" />
    </div>

    <!-- Indicateur gauche -->
    <div class="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
      <div
        v-for="(_, i) in items"
        :key="i"
        class="w-1.5 rounded-full transition-all duration-300"
        :class="i === activeIndex ? 'h-8 bg-white' : 'h-1.5 bg-white/40'"
      />
    </div>

    <!-- Feed vertical -->
    <div
      ref="feed"
      class="h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth scrollbar-hide"
      @scroll="handleScroll"
    >
      <div
        v-for="(item, index) in items"
        :key="item.id"
        class="h-full w-full snap-center flex items-center justify-center py-4"
        :class="index === activeIndex ? 'opacity-100' : 'opacity-40'"
      >
        <div class="relative w-full max-w-md h-full rounded-2xl overflow-hidden shadow-2xl mx-4">
          <!-- Media -->
          <v-img
            v-if="item.type === 'image'"
            :src="item.src"
            cover
            class="w-full h-full"
          />
          <video
            v-else
            :ref="el => registerVideo(el, item.id)"
            :src="item.src"
            class="w-full h-full object-cover"
            muted
            loop
            playsinline
          />

          <!-- Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <!-- Contenu -->
          <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 class="text-2xl font-bold mb-2">{{ item.title }}</h3>
            <p class="text-white/80 mb-4 line-clamp-2">{{ item.description }}</p>
            <v-btn color="white" variant="flat" rounded="pill" append-icon="mdi-arrow-right">
              {{ item.action }}
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </v-sheet>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

defineProps({
  items: Array
})

const feed = ref(null)
const activeIndex = ref(0)
const videos = new Map()
let observer = null

function registerVideo(el, id) {
  if (el) videos.set(id, el)
}

function handleScroll() {
  if (!feed.value) return
  const scrollTop = feed.value.scrollTop
  const itemHeight = feed.value.clientHeight
  activeIndex.value = Math.round(scrollTop / itemHeight)
}

function next() {
  if (activeIndex.value < feed.value.children.length - 1) {
    feed.value.children[activeIndex.value + 1].scrollIntoView({ behavior: 'smooth' })
  }
}

function prev() {
  if (activeIndex.value > 0) {
    feed.value.children[activeIndex.value - 1].scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const video = entry.target
        entry.isIntersecting ? video.play() : video.pause()
      })
    },
    { threshold: 0.6 }
  )
  videos.forEach(video => observer.observe(video))
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>