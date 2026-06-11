import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Globe, Send } from "lucide-react";
import { PageLayout, Badge } from "@/components/Layout";
import { CircuitBackground } from "@/components/CircuitBackground";
import { brand } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Miken Labs" },
      { name: "description", content: "Get in touch with Miken Labs to train your team, build your ideas and ship your success." },
      { property: "og:title", content: "Contact | Miken Labs" },
      { property: "og:description", content: "Let's train you, build your ideas and ship your success." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <PageLayout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow" />
        <CircuitBackground />
        <div className="relative mx-auto grid min-h-[88vh] max-w-[1200px] items-center gap-12 px-6 pt-36 pb-20 lg:grid-cols-2 lg:px-12">
          <div>
            <Badge>Get in touch</Badge>
            <h1 className="mt-6 text-4xl font-extrabold md:text-6xl">
              Ready to start your <span className="text-gradient">tech journey?</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Let's train you, build your ideas and ship your success. Tell us what you're
              working on and we'll get back to you.
            </p>
            <div className="mt-8 space-y-3 text-muted-foreground">
              <p className="flex items-center gap-3"><Mail className="h-5 w-5 text-brand-glow" /> {brand.email}</p>
              <p className="flex items-center gap-3"><Globe className="h-5 w-5 text-brand-glow" /> {brand.site}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-8 shadow-card">
            {sent ? (
              <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/15 text-brand-glow">
                  <Send className="h-6 w-6" />
                </div>
                <h2 className="mt-5 font-display text-2xl font-bold">Message sent!</h2>
                <p className="mt-2 text-muted-foreground">Thanks for reaching out — we'll be in touch soon.</p>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name" name="name" placeholder="Your name" />
                  <Field label="Email" name="email" type="email" placeholder="you@example.com" />
                </div>
                <Field label="Subject" name="subject" placeholder="How can we help?" />
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us about your project..."
                    className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-brand-bright focus:ring-2 focus:ring-ring/40"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3 font-medium text-primary-foreground transition-all hover:bg-brand-bright hover:shadow-glow"
                >
                  Send Message <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      <input
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-brand-bright focus:ring-2 focus:ring-ring/40"
      />
    </div>
  );
}
