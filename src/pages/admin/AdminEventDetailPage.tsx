import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import EventDetail from "@/components/events/EventDetail";
import RegistrationsList from "@/components/admin/RegistrationsList";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ErrorMessage from "@/components/common/ErrorMessage";
import { useEvent } from "@/hooks/useEvents";

export default function AdminEventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: event, isLoading, error, refetch } = useEvent(id);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/admin/events">
          <Button
            variant="ghost"
            className="-ml-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Button>
        </Link>
      </div>

      {isLoading && <LoadingSpinner />}
      {error && (
        <ErrorMessage
          message="Failed to load event details."
          onRetry={() => refetch()}
        />
      )}

      {event && (
        <>
          <EventDetail event={event} />
          <RegistrationsList eventId={event.id} eventTitle={event.title} />
        </>
      )}
    </div>
  );
}
