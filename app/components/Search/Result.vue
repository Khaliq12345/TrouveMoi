<template>
    <div v-bind="$attrs">
        <v-hover v-slot:default="{ isHovering, props }">
            <v-card
                v-bind="props"
                :elevation="isHovering ? 4 : 0"
                class="mt-4 rounded-xl overflow-hidden"
                border
            >
                <div
                    :class="[
                        'd-flex w-100',
                        isMobile ? 'flex-column' : 'flex-row',
                    ]"
                >
                    <SearchCardMedia :images="images" />

                    <v-card-text class="d-flex flex-column flex-grow-1 pa-4">
                        <SearchCardHeader :business="biz" />

                        <SearchCardDetails :business="biz" />

                        <v-spacer />

                        <SearchCardFooter :business="biz" />
                    </v-card-text>
                </div>
            </v-card>
        </v-hover>
    </div>
</template>

<script setup lang="ts">
const { $directus, $readItems } = useNuxtApp();
const props = defineProps({ biz: Object });
defineOptions({
    inheritAttrs: false,
});
const isMobile = inject("isMobile");

// Fetching images
const { data: businessMedia } = await useAsyncData(
    `media-${props.biz?.id}`,
    async () => {
        if (!props.biz?.id) return [];
        return await $directus.request(
            $readItems("buisness_media", {
                filter: { extra_id: { _eq: props.biz.id } },
                fields: ["id", "type", "media_id"],
            }),
        );
    },
);

const images = computed(
    () =>
        businessMedia.value
            ?.filter((m) => m.type === "image")
            .map((img) => imgLink(img.media_id)) || [],
);
</script>

<style scoped>
.search-card {
    transition: all 0.3s ease;
}

.image-container {
    width: 240px; /* Fixed width on desktop */
}

@media (max-width: 600px) {
    .image-container {
        width: 100%;
        height: 200px;
    }
}

.text-truncate-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
