<!-- Fixed bottom navigation bar for mobile with settings, notifications, and profile buttons -->
<template>
    <!-- Fixed bottom container (mobile only) -->
    <div class="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <!-- Glassmorphism background wrapper -->
        <div
            class="backdrop-blur-xl bg-white/70 border-t border-white/50 shadow-2xl"
        >
            <!-- Bottom navigation with three tabs -->
            <v-bottom-navigation
                v-model="value"
                color="primary"
                grow
                class="!bg-transparent !shadow-none h-16"
            >
                <!-- Settings button -->
                <v-btn value="settings" class="flex-col gap-1">
                    <v-icon size="24">mdi-cog</v-icon>
                    <span class="text-xs">Paramètres</span>
                </v-btn>

                <!-- Notifications button -->
                <v-btn value="notifications" class="flex-col gap-1">
                    <v-icon size="24">mdi-bell</v-icon>
                    <span class="text-xs">Alertes</span>
                </v-btn>

                <!-- Profile button -->
                <v-btn value="profile" class="flex-col gap-1">
                    <v-icon size="24">mdi-account</v-icon>
                    <span class="text-xs">Profil</span>
                </v-btn>
            </v-bottom-navigation>
        </div>
    </div>
</template>

<script setup>
// Active tab state (default: settings)
const value = ref("settings");
</script>
