import { Calendar, MapPin, Users, Clock, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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

  const INFO_ITEMS = [
    { icon: Calendar, label: "Date", value: formatDate(event.date) },
    { icon: Clock, label: "Time", value: formatTime(event.time) },
    { icon: MapPin, label: "Location", value: event.location },
    {
      icon: Users,
      label: "Capacity",
      value: `${event.registered_count} / ${event.capacity} registered`,
    },
  ];

  return (
    <div className="animate-fade-up">
      {/* Hero image */}
      {event.image_url && (
        <div className="relative aspect-[21/9] max-h-[420px] overflow-hidden rounded-2xl bg-[hsl(var(--muted))]">
          <img
            src={event.image_url}
            alt={event.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          {/* Overlaid title on large screens */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="flex flex-wrap gap-2 mb-3">
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
            <h1 className="text-3xl font-bold text-white md:text-4xl drop-shadow-sm">
              {event.title}
            </h1>
          </div>
        </div>
      )}

      {/* Title fallback when no image */}
      {!event.image_url && (
        <div className="space-y-3">
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
          <h1 className="text-3xl font-bold md:text-4xl">{event.title}</h1>
        </div>
      )}

      {/* Content grid */}
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Description */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold">About this event</h2>
          <p className="whitespace-pre-wrap leading-relaxed text-[hsl(var(--muted-foreground))]">
            {event.description}
          </p>
        </div>

        {/* Sidebar info card */}
        <div className="space-y-5">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              {INFO_ITEMS.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className={`flex items-start gap-3 px-5 py-4 ${
                      index !== INFO_ITEMS.length - 1 ? "border-b" : ""
                    }`}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/5">
                      <Icon className="h-4 w-4 text-[hsl(var(--primary))]" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-sm font-medium">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Capacity gauge */}
          <Card>
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Registration</span>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    capacityPercent >= 90
                      ? "bg-red-500/15 text-red-400"
                      : capacityPercent >= 75
                      ? "bg-amber-500/15 text-amber-400"
                      : "bg-emerald-500/15 text-emerald-400"
                  }`}
                >
                  {capacityPercent}% filled
                </span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-[hsl(var(--muted))]">
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
              <p className="text-xs text-[hsl(var(--muted-foreground))]">
                {event.capacity - event.registered_count > 0
                  ? `${event.capacity - event.registered_count} spots remaining`
                  : "This event is fully booked"}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
