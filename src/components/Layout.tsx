import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-brand-bright/40 bg-brand/10 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-brand-glow">
      <span className="h-1.5 w-1.5 rounded-full bg-brand-glow" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className="font-mono text-xs uppercase tracking-widest text-brand-glow">{eyebrow}</p>
      )}
      <h2 className="mt-3 text-3xl font-bold md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

const statusStyles: Record<string, string> = {
  LIVE: "text-[oklch(0.7_0.16_150)] border-[oklch(0.7_0.16_150)]/40",
  BETA: "text-brand-glow border-brand-bright/40",
  "COMING SOON": "text-[oklch(0.78_0.14_70)] border-[oklch(0.78_0.14_70)]/40",
  research: "text-brand-glow border-brand-bright/40",
  prototype: "text-[oklch(0.78_0.14_70)] border-[oklch(0.78_0.14_70)]/40",
  beta: "text-[oklch(0.7_0.16_150)] border-[oklch(0.7_0.16_150)]/40",
  production: "text-[oklch(0.7_0.16_150)] border-[oklch(0.7_0.16_150)]/40",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`rounded-md border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest ${
        statusStyles[status] ?? "text-muted-foreground border-border"
      }`}
    >
      {status}
    </span>
  );
}
