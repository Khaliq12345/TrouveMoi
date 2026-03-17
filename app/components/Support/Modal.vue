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
import type { CreateSupportTicketPayload, SupportModalSubmitPayload } from "~/types/support";
import { createItem, uploadFiles } from "@directus/sdk";

const props = defineProps({
  modelValue: Boolean,
  loading: Boolean, // Ajout d'une prop loading pour bloquer le bouton
});

const { $directus } = useNuxtApp();


const emit = defineEmits(["update:modelValue", "refresh"]);

// Vérouille le formulaire
const valid = ref(false);

const issue = reactive({
  title: "",
  description: "",
  photo: [],
});

const close = () => {
  emit("update:modelValue", false);
  // Reset complet après la fermeture de l'animation
  issue.title = "";
  issue.description = "";
  issue.photo = [];
};


async function addIssue() {
    valid.value = true
    try {
        const itemData: CreateSupportTicketPayload = {
            title: issue.title,
            description: issue.description,
            resolved: false,
            image_id: [],
        };

        if (issue.photo && Array.isArray(issue.photo) && issue.photo.length > 0) {
            const uploadedUuids: string[] = [];
            
            for (const file of issue.photo) {
                const formData = new FormData();
                formData.append("title", file?.name || "");
                formData.append("file", file);
                
                // ENVOI DANS LE DOSSIER "supports"
                // Remplacez 'votre-uuid-de-dossier' par l'ID réel du dossier dans Directus
                formData.append("folder", "votre-uuid-de-dossier"); 

                try {
                    const uploadResult = await $directus.request(uploadFiles(formData));
                    
                    // On récupère l'UUID (id) du fichier uploadé
                    const fileId = Array.isArray(uploadResult) ? uploadResult[0]?.id : uploadResult?.id;
                    
                    if (fileId) {
                        uploadedUuids.push(fileId);
                    }
                } catch (uploadErr) {
                    console.error("Erreur upload fichier:", file.name, uploadErr);
                }
            }
            
            // On injecte directement le tableau d'UUIDs dans le champ JSON
            itemData.image_id = uploadedUuids;
        }

        // Création de l'item dans la collection 'supports'
        await $directus.request(createItem("supports", itemData));

        // Fermeture + signal au parent pour rafraîchir la liste
        close();
        emit("refresh");
    } catch (err) {
        console.error("Erreur lors de la création du ticket:", err);
    }
    valid.value = false;
}

</script>