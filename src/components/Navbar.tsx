import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, Shield } from "lucide-react";
import { brand, navLinks } from "@/lib/site-data";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const { session } = useAuth();

  useEffect(() => {
    if (session?.user) {
      supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .maybeSingle()
        .then(({ data }) => setShowAdmin(data?.role === "admin"));
    } else {
      setShowAdmin(false);
    }
  }, [session]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-white/90 backdrop-blur-xl shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6 lg:px-12">
        <Link to="/" className="flex items-center gap-3">
          <img src={brand.logo} alt="Miken Labs logo" className="h-9 w-9 rounded-md object-cover" />
          <span className="font-display text-lg font-bold tracking-tight text-foreground">MIKEN LABS</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground [&.active]:bg-brand/10 [&.active]:text-brand"
            >
              {l.label}
            </Link>
          ))}
          {showAdmin && (
            <Link
              to="/admin"
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-brand transition-colors hover:bg-brand/10"
            >
              <Shield className="h-3.5 w-3.5" /> Admin
            </Link>
          )}
        </div>

        <button
          className="lg:hidden"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <Menu className="h-6 w-6 text-foreground" />
        </button>
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 bg-white/98 backdrop-blur-xl lg:hidden">
          <div className="flex h-16 items-center justify-between px-6">
            <span className="font-display text-lg font-bold text-foreground">MIKEN LABS</span>
            <button aria-label="Close menu" onClick={() => setOpen(false)}>
              <X className="h-6 w-6 text-foreground" />
            </button>
          </div>
          <div className="flex flex-col gap-1 px-6 pt-4">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-foreground transition-colors hover:bg-surface"
              >
                {l.label}
              </Link>
            ))}
            {showAdmin && (
              <Link
                to="/admin"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-lg px-4 py-3 text-brand transition-colors hover:bg-brand/10"
              >
                <Shield className="h-4 w-4" /> Admin
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
