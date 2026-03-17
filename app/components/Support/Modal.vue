<template>
  <!-- Modal dialog for reporting issues -->
  <v-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    max-width="500"
    persistent
  >
    <v-card rounded="md">
      <!-- Dialog title -->
      <v-card-title class="pa-4 pb-2">
        <span class="text-h6 font-weight-bold">Signaler un problème</span>
      </v-card-title>

      <!-- Form content -->
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
            multiple
            label="Photos (optionnel)"
            placeholder="Ajoutez des captures d'écran"
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

      <!-- Action buttons -->
      <v-card-actions class="pa-4 pt-0">
        <v-spacer />
        <!-- Cancel button -->
        <v-btn variant="text" color="grey" class="text-none" @click="close">
          Annuler
        </v-btn>
        <!-- Submit button -->
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

<script setup lang="ts">
const props = defineProps({
  modelValue: Boolean,
  loading: Boolean, // Ajout d'une prop loading pour bloquer le bouton
});

const emit = defineEmits(["update:modelValue", "submit"]);

const valid = ref(false);

const issue = reactive({
  title: "",
  description: "",
  photo: [],
});

const close = () => {
  emit("update:modelValue", false);
  // Reset complet après la fermeture de l'animation
  setTimeout(() => {
    issue.photo = []; // Sécurité pour Vuetify
  }, 300);
};

const submit = async () => {
  if (!valid.value) return;

  // On envoie les données
  emit("submit", {
    title: issue.title,
    description: issue.description,
    photo: issue.photo,
  });
};
</script>