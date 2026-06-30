import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, Globe, MapPin, Send, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { PageLayout, Badge, Container } from "@/components/Layout";
import { brand } from "@/lib/site-data";
import { submitContact } from "@/lib/api/contact.functions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Miken Labs" },
      { name: "description", content: "Get in touch with Miken Labs. Call +234 813 200 3036, email mikenlabs@gmail.com, or send us a message." },
      { property: "og:title", content: "Contact | Miken Labs" },
      { property: "og:description", content: "Let's train you, build your ideas and ship your success." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await submitContact({ data: formData });
      setSent(true);
      toast.success("Message sent! We'll be in touch soon.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setBusy(false);
    }
  }

  function updateField(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <PageLayout>
      <section className="relative overflow-hidden bg-hero-glow">
        <Container>
          <div className="grid min-h-[88vh] items-center gap-12 pt-36 pb-20 lg:grid-cols-2">
            <div>
              <Badge>Get in touch</Badge>
              <h1 className="mt-6 text-4xl font-extrabold text-foreground md:text-6xl">
                Ready to start your <span className="text-gradient">tech journey?</span>
              </h1>
              <p className="mt-6 max-w-md text-lg text-muted-foreground">
                Let's train you, build your ideas and ship your success. Tell us what you're working on and we'll get back to you.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium text-foreground">{brand.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground">{brand.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Website</p>
                    <p className="font-medium text-foreground">{brand.site}</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex gap-3">
                <a href="#" className="rounded-lg border border-border p-2.5 text-muted-foreground transition-colors hover:border-brand/30 hover:text-brand" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="rounded-lg border border-border p-2.5 text-muted-foreground transition-colors hover:border-brand/30 hover:text-brand" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="rounded-lg border border-border p-2.5 text-muted-foreground transition-colors hover:border-brand/30 hover:text-brand" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="rounded-lg border border-border p-2.5 text-muted-foreground transition-colors hover:border-brand/30 hover:text-brand" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="rounded-lg border border-border p-2.5 text-muted-foreground transition-colors hover:border-brand/30 hover:text-brand" aria-label="YouTube">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-white p-8 shadow-card">
              {sent ? (
                <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <Send className="h-6 w-6" />
                  </div>
                  <h2 className="mt-5 font-display text-2xl font-bold text-foreground">Message sent!</h2>
                  <p className="mt-2 text-muted-foreground">Thanks for reaching out — we'll be in touch soon.</p>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Name" name="name" placeholder="Your name" value={formData.name} onChange={(v) => updateField("name", v)} />
                    <Field label="Email" name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={(v) => updateField("email", v)} />
                  </div>
                  <Field label="Subject" name="subject" placeholder="How can we help?" value={formData.subject} onChange={(v) => updateField("subject", v)} />
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      placeholder="Tell us about your project..."
                      className="w-full resize-none rounded-lg border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-ring/30"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={busy}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3 font-medium text-white transition-all hover:bg-brand-bright hover:shadow-glow disabled:opacity-60"
                  >
                    {busy ? "Sending..." : "Send Message"} <Send className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
}

function Field({ label, name, type = "text", placeholder, value, onChange }: {
  label: string; name: string; type?: string; placeholder?: string;
  value: string; onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground">{label}</label>
      <input
        name={name}
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-ring/30"
      />
    </div>
  );
}
