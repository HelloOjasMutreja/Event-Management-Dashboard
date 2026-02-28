export type EventStatus = "draft" | "published" | "cancelled" | "completed";

export type EventCategory =
  | "Workshop"
  | "Social"
  | "Competition"
  | "Seminar"
  | "Other";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  registered_count: number;
  category: EventCategory;
  status: EventStatus;
  image_url: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface CreateEventInput {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  category: EventCategory;
  status: EventStatus;
  image_url?: string;
}

export interface UpdateEventInput extends Partial<CreateEventInput> {
  id: string;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface EventFilters {
  category?: EventCategory;
  status?: EventStatus;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}
