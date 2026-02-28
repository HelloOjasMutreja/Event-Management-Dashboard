import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  formatDate,
  formatTime,
  getStatusColor,
  getCategoryColor,
} from "@/lib/utils";
import type { Event } from "@/types";

interface EventDetailProps {
  event: Event;
}

export default function EventDetail({ event }: EventDetailProps) {
  const capacityPercent = Math.round(
    (event.registered_count / event.capacity) * 100
  );

  return (
    <div className="space-y-8">
      {event.image_url && (
        <div className="aspect-video max-h-96 overflow-hidden rounded-lg">
          <img
            src={event.image_url}
            alt={event.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge
            className={getCategoryColor(event.category)}
            variant="secondary"
          >
            {event.category}
          </Badge>
          <Badge
            className={getStatusColor(event.status)}
            variant="secondary"
          >
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </Badge>
        </div>

        <h1 className="text-3xl font-bold">{event.title}</h1>

        <div className="grid gap-3 text-[hsl(var(--muted-foreground))] sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <span>{formatTime(event.time)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <span>
              {event.registered_count}/{event.capacity} registered (
              {capacityPercent}%)
            </span>
          </div>
        </div>

        {/* Capacity bar */}
        <div className="w-full max-w-md">
          <div className="h-2 overflow-hidden rounded-full bg-[hsl(var(--secondary))]">
            <div
              className="h-full rounded-full bg-[hsl(var(--primary))] transition-all"
              style={{ width: `${Math.min(capacityPercent, 100)}%` }}
            />
          </div>
        </div>

        <div className="prose max-w-none">
          <p className="whitespace-pre-wrap text-[hsl(var(--foreground))]">
            {event.description}
          </p>
        </div>
      </div>
    </div>
  );
}
