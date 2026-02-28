import { Calendar, Users, Clock, CheckCircle } from "lucide-react";
import StatsCard from "@/components/admin/StatsCard";
import EventsTable from "@/components/admin/EventsTable";
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
    { title: "Total Events", value: stats?.total ?? 0, icon: Calendar },
    { title: "Published", value: stats?.published ?? 0, icon: CheckCircle },
    { title: "Total Capacity", value: stats?.totalCapacity ?? 0, icon: Users },
    { title: "Upcoming", value: stats?.upcoming ?? 0, icon: Clock },
  ];

  if (statsLoading || eventsLoading) return <LoadingSpinner />;
  if (statsError) return <ErrorMessage onRetry={() => refetchStats()} />;
  if (eventsError) return <ErrorMessage onRetry={() => refetchEvents()} />;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <StatsCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
          />
        ))}
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Recent Events</h2>
        <EventsTable
          events={recentEvents?.data ?? []}
          onDelete={(event) => deleteEvent.mutate(event.id)}
        />
      </div>
    </div>
  );
}
