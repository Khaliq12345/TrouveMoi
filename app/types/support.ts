/**
 * Represents a support ticket from the `supports` Directus collection.
 */
export interface SupportTicket {
  /** Auto-incremented integer ID */
  id: number;
  /** ISO 8601 date string – creation date */
  date_created: string;
  /** ISO 8601 date string – last update date, or null if never updated */
  date_updated: string | null;
  /** Short title of the issue */
  title: string;
  /** Full description of the issue */
  description: string;
  /** Whether the issue has been resolved */
  resolved: boolean;
  /**
   * Array of Directus file UUIDs attached to the ticket (new method).
   * These are UUIDs stored as a JSON array in the `image_id` field.
   */
  image_id: string[];
  /**
   * Legacy field – array of Directus file IDs (integers) stored via
   * the many-to-many `images` relation. Kept for backwards compatibility.
   */
  images: number[];
}

/**
 * Payload sent to Directus when creating a new support ticket.
 */
export interface CreateSupportTicketPayload {
  title: string;
  description: string;
  resolved?: boolean;
  /** Array of Directus file UUIDs uploaded before the ticket is created */
  image_id?: string[];
}

/**
 * Payload sent from the modal form before upload/creation.
 */
export interface SupportModalSubmitPayload {
  title: string;
  description: string;
  /** Files selected by the user – uploaded in `addIssue` before `createItem` */
  photo: File[];
}
