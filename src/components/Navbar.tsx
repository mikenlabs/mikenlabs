import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { brand, navLinks } from "@/lib/site-data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-border bg-surface/85 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6 lg:px-12">
        <Link to="/" className="flex items-center gap-3">
          <img src={brand.logo} alt="Miken Labs logo" className="h-9 w-9 rounded-md object-cover" />
          <span className="font-display text-lg font-bold tracking-tight">MIKEN LABS</span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground [&.active]:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-lg border border-brand-bright bg-brand px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-brand-bright hover:shadow-glow"
          >
            Contact Us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <button
          className="lg:hidden"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 bg-background/98 backdrop-blur-xl lg:hidden">
          <div className="flex h-16 items-center justify-between px-6">
            <span className="font-display text-lg font-bold">MIKEN LABS</span>
            <button aria-label="Close menu" onClick={() => setOpen(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col gap-2 px-6 pt-6">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="border-b border-border py-4 text-lg"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-4 py-3 font-medium text-primary-foreground"
            >
              Contact Us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
