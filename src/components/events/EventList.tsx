import EventCard from "./EventCard";
import EmptyState from "@/components/common/EmptyState";
import type { Event } from "@/types";

interface EventListProps {
  events: Event[];
}

export default function EventList({ events }: EventListProps) {
  if (events.length === 0) {
    return (
      <EmptyState
        title="No events found"
        description="No events match your criteria. Try adjusting your filters."
      />
    );
  }

  return (
    <div className="stagger-children grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
