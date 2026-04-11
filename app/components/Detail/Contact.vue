<template>
    <v-sheet
        variant="outlined"
        class="rounded-lg pa-4 border-subtle"
        max-width="450"
    >
        <DetailContactRow
            v-if="website"
            :value="cleanUrl(website)"
            icon="mdi-open-in-new"
            :href="website"
        />

        <DetailContactRow
            v-if="phone"
            label="Appel direct"
            :value="phone"
            icon="mdi-phone-outline"
            :href="`tel:${phone}`"
        />

        <DetailContactRow
            v-if="whatsapp"
            label="Discuter sur WhatsApp"
            :value="whatsapp"
            icon="mdi-whatsapp"
            :href="`https://wa.me/${whatsapp.replace(/\D/g, '')}`"
        />

        <DetailContactRow
            v-for="loc in locations"
            :key="loc.id"
            label="Itinéraire"
            :value="loc"
            icon="mdi-directions-outline"
        />
    </v-sheet>
</template>

<script setup lang="ts">
const props = defineProps<{
    website?: string;
    phone?: string;
    locations?: any[];
    whatsapp?: string;
}>();

const cleanUrl = (url: string) =>
    url.replace(/^https?:\/\//, "").replace(/\/$/, "");
</script>

<style scoped>
.border-subtle {
    border-color: #e0e0e0 !important;
}
.border-medium {
    border-color: #d0d0d0 !important;
}
</style>
