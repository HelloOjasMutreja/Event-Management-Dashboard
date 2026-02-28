import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EventDetail from "@/components/events/EventDetail";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ErrorMessage from "@/components/common/ErrorMessage";
import { useEvent } from "@/hooks/useEvents";

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: event, isLoading, error, refetch } = useEvent(id);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="container mx-auto flex-1 px-4 py-8 max-w-5xl">
        <Link to="/events">
          <Button variant="ghost" className="mb-8 -ml-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Button>
        </Link>

        {isLoading && <LoadingSpinner />}
        {error && (
          <ErrorMessage
            message="Failed to load event details."
            onRetry={() => refetch()}
          />
        )}
        {event && <EventDetail event={event} />}
      </main>

      <Footer />
    </div>
  );
}
