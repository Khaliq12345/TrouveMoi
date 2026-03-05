<!-- Top-rated collections grid displaying popular curated lists -->
<template>
  <!-- Responsive grid layout -->
  <v-row>
    <v-col v-for="col in collections" :key="col.id" cols="12" sm="6" md="4">
      <CollectionCard :collection="col" />
    </v-col>
  </v-row>
</template>

<script setup>
// Mock data: top-rated collections from various curators
const collections = [
  {
    id: 1,
    title: "Get boba in SF",
    description: "Need more boba in your life? Check out all the places in San Francisco where you can find bubble tea.",
    images: [
      "https://images.unsplash.com/photo-1558855410-3112e253d704?w=400",
      "https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=200",
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=200",
    ],
    itemCount: 32,
    author: "Yelp",
    authorAvatar: "https://i.pravatar.cc/150?u=yelp",
  },
  {
    id: 2,
    title: "SF's Sought-after Seats",
    description: "Here's the breakdown of some of San Francisco's most reserved restaurants this week.",
    images: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
      "https://images.unsplash.com/photo-1553621042-f6e147245754?w=200",
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200",
    ],
    itemCount: 10,
    author: "Yelp",
    authorAvatar: "https://i.pravatar.cc/150?u=yelp",
  },
  {
    id: 3,
    title: "Hidden Rooftops",
    description: "Discover secret terrace views and the best cocktails above the city streets.",
    images: [
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400",
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=200",
      "https://images.unsplash.com/photo-1484156818144-373bb91c2421?w=200",
    ],
    itemCount: 15,
    author: "UrbanExplorer",
    authorAvatar: "https://i.pravatar.cc/150?u=urban",
  },
  {
    id: 4,
    title: "Art Deco Architecture",
    description: "A curated list of the most iconic Art Deco buildings and neon signs in the historic district.",
    images: [
      "https://images.unsplash.com/photo-1493246507139-91e8bef99c1a?w=400",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=200",
    ],
    itemCount: 24,
    author: "ArchDigest",
    authorAvatar: "https://i.pravatar.cc/150?u=arch",
  },
  {
    id: 5,
    title: "Cozy Coding Cafes",
    description: "Quiet spots with reliable Wi-Fi, plenty of outlets, and the best artisan espresso.",
    images: [
      "https://images.unsplash.com/photo-1521017432531-fbd92d744264?w=400",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200",
      "https://images.unsplash.com/photo-1501339817302-38a9143182eb?w=200",
    ],
    itemCount: 8,
    author: "DevLife",
    authorAvatar: "https://i.pravatar.cc/150?u=dev",
  },
  {
    id: 6,
    title: "Retro Vinyl Shops",
    description: "Where to find rare presses and second-hand treasures in the heart of the city.",
    images: [
      "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=400",
      "https://images.unsplash.com/photo-1461360226052-6e301506bb40?w=200",
      "https://images.unsplash.com/photo-1539376248633-cf94fa8b7bd8?w=200",
    ],
    itemCount: 12,
    author: "MusicBox",
    authorAvatar: "https://i.pravatar.cc/150?u=music",
  },
  {
    id: 7,
    title: "Green Weekend Escapes",
    description: "The best botanical gardens and urban parks for a quick nature retreat this weekend.",
    images: [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400",
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=200",
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=200",
    ],
    itemCount: 21,
    author: "EcoTravel",
    authorAvatar: "https://i.pravatar.cc/150?u=eco",
  },
  {
    id: 8,
    title: "Late Night Ramen",
    description: "Authentic bowls of tonkotsu and miso serving until 3 AM for the night owls.",
    images: [
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400",
      "https://images.unsplash.com/photo-1552611052-33e04de081de?w=200",
      "https://images.unsplash.com/photo-1591814448473-7f47c2a1b2e0?w=200",
    ],
    itemCount: 14,
    author: "FoodieGuide",
    authorAvatar: "https://i.pravatar.cc/150?u=food",
  },
  {
    id: 9,
    title: "Street Art Tour",
    description: "A walk through the most colorful murals and gravity-defying graffiti in the North district.",
    images: [
      "https://images.unsplash.com/photo-1541450805268-4822a3a774ca?w=400",
      "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=200",
      "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?w=200",
    ],
    itemCount: 45,
    author: "StreetArtMag",
    authorAvatar: "https://i.pravatar.cc/150?u=art",
  },
  {
    id: 10,
    title: "Minimalist Staycations",
    description: "Boutique hotels that focus on clean lines, light-filled rooms, and absolute serenity.",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=200",
    ],
    itemCount: 6,
    author: "LuxuryStays",
    authorAvatar: "https://i.pravatar.cc/150?u=luxury",
  },
];
</script>
