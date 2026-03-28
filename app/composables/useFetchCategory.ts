// composables/useFetchCategory.ts

import { useAsyncData, useNuxtApp } from '#imports';
import type { Category, SubCategory, GroupedCategory } from '~/types/category';

export const useFetchCategory = () => {
  // Utilisation de useAsyncData pour gérer la requête asynchrone et le cache côté Nuxt
  return useAsyncData<GroupedCategory[]>('grouped-categories', async () => {
    
    // Récupération des utilitaires Directus depuis le contexte de l'application
    const { $directus, $readItems } = useNuxtApp();

    // Lancement des deux requêtes simultanément pour optimiser le temps de chargement
    // On récupère toutes les catégories et toutes les sous-catégories
    const [categoriesResult, subCategoriesResult] = await Promise.all([
      $directus.request($readItems('categories_new')),
      $directus.request($readItems('sub_categories'))
    ]);

    // Typage des résultats bruts
    const categories = categoriesResult as Category[];
    const subCategories = subCategoriesResult as SubCategory[];

    // Transformation des données : mappage des catégories pour y inclure les sous-catégories correspondantes
    const groupedData: GroupedCategory[] = categories.map((category) => {
      
      // On filtre les sous-catégories dont la clé étrangère correspond à l'ID de la catégorie actuelle
      const relatedSubCategories = subCategories.filter((sub) => {
        // Selon la configuration de l'API Directus, le champ relationnel peut retourner juste l'ID ou l'objet complet
        const parentId = typeof sub.categories_new === 'object' && sub.categories_new !== null
          ? (sub.categories_new as any).id 
          : sub.categories_new;

        // On vérifie la correspondance des IDs
        return parentId === category.id;
      });

      // On retourne un nouvel objet fusionnant les données de la catégorie et le tableau de ses sous-catégories
      return {
        ...category,
        sub_categories: relatedSubCategories
      };
    });

    // Retourne le tableau final restructuré
    return groupedData;
  });
};