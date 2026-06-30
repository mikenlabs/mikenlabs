import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight, Mail, Phone, Globe, Facebook, Twitter, Instagram, Linkedin, Youtube, CheckCircle2 } from "lucide-react";
import { brand, navLinks } from "@/lib/site-data";
import { subscribeNewsletter } from "@/lib/api/newsletter.functions";

const quickLinks1 = navLinks.filter((_, i) => i < 4);
const quickLinks2 = navLinks.filter((_, i) => i >= 4);

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await subscribeNewsletter({ data: { email } });
      setSubscribed(true);
      setEmail("");
      toast.success("Subscribed successfully!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Subscription failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-[1200px] px-6 py-16 lg:px-12">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src={brand.logo} alt="Miken Labs logo" className="h-10 w-10 rounded-md object-cover" />
              <span className="font-display text-lg font-bold text-foreground">MIKEN LABS</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {brand.mission}
            </p>
            <p className="mt-4 font-mono text-xs uppercase tracking-widest text-brand">
              {brand.tagline}
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-foreground">Quick Links</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {quickLinks1.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="transition-colors hover:text-brand">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-foreground">More</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {quickLinks2.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="transition-colors hover:text-brand">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-foreground">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-brand" />
                <span>{brand.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-brand" />
                <span>{brand.email}</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="h-4 w-4 shrink-0 text-brand" />
                <span>{brand.site}</span>
              </li>
            </ul>
            <div className="mt-5 flex gap-3 text-muted-foreground">
              <a href="#" className="rounded-lg p-2 transition-colors hover:bg-brand/10 hover:text-brand" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-lg p-2 transition-colors hover:bg-brand/10 hover:text-brand" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-lg p-2 transition-colors hover:bg-brand/10 hover:text-brand" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-lg p-2 transition-colors hover:bg-brand/10 hover:text-brand" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-lg p-2 transition-colors hover:bg-brand/10 hover:text-brand" aria-label="YouTube">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="w-full max-w-md md:w-auto">
              {subscribed ? (
                <div className="flex items-center gap-2 text-sm text-emerald-600">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Thanks for subscribing!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Subscribe to our newsletter"
                    className="flex-1 rounded-lg border border-border bg-white px-4 py-2 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-ring/30"
                  />
                  <button
                    type="submit"
                    disabled={busy}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white transition-all hover:bg-brand-bright disabled:opacity-60"
                  >
                    {busy ? "..." : "Subscribe"} <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </form>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} {brand.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
