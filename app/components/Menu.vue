<template>
    <div class="d-flex">
        <v-menu
            v-for="(menu, idx) in menuStructure()"
            :key="idx"
            open-on-hover
            location="bottom"
            :close-delay="100"
        >
            <!-- // The button to click to  display the menu -->
            <template v-slot:activator="{ props }">
                <v-btn
                    v-bind="props"
                    variant="text"
                    class="text-none font-weight-medium"
                >
                    {{ menu.label }}
                    <v-icon end>mdi-chevron-down</v-icon>
                </v-btn>
            </template>

            <!-- // The menu itself, we have it can either be the subcategories or categories -->
            <v-list :class="{ 'category-grid': menu.type === 'more' }">
                <v-list-item
                    v-for="item in menu.items"
                    :key="item.slug"
                    :title="item.name"
                    @click="
                        () => {
                            if (menu.type === 'more') {
                                router.push({
                                    query: {
                                        ...route.query,
                                        sub_categories: '',
                                        categories: item.slug,
                                    },
                                });
                            } else {
                                router.push({
                                    query: {
                                        ...route.query,
                                        sub_categories: item.slug,
                                        categories: menu.slug,
                                    },
                                });
                            }
                        }
                    "
                >
                    <template v-slot:prepend>
                        <v-icon icon="mdi-clock" />
                    </template>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const { updateURL } = useFilterURL();
const { getSubcategories } = await useFetchSubCategory();

const categories = [
    // The first 5 (Most important)
    { name: "Commerce de Détail", slug: "commerce-detail" },
    { name: "Santé & Bien-être", slug: "sante-bien-etre" },
    { name: "Tourisme & Loisirs", slug: "tourisme-loisirs" },
    { name: "Banques & Assurances", slug: "banques-assurances" },
    { name: "Hébergement & Hôtels", slug: "hebergement-hotels" },

    // The rest of the list
    { name: "Art & Divertissement", slug: "art-divertissement" },
    { name: "Mode & Beauté", slug: "mode-beaute" },
    { name: "Services Juridiques", slug: "services-juridiques" },
    { name: "Restauration & Gastronomie", slug: "restauration-gastronomie" },
    { name: "Transport & Logistique", slug: "transport-logistique" },
    { name: "Éducation & Formation", slug: "education-formation" },
    { name: "Café", slug: "cafe" },
    { name: "Automobile & Garage", slug: "automobile-garage" },
    { name: "Bistro", slug: "bistro" },
    { name: "Immobilier & BTP", slug: "immobilier-btp" },
    { name: "Services Informatiques", slug: "services-informatiques" },
    { name: "Agriculture & Élevage", slug: "agriculture-elevage" },
];

// Menu Structure to avoid repetition
const menuStructure = () => {
    // 1. Primary categories (first 5)
    const primary = categories.slice(0, 5).map((cat) => ({
        type: "primary",
        label: cat.name,
        icon: "mdi-flag",
        iconSize: "default",
        slug: cat.slug,
        items: getSubcategories(cat.slug),
    }));

    // 2. "More" menu
    const more = {
        type: "more",
        label: "Plus",
        icon: "mdi-flag",
        iconSize: "small",
        slug: "",
        items: categories.slice(5),
    };

    return [...primary, more];
};
</script>

<style scoped>
.category-grid {
    display: grid;
    /* This creates 3 equal columns */
    grid-template-columns: repeat(3, 1fr);
    /* Adjust width so it doesn't look too cramped */
    min-width: 600px;
    padding: 8px;
}

/* Optional: adjustment for small screens */
@media (max-width: 600px) {
    .category-grid {
        grid-template-columns: repeat(1, 1fr);
        min-width: 200px;
    }
}
</style>
