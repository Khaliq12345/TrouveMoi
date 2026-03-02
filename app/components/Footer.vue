<!-- Footer with navigation links and copyright information -->
<template>
    <!-- Footer container with centered content -->
    <v-footer
        class="d-flex align-center justify-center ga-2 flex-wrap flex-grow-1 py-3"
        color="surface-light"
    >
        <!-- Navigation link buttons -->
        <v-btn
            v-for="link in links"
            :key="link"
            :text="link"
            variant="text"
            rounded
        ></v-btn>

        <!-- Copyright text -->
        <div class="flex-1-0-100 text-center mt-2">
            {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </div>
    </v-footer>
</template>

<script setup>
// Footer navigation links
const links = ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"];
</script>
