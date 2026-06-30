import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Package, BookOpen, ShieldCheck, Mail, Users, Plus, ArrowRight, Activity, GraduationCap, FileText, Star, Image, Handshake, LayoutDashboard, LogOut } from "lucide-react";
import { listProducts } from "@/lib/api/products.functions";
import { listResearch } from "@/lib/api/research.functions";
import { listStandards } from "@/lib/api/standards.functions";
import { listCourses } from "@/lib/api/courses.functions";
import { listBlogs } from "@/lib/api/blogs.functions";
import { listTestimonials } from "@/lib/api/testimonials.functions";
import { listGallery } from "@/lib/api/gallery.functions";
import { listPartners } from "@/lib/api/partners.functions";
import { listContactSubmissions } from "@/lib/api/contact.functions";
import { listSubscribers } from "@/lib/api/newsletter.functions";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

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

function StatCard({ icon: Icon, label, value, href }: { icon: React.ElementType; label: string; value: string | number; href?: string }) {
  const content = (
    <div className="rounded-xl border border-border bg-white p-6 transition-all hover:border-brand/30 hover:shadow-card-hover">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-extrabold text-foreground">{value}</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand/10">
          <Icon className="h-6 w-6 text-brand" />
        </div>
      </div>
    </div>
  );

  if (href) {
    return <Link to={href as never}>{content}</Link>;
  }
  return content;
}

