import { useNavigate, useParams } from "react-router-dom";
import EventForm from "@/components/events/EventForm";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ErrorMessage from "@/components/common/ErrorMessage";
import { useEvent } from "@/hooks/useEvents";
import { useUpdateEvent } from "@/hooks/useEventMutations";
import { useToast } from "@/components/ui/use-toast";
import type { EventFormData } from "@/schemas/eventSchema";

export default function EditEventPage() {
  const { id } = useParams<{ id: string }>();
  const { data: event, isLoading, error, refetch } = useEvent(id);
  const updateEvent = useUpdateEvent();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (data: EventFormData) => {
    if (!id) return;
    try {
      await updateEvent.mutateAsync({ id, ...data });
      toast({ title: "Success", description: "Event updated." });
      navigate("/admin/events");
    } catch {
      toast({
        title: "Error",
        description: "Failed to update event.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error || !event)
    return (
      <ErrorMessage
        message="Failed to load event."
        onRetry={() => refetch()}
      />
    );

  const defaults = {
    ...event,
    image_url: event.image_url ?? undefined,
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-3xl font-bold">Edit Event</h1>
      <EventForm
        defaultValues={defaults}
        onSubmit={handleSubmit}
        isSubmitting={updateEvent.isPending}
      />
    </div>
  );
}
