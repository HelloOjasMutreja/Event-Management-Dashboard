import { useState, useMemo, useCallback } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EventList from "@/components/events/EventList";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ErrorMessage from "@/components/common/ErrorMessage";
import { usePublishedEvents } from "@/hooks/useEvents";
import type { EventCategory } from "@/types";

const CATEGORIES: EventCategory[] = [
  "Workshop",
  "Social",
  "Competition",
  "Seminar",
  "Other",
];
const PAGE_SIZE = 12;

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [page, setPage] = useState(1);

  const filters = useMemo(
    () => ({
      search: search || undefined,
      category: category !== "all" ? (category as EventCategory) : undefined,
    }),
    [search, category]
  );

  const { data, isLoading, error, refetch } = usePublishedEvents(filters, {
    page,
    pageSize: PAGE_SIZE,
  });

  const totalPages = data ? Math.ceil(data.count / PAGE_SIZE) : 0;

  const handleCategoryChange = useCallback((value: string) => {
    setCategory(value);
    setPage(1);
  }, []);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      setPage(1);
    },
    []
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Header area */}
      <div className="border-b-2 bg-[hsl(var(--muted))]/40 neo-grid">
        <div className="container mx-auto px-4 py-12">
          <div className="animate-fade-up">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              All Events
            </h1>
            <p className="mt-2 text-[hsl(var(--muted-foreground))] max-w-lg">
              Discover workshops, socials, competitions, and seminars happening in your community.
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto flex-1 px-4 py-8">
        {/* Filters */}
        <div className="animate-fade-up mb-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "80ms" }}>
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
            <Input
              placeholder="Search events..."
              value={search}
              onChange={handleSearch}
              className="pl-10 h-11 bg-[hsl(var(--card))]"
            />
          </div>
          <Select value={category} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full sm:w-52 h-11 bg-[hsl(var(--card))]">
              <SlidersHorizontal className="mr-2 h-4 w-4 text-[hsl(var(--muted-foreground))]" />
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
        </div>

        {/* Results info */}
        {data && !isLoading && (
          <p className="mb-6 text-sm text-[hsl(var(--muted-foreground))]">
            Showing {data.data.length} of {data.count} events
            {category !== "all" && <span> in <strong>{category}</strong></span>}
            {search && <span> matching "<strong>{search}</strong>"</span>}
          </p>
        )}

        {/* Content */}
        {isLoading && <LoadingSpinner />}
        {error && <ErrorMessage onRetry={() => refetch()} />}
        {data && <EventList events={data.data} />}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-3">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="h-9 px-4"
            >
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(
                (p) => (
                  <Button
                    key={p}
                    variant={p === page ? "default" : "ghost"}
                    size="sm"
                    className={`h-9 w-9 ${p === page ? "" : ""}`}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </Button>
                )
              )}
            </div>
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
      </main>

      <Footer />
    </div>
  );
}
