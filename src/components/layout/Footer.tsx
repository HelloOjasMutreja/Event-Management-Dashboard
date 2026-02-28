import { Calendar } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-[hsl(var(--background))]">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
        <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
          <Calendar className="h-4 w-4" />
          <span>ClubEvents &copy; {new Date().getFullYear()}</span>
        </div>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          Built with React, Supabase &amp; Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
