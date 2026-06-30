import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Package, BookOpen, ShieldCheck, Mail, Users, Plus, ArrowRight, Activity } from "lucide-react";
import { listProducts } from "@/lib/api/products.functions";
import { listResearch } from "@/lib/api/research.functions";
import { listStandards } from "@/lib/api/standards.functions";
import { listContactSubmissions } from "@/lib/api/contact.functions";
import { listSubscribers } from "@/lib/api/newsletter.functions";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/_authenticated/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard | Miken Labs" },
      { name: "description", content: "Admin dashboard for Miken Labs CMS." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminDashboard,
});

function StatCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: string | number; color: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-6 transition-all hover:border-brand-bright hover:shadow-glow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className={`mt-2 text-3xl font-extrabold ${color}`}>{value}</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${color.replace('text-', 'bg-').replace('gradient', 'brand/15')} bg-brand/15`}>
          <Icon className="h-6 w-6 text-brand-glow" />
        </div>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const { user, isAdmin, loading: authLoading } = useAuth();

  const { data: products } = useQuery({ queryKey: ["admin", "products"], queryFn: listProducts });
  const { data: research } = useQuery({ queryKey: ["admin", "research"], queryFn: listResearch });
  const { data: standards } = useQuery({ queryKey: ["admin", "standards"], queryFn: listStandards });
  const { data: contacts } = useQuery({ queryKey: ["admin", "contacts"], queryFn: listContactSubmissions });
  const { data: subscribers } = useQuery({ queryKey: ["admin", "subscribers"], queryFn: listSubscribers });

  if (authLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-glow border-t-transparent" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold">Admin Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Welcome back, {user?.email?.split("@")[0] ?? "Admin"}
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard icon={Package} label="Products" value={products?.length ?? 0} color="text-brand-glow" />
        <StatCard icon={BookOpen} label="Research" value={research?.length ?? 0} color="text-brand-glow" />
        <StatCard icon={ShieldCheck} label="Standards" value={standards?.length ?? 0} color="text-brand-glow" />
        <StatCard icon={Mail} label="Contact Messages" value={contacts?.length ?? 0} color="text-[oklch(0.7_0.16_150)]" />
        <StatCard icon={Users} label="Newsletter Subscribers" value={subscribers?.length ?? 0} color="text-[oklch(0.78_0.14_70)]" />
        <StatCard icon={Activity} label="Total Content" value={(products?.length ?? 0) + (research?.length ?? 0) + (standards?.length ?? 0)} color="text-brand-glow" />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-lg font-bold">Quick Actions</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link to="/admin/products" className="flex items-center gap-3 rounded-lg border border-border bg-background p-4 text-sm transition-all hover:border-brand-bright hover:bg-elevated">
              <Package className="h-5 w-5 text-brand-glow" />
              <span>Manage Products</span>
              <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
            </Link>
            <Link to="/admin/research" className="flex items-center gap-3 rounded-lg border border-border bg-background p-4 text-sm transition-all hover:border-brand-bright hover:bg-elevated">
              <BookOpen className="h-5 w-5 text-brand-glow" />
              <span>Manage Research</span>
              <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
            </Link>
            <Link to="/admin/standards" className="flex items-center gap-3 rounded-lg border border-border bg-background p-4 text-sm transition-all hover:border-brand-bright hover:bg-elevated">
              <ShieldCheck className="h-5 w-5 text-brand-glow" />
              <span>Manage Standards</span>
              <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
            </Link>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-lg font-bold">Recent Activity</h2>
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/15">
                <Plus className="h-4 w-4 text-brand-glow" />
              </div>
              <div>
                <p className="font-medium text-foreground">{contacts?.[0]?.name ?? "No recent activity"}</p>
                <p className="text-xs text-muted-foreground">
                  {contacts?.[0] ? `${contacts[0].subject?.slice(0, 40)}...` : "Awaiting your first action"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, loading } = useAuth();
  const adminNavLinks = [
    { label: "Dashboard", to: "/admin" },
    { label: "Products", to: "/admin/products" },
    { label: "Research", to: "/admin/research" },
    { label: "Standards", to: "/admin/standards" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface/85 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <Link to="/" className="font-display text-sm font-bold tracking-tight">
              ← MIKEN LABS
            </Link>
            <span className="text-xs text-muted-foreground">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">{user?.email}</span>
            {!isAdmin && !loading && (
              <span className="rounded-md bg-[oklch(0.78_0.14_70)]/10 px-2 py-1 text-[10px] uppercase tracking-wider text-[oklch(0.78_0.14_70)]">
                User
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1400px]">
        <aside className="hidden w-56 shrink-0 border-r border-border p-4 md:block">
          <nav className="space-y-1">
            {adminNavLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground [&.active]:bg-brand/15 [&.active]:text-brand-glow"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1 overflow-x-auto p-6 lg:p-8">
          {!loading && !isAdmin ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface p-12 text-center">
              <ShieldCheck className="mb-4 h-12 w-12 text-muted-foreground" />
              <h2 className="text-xl font-bold">Admin access required</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Your account does not have admin privileges. Contact the site administrator.
              </p>
            </div>
          ) : loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-glow border-t-transparent" />
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
}
