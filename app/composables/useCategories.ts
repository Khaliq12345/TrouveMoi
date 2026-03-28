import type { Category } from '~/types/category';

// Fonction pour générer une teinte (Hue) stable basée sur le slug
const getHueFromSlug = (slug: string): number => {
    let hash = 0;
    for (let i = 0; i < slug.length; i++) {
        hash = slug.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash % 360);
};

export const useCategories = () => {
    return useAsyncData('main-categories', async () => {
        const { $directus, $readItems } = useNuxtApp();
        const response = await $directus.request($readItems('categories_new'));
        return response as Category[];
    }, {
        transform: (categories) => {
            return categories.map((category) => {
                const hue = getHueFromSlug(category.slug);
                const saturation = 75;

                return {
                    ...category,
                    color: `hsl(${hue}, ${saturation}%, 45%)`,
                    bgLight: `hsl(${hue}, ${saturation}%, 95%)`,
                    bgDark: `hsl(${hue}, ${saturation}%, 85%)`,
                    icon: category.icon || 'mdi-shape',
                    count: 0,
                    route: `/search?categories=${category.slug}`
                };
            });
        }
    });
};
