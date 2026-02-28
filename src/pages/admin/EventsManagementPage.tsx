import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EventsTable from "@/components/admin/EventsTable";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ErrorMessage from "@/components/common/ErrorMessage";
import { useAllEvents } from "@/hooks/useEvents";
import { useDeleteEvent } from "@/hooks/useEventMutations";
import type { EventCategory, EventStatus } from "@/types";

const CATEGORIES: EventCategory[] = [
  "Workshop",
  "Social",
  "Competition",
  "Seminar",
  "Other",
];
const STATUSES: EventStatus[] = ["draft", "published", "cancelled", "completed"];
const PAGE_SIZE = 10;

export default function EventsManagementPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [page, setPage] = useState(1);

  const filters = useMemo(
    () => ({
      search: search || undefined,
      category: category !== "all" ? (category as EventCategory) : undefined,
      status: status !== "all" ? (status as EventStatus) : undefined,
    }),
    [search, category, status]
  );

  const { data, isLoading, error, refetch } = useAllEvents(filters, {
    page,
    pageSize: PAGE_SIZE,
  });
  const deleteEvent = useDeleteEvent();

  const totalPages = data ? Math.ceil(data.count / PAGE_SIZE) : 0;

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  }, []);

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Events</h1>
          <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
            {data ? `${data.count} total events` : "Loading..."}
          </p>
        </div>
        <Link to="/admin/events/new">
          <Button className="gradient-bg border-0 text-white shadow-md shadow-[hsl(var(--primary))]/20">
            <Plus className="mr-2 h-4 w-4" /> New Event
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
              <Input
                placeholder="Search events..."
                value={search}
                onChange={handleSearch}
                className="pl-10 h-10"
              />
            </div>
            <Select value={category} onValueChange={(v) => { setCategory(v); setPage(1); }}>
              <SelectTrigger className="w-full sm:w-44 h-10">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={(v) => { setStatus(v); setPage(1); }}>
              <SelectTrigger className="w-full sm:w-40 h-10">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage onRetry={() => refetch()} />}
      {data && (
        <EventsTable
          events={data.data}
          onDelete={(event) => deleteEvent.mutate(event.id)}
        />
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="h-9 px-4"
          >
            Previous
          </Button>
          <span className="text-sm text-[hsl(var(--muted-foreground))]">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="h-9 px-4"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
