import { Calendar, Github, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t bg-[hsl(var(--muted))]/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-bg">
                <Calendar className="h-4 w-4 text-gray-950" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                Club<span className="gradient-text">Events</span>
              </span>
            </Link>
            <p className="text-sm text-[hsl(var(--muted-foreground))] max-w-xs leading-relaxed">
              A modern platform for managing and showcasing club events. Built for teams that care about organization.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2">
              {[
                { href: "/", label: "Home" },
                { href: "/events", label: "Browse Events" },
                { href: "/login", label: "Admin Login" },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Built With */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
              Built With
            </h4>
            <div className="flex flex-wrap gap-2">
              {["React", "TypeScript", "Supabase", "Tailwind CSS", "Vite"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-[hsl(var(--muted))] px-3 py-1 text-xs font-medium text-[hsl(var(--muted-foreground))]"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row">
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            &copy; {new Date().getFullYear()} ClubEvents. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-[hsl(var(--muted-foreground))]">
            Made with <Heart className="h-3 w-3 text-[hsl(var(--primary))] fill-[hsl(var(--primary))]" /> by SIGKDD
          </p>
        </div>
      </div>
    </footer>
  );
}
