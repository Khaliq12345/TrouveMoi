<template>
    <v-list :items="addressItems" item-props lines="two" class="pa-0" />
</template>

<script setup lang="ts">
const props = defineProps<{ locations?: any[] }>();

const addressItems = computed(() => {
    return (
        props.locations?.map((loc) => ({
            title: loc.address,
            subtitle: loc.city,
            prependIcon: "mdi-map-marker",
            props: {
                titleClass: "font-weight-bold text-primary",
                href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address)}`,
                target: "_blank",
                class: "border-b",
            },
        })) || []
    );
});
</script>
