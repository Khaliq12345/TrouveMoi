<template>
    <v-row v-if="eventsData?.length">
        <v-col
            v-for="event in eventsData || []"
            :key="event.id"
            cols="12"
            sm="6"
            lg="4"
            xl="3"
            class="pa-4"
        >
            <EventCard :event="event" />
        </v-col>
    </v-row>

    <v-empty-state
        v-else
        icon="mdi-calendar-blank"
        title="Aucun événement"
        class="py-12"
    />
</template>

<script setup lang="ts">
const { eventsData } = inject("eventContext") as any;
</script>
