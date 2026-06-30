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
    <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/5 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-brand">
      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
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
        <p className="font-mono text-xs uppercase tracking-widest text-brand">{eyebrow}</p>
      )}
      <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

const statusStyles: Record<string, string> = {
  LIVE: "text-emerald-600 border-emerald-300 bg-emerald-50",
  BETA: "text-blue-600 border-blue-300 bg-blue-50",
  "COMING SOON": "text-amber-600 border-amber-300 bg-amber-50",
  research: "text-purple-600 border-purple-300 bg-purple-50",
  prototype: "text-amber-600 border-amber-300 bg-amber-50",
  beta: "text-blue-600 border-blue-300 bg-blue-50",
  production: "text-emerald-600 border-emerald-300 bg-emerald-50",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`rounded-md border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest ${
        statusStyles[status] ?? "text-muted-foreground border-border bg-surface"
      }`}
    >
      {status}
    </span>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto max-w-[1200px] px-6 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}
