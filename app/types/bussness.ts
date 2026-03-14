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
  status: "open" | "closed" | "archived"; // Adapté selon tes besoins Directus
  hours: DaySchedule[];
  rating: number;
  price_range: number;
  slug: string;
  categories: number[];
  featuredslots: number[];
  qa: any[]; // À typer si tu ajoutes des questions/réponses plus tard
  sub_categories: number[];
}
