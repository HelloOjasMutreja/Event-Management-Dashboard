import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[hsl(var(--background))] neo-grid">
      <AdminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b-2 bg-[hsl(var(--card))] px-6 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <span className="text-sm font-semibold">Admin Panel</span>
        </header>

        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
