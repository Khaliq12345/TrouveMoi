<template>
    <!-- Display the media of the buisness -->
    <v-carousel
        hide-delimiters
        show-arrows="hover"
        cycle
        :height="isMobile ? 500 : 600"
        class="carousel-wrapper"
    >
        <v-carousel-item
            v-for="(image, i) in carouselImages"
            :key="i"
            :src="image"
            cover
        />

        <div class="carousel-overlay">
            <v-container class="h-100 d-flex align-end pb-10">
                <div
                    class="carousel-content w-100 text-center text-md-left text-white"
                >
                    <!-- this show the name of the buisness -->
                    <h1
                        class="text-h4 text-md-h2 font-weight-black mb-2 title-text"
                    >
                        {{ biz?.name }}
                    </h1>

                    <!-- Buisness Details -->
                    <BuisnessCardDetails></BuisnessCardDetails>

                    <!-- This are the action buttons -->
                    <DetailBuisnessCardFooter></DetailBuisnessCardFooter>
                </div>
            </v-container>
        </div>
    </v-carousel>
</template>

<script setup lang="ts">
import type { Biz, GroupedBizMeta } from "~/types/biz";
import BuisnessCardDetails from "./BuisnessCardDetails.vue";

const biz = inject<Biz>("biz");
const isMobile = inject("isMobile");
const metas = inject<Ref<GroupedBizMeta | null>>("metas");

// Aplatit tous les BizMetaItem (tous types confondus) et construit les URLs
const carouselImages = computed<string[]>(() => {
    const grouped = metas?.value;
    if (!grouped) return [];

    return Object.values(grouped)
        .flat()
        .flatMap((item) => item.link)
        .filter(Boolean)
        .map((uuid) => imgLink(uuid));
});
</script>

<style>
.carousel-wrapper {
    position: relative;
}

.carousel-overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
    /* Default Mobile Gradient (Bottom to Top) */
    background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.9) 0%,
        rgba(0, 0, 0, 0.2) 60%,
        transparent 100%
    );
}

/* Desktop Specific Adjustments */
@media (min-width: 960px) {
    .carousel-overlay {
        /* Desktop Gradient (Left to Right) */
        background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0.8) 0%,
            rgba(0, 0, 0, 0.1) 70%,
            transparent 100%
        );
    }
}

.carousel-content {
    pointer-events: all;
}

.title-text {
    text-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

.shadow-text {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
}

.description-text {
    /* On mobile, center the max-width. On desktop, let it grow slightly. */
    margin-left: auto;
    margin-right: auto;
    max-width: 320px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
}

@media (min-width: 960px) {
    .description-text {
        margin-left: 0;
        max-width: 500px;
    }
}

.ga-3 {
    gap: 12px;
}
</style>
