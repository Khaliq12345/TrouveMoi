export interface Event {
  id: string;
  user_created: string;
  date_created: string;
  user_updated: string | null;
  date_updated: string | null;
  business_id: string;
  title: string;
  description: string;
  start_at: string;
  end_at: string;
  link: string | null;
  image: string;
}
