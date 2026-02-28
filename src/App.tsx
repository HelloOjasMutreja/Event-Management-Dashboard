import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import AdminLayout from "@/components/layout/AdminLayout";
import ProtectedRoute from "@/routes/ProtectedRoute";

/* Lazy-loaded pages */
const LandingPage = lazy(() => import("@/pages/public/LandingPage"));
const EventsPage = lazy(() => import("@/pages/public/EventsPage"));
const EventDetailPage = lazy(() => import("@/pages/public/EventDetailPage"));
const LoginPage = lazy(() => import("@/pages/public/LoginPage"));

const DashboardPage = lazy(() => import("@/pages/admin/DashboardPage"));
const EventsManagementPage = lazy(
  () => import("@/pages/admin/EventsManagementPage")
);
const CreateEventPage = lazy(() => import("@/pages/admin/CreateEventPage"));
const EditEventPage = lazy(() => import("@/pages/admin/EditEventPage"));

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center hero-mesh">
      <div className="text-center animate-fade-up">
        <h1 className="text-8xl font-extrabold gradient-text">404</h1>
        <p className="mt-3 text-lg text-[hsl(var(--muted-foreground))]">
          The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="mt-6 inline-block rounded-lg gradient-bg px-6 py-2.5 text-sm font-semibold text-gray-950 shadow-md shadow-[hsl(var(--primary))]/20 transition-shadow hover:shadow-lg"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Admin (protected) */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<DashboardPage />} />
              <Route path="/admin/events" element={<EventsManagementPage />} />
              <Route path="/admin/events/new" element={<CreateEventPage />} />
              <Route
                path="/admin/events/:id/edit"
                element={<EditEventPage />}
              />
            </Route>
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster />
    </>
  );
}

export default App;
