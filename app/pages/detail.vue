<template>
    <ClientOnly>
        <v-layout>
            <div class="w-100">
                <DetailMobileBusinessHeader />

                <v-container class="mx-auto" style="max-width: 1200px">
                    <v-row justify="center" align="start">
                        <!-- Left section -->
                        <v-col cols="12" md="8">
                            <DetailCustomSlideGroupButtons />
                            <v-divider
                                class="border-opacity-100"
                                color="primary ma-1"
                            ></v-divider>
                            <DetailMiniInfo />
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
                                <DetailServiceSlide />
                            </section>
                            <v-divider
                                class="border-opacity-100"
                                color="primary ma-1"
                            ></v-divider>
                            <section id="amenities" class="scroll-section">
                                <DetailAmenities />
                            </section>
                            <v-divider
                                class="border-opacity-100"
                                color="primary ma-1"
                            ></v-divider>
                            <section id="location" class="scroll-section">
                                <DetailLocationHours />
                            </section>
                            <v-divider
                                class="border-opacity-100"
                                color="primary ma-1"
                            ></v-divider>
                            <section id="vibes" class="scroll-section">
                                <DetailVibes />
                            </section>

                            <section id="reviews" class="scroll-section">
                                <DetailReviews />
                            </section>
                        </v-col>

                        <!-- Right Section -->
                        <v-col cols="12" md="4" v-if="!isMobile">
                            <DetailLocationHours />
                        </v-col>
                    </v-row>
                </v-container>

                <!-- Mobile footer -->
                <BottomNav v-if="isMobile" :order="2" />
                <!-- Desktop footer -->
                <Footer v-if="!isMobile"></Footer>
            </div>
        </v-layout>
    </ClientOnly>
</template>

<script setup lang="ts">
const isMobile = inject("isMobile");
</script>
