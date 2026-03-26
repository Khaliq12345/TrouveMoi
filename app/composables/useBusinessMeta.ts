import type { BizMetaItem, GroupedBizMedia, GroupedBizMeta } from "~/types/biz";

// On rend bizId optionnel dans la signature de la fonction
export const useBusinessMeta = (bizId?: string) => {
  const { $directus, $readItems } = useNuxtApp();

  const grouped: GroupedBizMeta = {
    menu: [],
    service: [],
    portfolio: [],
    vibes: [],
  };

  // Création d'une clé de cache unique selon la présence ou non de bizId
  const cacheKey = bizId ? `meta-${bizId}` : 'meta-all';

  return useAsyncData<GroupedBizMeta>(cacheKey, async () => {
    // Préparation des options de la requête de base
    // On inclut toujours les champs nécessaires pour la relation
    const queryOptions: Record<string, any> = {
      fields: [
        "*",
        "media.directus_files_id",
        "biz_id.id",
        "biz_id.name",
        "biz_id.slug",
      ],
    };

    // Ajout conditionnel du filtre si bizId est fourni
    // Si bizId est absent, Directus renverra tous les éléments
    if (bizId) {
      queryOptions.filter = { biz_id: { _eq: bizId } };
    }

    // Requête vers la collection "meta" avec les options dynamiques
    const items = await $directus.request(
      $readItems("meta", queryOptions)
    );

    items.forEach((item: any) => {
      // Transformation des données : extraction des IDs des fichiers
      const extractedLinks =
        item.media && Array.isArray(item.media)
          ? item.media.map((m: any) => m.directus_files_id).filter(Boolean)
          : [];

      // Construction de l'objet propre
      const cleanItem = {
        id: item.id,
        title: item.title,
        description: item.description,
        type: item.type,
        price: item.price,
        // On récupère l'ID en gérant le cas où biz_id est un objet
        biz_id: item.biz_id?.id || item.biz_id,
        // Assignation des nouvelles propriétés du business
        biz_name: item.biz_id?.name,
        biz_slug: item.biz_id?.slug,
        link: extractedLinks,
      } as BizMetaItem;

      // Classement de l'élément dans la catégorie correspondante
      if (cleanItem.type && grouped[cleanItem.type] !== undefined) {
        grouped[cleanItem.type].push(cleanItem);
      }
    });

    return grouped;
  });
};