import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Event, EventFilters, PaginationParams } from "@/types";

async function fetchPublishedEvents(
  filters: EventFilters = {},
  pagination: PaginationParams = { page: 1, pageSize: 12 }
): Promise<{ data: Event[]; count: number }> {
  let query = supabase
    .from("events")
    .select("*", { count: "exact" })
    .eq("status", "published")
    .order("date", { ascending: true });

  if (filters.category) {
    query = query.eq("category", filters.category);
  }
  if (filters.search) {
    query = query.ilike("title", `%${filters.search}%`);
  }
  if (filters.dateFrom) {
    query = query.gte("date", filters.dateFrom);
  }
  if (filters.dateTo) {
    query = query.lte("date", filters.dateTo);
  }

  const from = (pagination.page - 1) * pagination.pageSize;
  const to = from + pagination.pageSize - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;
  if (error) throw error;
  return { data: (data as Event[]) ?? [], count: count ?? 0 };
}

async function fetchAllEvents(
  filters: EventFilters = {},
  pagination: PaginationParams = { page: 1, pageSize: 20 }
): Promise<{ data: Event[]; count: number }> {
  let query = supabase
    .from("events")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (filters.category) {
    query = query.eq("category", filters.category);
  }
  if (filters.status) {
    query = query.eq("status", filters.status);
  }
  if (filters.search) {
    query = query.ilike("title", `%${filters.search}%`);
  }

  const from = (pagination.page - 1) * pagination.pageSize;
  const to = from + pagination.pageSize - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;
  if (error) throw error;
  return { data: (data as Event[]) ?? [], count: count ?? 0 };
}

async function fetchEventById(id: string): Promise<Event> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as Event;
}

async function fetchDashboardStats(): Promise<{
  total: number;
  upcoming: number;
  published: number;
  totalCapacity: number;
}> {
  const { data, error } = await supabase.from("events").select("*");
  if (error) throw error;

  const events = (data as Event[]) ?? [];
  const now = new Date().toISOString().split("T")[0];

  return {
    total: events.length,
    upcoming: events.filter((e) => e.date >= now && e.status === "published")
      .length,
    published: events.filter((e) => e.status === "published").length,
    totalCapacity: events.reduce((sum, e) => sum + e.capacity, 0),
  };
}

export function usePublishedEvents(
  filters?: EventFilters,
  pagination?: PaginationParams
) {
  return useQuery({
    queryKey: ["events", "published", filters, pagination],
    queryFn: () => fetchPublishedEvents(filters, pagination),
  });
}

export function useAllEvents(
  filters?: EventFilters,
  pagination?: PaginationParams
) {
  return useQuery({
    queryKey: ["events", "all", filters, pagination],
    queryFn: () => fetchAllEvents(filters, pagination),
  });
}

export function useEvent(id: string | undefined) {
  return useQuery({
    queryKey: ["event", id],
    queryFn: () => fetchEventById(id!),
    enabled: !!id,
  });
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: fetchDashboardStats,
  });
}

export function useFeaturedEvents() {
  return useQuery({
    queryKey: ["events", "featured"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("status", "published")
        .gte("date", new Date().toISOString().split("T")[0])
        .order("date", { ascending: true })
        .limit(4);

      if (error) throw error;
      return (data as Event[]) ?? [];
    },
  });
}
