import { Link } from "react-router-dom";
import {
  ArrowRight,
  Calendar,
  Shield,
  Zap,
  Users,
  Sparkles,
  TrendingUp,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EventCard from "@/components/events/EventCard";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useFeaturedEvents, useDashboardStats } from "@/hooks/useEvents";

const FEATURES = [
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description:
      "Create and manage events with date, time, location, and capacity tracking — all in one organized dashboard.",
    iconBg: "bg-[hsl(var(--pastel-blue))] text-sky-700",
  },
  {
    icon: Zap,
    title: "Real-time Sync",
    description:
      "Powered by Supabase, every change reflects instantly across all devices. No manual refreshes needed.",
    iconBg: "bg-[hsl(var(--pastel-yellow))] text-amber-700",
  },
  {
    icon: Shield,
    title: "Secure Admin",
    description:
      "Role-based authentication protects your admin panel. Only authorized users can create or manage events.",
    iconBg: "bg-[hsl(var(--pastel-green))] text-emerald-700",
  },
];

export default function LandingPage() {
  const { data: featuredEvents, isLoading } = useFeaturedEvents();
  const { data: stats } = useDashboardStats();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 neo-grid" />

        <div className="container relative mx-auto px-4 py-24 md:py-36">
          <div className="mx-auto max-w-3xl text-center">
            <div className="animate-fade-up">
              <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-bold">
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                Built for modern teams
              </Badge>
            </div>

            <h1 className="animate-fade-up text-5xl font-extrabold tracking-tight leading-[1.1] md:text-7xl" style={{ animationDelay: "80ms" }}>
              Manage Events{" "}
              <span className="italic text-[hsl(var(--primary))]">Effortlessly</span>
            </h1>

            <p className="animate-fade-up mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[hsl(var(--muted-foreground))] md:text-xl" style={{ animationDelay: "160ms" }}>
              A modern dashboard to create, organize, and showcase your club
              events. Beautiful by default. Powerful under the hood.
            </p>

            <div className="animate-fade-up mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row" style={{ animationDelay: "240ms" }}>
              <Link to="/events">
                <Button size="lg" className="px-8 h-12 text-base">
                  Browse Events <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                  Admin Dashboard
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats strip */}
          {stats && (
            <div className="animate-fade-up mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-4 md:grid-cols-4" style={{ animationDelay: "320ms" }}>
              {[
                { label: "Total Events", value: stats.total, icon: Calendar },
                { label: "Published", value: stats.published, icon: TrendingUp },
                { label: "Upcoming", value: stats.upcoming, icon: Clock },
                { label: "Total Seats", value: stats.totalCapacity.toLocaleString(), icon: Users },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-1 rounded-2xl border-2 bg-[hsl(var(--card))] p-4 shadow-brutal-sm">
                  <stat.icon className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                  <span className="text-2xl font-bold">{stat.value}</span>
                  <span className="text-xs text-[hsl(var(--muted-foreground))]">{stat.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="border-t-2 bg-[hsl(var(--muted))]/40 py-20 neo-grid">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Why <span className="text-[hsl(var(--primary))]">ClubEvents</span>?
            </h2>
            <p className="mt-3 text-[hsl(var(--muted-foreground))]">
              Everything you need to run a thriving club community.
            </p>
          </div>

          <div className="stagger-children mt-12 grid gap-6 md:grid-cols-3">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="group relative transition-all duration-200 hover:-translate-y-1"
                >
                  <CardContent className="flex flex-col gap-4 p-7">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${feature.iconBg} transition-transform group-hover:scale-110`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Featured Events ── */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Upcoming Events
            </h2>
            <p className="mt-1 text-[hsl(var(--muted-foreground))]">
              Don't miss what's happening next.
            </p>
          </div>
          <Link to="/events">
            <Button variant="outline" className="group">
              View All Events
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="stagger-children grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredEvents?.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
            {(!featuredEvents || featuredEvents.length === 0) && (
              <p className="col-span-full py-12 text-center text-[hsl(var(--muted-foreground))]">
                No upcoming events yet. Check back soon!
              </p>
            )}
          </div>
        )}
      </section>

      {/* ── CTA ── */}
      <section className="border-t-2">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="mx-auto max-w-lg">
            <h2 className="text-3xl font-bold tracking-tight">
              Ready to <span className="italic text-[hsl(var(--primary))]">get started</span>?
            </h2>
            <p className="mt-3 text-[hsl(var(--muted-foreground))]">
              Log in to the admin panel and start creating events for your community.
            </p>
            <Link to="/login" className="mt-8 inline-block">
              <Button size="lg" className="h-12 px-8 text-base">
                Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
