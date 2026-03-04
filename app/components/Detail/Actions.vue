<template>
    <v-slide-group class="w-100 glass-bar" center-active show-arrows="desktop">
        <v-slide-group-item>
            <div class="d-flex align-center ga-3 px-4 fill-height">
                <v-btn
                    size="large"
                    flat
                    class="text-none font-weight-bold rounded-xl glass-btn-primary"
                >
                    <v-icon start size="20">mdi-star-outline</v-icon>
                    Write a Review
                </v-btn>
                <v-btn
                    v-for="(btn, i) in secondaryButtons"
                    :key="i"
                    size="large"
                    flat
                    class="text-none font-weight-bold rounded-xl glass-btn-secondary"
                    :icon="btn.iconOnly"
                >
                    <v-icon :start="!btn.iconOnly" size="20" color="primary">
                        {{ btn.icon }}
                    </v-icon>
                    <template v-if="!btn.iconOnly">
                        <span class="text-primary">{{ btn.text }}</span>
                    </template>
                </v-btn>
            </div>
        </v-slide-group-item>
    </v-slide-group>
</template>

<script setup lang="ts">
const secondaryButtons = [
    { text: "Add photo", icon: "mdi-camera-plus-outline" },
    { text: "Share", icon: "mdi-share-variant-outline" },
    { text: "Save", icon: "mdi-bookmark-outline" },
    { text: "", icon: "mdi-dots-horizontal", iconOnly: true },
];
</script>

<style scoped>
.glass-bar {
    background: rgba(255, 255, 255, 0.1) !important;
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border-top: 1px solid rgba(255, 255, 255, 0.3) !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
    box-shadow:
        0 -4px 24px rgba(0, 0, 0, 0.08),
        inset 0 1px 0 rgba(255, 255, 255, 0.4) !important;
}

.glass-btn-primary {
    background: rgb(var(--v-theme-primary), 0.75) !important;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgb(var(--v-theme-primary), 0.5) !important;
    box-shadow:
        0 4px 15px rgb(var(--v-theme-primary), 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.25) !important;
    color: white !important;
}

.glass-btn-primary:hover {
    background: rgb(var(--v-theme-primary), 0.9) !important;
    box-shadow:
        0 6px 20px rgb(var(--v-theme-primary), 0.45),
        inset 0 1px 0 rgba(255, 255, 255, 0.3) !important;
}

.glass-btn-secondary {
    background: rgb(var(--v-theme-primary), 0.08) !important;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgb(var(--v-theme-primary), 0.2) !important;
    box-shadow:
        0 2px 8px rgba(0, 0, 0, 0.06),
        inset 0 1px 0 rgba(255, 255, 255, 0.3) !important;
}

.glass-btn-secondary:hover {
    background: rgb(var(--v-theme-primary), 0.15) !important;
    border-color: rgb(var(--v-theme-primary), 0.35) !important;
}

:deep(.v-slide-group__content) {
    display: flex;
    align-items: center;
}

:deep(.v-slide-group__prev),
:deep(.v-slide-group__next) {
    background: rgb(var(--v-theme-primary), 0.1) !important;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgb(var(--v-theme-primary), 0.25) !important;
    color: rgb(var(--v-theme-primary)) !important;
}

.ga-3 {
    gap: 12px;
}
</style>
