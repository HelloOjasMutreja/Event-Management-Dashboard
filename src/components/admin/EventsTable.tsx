import { Link } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead className="hidden md:table-cell">Category</TableHead>
          <TableHead className="hidden sm:table-cell">Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="hidden lg:table-cell">Capacity</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event) => (
          <TableRow key={event.id}>
            <TableCell className="font-medium">
              <span className="line-clamp-1">{event.title}</span>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <Badge
                className={getCategoryColor(event.category)}
                variant="secondary"
              >
                {event.category}
              </Badge>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
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
              {event.registered_count}/{event.capacity}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Link to={`/admin/events/${event.id}/edit`}>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(event)}
                  className="text-[hsl(var(--destructive))] hover:text-[hsl(var(--destructive))]"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
