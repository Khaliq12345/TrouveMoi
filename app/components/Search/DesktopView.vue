<template>
    <v-main>
        <v-sheet class="d-flex fill-height pa-0 result-container" border="md">
            <!-- THis is the drawer that contains the filter, we only show on very large screen and above -->
            <aside
                class="d-none d-lg-flex flex-column border-e fill-height"
                style="width: 450px"
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
                class="d-none d-md-flex border-s fill-height"
                style="width: 50%; min-width: 300px"
            >
                <div class="pa-4 w-100">
                    <Direction
                        :textDirections="biz?.text_directions"
                        :audioDirection="biz?.audio_direction"
                    ></Direction>
                </div>
            </aside>
        </v-sheet>
    </v-main>
</template>

<script setup lang="ts">
const biz = inject<any>("biz");
</script>

<style scoped>
/* Ensures the main content doesn't push the map out of view */
.overflow-hidden {
    overflow: hidden !important;
}
</style>
