<template>
    <ClientOnly>
        <v-layout>
            <div class="w-100">
                <DetailMobileBusinessHeader v-if="isMobile" />

                <!-- Contenu -->
                <div class="position-relative">
                    <DetailActionsButtons />
                    <DetailMiniInfo />
                    <DetailToggleButtons />

                    <section id="services" class="scroll-section">
                        <DetailServiceSlide />
                    </section>
                    <section id="amenities" class="scroll-section">
                        <DetailAmenities />
                    </section>
                    <section id="location" class="scroll-section">
                        <DetailLocationHours />
                    </section>
                    <section id="vibes" class="scroll-section">
                        <DetailVibes />
                    </section>
                    <section id="reviews" class="scroll-section">
                        <ClientOnly><DetailReviews /></ClientOnly>
                    </section>
                </div>

                <BottomNav v-if="isMobile" :order="2" />
            </div>
        </v-layout>
    </ClientOnly>
</template>

<script setup lang="ts">
const isMobile = inject("isMobile");
const activeTab = ref(null);
const isScrolled = ref(false);
const stickyNav = ref(null);
const bottomNav = ref(null);
const businessTitle = ref("Nom du Business");
const tab = ref("one");

const tabs = [
    { id: "services", label: "Services" },
    { id: "amenities", label: "Infos" },
    { id: "location", label: "Plan" },
    { id: "reviews", label: "Avis" },
];
</script>
