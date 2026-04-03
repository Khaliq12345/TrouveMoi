<template>
    <v-layout>
        <div class="w-100">
            <DetailMobileBusinessHeader />

            <v-container class="mx-auto" style="max-width: 1200px">
                <v-row justify="center" align="start">
                    <!-- Left section -->
                    <v-col cols="12" md="8">
                        <DetailCustomSlideGroupButtons />

                        <CustomDivider></CustomDivider>
                        <DetailMiniInfo />

                        <DetailActionsButtons />

                        <section
                            id="services"
                            class="scroll-section"
                            v-if="metas?.service?.length || 0 > 0"
                        >
                            <CustomDivider></CustomDivider>
                            <DetailVibesServices
                                title="Nos Services ?"
                                subtitle="Explorez nos services"
                                type="service"
                            />
                        </section>

                        <section
                            id="menu"
                            class="scroll-section"
                            v-if="metas?.menu?.length || 0 > 0"
                        >
                            <CustomDivider></CustomDivider>
                            <DetailVibesServices
                                title="Menu"
                                subtitle="Explorez nos menu"
                                type="menu"
                            />
                        </section>

                        <CustomDivider></CustomDivider>
                        <section
                            id="portfolio"
                            class="scroll-section"
                            v-if="metas?.portfolio?.length || 0 > 0"
                        >
                            <DetailVibesServices
                                title="Portfolio"
                                subtitle="Explorez nos Portfolio"
                                type="portfolio"
                            />
                        </section>

                        <CustomDivider></CustomDivider>
                        <section id="features" class="scroll-section">
                            <DetailAmenities
                                :id="biz?.id || ''"
                                :featuredSlots="featuredSlots || []"
                            />
                        </section>

                        <CustomDivider></CustomDivider>
                        <section id="about" class="scroll-section">
                            <DetailAbout
                                :description="biz?.description as string"
                                :businessName="biz?.name as string"
                            ></DetailAbout>
                        </section>

                        <CustomDivider></CustomDivider>
                        <section v-show="isMobile" id="contact" class="pa-5">
                            <DetailContact
                                :website="biz?.website"
                                :phone="biz?.phone"
                                :whatsapp="biz?.whatsapp"
                                :locations="biz?.locations || []"
                            />
                        </section>

                        <CustomDivider></CustomDivider>
                        <section id="location" class="scroll-section">
                            <DetailLocationHours :biz="biz" />
                        </section>

                        <CustomDivider></CustomDivider>
                        <section id="vibes" class="scroll-section">
                            <DetailVibesServices
                                title="C'est Quoi L'Ambiance ?"
                                subtitle="Explorez l'atmosphere a travers nos galeries"
                                type="vibes"
                            />
                        </section>

                        <CustomDivider></CustomDivider>
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
import type { Biz, FeaturedSlot } from "~/types/biz";

const isMobile = inject("isMobile");

const route = useRoute();
const slug = route.params.slug;

const { businessWithSlots } = await useFetchSingleBiz(slug as string);

// Accès simplifié
const biz = computed<Biz | null>(() => businessWithSlots.value!);
const featuredSlots = computed<FeaturedSlot[]>(
    () => businessWithSlots.value?.featured_slots || [],
);

const { data: metas } = biz?.value?.id
    ? useBusinessMeta(biz.value.id)
    : { data: ref(null) };

//Share some data
provide("biz", biz);
provide("metas", metas);
</script>
