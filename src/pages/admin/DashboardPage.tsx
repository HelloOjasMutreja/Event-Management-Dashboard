import { Calendar, Users, Clock, CheckCircle, TrendingUp, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import StatsCard from "@/components/admin/StatsCard";
import EventsTable from "@/components/admin/EventsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ErrorMessage from "@/components/common/ErrorMessage";
import { useDashboardStats, useAllEvents } from "@/hooks/useEvents";
import { useDeleteEvent } from "@/hooks/useEventMutations";

export default function DashboardPage() {
  const { data: stats, isLoading: statsLoading, error: statsError, refetch: refetchStats } =
    useDashboardStats();
  const { data: recentEvents, isLoading: eventsLoading, error: eventsError, refetch: refetchEvents } =
    useAllEvents(undefined, { page: 1, pageSize: 5 });
  const deleteEvent = useDeleteEvent();

  const statCards = [
    {
      title: "Total Events",
      value: stats?.total ?? 0,
      icon: Calendar,
      description: "All events created",
      color: "text-blue-600 bg-blue-50",
    },
    {
      title: "Published",
      value: stats?.published ?? 0,
      icon: CheckCircle,
      description: "Visible to the public",
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      title: "Upcoming",
      value: stats?.upcoming ?? 0,
      icon: Clock,
      description: "Scheduled events",
      color: "text-amber-600 bg-amber-50",
    },
    {
      title: "Total Capacity",
      value: (stats?.totalCapacity ?? 0).toLocaleString(),
      icon: Users,
      description: "Across all events",
      color: "text-purple-600 bg-purple-50",
    },
  ];

  if (statsLoading || eventsLoading) return <LoadingSpinner />;
  if (statsError) return <ErrorMessage onRetry={() => refetchStats()} />;
  if (eventsError) return <ErrorMessage onRetry={() => refetchEvents()} />;

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-[hsl(var(--muted-foreground))]">
          Overview of your club's events and activity.
        </p>
      </div>

      {/* Stats grid */}
      <div className="stagger-children grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <StatsCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
            description={card.description}
            iconColor={card.color}
          />
        ))}
      </div>

      {/* Recent events */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div>
            <CardTitle className="text-lg">Recent Events</CardTitle>
            <p className="mt-0.5 text-sm text-[hsl(var(--muted-foreground))]">
              Latest events in your dashboard
            </p>
          </div>
          <Link to="/admin/events">
            <Button variant="outline" size="sm">View All</Button>
          </Link>
        </CardHeader>
        <CardContent className="pt-0">
          <EventsTable
            events={recentEvents?.data ?? []}
            onDelete={(event) => deleteEvent.mutate(event.id)}
          />
        </CardContent>
      </Card>
    </div>
  );
}
