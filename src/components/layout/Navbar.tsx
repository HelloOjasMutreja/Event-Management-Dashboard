import { Link, useLocation } from "react-router-dom";
import { Calendar, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b-2 bg-[hsl(var(--background))] shadow-[0_2px_0_hsl(var(--border))]"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="group flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-[hsl(var(--border))] bg-[hsl(var(--primary))] shadow-brutal-sm">
            <Calendar className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            Club<span className="text-[hsl(var(--primary))]">Events</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "relative px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                location.pathname === link.href
                  ? "text-[hsl(var(--primary))] bg-[hsl(var(--primary))]/5"
                  : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-2 h-5 w-px bg-[hsl(var(--border))]" />
          <Link to="/login" className="ml-2">
            <Button size="sm">
              Admin Login
            </Button>
          </Link>
        </nav>

        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t-2 bg-[hsl(var(--background))] md:hidden animate-fade-in">
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                  location.pathname === link.href
                    ? "text-[hsl(var(--primary))] bg-[hsl(var(--primary))]/5"
                    : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/login" onClick={() => setMobileOpen(false)} className="mt-2">
              <Button size="sm" className="w-full">
                Admin Login
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
