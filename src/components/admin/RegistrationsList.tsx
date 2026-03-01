import { useRegistrations, useDeleteRegistration } from "@/hooks/useRegistrations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, Trash2, Loader2, Download } from "lucide-react";
import type { Registration } from "@/types";

interface RegistrationsListProps {
  eventId: string;
  eventTitle: string;
}

export default function RegistrationsList({
  eventId,
  eventTitle,
}: RegistrationsListProps) {
  const { data: registrations, isLoading } = useRegistrations(eventId);
  const deleteMutation = useDeleteRegistration();

  const handleDelete = (reg: Registration) => {
    if (
      confirm(
        `Remove registration for ${reg.name} (${reg.registration_number})?`
      )
    ) {
      deleteMutation.mutate({ id: reg.id, eventId });
    }
  };

  const handleExportCSV = () => {
    if (!registrations?.length) return;
    const headers = [
      "Registration No.",
      "Name",
      "Email",
      "Department",
      "Year",
      "Section",
      "Phone",
      "Registered At",
    ];
    const rows = registrations.map((r) => [
      r.registration_number,
      r.name,
      r.email,
      r.department,
      r.year,
      r.section ?? "",
      r.phone ?? "",
      new Date(r.created_at).toLocaleString(),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${eventTitle.replace(/\s+/g, "_")}_registrations.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="flex items-center gap-2 text-base font-semibold font-sans">
          <Users className="h-4 w-4 text-[hsl(var(--primary))]" />
          Registrations
          {registrations && (
            <Badge variant="secondary" className="ml-1">
              {registrations.length}
            </Badge>
          )}
        </CardTitle>
        {registrations && registrations.length > 0 && (
          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            <Download className="mr-1.5 h-3.5 w-3.5" />
            Export CSV
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-5 w-5 animate-spin text-[hsl(var(--muted-foreground))]" />
          </div>
        ) : !registrations?.length ? (
          <p className="text-sm text-center py-8 text-[hsl(var(--muted-foreground))]">
            No registrations yet.
          </p>
        ) : (
          <div className="overflow-x-auto -mx-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Reg. No.</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Section</TableHead>
                  <TableHead className="pr-6 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registrations.map((reg) => (
                  <TableRow key={reg.id}>
                    <TableCell className="pl-6 font-mono text-xs">
                      {reg.registration_number}
                    </TableCell>
                    <TableCell className="font-medium">{reg.name}</TableCell>
                    <TableCell className="text-sm text-[hsl(var(--muted-foreground))]">
                      {reg.email}
                    </TableCell>
                    <TableCell className="text-sm">
                      {reg.department}
                    </TableCell>
                    <TableCell className="text-sm">{reg.year}</TableCell>
                    <TableCell className="text-sm">
                      {reg.section || "—"}
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--destructive))]"
                        onClick={() => handleDelete(reg)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
