# Miken Labs

An AI research and engineering lab — building intelligent systems, training people, and shipping products that solve real problems.

**Stack:** TanStack Start (React 19) · Supabase · Tailwind CSS v4 · TypeScript

---

## Quick Start

```bash
npm install
npm run dev
```

Opens at `http://localhost:3000`.

## Environment

Copy `.env` (already present) — it holds Supabase credentials for the project at `hjxonpfeulzynittzmlw`.

| Variable | Purpose |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Anon (public) key — safe for client |
| `SUPABASE_URL` | Server-side copy |
| `SUPABASE_PUBLISHABLE_KEY` | Server-side copy |
| `SUPABASE_SERVICE_ROLE_KEY` | **Add this for admin server functions** |

## Scripts

| Command | Action |
|---|---|
| `npm run dev` | Start dev server (Vite) |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Run Prettier |

## Architecture

### Public Pages
- `/` — Home (hero, stats, services, products, articles, newsletter)
- `/about` — Company info, mission, values, founder
- `/products` — Product listing (from Supabase)
- `/research` — Research initiatives (from Supabase)
- `/standards` — AI standards (from Supabase)
- `/contact` — Contact form (submits to Supabase)
- `/auth` — Login / signup

### Admin Panel
- `/admin` Dashboard with content stats and quick actions
- `/admin/products` — CRUD for products
- `/admin/research` — CRUD for research posts
- `/admin/standards` — CRUD for standards pages

Admin access requires a Supabase user with the `admin` role. The first user created automatically gets admin. Subsequent users get the `user` role.

### Database Tables

| Table | Purpose |
|---|---|
| `products` | Product listings with tags, status, URLs |
| `research` | Research posts with content, category, tags |
| `standards` | AI standards pages with icons |
| `user_roles` | Role-based access (admin/user) |
| `contact_submissions` | Contact form submissions |
| `newsletter_subscribers` | Newsletter email subscriptions |

### Key Files

| File | Purpose |
|---|---|
| `src/routes/` | All pages (file-based routing) |
| `src/lib/api/*.functions.ts` | Server functions (CRUD) |
| `src/lib/cms.ts` | CMS resource configs |
| `src/components/admin/ResourceManager.tsx` | Generic CRUD manager |
| `src/integrations/supabase/` | Supabase clients + auth middleware |
| `supabase/migrations/` | Database schema |

## Security

- **RLS** enabled on all tables. Public read for content; admin-only write.
- **Server functions** use service role key — keep `SUPABASE_SERVICE_ROLE_KEY` out of client bundles.
- **Input validation** via Zod schemas on all server functions.
- **Auth guard** (`_authenticated` layout) redirects unauthenticated users.
- **Admin checks** both client-side (UI) and server-side (RLS + server functions).

## Migrations

To apply new migrations, run the SQL in `supabase/migrations/` via the [Supabase Dashboard SQL Editor](https://supabase.com/dashboard/project/hjxonpfeulzynittzmlw/sql/new).

## License

© 2026 Miken Labs. All rights reserved.
