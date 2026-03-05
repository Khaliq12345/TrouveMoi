<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    max-width="500"
    persistent
  >
    <v-card rounded="md">
      <v-card-title class="pa-4 pb-2">
        <span class="text-h6 font-weight-bold">Signaler un problème</span>
      </v-card-title>

      <v-card-text class="pa-4 pt-2">
        <v-form ref="form" v-model="valid">
          <!-- Titre -->
          <v-text-field
            v-model="issue.title"
            label="Titre"
            placeholder="Décrivez brièvement le problème"
            variant="outlined"
            density="comfortable"
            rounded="lg"
            :rules="[(v) => !!v || 'Le titre est requis']"
            class="mb-3"
          />

          <!-- Description -->
          <v-textarea
            v-model="issue.description"
            label="Description"
            placeholder="Détaillez votre problème..."
            variant="outlined"
            density="comfortable"
            rounded="lg"
            rows="4"
            auto-grow
            :rules="[(v) => !!v || 'La description est requise']"
            class="mb-3"
          />

          <!-- Photo -->
          <v-file-input
            v-model="issue.photo"
            label="Photo (optionnel)"
            placeholder="Ajoutez une capture d'écran"
            variant="outlined"
            density="comfortable"
            rounded="lg"
            prepend-icon="mdi-camera"
            accept="image/*"
            show-size
            chips
          />
        </v-form>
      </v-card-text>

      <v-card-actions class="pa-4 pt-0">
        <v-spacer />
        <v-btn variant="text" color="grey" class="text-none" @click="close">
          Annuler
        </v-btn>
        <v-btn
          color="primary"
          variant="flat"
          rounded="lg"
          class="text-none px-6"
          :disabled="!valid"
          @click="submit"
        >
          Soumettre le problème
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, reactive, watch } from "vue";

const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue", "submit"]);

const valid = ref(false);
const form = ref(null);

const issue = reactive({
  title: "",
  description: "",
  photo: null,
});

// Reset quand la modale s'ouvre
watch(
  () => props.modelValue,
  (open) => {
    if (open) reset();
  },
);

const reset = () => {
  issue.title = "";
  issue.description = "";
  issue.photo = null;
  form.value?.resetValidation();
};

const close = () => {
  emit("update:modelValue", false);
};

const submit = () => {
  if (!valid.value) return;

  emit("submit", {
    title: issue.title,
    description: issue.description,
    photo: issue.photo,
  });

  close();
};
</script>
