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

export interface SubCategory {
  id: string; // UUID
  user_created: string; // UUID
  date_created: string; // ISO Date String
  user_updated: string | null;
  date_updated: string | null;
  name: string;
  slug: string;
  categories_new: string; // UUID (Clé étrangère)
}

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

interface TextDirection {
  step: number;
  description: string;
}

export interface Biz {
  id: string;
  sort: number | null;
  user_created: string;
  date_created: string;
  user_updated: string;
  date_updated: string;
  name: string;
  short_description: string;
  description: string;
  phone: string;
  whatsapp: string;
  reviews_count: number;
  website?: string;
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
  subcategories?: SubCategory[];
  locations?: string;
  reservation_available?: boolean;
  calendar_link?: string;
  rating_details: {
    "1": number;
    "2": number;
    "3": number;
    "4": number;
    "5": number;
  };
  audio_direction?: string;
  text_directions?: TextDirection[];
}

export interface BizMetaItem {
  id: string;
  title: string;
  description: string;
  type: "menu" | "service" | "portfolio" | "vibes" | "video" | string;
  price?: number | string | null;
  biz_id: string;
  biz_name?: string;
  biz_slug?: string;
  media_type: "image" | "video" | string;
  // Ajout de la propriété link qui contiendra le tableau des IDs des images
  link: string[];
}

export interface GroupedBizMeta {
  menu: BizMetaItem[];
  service: BizMetaItem[];
  portfolio: BizMetaItem[];
  vibes: BizMetaItem[];
  video: BizMetaItem[];
  [key: string]: BizMetaItem[];
}
