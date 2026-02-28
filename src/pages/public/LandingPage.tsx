import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EventCard from "@/components/events/EventCard";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useFeaturedEvents } from "@/hooks/useEvents";

const FEATURES = [
  {
    icon: Calendar,
    title: "Event Management",
    description:
      "Create, manage, and track all your club events in one place.",
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description: "Changes sync instantly across all devices via Supabase.",
  },
  {
    icon: Shield,
    title: "Secure Admin",
    description:
      "Protected admin dashboard with role-based authentication.",
  },
];

export default function LandingPage() {
  const { data: featuredEvents, isLoading } = useFeaturedEvents();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero */}
      <section className="container mx-auto flex flex-col items-center justify-center gap-6 px-4 py-20 text-center md:py-32">
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
          Manage Your Club Events{" "}
          <span className="text-[hsl(var(--primary))]">Effortlessly</span>
        </h1>
        <p className="max-w-xl text-lg text-[hsl(var(--muted-foreground))]">
          A modern dashboard to create, organize, and showcase your club events.
          Built for teams that want to stay organized.
        </p>
        <div className="flex gap-4">
          <Link to="/events">
            <Button size="lg">
              View Events <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="outline">
              Admin Login
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-[hsl(var(--muted))]/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-10 text-center text-3xl font-bold">
            Why ClubEvents?
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title}>
                  <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
                    <div className="rounded-full bg-[hsl(var(--primary))]/10 p-3">
                      <Icon className="h-6 w-6 text-[hsl(var(--primary))]" />
                    </div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Upcoming Events</h2>
          <Link to="/events">
            <Button variant="outline">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredEvents?.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
            {(!featuredEvents || featuredEvents.length === 0) && (
              <p className="col-span-full text-center text-[hsl(var(--muted-foreground))]">
                No upcoming events yet.
              </p>
            )}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
