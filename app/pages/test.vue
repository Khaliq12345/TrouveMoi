<template>
    <v-infinite-scroll @load="load">
        <template v-for="(item, index) in items" :key="item">
            <div :class="['pa-2', index % 2 === 0 ? 'bg-grey-lighten-2' : '']">
                Item number #{{ item }}
            </div>
        </template>

        <!-- Loading indicator -->
        <template v-slot:loading>
            <div class="d-flex justify-center pa-4">
                <v-progress-circular indeterminate color="primary" />
            </div>
        </template>

        <!-- Empty state message -->
        <template v-slot:empty>
            <v-alert type="info" variant="tonal" class="ma-2">
                Plus de résultats disponibles
            </v-alert>
        </template>
    </v-infinite-scroll>
</template>

<script setup>
import { ref } from "vue";

const items = ref(Array.from({ length: 30 }, (k, v) => v + 1));

async function api() {
    const res = [];
    return res;
}
async function load({ done }) {
    // Utilise .value pour obtenir la longueur du tableau
    const oldResCount = items.value.length;

    const res = await api();

    // Si l'API ne renvoie rien, on arrête tout de suite
    if (!res || res.length === 0) {
        done("empty");
        return; // Important pour ne pas exécuter le done("ok") plus bas
    }

    items.value.push(...res);

    // Si on a ajouté des éléments, on continue
    done("ok");
}
</script>
