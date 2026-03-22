<template>
    <v-dialog v-model="internalValue" max-width="600" scrollable>
        <v-card class="rounded-xl pa-2">
            <v-card-title
                class="d-flex align-center justify-space-between pa-4"
            >
                <span class="text-h5 font-weight-black">From the business</span>
                <v-btn
                    icon="mdi-close"
                    variant="text"
                    @click="internalValue = false"
                />
            </v-card-title>

            <v-divider />

            <v-card-text
                class="pa-6 text-body-1 text-grey-darken-3"
                style="line-height: 1.6"
            >
                <div class="font-weight-black mb-3 text-h6">Specialties</div>
                {{ fullText }}
            </v-card-text>

            <v-divider />

            <v-card-actions
                class="pa-4 d-flex justify-space-between align-center"
            >
                <v-btn
                    color="error"
                    variant="flat"
                    class="rounded-lg px-8 text-none font-weight-bold"
                    size="large"
                    @click="internalValue = false"
                >
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
const props = defineProps<{
    modelValue: boolean;
    fullText: string;
}>();

const emit = defineEmits(["update:modelValue"]);

// Sync internal state with v-model
const internalValue = computed({
    get: () => props.modelValue,
    set: (val) => emit("update:modelValue", val),
});
</script>
