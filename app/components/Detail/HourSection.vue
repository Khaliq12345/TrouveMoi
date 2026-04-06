<template>
    <v-sheet class="px-2" color="transparent">
        <div class="rounded-xl pa-2">
            <v-list density="compact" class="bg-transparent">
                <v-list-item
                    v-for="day in formattedHours"
                    :key="day.name"
                    :title="day.name"
                    :subtitle="day.time"
                    :base-color="day.isToday ? 'primary' : undefined"
                    class="rounded-lg"
                >
                    <template #append v-if="day.isToday">
                        <v-chip
                            size="x-small"
                            color="primary"
                            variant="flat"
                            class="font-weight-bold"
                        >
                            TODAY
                        </v-chip>
                    </template>
                </v-list-item>
            </v-list>
        </div>
    </v-sheet>
</template>

<script setup lang="ts">
const props = defineProps<{ hours?: any[] }>();

const formattedHours = computed(() => {
    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];
    const todayName = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
    }).format(new Date());
    const rawData = props.hours?.[0] || {};

    return days.map((day) => {
        const schedule = rawData[day.toLowerCase()];
        return {
            name: day,
            time:
                schedule?.open && schedule?.close
                    ? `${schedule.open} - ${schedule.close}`
                    : "Closed",
            isToday: day === todayName,
        };
    });
});
</script>
