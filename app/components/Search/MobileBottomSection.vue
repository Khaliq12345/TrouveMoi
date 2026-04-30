<template>
    <!-- Mobile results bottom sheet -->
    <v-bottom-sheet
        v-if="isMobile"
        v-model="resultsSheet"
        scrollable
        class="w-100"
    >
        <v-card height="70vh" class="d-flex flex-column">
            <v-card-title
                class="d-flex flex-column align-start pa-2 flex-shrink-0"
            >
                <div class="d-flex align-center w-100">
                    <SearchHeader></SearchHeader>
                    <v-spacer />
                    <v-btn
                        icon="mdi-close"
                        variant="text"
                        @click="resultsSheet = false"
                    />
                </div>
                <SearchMiniFilter
                    @show-drawer="mobileFilter = true"
                    class="overflow-auto w-100"
                />
            </v-card-title>

            <v-divider class="flex-shrink-0" />

            <v-card-text class="pa-1 flex-grow-1 overflow-y-auto">
                <SearchResultList :businesses="businesses || []" />
            </v-card-text>
        </v-card>

        <!-- Mobile filter dialog -->
        <v-dialog v-if="isMobile" v-model="mobileFilter" width="auto">
            <v-card max-width="400" min-width="300">
                <SearchFilter @applyFilter="mobileFilter = false" />
            </v-card>
        </v-dialog>
    </v-bottom-sheet>
</template>

<script setup lang="ts">
const { businesses } = inject("businesses-data") as any;
const isMobile = inject("isMobile");
const resultsSheet = defineModel("resultsSheet"); // Mobile results sheet visibility
const mobileFilter = ref(false); // Mobile filter dialog visibility
</script>
