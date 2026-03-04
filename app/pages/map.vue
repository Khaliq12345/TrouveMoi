<script setup lang="ts">
import { VMap } from "@geoql/v-maplibre";

const mapOptions = {
    style: "https://demotiles.maplibre.org/style.json",
    center: [-74.5, 40],
    zoom: 9,
};
</script>

<template>
    <ClientOnly>
        <div style="width: 100%; height: 500px">
            <VMap :options="mapOptions" style="width: 100%; height: 100%" />
        </div>
    </ClientOnly>
</template>