function AdminDashboard() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();

  const { data: products } = useQuery({ queryKey: ["admin", "products"], queryFn: listProducts });
  const { data: research } = useQuery({ queryKey: ["admin", "research"], queryFn: listResearch });
  const { data: standards } = useQuery({ queryKey: ["admin", "standards"], queryFn: listStandards });
  const { data: courses } = useQuery({ queryKey: ["admin", "courses"], queryFn: listCourses });
  const { data: blogs } = useQuery({ queryKey: ["admin", "blogs"], queryFn: listBlogs });
  const { data: testimonials } = useQuery({ queryKey: ["admin", "testimonials"], queryFn: listTestimonials });
  const { data: gallery } = useQuery({ queryKey: ["admin", "gallery"], queryFn: listGallery });
  const { data: partners } = useQuery({ queryKey: ["admin", "partners"], queryFn: listPartners });
  const { data: contacts } = useQuery({ queryKey: ["admin", "contacts"], queryFn: listContactSubmissions });
  const { data: subscribers } = useQuery({ queryKey: ["admin", "subscribers"], queryFn: listSubscribers });

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.navigate({ to: "/" });
  }

  if (authLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground">Admin Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Welcome back, {user?.email?.split("@")[0] ?? "Admin"}
          </p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={GraduationCap} label="Courses" value={courses?.length ?? 0} href="/admin/courses" />
        <StatCard icon={Package} label="Products" value={products?.length ?? 0} href="/admin/products" />
        <StatCard icon={FileText} label="Blog Posts" value={blogs?.length ?? 0} href="/admin/blogs" />
        <StatCard icon={BookOpen} label="Research" value={research?.length ?? 0} href="/admin/research" />
        <StatCard icon={ShieldCheck} label="Standards" value={standards?.length ?? 0} href="/admin/standards" />
        <StatCard icon={Star} label="Testimonials" value={testimonials?.length ?? 0} href="/admin/testimonials" />
        <StatCard icon={Image} label="Gallery" value={gallery?.length ?? 0} href="/admin/gallery" />
        <StatCard icon={Handshake} label="Partners" value={partners?.length ?? 0} href="/admin/partners" />
        <StatCard icon={Mail} label="Contact Messages" value={contacts?.length ?? 0} />
        <StatCard icon={Users} label="Subscribers" value={subscribers?.length ?? 0} />
        <StatCard icon={Activity} label="Total Content" value={(courses?.length ?? 0) + (products?.length ?? 0) + (blogs?.length ?? 0) + (research?.length ?? 0) + (standards?.length ?? 0) + (testimonials?.length ?? 0) + (gallery?.length ?? 0) + (partners?.length ?? 0)} />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-white p-6">
          <h2 className="text-lg font-bold text-foreground">Quick Actions</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link to="/admin/courses" className="flex items-center gap-3 rounded-lg border border-border bg-surface p-4 text-sm transition-all hover:border-brand/30 hover:bg-white">
              <GraduationCap className="h-5 w-5 text-brand" />
              <span>Manage Courses</span>
              <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
            </Link>
            <Link to="/admin/products" className="flex items-center gap-3 rounded-lg border border-border bg-surface p-4 text-sm transition-all hover:border-brand/30 hover:bg-white">
              <Package className="h-5 w-5 text-brand" />
              <span>Manage Products</span>
              <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
            </Link>
            <Link to="/admin/blogs" className="flex items-center gap-3 rounded-lg border border-border bg-surface p-4 text-sm transition-all hover:border-brand/30 hover:bg-white">
              <FileText className="h-5 w-5 text-brand" />
              <span>Manage Blog</span>
              <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
            </Link>
            <Link to="/admin/research" className="flex items-center gap-3 rounded-lg border border-border bg-surface p-4 text-sm transition-all hover:border-brand/30 hover:bg-white">
              <BookOpen className="h-5 w-5 text-brand" />
              <span>Manage Research</span>
              <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
            </Link>
            <Link to="/admin/testimonials" className="flex items-center gap-3 rounded-lg border border-border bg-surface p-4 text-sm transition-all hover:border-brand/30 hover:bg-white">
              <Star className="h-5 w-5 text-brand" />
              <span>Manage Testimonials</span>
              <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
            </Link>
            <Link to="/admin/gallery" className="flex items-center gap-3 rounded-lg border border-border bg-surface p-4 text-sm transition-all hover:border-brand/30 hover:bg-white">
              <Image className="h-5 w-5 text-brand" />
              <span>Manage Gallery</span>
              <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
            </Link>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-6">
          <h2 className="text-lg font-bold text-foreground">Recent Activity</h2>
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/10">
                <Mail className="h-4 w-4 text-brand" />
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
  const router = useRouter();

  const adminNavLinks = [
    { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
    { label: "Courses", to: "/admin/courses", icon: GraduationCap },
    { label: "Products", to: "/admin/products", icon: Package },
    { label: "Blog", to: "/admin/blogs", icon: FileText },
    { label: "Research", to: "/admin/research", icon: BookOpen },
    { label: "Standards", to: "/admin/standards", icon: ShieldCheck },
    { label: "Testimonials", to: "/admin/testimonials", icon: Star },
    { label: "Gallery", to: "/admin/gallery", icon: Image },
    { label: "Partners", to: "/admin/partners", icon: Handshake },
  ];

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.navigate({ to: "/" });
  }

  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <Link to="/" className="font-display text-sm font-bold tracking-tight text-foreground">
              ← MIKEN LABS
            </Link>
            <span className="rounded bg-brand/10 px-2 py-0.5 text-xs text-brand">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">{user?.email}</span>
            {!isAdmin && !loading && (
              <span className="rounded-md bg-amber-50 text-amber-600 border border-amber-200 px-2 py-1 text-[10px] uppercase tracking-wider">
                User
              </span>
            )}
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1400px]">
        <aside className="hidden w-56 shrink-0 border-r border-border bg-white p-4 md:block">
          <nav className="space-y-1">
            {adminNavLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground [&.active]:bg-brand/10 [&.active]:text-brand"
              >
                <l.icon className="h-4 w-4" />
                {l.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1 overflow-x-auto p-6 lg:p-8">
          {!loading && !isAdmin ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-white p-12 text-center">
              <ShieldCheck className="mb-4 h-12 w-12 text-muted-foreground" />
              <h2 className="text-xl font-bold text-foreground">Admin access required</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Your account does not have admin privileges. Contact the site administrator.
              </p>
            </div>
          ) : loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent" />
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
}
