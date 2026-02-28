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

  // Extract short month + day for the date chip
  const eventDate = new Date(event.date);
  const month = eventDate.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  const day = eventDate.getDate();

  return (
    <Card className="group flex flex-col overflow-hidden border-[hsl(var(--border))]/60 bg-[hsl(var(--card))] transition-all duration-300 hover:shadow-lg hover:shadow-[hsl(var(--primary))]/5 hover:-translate-y-0.5">
      {event.image_url && (
        <div className="relative aspect-[16/10] overflow-hidden bg-[hsl(var(--muted))]">
          <img
            src={event.image_url}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          {/* Date chip */}
          <div className="absolute top-3 left-3 flex flex-col items-center rounded-lg bg-[hsl(var(--card))]/90 glass px-2.5 py-1.5 shadow-sm border border-[hsl(var(--border))]/50">
            <span className="text-[10px] font-bold tracking-wider text-[hsl(var(--primary))]">{month}</span>
            <span className="text-lg font-bold leading-none text-[hsl(var(--foreground))]">{day}</span>
          </div>
        </div>
      )}
      <CardHeader className="pb-2 pt-4">
        <div className="flex items-center gap-2">
          <Badge
            className={getCategoryColor(event.category)}
            variant="secondary"
          >
            {event.category}
          </Badge>
          {capacityPercent >= 90 && (
            <Badge variant="destructive" className="text-[10px]">Almost Full</Badge>
          )}
        </div>
        <h3 className="line-clamp-1 text-base font-semibold leading-snug mt-2">
          {event.title}
        </h3>
      </CardHeader>
      <CardContent className="flex-1 space-y-1.5 pb-3 pt-0 text-sm text-[hsl(var(--muted-foreground))]">
        <div className="flex items-center gap-2">
          <Calendar className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">
            {formatDate(event.date)} &middot; {formatTime(event.time)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{event.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-3.5 w-3.5 shrink-0" />
          <div className="flex items-center gap-2 flex-1">
            <span>{event.registered_count}/{event.capacity}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[hsl(var(--muted))]">
              <div
                className={`h-full rounded-full transition-all ${
                  capacityPercent >= 90
                    ? "bg-[hsl(var(--destructive))]"
                    : capacityPercent >= 75
                    ? "bg-[hsl(var(--warning))]"
                    : "bg-[hsl(var(--primary))]"
                }`}
                style={{ width: `${Math.min(capacityPercent, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 pb-4">
        {onViewDetails ? (
          <Button
            variant="ghost"
            className="w-full text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/5"
            onClick={() => onViewDetails(event.id)}
          >
            View Details
          </Button>
        ) : (
          <Link to={`/events/${event.id}`} className="w-full">
            <Button variant="ghost" className="w-full text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/5">
              View Details
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
