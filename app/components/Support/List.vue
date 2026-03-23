<template>
    <div v-if="isLoading && !tickets.length" class="text-center py-10">
        <v-progress-circular indeterminate color="primary" />
    </div>

    <template v-else>
        <v-row v-if="tickets.length > 0">
            <v-col
                v-for="ticket in tickets"
                :key="ticket.id"
                cols="12"
                sm="6"
                md="4"
            >
                <SupportCard :ticket="ticket" />
            </v-col>
        </v-row>

        <v-empty-state
            v-else
            icon="mdi-ticket-outline"
            title="Aucun signalement"
            class="py-2"
        />

        <SupportPagination v-if="tickets.length > 0" />
    </template>
</template>

<script setup lang="ts">
import type { SupportTicket } from "~/types/support";

const { tickets, isLoading } = inject('support') as {
    tickets: Ref<SupportTicket[]>;
    isLoading: Ref<boolean>;
};
</script>