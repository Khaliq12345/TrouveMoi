<template>
  <v-layout>
    <div class="w-100">
      <DetailMobileBusinessHeader :biz="biz" :media="separatedMedia" />

      <v-container class="mx-auto" style="max-width: 1200px">
        <v-row justify="center" align="start">
          <!-- Left section -->
          <v-col cols="12" md="8">
            <DetailCustomSlideGroupButtons />
            <v-divider
              class="border-opacity-100"
              color="primary ma-1"
            ></v-divider>
            <DetailMiniInfo :biz="biz" />
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
              <DetailServiceSlide :id="biz?.id" :media="separatedMedia?.menu" />
            </section>
            <v-divider
              class="border-opacity-100"
              color="primary ma-1"
            ></v-divider>
            <section id="amenities" class="scroll-section">
              <DetailAmenities
                :id="biz?.id || ''"
                :featuredSlots="featuredSlots || []"
              />
            </section>
            <v-divider
              class="border-opacity-100"
              color="primary ma-1"
            ></v-divider>
            <section id="location" class="scroll-section" v-show="isMobile">
              <DetailLocationHours :biz="biz" />
            </section>
            <v-divider
              class="border-opacity-100"
              color="primary ma-1"
            ></v-divider>
            <section id="vibes" class="scroll-section">
              <DetailVibes :media="separatedMedia" />
            </section>

            <section id="reviews" class="scroll-section">
              <DetailReviews :id="biz?.id" />
            </section>
          </v-col>

          <!-- Right Section -->
          <v-col cols="12" md="4" v-if="!isMobile">
            <DetailLocationHours :biz="biz" />
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
import type { Biz, BizMedia, GroupedBizMedia, FeaturedSlot } from "~/types/biz";

const config = useRuntimeConfig();
const isMobile = inject("isMobile");
const { $directus, $readItems } = useNuxtApp();

const route = useRoute();
const slug = route.params.slug;

const { data: businessWithSlots, error: bizerr } = await useAsyncData<Biz | null>(
  `business-${slug}`,
  async (): Promise<Biz | null> => {
    // Requête unique qui récupère le business ET ses featured slots liés
    const results = await $directus.request(
      $readItems("businesses", {
        filter: {
          slug: { _eq: slug },
        },
        fields: [
          "*", // Tous les champs du business
          "featuredslots.featured_slots_id.*", // Récupère les featured slots via la relation
        ],
      }),
    );

    if (!results?.length) return null;

    const business = results[0] as Biz;

    // Transforme les données de la relation pour extraire les featured slots
    const featuredSlots =
      business?.featuredslots?.map(
        (junction: any) => junction.featured_slots_id,
      ) || [];

    return {
      ...business,
      featured_slots: featuredSlots, // Ajoute les slots plats
    };
  },
  {
    getCachedData: (key) => {
      const nuxtApp = useNuxtApp();
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  },
);

console.log("While getting busineses on detail page", bizerr.value)

// Accès simplifié
const biz = computed<Biz | null>(() => businessWithSlots.value!);
const featuredSlots = computed<FeaturedSlot[]>(
  () => businessWithSlots.value?.featured_slots || [],
);

const { data: businessMedia, error } = await useAsyncData<BizMedia[]>(
  `media-${biz.value?.id}`,
  async (): Promise<BizMedia[]> => {
    if (!biz.value?.id) return [];

    const results = await $directus.request(
      $readItems("buisness_media", {
        filter: {
          extra_id: {
            _eq: biz.value.id,
          },
        },
      }),
    );

    return results as BizMedia[];
  },
  {
    getCachedData: (key) => {
      const nuxtApp = useNuxtApp();
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  },
);

console.log("While getting busineses media on detail page", error.value);

// Chaque type de media separé par leur tags, retourn { tag: [...], ... }
const separatedMedia = computed<GroupedBizMedia>(() => {
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
  }, {} as GroupedBizMedia);
});
</script>
