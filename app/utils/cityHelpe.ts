export const getCityRelatedSearches = (cityName: string) => {
  const categories = [
    "Livraison de repas",
    "Igname pilée & Sauce Gousse",
    "Restaurants Africains",
    "Maquis & Grillades",
    "Vente de Wagassi",
    "Poisson Braisé au feu de bois",
    "Atassi & Friture",
    "Petit déjeuner béninois",
    "Service traiteur",
    "Fast-food & Burgers",
    "Pâtisseries & Boulangeries",
    "Supermarchés ouverts 24h/24",
    "Bars & Lounges",
    "Glaciers & Smoothies",
    "Spécialités de la région",
    "Poulet Bicyclette grillé",
    "Dégustation de vin de palme",
    "Cuisine de rue (Street food)"
  ]

  // On retourne la liste formatée avec le nom de la ville
  return categories.map(item => `${item} à ${cityName}`)
}