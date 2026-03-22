<template>
    <div
        class="d-flex align-center justify-space-between py-3 border-b cursor-pointer hover-effect"
        @click="openLink"
    >
        <div class="pe-4 overflow-hidden">
            <div
                v-if="label"
                class="text-caption font-weight-bold text-primary mb-n1"
            >
                {{ label }}
            </div>
            <div class="text-body-1 text-grey-darken-3 text-truncate">
                {{ value }}
            </div>
        </div>

        <v-icon :icon="icon" color="grey-darken-1" size="20" />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    label?: string;
    value: string;
    icon: string;
    href: string;
}>();

const openLink = () => {
    if (props.href) window.open(props.href, "_blank");
};
</script>

<style scoped>
.border-b {
    border-bottom: 1px solid #eeeeee;
}
.border-b:last-of-type {
    border-bottom: none;
}
.hover-effect:hover {
    background-color: #fcfcfc;
}
</style>
