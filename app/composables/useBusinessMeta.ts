import type { BizMetaItem, GroupedBizMedia, GroupedBizMeta } from "~/types/biz";

export const useBusinessMeta = (bizId: string) => {
  const { $directus, $readItems } = useNuxtApp();

  return useAsyncData<GroupedBizMeta>(`meta-${bizId}`, async () => {
    
    // Requête vers la collection "meta"
    const items = await $directus.request(
      $readItems('meta', {
        filter: { biz_id: { _eq: bizId } },
        // Le paramètre fields est crucial ici pour la relation Many-to-Many
        // On demande tous les champs de base (*), plus le directus_files_id à l'intérieur de media
        fields: ['*', 'media.directus_files_id']
      })
    );

    const grouped: GroupedBizMeta = { 
      menu: [], 
      service: [], 
      portfolio: [] 
    };

    items.forEach((item: any) => {
      // Transformation des données : on extrait les IDs des fichiers
      // Si item.media existe et est un tableau, on mappe pour récupérer directus_files_id
      const extractedLinks = item.media && Array.isArray(item.media) 
        ? item.media.map((m: any) => m.directus_files_id).filter(Boolean)
        : [];

      // Construction de l'objet propre
      const cleanItem: BizMetaItem = {
        id: item.id,
        title: item.title,
        description: item.description,
        type: item.type,
        price: item.price,
        biz_id: item.biz_id,
        link: extractedLinks // Contient désormais ["uuid-image-1", "uuid-image-2"]
      };

      // Classement dans le bon groupe
      if (cleanItem.type && grouped[cleanItem.type] !== undefined) {
        grouped[cleanItem.type].push(cleanItem);
      }
    });

    return grouped;
  });
};