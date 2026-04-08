<!-- User's personal collections grid displaying saved favorites -->
<template>
    <!-- Responsive grid layout -->
    <v-row>
        <v-col v-for="col in collections" :key="col.id" cols="12" sm="6" md="4">
            <CollectionCard :collection="col" />
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
// Mock data: user's personal saved collections
const collections = [
    {
        id: 1,
        title: "Les restaurants prisés de SF",
        description:
            "Les restaurants les plus réservés à San Francisco cette semaine.",
        images: [
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
            "https://images.unsplash.com/photo-1553621042-f6e147245754",
            "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
        ],
        itemCount: 10,
        author: "Yelp",
        authorAvatar: "https://i.pravatar.cc/150?u=yelp",
    },
    {
        id: 2,
        title: "Terrasses cachées",
        description: "Des terrasses secrètes avec une belle vue et des cocktails.",
        images: [
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
            "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
        ],
        itemCount: 14,
        author: "UrbanExplorer",
        authorAvatar: "https://i.pravatar.cc/150?u=urban",
    },
    {
        id: 3,
        title: "Architecture Art Déco",
        description: "Des bâtiments art déco emblématiques dans le quartier historique.",
        images: [
            "https://images.unsplash.com/photo-1493246507139-91e8bef99c1a",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
            "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
        ],
        itemCount: 21,
        author: "ArchDigest",
        authorAvatar: "https://i.pravatar.cc/150?u=arch",
    },
    {
        id: 4,
        title: "Cafés de codage confortables",
        description: "Des cafés idéaux pour les développeurs : Wi-Fi, prises et silence.",
        images: [
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
            "https://images.unsplash.com/photo-1501339817302-38a9143182eb",
            "https://images.unsplash.com/photo-1521017432531-fbd92d744264",
        ],
        itemCount: 9,
        author: "DevLife",
        authorAvatar: "https://i.pravatar.cc/150?u=dev",
    },
    {
        id: 5,
        title: "Boutiques de vinyles rétro",
        description: "Où les collectionneurs chassent les disques vinyles rares.",
        images: [
            "https://images.unsplash.com/photo-1603048588665-791ca8aea617",
            "https://images.unsplash.com/photo-1461360226052-6e301506bb40",
            "https://images.unsplash.com/photo-1539376248633-cf94fa8b7bd8",
        ],
        itemCount: 12,
        author: "MusicBox",
        authorAvatar: "https://i.pravatar.cc/150?u=music",
    },
    {
        id: 6,
        title: "Escapades vertes en week-end",
        description: "Des parcs urbains et jardins botaniques parfaits pour une pause.",
        images: [
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
            "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae",
            "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
        ],
        itemCount: 18,
        author: "EcoTravel",
        authorAvatar: "https://i.pravatar.cc/150?u=eco",
    },
    {
        id: 7,
        title: "Ramen tard le soir",
        description: "Des spots de ramen ouverts tard pour les nocturnes.",
        images: [
            "https://images.unsplash.com/photo-1569718212165-3a8278d5f624",
            "https://images.unsplash.com/photo-1552611052-33e04de081de",
            "https://images.unsplash.com/photo-1591814448473-7f47c2a1b2e0",
        ],
        itemCount: 15,
        author: "FoodieGuide",
        authorAvatar: "https://i.pravatar.cc/150?u=food",
    },
    {
        id: 8,
        title: "Tour d'art urbain",
        description: "Des fresques et graffitis qui valent la peine d'être découverts.",
        images: [
            "https://images.unsplash.com/photo-1541450805268-4822a3a774ca",
            "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8",
            "https://images.unsplash.com/photo-1525909002-1b05e0c869d8",
        ],
        itemCount: 32,
        author: "StreetArtMag",
        authorAvatar: "https://i.pravatar.cc/150?u=art",
    },
    {
        id: 9,
        title: "Séjours minimalistes",
        description: "Des hôtels boutique minimalistes pour un séjour tranquille.",
        images: [
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
            "https://images.unsplash.com/photo-1566073771259-6a8506099945",
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
        ],
        itemCount: 7,
        author: "LuxuryStays",
        authorAvatar: "https://i.pravatar.cc/150?u=luxury",
    },
    {
        id: 10,
        title: "Meilleurs torréfacteurs de café",
        description:
            "Des torréfacteurs indépendants servant un espresso exceptionnel.",
        images: [
            "https://images.unsplash.com/photo-1498804103079-a6351b050096",
            "https://images.unsplash.com/photo-1442512595331-e89e73853f31",
            "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
        ],
        itemCount: 13,
        author: "CoffeeCulture",
        authorAvatar: "https://i.pravatar.cc/150?u=coffee",
    },

    {
        id: 11,
        title: "Bibliothèques historiques",
        description: "Des bibliothèques connues pour leur architecture et leurs collections rares.",
        images: [
            "https://images.unsplash.com/photo-1521587760476-6c12a4b040da",
            "https://images.unsplash.com/photo-1519681393784-d120267933ba",
            "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
        ],
        itemCount: 11,
        author: "CityHeritage",
        authorAvatar: "https://i.pravatar.cc/150?u=heritage",
    },

    {
        id: 12,
        title: "Promenades avec vue sur l'océan",
        description: "Des sentiers côtiers pittoresques.",
        images: [
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
            "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
        ],
        itemCount: 16,
        author: "NatureTrails",
        authorAvatar: "https://i.pravatar.cc/150?u=nature",
    },

    {
        id: 13,
        title: "Espaces de coworking créatifs",
        description: "Des espaces de coworking modernes pour les freelances.",
        images: [
            "https://images.unsplash.com/photo-1497366216548-37526070297c",
            "https://images.unsplash.com/photo-1556761175-b413da4baf72",
            "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
        ],
        itemCount: 10,
        author: "StartupHub",
        authorAvatar: "https://i.pravatar.cc/150?u=startup",
    },

    {
        id: 14,
        title: "Marchés fermiers du week-end",
        description: "Des marchés de produits frais et d'aliments artisanaux.",
        images: [
            "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0",
            "https://images.unsplash.com/photo-1542838132-92c53300491e",
            "https://images.unsplash.com/photo-1506806732259-39c2d0268443",
        ],
        itemCount: 17,
        author: "LocalFood",
        authorAvatar: "https://i.pravatar.cc/150?u=farm",
    },

    {
        id: 15,
        title: "Galeries d'art moderne",
        description: "Des espaces d'art contemporain et des expositions.",
        images: [
            "https://images.unsplash.com/photo-1500534623283-312aade485b7",
            "https://images.unsplash.com/photo-1504198458649-3128b932f49b",
            "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b",
        ],
        itemCount: 20,
        author: "ArtWorld",
        authorAvatar: "https://i.pravatar.cc/150?u=gallery",
    },

    {
        id: 16,
        title: "Librairies cachées",
        description: "Des librairies indépendantes appréciées des locaux.",
        images: [
            "https://images.unsplash.com/photo-1512820790803-83ca734da794",
            "https://images.unsplash.com/photo-1496104679561-38b3b4d81c65",
            "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
        ],
        itemCount: 12,
        author: "BookHunter",
        authorAvatar: "https://i.pravatar.cc/150?u=books",
    },

    {
        id: 17,
        title: "Spots de photographie nocturne",
        description: "Des lieux urbains parfaits pour la photographie nocturne.",
        images: [
            "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
            "https://images.unsplash.com/photo-1500534623283-312aade485b7",
        ],
        itemCount: 14,
        author: "PhotoGuide",
        authorAvatar: "https://i.pravatar.cc/150?u=photo",
    },

    {
        id: 18,
        title: "Itinéraires cyclables urbains",
        description: "Des pistes cyclables sûres et pittoresques.",
        images: [
            "https://images.unsplash.com/photo-1508973378895-527d8a02b43d",
            "https://images.unsplash.com/photo-1485965120184-e220f721d03e",
            "https://images.unsplash.com/photo-1507036066871-b7e8032b3dea",
        ],
        itemCount: 19,
        author: "CycleCity",
        authorAvatar: "https://i.pravatar.cc/150?u=bike",
    },

    {
        id: 19,
        title: "Bars d'hôtels de luxe",
        description: "Des bars d'hôtels connus pour leurs cocktails créatifs.",
        images: [
            "https://images.unsplash.com/photo-1470337458703-46ad1756a187",
            "https://images.unsplash.com/photo-1470337458703-46ad1756a187",
            "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b",
        ],
        itemCount: 8,
        author: "NightLife",
        authorAvatar: "https://i.pravatar.cc/150?u=bar",
    },

    {
        id: 20,
        title: "Vues sur la skyline de la ville",
        description: "Les meilleurs endroits pour admirer la skyline au coucher du soleil.",
        images: [
            "https://images.unsplash.com/photo-1494526585095-c41746248156",
            "https://images.unsplash.com/photo-1467269204594-9661b134dd2b",
            "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b",
        ],
        itemCount: 23,
        author: "SkylineGuide",
        authorAvatar: "https://i.pravatar.cc/150?u=sky",
    },

    {
        id: 21,
        title: "Salles de musique underground",
        description: "De petites salles accueillant des artistes émergents.",
        images: [
            "https://images.unsplash.com/photo-1501386761578-eac5c94b800a",
            "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3",
            "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2",
        ],
        itemCount: 11,
        author: "IndieMusic",
        authorAvatar: "https://i.pravatar.cc/150?u=indie",
    },

    {
        id: 22,
        title: "Boutiques de mode vintage",
        description: "Des boutiques spécialisées dans les vêtements vintage.",
        images: [
            "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f",
            "https://images.unsplash.com/photo-1521335629791-ce4aec67dd53",
            "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
        ],
        itemCount: 10,
        author: "VintageMag",
        authorAvatar: "https://i.pravatar.cc/150?u=vintage",
    },

    {
        id: 23,
        title: "Spots de pique-nique urbains",
        description: "Des espaces verts idéaux pour les pique-niques.",
        images: [
            "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
            "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
        ],
        itemCount: 16,
        author: "CityNature",
        authorAvatar: "https://i.pravatar.cc/150?u=park",
    },

    {
        id: 24,
        title: "Bureaux de startups tech",
        description: "Des bureaux aux designs innovants de startups tech.",
        images: [
            "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
            "https://images.unsplash.com/photo-1497366216548-37526070297c",
            "https://images.unsplash.com/photo-1556761175-b413da4baf72",
        ],
        itemCount: 9,
        author: "TechInsider",
        authorAvatar: "https://i.pravatar.cc/150?u=tech",
    },

    {
        id: 25,
        title: "Brasseries artisanales",
        description: "Des brasseries locales produisant de la bière artisanale.",
        images: [
            "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff",
            "https://images.unsplash.com/photo-1541542684-4a5c9d71b68e",
            "https://images.unsplash.com/photo-1532635241-17e820acc59f",
        ],
        itemCount: 18,
        author: "BrewGuide",
        authorAvatar: "https://i.pravatar.cc/150?u=brew",
    },

    {
        id: 26,
        title: "Ponts historiques",
        description: "Des ponts célèbres pour leur ingénierie et leurs vues.",
        images: [
            "https://images.unsplash.com/photo-1505761671935-60b3a7427bad",
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
            "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66",
        ],
        itemCount: 13,
        author: "HistoryMaps",
        authorAvatar: "https://i.pravatar.cc/150?u=bridge",
    },

    {
        id: 27,
        title: "Excursions en montagne",
        description: "De courtes excursions en montagne près de la ville.",
        images: [
            "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
            "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        ],
        itemCount: 15,
        author: "AdventureTime",
        authorAvatar: "https://i.pravatar.cc/150?u=mountain",
    },

    {
        id: 28,
        title: "Coins de street food",
        description: "Des lieux populaires de street food.",
        images: [
            "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0",
            "https://images.unsplash.com/photo-1543353071-087092ec393a",
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
        ],
        itemCount: 20,
        author: "FoodScout",
        authorAvatar: "https://i.pravatar.cc/150?u=streetfood",
    },

    {
        id: 29,
        title: "Marche photographique urbaine",
        description: "Des itinéraires de marche photographique pour les créatifs.",
        images: [
            "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
            "https://images.unsplash.com/photo-1467269204594-9661b134dd2b",
            "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b",
        ],
        itemCount: 14,
        author: "LensTravel",
        authorAvatar: "https://i.pravatar.cc/150?u=lens",
    },

    {
        id: 30,
        title: "Spots de lever de soleil en ville",
        description: "Des endroits où les vues au lever du soleil sont spectaculaires.",
        images: [
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
            "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
            "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66",
        ],
        itemCount: 17,
        author: "MorningViews",
        authorAvatar: "https://i.pravatar.cc/150?u=sunrise",
    },
];
</script>
