<template>
    <div class="pa-4 d-flex flex-column flex-md-row justify-md-center ga-2">
        <v-card
            v-for="stat in allStats"
            :key="stat.value"
            elevation="0"
            border
            rounded="xl"
            @click="updateFilter(stat.value)"
            :class="[
                'w-100 w-md-auto pa-0 cursor-pointer transition-all',
                {
                    'border-primary border-opacity-100':
                        activeFilter === stat.value,
                },
            ]"
            style="min-width: 160px"
            :variant="activeFilter === stat.value ? 'tonal' : 'text'"
        >
            <v-card-text class="d-flex align-center pa-2 px-3">
                <v-avatar
                    :color="stat.color"
                    variant="tonal"
                    size="32"
                    rounded="md"
                    class="me-3 flex-shrink-0"
                >
                    <v-icon :icon="stat.icon" size="16" />
                </v-avatar>

                <div class="d-flex flex-column justify-center overflow-hidden">
                    <span class="font-weight-bold text-truncate">
                        {{ stat.label }}
                        <span
                            v-if="activeFilter === stat.value"
                            class="text-caption ms-1"
                        >
                            ({{ filteredTotal }})
                        </span>
                    </span>
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>

<script setup lang="ts">
// 1. Types
type StatStatus = "all" | "live" | "upcoming" | "past";
type StatColor = "success" | "error" | "primary" | "grey";

interface EventStat {
    label: string;
    value: StatStatus;
    icon: string;
    color: StatColor;
}

// 2. Router Setup
const router = useRouter();
const route = useRoute();

// 3. Inject Context
const { filteredTotal } = inject("eventContext") as {
    filteredTotal: Ref<number>;
};

// 4. Reactive State synced with URL
// This ensures 'activeFilter' always reflects the current URL ?status=...
const activeFilter = computed(
    () => (route.query.status as StatStatus) || "all",
);

// 5. Navigation Logic
const updateFilter = (status: StatStatus) => {
    router.push({
        query: {
            ...route.query, // Keep other queries if they exist
            status: status === "all" ? undefined : status, // Clean URL: remove param if "all"
            page: 1,
        },
    });
};

const allStats: EventStat[] = [
    { label: "Tous", value: "all", icon: "mdi-view-grid", color: "success" },
    {
        label: "En cours",
        value: "live",
        icon: "mdi-access-point",
        color: "error",
    },
    {
        label: "À venir",
        value: "upcoming",
        icon: "mdi-calendar-clock",
        color: "primary",
    },
    { label: "Passés", value: "past", icon: "mdi-history", color: "grey" },
];
</script>
