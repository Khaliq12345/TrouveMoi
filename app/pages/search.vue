<template>
    <!-- Main layout container -->
    <v-layout class="flex-column fill-height">
        <!-- Top navigation bar -->
        <AppBar
            style="position: fixed; top: 0; left: 0; right: 0; z-index: 1000"
        />

        <!-- Mobile view (map/video toggle) -->
        <SearchMobileView v-show="isMobile" />

        <!-- Desktop view (filters + results + map) -->
        <SearchDesktopView v-show="!isMobile" />
    </v-layout>
    <!-- A navigation drawer to show filters only on desktop screen -->
    <v-navigation-drawer
        v-if="!isMobile"
        v-model="Showdrawer"
        temporary
        width="320"
        location="left"
        class="fill-height z-50"
        elevation="10"
        style="top: 0; height: 100vh; position: fixed"
    >
        <SearchFilter />
    </v-navigation-drawer>
    <!-- Le v-layout doit fermer APRÈS le drawer -->
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();

// UI state management
const Showdrawer = ref(false); // Desktop filter drawer visibility

// Inject mobile state from parent
const isMobile = inject("isMobile");

const { businesses, page, limit, error, pending, refresh } =
    await useFetchBiz();

// 4. Check for errors in your template or script
if (error.value) {
    console.log("AsyncData Error details:", error.value);
}

provide("businesses-data", {
    businesses,
    error,
    pending,
    refresh,
    page,
    limit,
});
provide("showDrawer", Showdrawer);

// Defaults to <<cafe>> before the page loads the dom if there's no filter
onBeforeMount(() => {
    if (Object.keys(route.query).length > 0) {
        console.log("There is some query", Object.keys(route.query).length);
    } else {
        console.log("No query");
        router.push({
            query: {
                categories: "cafe",
            },
        });
    }
});
</script>
