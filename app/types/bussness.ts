export interface BusinessLocation {
  id: string;
  user_created: string;
  date_created: string;
  user_updated: string | null;
  date_updated: string | null;
  city: string;
  latitude: string;
  longitude: string;
  local_direction: string;
  is_main: boolean;
  bussness: string;
  address: string;
}

// Si tu reçois une liste d'emplacements
export type BusinessLocations = BusinessLocation[];

export interface BusinessHours {
  open: string | null;
  close: string | null;
}

export interface DaySchedule {
  Lundi: BusinessHours;
  Mardi: BusinessHours;
  Mercredi: BusinessHours;
  Jeudi: BusinessHours;
  Vendredi: BusinessHours;
  Samedi: BusinessHours;
  Dimanche: BusinessHours;
}

export interface BusinessMediaItem {
  id: string;
  user_created: string;
  date_created: string;
  user_updated: string | null;
  date_updated: string | null;
  media_id: string;
  type: "image" | "video" | string;
  extra_type: "buisness" | string;
  extra_id: string;
  tags: string[];
  description: string | null;
  link: string; // URL complète déjà construite
}

// Le type pour l'objet groupé
export type GroupedBusinessMedia = Record<string, BusinessMediaItem[]>;

export interface BusinessMedia {
  id: string;
  user_created: string;
  date_created: string;
  user_updated: string | null;
  date_updated: string | null;
  media_id: string;
  type: "image" | "video" | string;
  extra_type: "buisness" | string; // Garde l'orthographe CMS
  extra_id: string; // ID du business lié
  tags: string[]; // ex: ["outside", "inside", "menu"]
  description: string | null;
}

export interface Business {
  id: string;
  sort: number | null;
  user_created: string;
  date_created: string;
  user_updated: string;
  date_updated: string;
  name: string;
  description: string;
  phone: string;
  whatsapp: string;
  reviews_count: number;
  status: "opened" | "closed"; // Adapté selon tes besoins Directus
  hours: DaySchedule[];
  rating: number;
  price_range: number;
  slug: string;
  categories: number[];
  featuredslots: number[];
  qa: any[]; // À typer si tu ajoutes des questions/réponses plus tard
  sub_categories: number[];
}
