import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, Globe } from "lucide-react";
import { brand, navLinks } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-[1200px] px-6 py-16 lg:px-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src={brand.logo} alt="Miken Labs logo" className="h-10 w-10 rounded-md object-cover" />
              <span className="font-display text-lg font-bold">MIKEN LABS</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              An AI research and engineering lab. We train, build and ship intelligent
              systems that solve real problems and drive growth.
            </p>
            <p className="mt-4 font-mono text-xs uppercase tracking-widest text-brand-glow">
              {brand.tagline}
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold">Explore</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="transition-colors hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold">Connect</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Globe className="h-4 w-4" /> {brand.site}</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> {brand.email}</li>
            </ul>
            <div className="mt-5 flex gap-3 text-muted-foreground">
              <Facebook className="h-5 w-5 transition-colors hover:text-foreground" />
              <Instagram className="h-5 w-5 transition-colors hover:text-foreground" />
              <Linkedin className="h-5 w-5 transition-colors hover:text-foreground" />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Miken Labs. All rights reserved.</p>
          <p>Founded by {brand.founder}</p>
        </div>
      </div>
    </footer>
  );
}
