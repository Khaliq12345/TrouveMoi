<!-- Carousel showcasing 30 zones to explore in Benin with images and descriptions -->
<template>
    <v-container>
        <!-- Header section with title and description -->
        <div class="text-center mb-4">
            <h2 class="text-h5 text-md-h4 font-weight-bold mb-2">
                30 zones à explorer au Bénin
            </h2>
            <p class="text-sm text-md-lg text-grey-darken-1 max-w-2xl mx-auto">
                Culture, nature, patrimoine, plages et sites historiques.
            </p>
        </div>

        <!-- Horizontal carousel of zone cards -->
        <v-carousel hide-delimiters show-arrows="hover" height="600">
            <v-carousel-item
                v-for="(zone, index) in explore_zone"
                :key="zone.id"
            >
                <HomeGradientCardWithImage
                    :name="zone.Name"
                    :subtitle="zone.location"
                    :description="zone.description"
                    :image_id="zone.image_id"
                    :link="'example.com'"
                />
            </v-carousel-item>
        </v-carousel>
    </v-container>
</template>

<script setup lang="ts">
interface TouristicZone {
    id: number;
    name: string;
    location: string;
    description: string;
    image: string;
}
const { $directus, $readItems } = useNuxtApp();
const { data: explore_zone } = await useAsyncData(
    "explore_zone",
    () => {
        return $directus.request($readItems("explore_zone"));
    },
    {
        getCachedData: (key) => {
            return (
                useNuxtApp().payload.data[key] || useNuxtApp().static.data[key]
            );
        },
    },
);

onMounted(() => {
    console.log(explore_zone.value);
});
</script>
