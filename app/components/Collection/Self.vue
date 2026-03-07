<!-- User's personal collections grid displaying saved favorites -->
<template>
  <!-- Responsive grid layout -->
  <v-row>
    <v-col v-for="col in collections" :key="col.id" cols="12" sm="6" md="4">
      <CollectionCard :collection="col" />
    </v-col>
  </v-row>
</template>

<script setup>
// Mock data: user's personal saved collections
const collections = [
{
id:1,
title:"SF's Sought-after Seats",
description:"The most reserved restaurants in San Francisco this week.",
images:[
"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
"https://images.unsplash.com/photo-1553621042-f6e147245754",
"https://images.unsplash.com/photo-1579871494447-9811cf80d66c"
],
itemCount:10,
author:"Yelp",
authorAvatar:"https://i.pravatar.cc/150?u=yelp"
},
{
id:2,
title:"Hidden Rooftops",
description:"Secret rooftops with great views and cocktails.",
images:[
"https://images.unsplash.com/photo-1506744038136-46273834b3fb",
"https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
"https://images.unsplash.com/photo-1492724441997-5dc865305da7"
],
itemCount:14,
author:"UrbanExplorer",
authorAvatar:"https://i.pravatar.cc/150?u=urban"
},
{
id:3,
title:"Art Deco Architecture",
description:"Iconic art-deco buildings around the historic district.",
images:[
"https://images.unsplash.com/photo-1493246507139-91e8bef99c1a",
"https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
"https://images.unsplash.com/photo-1470770841072-f978cf4d019e"
],
itemCount:21,
author:"ArchDigest",
authorAvatar:"https://i.pravatar.cc/150?u=arch"
},
{
id:4,
title:"Cozy Coding Cafes",
description:"Cafes ideal for developers: Wi-Fi, outlets and silence.",
images:[
"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
"https://images.unsplash.com/photo-1501339817302-38a9143182eb",
"https://images.unsplash.com/photo-1521017432531-fbd92d744264"
],
itemCount:9,
author:"DevLife",
authorAvatar:"https://i.pravatar.cc/150?u=dev"
},
{
id:5,
title:"Retro Vinyl Shops",
description:"Where collectors hunt rare vinyl records.",
images:[
"https://images.unsplash.com/photo-1603048588665-791ca8aea617",
"https://images.unsplash.com/photo-1461360226052-6e301506bb40",
"https://images.unsplash.com/photo-1539376248633-cf94fa8b7bd8"
],
itemCount:12,
author:"MusicBox",
authorAvatar:"https://i.pravatar.cc/150?u=music"
},
{
id:6,
title:"Green Weekend Escapes",
description:"Urban parks and botanical gardens perfect for a break.",
images:[
"https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
"https://images.unsplash.com/photo-1585320806297-9794b3e4eeae",
"https://images.unsplash.com/photo-1502082553048-f009c37129b9"
],
itemCount:18,
author:"EcoTravel",
authorAvatar:"https://i.pravatar.cc/150?u=eco"
},
{
id:7,
title:"Late Night Ramen",
description:"Ramen spots open late for night owls.",
images:[
"https://images.unsplash.com/photo-1569718212165-3a8278d5f624",
"https://images.unsplash.com/photo-1552611052-33e04de081de",
"https://images.unsplash.com/photo-1591814448473-7f47c2a1b2e0"
],
itemCount:15,
author:"FoodieGuide",
authorAvatar:"https://i.pravatar.cc/150?u=food"
},
{
id:8,
title:"Street Art Tour",
description:"Murals and graffiti worth discovering.",
images:[
"https://images.unsplash.com/photo-1541450805268-4822a3a774ca",
"https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8",
"https://images.unsplash.com/photo-1525909002-1b05e0c869d8"
],
itemCount:32,
author:"StreetArtMag",
authorAvatar:"https://i.pravatar.cc/150?u=art"
},
{
id:9,
title:"Minimalist Staycations",
description:"Minimalist boutique hotels for a quiet stay.",
images:[
"https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
"https://images.unsplash.com/photo-1566073771259-6a8506099945",
"https://images.unsplash.com/photo-1520250497591-112f2f40a3f4"
],
itemCount:7,
author:"LuxuryStays",
authorAvatar:"https://i.pravatar.cc/150?u=luxury"
},
{
id:10,
title:"Best Coffee Roasters",
description:"Independent coffee roasters serving exceptional espresso.",
images:[
"https://images.unsplash.com/photo-1498804103079-a6351b050096",
"https://images.unsplash.com/photo-1442512595331-e89e73853f31",
"https://images.unsplash.com/photo-1509042239860-f550ce710b93"
],
itemCount:13,
author:"CoffeeCulture",
authorAvatar:"https://i.pravatar.cc/150?u=coffee"
},

{
id:11,
title:"Historic Libraries",
description:"Libraries known for architecture and rare collections.",
images:[
"https://images.unsplash.com/photo-1521587760476-6c12a4b040da",
"https://images.unsplash.com/photo-1519681393784-d120267933ba",
"https://images.unsplash.com/photo-1495446815901-a7297e633e8d"
],
itemCount:11,
author:"CityHeritage",
authorAvatar:"https://i.pravatar.cc/150?u=heritage"
},

{
id:12,
title:"Ocean View Walks",
description:"Scenic coastal walking routes.",
images:[
"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
"https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
"https://images.unsplash.com/photo-1501785888041-af3ef285b470"
],
itemCount:16,
author:"NatureTrails",
authorAvatar:"https://i.pravatar.cc/150?u=nature"
},

{
id:13,
title:"Creative Coworking Spaces",
description:"Modern coworking spaces for freelancers.",
images:[
"https://images.unsplash.com/photo-1497366216548-37526070297c",
"https://images.unsplash.com/photo-1556761175-b413da4baf72",
"https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
],
itemCount:10,
author:"StartupHub",
authorAvatar:"https://i.pravatar.cc/150?u=startup"
},

{
id:14,
title:"Weekend Farmers Markets",
description:"Fresh produce and artisan food markets.",
images:[
"https://images.unsplash.com/photo-1504754524776-8f4f37790ca0",
"https://images.unsplash.com/photo-1542838132-92c53300491e",
"https://images.unsplash.com/photo-1506806732259-39c2d0268443"
],
itemCount:17,
author:"LocalFood",
authorAvatar:"https://i.pravatar.cc/150?u=farm"
},

{
id:15,
title:"Modern Art Galleries",
description:"Contemporary art spaces and exhibitions.",
images:[
"https://images.unsplash.com/photo-1500534623283-312aade485b7",
"https://images.unsplash.com/photo-1504198458649-3128b932f49b",
"https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b"
],
itemCount:20,
author:"ArtWorld",
authorAvatar:"https://i.pravatar.cc/150?u=gallery"
},

{
id:16,
title:"Hidden Bookstores",
description:"Independent bookstores loved by locals.",
images:[
"https://images.unsplash.com/photo-1512820790803-83ca734da794",
"https://images.unsplash.com/photo-1496104679561-38b3b4d81c65",
"https://images.unsplash.com/photo-1516979187457-637abb4f9353"
],
itemCount:12,
author:"BookHunter",
authorAvatar:"https://i.pravatar.cc/150?u=books"
},

{
id:17,
title:"Night Photography Spots",
description:"City locations perfect for night photography.",
images:[
"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
"https://images.unsplash.com/photo-1500534623283-312aade485b7"
],
itemCount:14,
author:"PhotoGuide",
authorAvatar:"https://i.pravatar.cc/150?u=photo"
},

{
id:18,
title:"Urban Cycling Routes",
description:"Safe and scenic bike routes.",
images:[
"https://images.unsplash.com/photo-1508973378895-527d8a02b43d",
"https://images.unsplash.com/photo-1485965120184-e220f721d03e",
"https://images.unsplash.com/photo-1507036066871-b7e8032b3dea"
],
itemCount:19,
author:"CycleCity",
authorAvatar:"https://i.pravatar.cc/150?u=bike"
},

{
id:19,
title:"Luxury Hotel Bars",
description:"Hotel bars known for creative cocktails.",
images:[
"https://images.unsplash.com/photo-1470337458703-46ad1756a187",
"https://images.unsplash.com/photo-1470337458703-46ad1756a187",
"https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b"
],
itemCount:8,
author:"NightLife",
authorAvatar:"https://i.pravatar.cc/150?u=bar"
},

{
id:20,
title:"City Skyline Views",
description:"Best places to watch the skyline at sunset.",
images:[
"https://images.unsplash.com/photo-1494526585095-c41746248156",
"https://images.unsplash.com/photo-1467269204594-9661b134dd2b",
"https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b"
],
itemCount:23,
author:"SkylineGuide",
authorAvatar:"https://i.pravatar.cc/150?u=sky"
},

{
id:21,
title:"Underground Music Venues",
description:"Small venues hosting emerging artists.",
images:[
"https://images.unsplash.com/photo-1501386761578-eac5c94b800a",
"https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3",
"https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2"
],
itemCount:11,
author:"IndieMusic",
authorAvatar:"https://i.pravatar.cc/150?u=indie"
},

{
id:22,
title:"Vintage Fashion Boutiques",
description:"Shops specializing in vintage clothing.",
images:[
"https://images.unsplash.com/photo-1489987707025-afc232f7ea0f",
"https://images.unsplash.com/photo-1521335629791-ce4aec67dd53",
"https://images.unsplash.com/photo-1490481651871-ab68de25d43d"
],
itemCount:10,
author:"VintageMag",
authorAvatar:"https://i.pravatar.cc/150?u=vintage"
},

{
id:23,
title:"Urban Picnic Spots",
description:"Green spaces ideal for picnics.",
images:[
"https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
"https://images.unsplash.com/photo-1501785888041-af3ef285b470"
],
itemCount:16,
author:"CityNature",
authorAvatar:"https://i.pravatar.cc/150?u=park"
},

{
id:24,
title:"Tech Startup Offices",
description:"Innovative office designs from tech startups.",
images:[
"https://images.unsplash.com/photo-1492724441997-5dc865305da7",
"https://images.unsplash.com/photo-1497366216548-37526070297c",
"https://images.unsplash.com/photo-1556761175-b413da4baf72"
],
itemCount:9,
author:"TechInsider",
authorAvatar:"https://i.pravatar.cc/150?u=tech"
},

{
id:25,
title:"Craft Breweries",
description:"Local breweries producing craft beer.",
images:[
"https://images.unsplash.com/photo-1516455590571-18256e5bb9ff",
"https://images.unsplash.com/photo-1541542684-4a5c9d71b68e",
"https://images.unsplash.com/photo-1532635241-17e820acc59f"
],
itemCount:18,
author:"BrewGuide",
authorAvatar:"https://i.pravatar.cc/150?u=brew"
},

{
id:26,
title:"Historic Bridges",
description:"Bridges famous for engineering and views.",
images:[
"https://images.unsplash.com/photo-1505761671935-60b3a7427bad",
"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
"https://images.unsplash.com/photo-1482192596544-9eb780fc7f66"
],
itemCount:13,
author:"HistoryMaps",
authorAvatar:"https://i.pravatar.cc/150?u=bridge"
},

{
id:27,
title:"Mountain Day Trips",
description:"Short mountain trips near the city.",
images:[
"https://images.unsplash.com/photo-1501785888041-af3ef285b470",
"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
"https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
],
itemCount:15,
author:"AdventureTime",
authorAvatar:"https://i.pravatar.cc/150?u=mountain"
},

{
id:28,
title:"Street Food Corners",
description:"Popular street food locations.",
images:[
"https://images.unsplash.com/photo-1504754524776-8f4f37790ca0",
"https://images.unsplash.com/photo-1543353071-087092ec393a",
"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38"
],
itemCount:20,
author:"FoodScout",
authorAvatar:"https://i.pravatar.cc/150?u=streetfood"
},

{
id:29,
title:"Urban Photography Walk",
description:"Photography walk routes for creatives.",
images:[
"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
"https://images.unsplash.com/photo-1467269204594-9661b134dd2b",
"https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b"
],
itemCount:14,
author:"LensTravel",
authorAvatar:"https://i.pravatar.cc/150?u=lens"
},

{
id:30,
title:"City Sunrise Spots",
description:"Places where sunrise views are spectacular.",
images:[
"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
"https://images.unsplash.com/photo-1492724441997-5dc865305da7",
"https://images.unsplash.com/photo-1482192596544-9eb780fc7f66"
],
itemCount:17,
author:"MorningViews",
authorAvatar:"https://i.pravatar.cc/150?u=sunrise"
}
]
</script>
