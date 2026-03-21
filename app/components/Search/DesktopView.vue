<template>
    <v-main class="fill-height">
        <v-sheet class="d-flex fill-height pa-0" border="md">
            <!-- THis is the drawer that contains the filter, we only show on very large screen and above -->
            <aside
                class="d-none d-lg-flex flex-column border-e fill-height"
                style="width: 250px; min-width: 250px"
            >
                <SearchFilter />
            </aside>

            <!-- This section contains the content of the page, the biz listings, header and filters -->
            <section
                class="d-flex flex-column flex-grow-1 fill-height overflow-hidden"
            >
                <SearchHeader></SearchHeader>
                <!-- The biz listings -->
                <div class="flex-grow-1 overflow-y-auto pa-4">
                    <SearchResultList />
                </div>
            </section>

            <!-- And this is the map of the biz -->
            <aside
                class="d-none d-md-flex bg-grey-lighten-4 border-s fill-height"
                style="width: 30%; min-width: 300px"
            >
                <div class="pa-4 w-100">
                    <p class="text-overline font-weight-bold text-grey">
                        Map View
                    </p>
                </div>
            </aside>
        </v-sheet>
    </v-main>
</template>

<script setup lang="ts"></script>

<style scoped>
/* Ensures the main content doesn't push the map out of view */
.overflow-hidden {
    overflow: hidden !important;
}
</style>
