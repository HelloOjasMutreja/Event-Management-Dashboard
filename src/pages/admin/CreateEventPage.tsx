import { useNavigate } from "react-router-dom";
import EventForm from "@/components/events/EventForm";
import { useCreateEvent } from "@/hooks/useEventMutations";
import { useToast } from "@/components/ui/use-toast";
import type { CreateEventInput } from "@/types";

export default function CreateEventPage() {
  const createEvent = useCreateEvent();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (data: CreateEventInput) => {
    try {
      await createEvent.mutateAsync(data);
      toast({ title: "Success", description: "Event created." });
      navigate("/admin/events");
    } catch {
      toast({
        title: "Error",
        description: "Failed to create event.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-3xl font-bold">Create Event</h1>
      <EventForm onSubmit={handleSubmit} isSubmitting={createEvent.isPending} />
    </div>
  );
}
