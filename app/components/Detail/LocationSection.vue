<template>
    <v-img :src="mapUrl" height="240" cover class="bg-grey-lighten-2">
        <template #placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey-lighten-1" />
            </v-row>
        </template>
    </v-img>
</template>

<script setup lang="ts">
const props = defineProps<{ locations?: any[] }>();

const mapUrl = computed(() => {
    const main = props.locations?.[0];
    if (!main) return "";
    const coords = `${main.latitude},${main.longitude}`;
    // Added a marker to the URL so the location is actually visible on the map
    return `https://maps.googleapis.com/maps/api/staticmap?center=${coords}&zoom=14&size=600x300&markers=color:red%7C${coords}&key=YOUR_API_KEY`;
});
</script>
