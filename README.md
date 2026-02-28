# Club Event Management Dashboard

A production-ready, responsive dashboard for managing club events — built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, **shadcn/ui**, and **Supabase**.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3FCF8E?logo=supabase&logoColor=white)

---

## Features

### Public
- **Landing Page** — Hero section, feature highlights, and featured upcoming events
- **Events Listing** — Searchable, filterable grid with pagination
- **Event Detail** — Full event information display

### Admin (Protected)
- **Dashboard** — Stats overview (total, published, upcoming, capacity) + recent events table
- **Events Management** — Full CRUD table with search, category, and status filters + pagination
- **Create / Edit Event** — Validated form (Zod) with all event fields
- **Authentication** — Email/password via Supabase Auth with protected routes

### Technical
- Lazy-loaded routes for optimal bundle splitting
- TanStack Query for server-state caching & mutations
- Responsive design (mobile → desktop)
- Toast notifications
- shadcn/ui component library (manually composed)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build | Vite 6 |
| Styling | Tailwind CSS v4 + CSS variables |
| Components | shadcn/ui (Radix UI + CVA) |
| Backend | Supabase (Auth, PostgreSQL, Storage) |
| Server State | TanStack Query (React Query) |
| Routing | React Router v6 |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |

---

## Project Structure

```
club-events-dashboard/
├── public/
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql    # DB schema, RLS, triggers
├── src/
│   ├── components/
│   │   ├── admin/                    # StatsCard, EventsTable, DeleteConfirmDialog
│   │   ├── common/                   # LoadingSpinner, ErrorMessage, EmptyState
│   │   ├── events/                   # EventCard, EventList, EventDetail, EventForm
│   │   ├── layout/                   # Navbar, Footer, AdminSidebar, AdminLayout
│   │   └── ui/                       # shadcn/ui primitives (button, card, etc.)
│   ├── hooks/                        # useAuth, useEvents, useEventMutations
│   ├── lib/                          # supabase client, utils (cn, formatDate, etc.)
│   ├── pages/
│   │   ├── admin/                    # Dashboard, EventsManagement, Create, Edit
│   │   └── public/                   # Landing, Events, EventDetail, Login
│   ├── routes/                       # ProtectedRoute
│   ├── schemas/                      # Zod validation (eventSchema)
│   ├── types/                        # TypeScript interfaces & Supabase DB types
│   ├── App.tsx                       # Route definitions + Suspense
│   ├── main.tsx                      # Entry point (providers)
│   └── index.css                     # Tailwind + CSS custom properties
├── .env.example
├── .env.local                        # Your Supabase credentials (git-ignored)
├── vercel.json                       # SPA rewrite for Vercel
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- A **Supabase** project (free tier works)

### 1. Clone the repository

```bash
git clone https://github.com/HelloOjasMutreja/Event-Management-Dashboard.git
cd Event-Management-Dashboard/club-events-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example file and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Set up the database

Run the SQL migration in your Supabase SQL Editor:

```
supabase/migrations/001_initial_schema.sql
```

This creates the `events` table, RLS policies, `updated_at` trigger, and storage bucket.

### 5. Create an admin user

In Supabase Dashboard → **Authentication** → **Users** → **Add User** (email + password). This user will be able to access the `/admin` routes.

### 6. Start the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

---

## Deployment (Vercel)

1. Push to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Set **Root Directory** to `club-events-dashboard`
4. Set **Framework Preset** to `Vite`
5. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Deploy

A `vercel.json` is included for SPA history-mode routing.

---

## Data Model

```sql
events (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT NOT NULL,
  description   TEXT NOT NULL,
  date          DATE NOT NULL,
  time          TIME NOT NULL,
  location      TEXT NOT NULL,
  capacity      INTEGER NOT NULL DEFAULT 50,
  registered_count INTEGER NOT NULL DEFAULT 0,
  category      TEXT NOT NULL CHECK (...),
  status        TEXT NOT NULL DEFAULT 'draft' CHECK (...),
  image_url     TEXT,
  created_by    UUID REFERENCES auth.users(id),
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);
```

Row-Level Security is configured so:
- **Anyone** can read published events
- Only **authenticated** users can insert, update, and delete events

---

## License

This project is for educational / club management purposes.
