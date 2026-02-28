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
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-md">
      {event.image_url && (
        <div className="aspect-video overflow-hidden">
          <img
            src={event.image_url}
            alt={event.title}
            className="h-full w-full object-cover"
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
          <span>
            {event.registered_count}/{event.capacity} registered
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Link to={`/events/${event.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
