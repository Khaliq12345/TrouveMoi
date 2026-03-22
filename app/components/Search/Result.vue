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
const props = defineProps({ biz: Object });
defineOptions({
    inheritAttrs: false,
});
const isMobile = inject("isMobile");

// Fetching images
const { businessMedia } = await useFetchSingleMedia(ref(props.biz));

const images = computed(
    () =>
        businessMedia.value
            ?.filter((m) => m.type === "image")
            .map((img) => imgLink(img.media_id)) || [],
);
</script>
