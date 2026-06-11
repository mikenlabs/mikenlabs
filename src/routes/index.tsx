import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronDown,
  GraduationCap,
  Code2,
  Smartphone,
  BrainCircuit,
  Lightbulb,
} from "lucide-react";
import { PageLayout, Badge, SectionHeading, StatusBadge } from "@/components/Layout";
import { CircuitBackground } from "@/components/CircuitBackground";
import { useReveal } from "@/hooks/use-reveal";
import { brand, stats, services, products, articles } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Miken Labs — Building the Future with AI" },
      {
        name: "description",
        content:
          "Miken Labs designs, engineers and deploys intelligent systems for businesses, creators and communities. Train it. Build it. Ship it.",
      },
      { property: "og:title", content: "Miken Labs — Building the Future with AI" },
      { property: "og:image", content: brand.cover },
      { property: "twitter:image", content: brand.cover },
    ],
  }),
  component: Home,
});

const serviceIcons = { GraduationCap, Code2, Smartphone, BrainCircuit, Lightbulb };

function Home() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <PageLayout>
      <div ref={ref}>
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-hero-glow" />
          <CircuitBackground />
          <div className="relative mx-auto grid min-h-[92vh] max-w-[1200px] items-center gap-12 px-6 pt-28 pb-20 lg:grid-cols-2 lg:px-12">
            <div>
              <Badge>AI Engineering Lab</Badge>
              <h1 className="reveal mt-6 text-5xl font-extrabold leading-[1.05] md:text-7xl">
                Building the <span className="text-gradient">Future</span> with AI
              </h1>
              <p className="reveal mt-6 max-w-xl text-lg text-muted-foreground" style={{ transitionDelay: "100ms" }}>
                Miken Labs designs, engineers, and deploys intelligent systems that help
                businesses, creators, and communities thrive in the age of artificial intelligence.
              </p>
              <div className="reveal mt-9 flex flex-wrap items-center gap-4" style={{ transitionDelay: "200ms" }}>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 font-medium text-primary-foreground transition-all hover:bg-brand-bright hover:shadow-glow"
                >
                  Explore Products <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/research"
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 font-medium text-foreground transition-colors hover:border-brand-bright hover:bg-surface"
                >
                  Read Research
                </Link>
                <Link to="/contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Contact Us →
                </Link>
              </div>
            </div>

            <div className="reveal relative hidden lg:block" style={{ transitionDelay: "150ms" }}>
              <div className="absolute -inset-10 rounded-full bg-brand/30 blur-3xl" />
              <img
                src={brand.cover}
                alt="Miken Labs — empowering people, building solutions, shaping the future"
                className="animate-float-tilt relative rounded-2xl border border-border shadow-card"
              />
            </div>
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <ChevronDown className="animate-chevron h-6 w-6 text-brand-glow" />
          </div>
        </section>

        {/* STATS */}
        <section className="border-y border-border bg-surface">
          <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-8 px-6 py-12 lg:grid-cols-4 lg:px-12">
            {stats.map((s) => (
              <div key={s.label} className="reveal text-center lg:text-left">
                <p className="font-display text-4xl font-extrabold text-gradient">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SERVICES */}
        <section className="mx-auto max-w-[1200px] px-6 py-24 lg:px-12">
          <SectionHeading
            center
            eyebrow="What We Do"
            title="From training to shipping"
            subtitle="We train people, build software and ship intelligent products that solve real problems."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {services.map((svc) => {
              const Icon = serviceIcons[svc.icon as keyof typeof serviceIcons];
              return (
                <div
                  key={svc.title}
                  className="reveal group rounded-xl border border-border bg-surface p-6 transition-all hover:border-brand-bright hover:shadow-glow"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand/15 text-brand-glow">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold">{svc.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{svc.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="border-y border-border bg-elevated">
          <div className="mx-auto max-w-[1200px] px-6 py-24 lg:px-12">
            <div className="flex items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Our Products"
                title="Intelligent tools built to solve real problems"
              />
              <Link to="/products" className="hidden whitespace-nowrap text-sm text-brand-glow hover:underline md:block">
                View All Products →
              </Link>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {products.slice(0, 3).map((p) => (
                <div
                  key={p.slug}
                  className="reveal group flex flex-col rounded-xl border border-border bg-surface p-6 transition-all hover:border-brand-bright hover:shadow-glow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-gradient font-display text-sm font-bold text-primary-foreground">
                      {p.name.charAt(0)}
                    </div>
                    <StatusBadge status={p.status} />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold">{p.name}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.short}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-md bg-brand/10 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-brand-glow">
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link to="/products" className="mt-5 inline-flex items-center gap-1 text-sm text-brand-glow group-hover:gap-2 transition-all">
                    View Product <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RESEARCH & INSIGHTS */}
        <section className="mx-auto max-w-[1200px] px-6 py-24 lg:px-12">
          <SectionHeading
            eyebrow="Research & Insights"
            title="Deep dives into AI engineering and standards"
            subtitle="Notes from the lab on building reliable, responsible and useful AI."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {articles.map((a) => (
              <Link
                key={a.slug}
                to="/research"
                className="reveal group overflow-hidden rounded-xl border border-border bg-surface transition-all hover:border-brand-bright hover:shadow-glow"
              >
                <div className="relative h-40 overflow-hidden bg-brand-gradient">
                  <CircuitBackground className="opacity-60" />
                </div>
                <div className="p-6">
                  <span className="rounded-md bg-brand/10 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-brand-glow">
                    {a.category}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold">{a.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{a.excerpt}</p>
                  <p className="mt-4 font-mono text-xs text-muted-foreground">
                    {a.readTime} · {a.date}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* NEWSLETTER */}
        <Newsletter />
      </div>
    </PageLayout>
  );
}

function Newsletter() {
  return (
    <section className="border-t border-border bg-surface">
      <div className="relative mx-auto max-w-[1200px] overflow-hidden px-6 py-20 lg:px-12">
        <div className="absolute inset-0 bg-hero-glow opacity-60" />
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Stay ahead of the curve.</h2>
          <p className="mt-4 text-muted-foreground">
            Get AI insights, lab updates and engineering deep-dives — directly to your inbox.
          </p>
          <form
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              const input = (e.currentTarget.elements.namedItem("email") as HTMLInputElement);
              if (input?.value) {
                input.value = "";
                alert("Thanks for subscribing! We'll be in touch.");
              }
            }}
          >
            <input
              name="email"
              type="email"
              required
              placeholder="Email address"
              className="flex-1 rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-brand-bright focus:ring-2 focus:ring-ring/40"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3 font-medium text-primary-foreground transition-all hover:bg-brand-bright hover:shadow-glow"
            >
              Subscribe <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
