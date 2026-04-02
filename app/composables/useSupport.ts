import { createItem, uploadFiles } from "@directus/sdk";
import type { CreateSupportTicketPayload } from "~/types/support";

export const useSupport = () => {
  const { $directus } = useNuxtApp();

  // Fonction pour uploader UNE image vers la racine du File Library Directus
  const uploadSupportImage = async (file: File) => {
    const formData = new FormData();
    // Directus utilise la clé 'title' pour le nom d'affichage (optionnel mais recommandé)
    formData.append("title", file.name);
    // La clé 'file' est obligatoire et contient le fichier brut
    formData.append("file", file);

    // On envoie le fichier sans spécifier de dossier
    const result = await $directus.request(uploadFiles(formData));

    // uploadFiles peut retourner un tableau ou un objet selon le payload, on sécurise le retour
    return Array.isArray(result) ? result[0]?.id : result?.id;
  };

  const createTicket = async (ticketData: CreateSupportTicketPayload) => {
    return await $directus.request(createItem("supports", ticketData));
  };

  return {
    uploadSupportImage,
    createTicket,
  };
};
