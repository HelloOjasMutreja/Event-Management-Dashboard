import { Link } from "react-router-dom";
import { Edit, Trash2, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate, getStatusColor, getCategoryColor } from "@/lib/utils";
import type { Event } from "@/types";

interface EventsTableProps {
  events: Event[];
  onDelete: (event: Event) => void;
}

export default function EventsTable({ events, onDelete }: EventsTableProps) {
  return (
    <div className="rounded-2xl border-2 overflow-hidden shadow-brutal">
      <Table>
        <TableHeader>
          <TableRow className="bg-[hsl(var(--muted))] hover:bg-[hsl(var(--muted))]">
            <TableHead className="font-semibold">Event</TableHead>
            <TableHead className="hidden md:table-cell font-semibold">Category</TableHead>
            <TableHead className="hidden sm:table-cell font-semibold">Date</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="hidden lg:table-cell font-semibold">Capacity</TableHead>
            <TableHead className="text-right font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => {
            const pct = event.capacity
              ? Math.round((event.registered_count / event.capacity) * 100)
              : 0;
            return (
              <TableRow key={event.id} className="group">
                <TableCell>
                  <div className="flex items-center gap-3">
                    {event.image_url && (
                      <img
                        src={event.image_url}
                        alt=""
                        className="hidden sm:block h-9 w-14 rounded-lg border-2 border-[hsl(var(--border))] object-cover"
                      />
                    )}
                    <span className="font-medium line-clamp-1">{event.title}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge
                    className={getCategoryColor(event.category)}
                    variant="secondary"
                  >
                    {event.category}
                  </Badge>
                </TableCell>
                <TableCell className="hidden sm:table-cell text-[hsl(var(--muted-foreground))]">
                  {formatDate(event.date)}
                </TableCell>
                <TableCell>
                  <Badge
                    className={getStatusColor(event.status)}
                    variant="secondary"
                  >
                    {event.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[hsl(var(--muted-foreground))]">
                      {event.registered_count}/{event.capacity}
                    </span>
                    <div className="h-1.5 w-16 overflow-hidden rounded-full bg-[hsl(var(--muted))]">
                      <div
                        className={`h-full rounded-full ${
                          pct >= 90 ? "bg-[hsl(var(--destructive))]" : "bg-[hsl(var(--primary))]"
                        }`}
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                    <Link to={`/admin/events/${event.id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                    <Link to={`/admin/events/${event.id}/edit`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(event)}
                      className="h-8 w-8 text-[hsl(var(--destructive))] hover:text-[hsl(var(--destructive))] hover:bg-[hsl(var(--destructive))]/5"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
