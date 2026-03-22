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
                            <DetailServiceSlide
                                :id="biz?.id"
                                :media="separatedMedia?.menu"
                            />
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
                        <section v-show="isMobile">
                            <DetailContact
                                :website="biz?.website"
                                :phone="biz?.phone"
                                :whatsapp="biz?.whatsapp"
                                :locations="biz?.locations || []"
                            />
                        </section>
                        <section id="location" class="scroll-section">
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
                        <DetailContact
                            :website="biz?.website"
                            :phone="biz?.phone"
                            :whatsapp="biz?.whatsapp"
                            :locations="biz?.locations || []"
                        />
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

const route = useRoute();
const slug = route.params.slug;

const { businessWithSlots } = await useFetchSingleBiz(slug as string);

// Accès simplifié
const biz = computed<Biz | null>(() => businessWithSlots.value!);
const featuredSlots = computed<FeaturedSlot[]>(
    () => businessWithSlots.value?.featured_slots || [],
);

const { businessMedia } = await useFetchSingleMedia(biz);

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
