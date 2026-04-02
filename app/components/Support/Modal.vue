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
        <v-form ref="form" :disabled="valid">
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
          @click="addIssue"
        >
          Soumettre le problème
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import type { CreateSupportTicketPayload } from "~/types/support";

const props = defineProps({
  modelValue: Boolean,
  loading: Boolean,
});

const emit = defineEmits(["update:modelValue", "refresh"]);

const form = ref<any>(null);
const valid = ref(false);

const issue = reactive({
  title: "",
  description: "",
  photo: [] as File[],
});

const { uploadSupportImage, createTicket } = useSupport();

const close = () => {
  emit("update:modelValue", false);
  issue.title = "";
  issue.description = "";
  issue.photo = [];
  if (form.value) form.value.resetValidation();
};

async function addIssue() {
  if (!form.value) return;
  const { valid: isFormValid } = await form.value.validate();
  if (!isFormValid) return;

  valid.value = true;
  
  try {
    const uploadedUuids: string[] = [];

    // 1. GESTION DES IMAGES
    if (issue.photo && Array.isArray(issue.photo) && issue.photo.length > 0) {
      for (const file of issue.photo) {
        // Sécurité : On s'assure que c'est bien une image
        if (!file.type.startsWith('image/')) {
          console.warn(`Le fichier ${file.name} ignoré (ce n'est pas une image).`);
          continue; 
        }

        try {
          // On upload l'image et on récupère l'ID généré par Directus
          const fileId = await uploadSupportImage(file);
          if (fileId) uploadedUuids.push(fileId);
        } catch (uploadErr) {
          console.error("Erreur upload fichier:", file.name, uploadErr);
        }
      }
    }
    
    // 2. CRÉATION DU TICKET
    const itemData: CreateSupportTicketPayload = {
      title: issue.title,
      description: issue.description,
      resolved: false,
      images: uploadedUuids.map(id => ({ directus_files_id: id })),
    };

    await createTicket(itemData);

    close();
    emit("refresh");
  } catch (err) {
    console.error("Erreur lors de la création du ticket:", err);
  } finally {
    valid.value = false;
  }
}
</script>