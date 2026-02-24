<template>
  <v-sheet class="h-1/2 overflow-hidden bg-grey-lighten-4 relative">
    
    <!-- CONTROLES -->
    <div class="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
      <v-btn icon="mdi-chevron-up" size="small" @click="prev" />
      <v-btn icon="mdi-chevron-down" size="small" @click="next" />
    </div>

    <!-- INDICATEUR -->
    <div class="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
      <div
        v-for="(_, i) in items"
        :key="i"
        class="w-2 rounded-full transition-all duration-300"
        :class="i === activeIndex ? 'h-6 bg-black' : 'h-2 bg-black/30'"
      />
    </div>

    <!-- FEED -->
    <div
      ref="feed"
      class="h-full overflow-y-auto snap-y snap-mandatory scroll-smooth flex flex-col items-center justify-center gap-10 py-20"
      @scroll="handleScroll"
    >
      <div
        v-for="(item, index) in items"
        :key="item.id"
        class="snap-center transition-all duration-500"
        :class="index === activeIndex
          ? 'scale-100 opacity-100'
          : 'scale-90 opacity-40'"
      >
        <div
          class="relative w-[320px] sm:w-[380px] md:w-[420px] h-[70vh] rounded-3xl overflow-hidden shadow-2xl bg-black"
        >
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

          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div class="absolute bottom-0 p-6 text-white">
            <h3 class="text-xl font-bold mb-2">
              {{ item.title }}
            </h3>
            <p class="text-white/80 mb-4 line-clamp-2">
              {{ item.description }}
            </p>

            <v-btn
              color="white"
              variant="flat"
              rounded="pill"
              append-icon="mdi-arrow-right"
            >
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
  const children = feed.value.children
  const center = feed.value.scrollTop + feed.value.clientHeight / 2

  for (let i = 0; i < children.length; i++) {
    const el = children[i]
    const elCenter = el.offsetTop + el.clientHeight / 2
    if (Math.abs(center - elCenter) < el.clientHeight / 2) {
      activeIndex.value = i
      break
    }
  }
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
    { threshold: 0.7 }
  )

  videos.forEach(video => observer.observe(video))
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>