<template>
    <!-- The button that enable showing all subcategories -->
    <v-btn
        v-if="total > 6"
        variant="text"
        size="small"
        color="orange-darken-2"
        class="text-none mt-1 px-0 font-weight-bold"
        @click="
            () => {
                if (numberToDisplay === total) {
                    numberToDisplay = 6;
                    name = 'Show All';
                } else {
                    numberToDisplay = total;
                    name = 'Show Less';
                }
            }
        "
    >
        {{ name }}
    </v-btn>
</template>

<script setup lang="ts">
const props = defineProps<{
    total: number;
}>();

const numberToDisplay = defineModel<number>();
const name = ref("Tout afficher");
</script>
