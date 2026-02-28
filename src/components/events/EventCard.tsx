import { Link } from "react-router-dom";
import { Calendar, MapPin, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate, formatTime, getCategoryColor } from "@/lib/utils";
import type { Event } from "@/types";

interface EventCardProps {
  event: Event;
  onViewDetails?: (id: string) => void;
}

export default function EventCard({ event, onViewDetails }: EventCardProps) {
  const capacityPercent = event.capacity
    ? (event.registered_count / event.capacity) * 100
    : 0;

  return (
    <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
      {event.image_url && (
        <div className="aspect-video overflow-hidden">
          <img
            src={event.image_url}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2">
          <Badge
            className={getCategoryColor(event.category)}
            variant="secondary"
          >
            {event.category}
          </Badge>
        </div>
        <h3 className="line-clamp-1 text-lg font-semibold">{event.title}</h3>
        <p className="line-clamp-2 text-sm text-[hsl(var(--muted-foreground))]">
          {event.description}
        </p>
      </CardHeader>
      <CardContent className="flex-1 space-y-2 text-sm text-[hsl(var(--muted-foreground))]">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>
            {formatDate(event.date)} at {formatTime(event.time)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span
            className={capacityPercent >= 90 ? "font-medium text-[hsl(var(--destructive))]" : capacityPercent >= 75 ? "font-medium text-yellow-600" : ""}
          >
            {event.registered_count}/{event.capacity} registered
            {capacityPercent >= 90 && " — Almost full!"}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        {onViewDetails ? (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => onViewDetails(event.id)}
          >
            View Details
          </Button>
        ) : (
          <Link to={`/events/${event.id}`} className="w-full">
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
