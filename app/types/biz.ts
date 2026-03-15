export interface BizLocation {
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
  biz: string;
  address: string;
}

// Si tu reçois une liste d'emplacements
export type BusinessLocations = BizLocation[];

export interface BizHours {
  open: string | null;
  close: string | null;
}

// Interface pour les objets liés via featured_slots
export interface FeaturedSlot {
  id: string;
  user_created: string;
  date_created: string;
  user_updated: string;
  date_updated: string;
  feature: string;
  slug: string;
}

export interface DaySchedule {
  Lundi: BizHours;
  Mardi: BizHours;
  Mercredi: BizHours;
  Jeudi: BizHours;
  Vendredi: BizHours;
  Samedi: BizHours;
  Dimanche: BizHours;
}

export interface BizsMediaItem {
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
export type GroupedBizMedia = Record<string, BizsMediaItem[]>;

export interface BizMedia {
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

export interface Biz {
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
  is_open: boolean;
  hours: DaySchedule[];
  rating: number;
  price_range: number;
  slug: string;
  categories: number[];
  featuredslots: number[];
  qa: any[]; // À typer si tu ajoutes des questions/réponses plus tard
  sub_categories: number[];
  featured_slots: FeaturedSlot[];
}
