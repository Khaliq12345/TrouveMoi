<template>
    <v-container class="pa-0 py-6">
        <h2 class="text-h6 text-md-h5 font-weight-black mb-3 text-grey-darken-4">
            À propos de cette entreprise
        </h2>

        <div class="text-body-1 text-grey-darken-2 mb-4 line-clamp-3">
            {{ description }}
        </div>

        <v-btn
            variant="tonal"
            color="grey-darken-3"
            class="text-none font-weight-bold rounded-pill px-6"
            @click="showFullAbout = true"
        >
            Read more
        </v-btn>

        <DetailAboutModal
            v-model="showFullAbout"
            :title="businessName"
            :full-text="description"
        />
    </v-container>
</template>

<script setup lang="ts">
const props = defineProps<{
    description: string;
    businessName: string;
}>();

const showFullAbout = ref(false);
</script>

<style scoped>
/* Ensures text cuts off nicely with an ellipsis (...) after 3 lines */
.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
