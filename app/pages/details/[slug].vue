<template>
  <v-layout>
    <div class="w-100">
      <DetailMobileBusinessHeader
        :bussness="bussness"
        :media="separatedMedia"
      />

      <v-container class="mx-auto" style="max-width: 1200px">
        <v-row justify="center" align="start">
          <!-- Left section -->
          <v-col cols="12" md="8">
            <DetailCustomSlideGroupButtons />
            <v-divider
              class="border-opacity-100"
              color="primary ma-1"
            ></v-divider>
            <DetailMiniInfo :bussness="bussness" />
            <v-divider
              class="border-opacity-100"
              color="primary ma-2"
            ></v-divider>
            <DetailActionsButtons />
            <v-divider
              class="border-opacity-100"
              color="primary ma-2"
            ></v-divider>
            <section id="services" class="scroll-section">
              <DetailServiceSlide
                :id="bussness?.id"
                :media="separatedMedia?.menu"
              />
            </section>
            <v-divider
              class="border-opacity-100"
              color="primary ma-1"
            ></v-divider>
            <section id="amenities" class="scroll-section">
              <DetailAmenities
                :id="bussness?.id || ''"
                :featuredSlots="bussness?.featuredslots || []"
              />
            </section>
            <v-divider
              class="border-opacity-100"
              color="primary ma-1"
            ></v-divider>
            <section id="location" class="scroll-section" v-show="isMobile">
              <DetailLocationHours :bussness="bussness" />
            </section>
            <v-divider
              class="border-opacity-100"
              color="primary ma-1"
            ></v-divider>
            <section id="vibes" class="scroll-section">
              <DetailVibes :media="separatedMedia" />
            </section>

            <section id="reviews" class="scroll-section">
              <DetailReviews :id="bussness?.id" />
            </section>
          </v-col>

          <!-- Right Section -->
          <v-col cols="12" md="4" v-if="!isMobile">
            <DetailLocationHours :bussness="bussness" />
          </v-col>
        </v-row>
      </v-container>

      <!-- Mobile footer -->
      <BottomNav v-if="isMobile" :order="2" />
      <!-- Desktop footer -->
      <Footer v-if="!isMobile"></Footer>
    </div>
  </v-layout>
</template>

<script setup lang="ts">
// Si le dossier types est à la racine de ton projet
import type { Business, BusinessMedia, GroupedBusinessMedia } from "~/types/bussness";

const config = useRuntimeConfig();
const isMobile = inject("isMobile");
const { $directus, $readItems } = useNuxtApp();

const route = useRoute();
const slug = computed(() => route.params.slug as string);

const { data: results } = await useAsyncData<Business[]>(
  "businesses",
  async () => {
    // On envoie l'objet query qui contient maintenant 'filter' ET potentiellement 'search'
    return $directus.request($readItems("businesses", { search: slug.value }));
  },
  {
    getCachedData: (key) => {
      const nuxtApp = useNuxtApp();
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  },
);

const bussness = ref<Business>(results.value?.[0]);

// Récupération des médias liés
const { data: businessMedia } = await useAsyncData<BusinessMedia>(
  `media-${bussness.value?.id}`,
  () => {
    if (!bussness.value?.id) return [];

    return $directus.request(
      $readItems("buisness_media", {
        // Attention à l'orthographe 'buisness' vue sur ton screen
        filter: {
          extra_id: {
            _eq: bussness.value.id,
          },
        },
      }),
    );
  },
  {
    getCachedData: (key) => {
      const nuxtApp = useNuxtApp();
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  },
);

const separatedMedia = computed<GroupedBusinessMedia>(() => {
  if (!businessMedia.value) return {};

  return businessMedia.value.reduce((acc, media) => {
    // Construction de l'URL Directus pour chaque fichier
    const link = `${config.public.directusUrl}assets/${media.media_id}?access_token=${config.public.staticTokenPublic}`;

    // On enrichit le média avec son lien
    const mediaWithLink = {
      ...media,
      link: link,
    };

    // On itère sur chaque tag du média
    media.tags?.forEach((tag) => {
      if (!acc[tag]) {
        acc[tag] = [];
      }
      acc[tag].push(mediaWithLink);
    });

    return acc;
  }, {});
});
</script>
