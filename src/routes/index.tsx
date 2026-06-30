import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  ArrowRight, ChevronDown, GraduationCap, Code2, Smartphone, BrainCircuit, Lightbulb,
  CheckCircle2, Star, Quote, Calendar, Award, BookOpen, Briefcase, ScrollText,
  BarChart3, FileText, Terminal, FileSpreadsheet, ExternalLink, Github,
} from "lucide-react";
import { PageLayout, Badge, SectionHeading, StatusBadge, Container } from "@/components/Layout";
import { useReveal } from "@/hooks/use-reveal";
import { brand, stats, services, trainingPrograms, whyLearnWithUs, products as staticProducts, articles, testimonials, partners, gallery, values } from "@/lib/site-data";
import { listProductsPublic } from "@/lib/api/products.functions";
import { subscribeNewsletter } from "@/lib/api/newsletter.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Miken Labs — Train It • Build It • Ship It" },
      {
        name: "description",
        content: "Empowering individuals and businesses through practical technology education, software engineering, AI innovation, and digital transformation.",
      },
      { property: "og:title", content: "Miken Labs — Train It • Build It • Ship It" },
      { property: "og:image", content: brand.cover },
    ],
  }),
  component: Home,
});

const serviceIcons: Record<string, React.ElementType> = { GraduationCap, Code2, Smartphone, BrainCircuit, Lightbulb };
const trainingIcons: Record<string, React.ElementType> = { BrainCircuit, Code2, BarChart3, FileText, Terminal, FileSpreadsheet };
const whyIcons: Record<string, React.ElementType> = { Award, Code2, Calendar, BookOpen, ScrollText, Briefcase };

function Home() {
  const ref = useReveal<HTMLDivElement>();
  const { data: products } = useQuery({
    queryKey: ["products-public"],
    queryFn: listProductsPublic,
  });
  const displayProducts = products && products.length > 0 ? products.slice(0, 3) : null;

  return (
    <PageLayout>
      <div ref={ref}>
        {/* HERO */}
        <section className="relative overflow-hidden bg-hero-glow">
          <div className="relative mx-auto grid min-h-[88vh] max-w-[1200px] items-center gap-12 px-6 pt-28 pb-20 lg:grid-cols-2 lg:px-12">
            <div>
              <Badge>Technology Innovation Hub</Badge>
              <h1 className="reveal mt-6 text-5xl font-extrabold leading-[1.1] text-foreground md:text-7xl">
                Train Today.<br />
                <span className="text-gradient">Build Tomorrow.</span><br />
                Ship the Future.
              </h1>
              <p className="reveal mt-6 max-w-xl text-lg text-muted-foreground" style={{ transitionDelay: "100ms" }}>
                Learn practical technology skills from industry-focused instructors while building real-world projects that prepare you for the future of work.
              </p>
              <div className="reveal mt-9 flex flex-wrap items-center gap-4" style={{ transitionDelay: "200ms" }}>
                <Link
                  to="/training"
                  className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 font-medium text-white transition-all hover:bg-brand-bright hover:shadow-glow"
                >
                  Start Learning <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-6 py-3 font-medium text-foreground transition-all hover:border-brand/30 hover:shadow-sm"
                >
                  Explore Courses
                </Link>
              </div>
            </div>

            <div className="reveal relative hidden lg:block" style={{ transitionDelay: "150ms" }}>
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-brand/10 to-transparent blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-border bg-white shadow-card">
                <img
                  src={brand.cover}
                  alt="Miken Labs — empowering people, building solutions, shaping the future"
                  className="w-full"
                />
              </div>
            </div>
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <ChevronDown className="animate-chevron h-6 w-6 text-brand" />
          </div>
        </section>

        {/* STATS */}
        <section className="border-y border-border bg-white">
          <Container>
            <div className="grid grid-cols-2 gap-8 py-12 lg:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="reveal text-center lg:text-left">
                  <p className="font-display text-4xl font-extrabold text-gradient">{s.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* WHAT WE DO */}
        <section className="py-24">
          <Container>
            <SectionHeading
              center
              eyebrow="What We Do"
              title="From training to shipping"
              subtitle="We train people, build software and ship intelligent products that solve real problems."
            />
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {services.map((svc) => {
                const Icon = serviceIcons[svc.icon];
                return (
                  <div
                    key={svc.title}
                    className="reveal group rounded-xl border border-border bg-white p-6 transition-all hover:border-brand/30 hover:shadow-card-hover"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand/10 text-brand">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-display text-base font-bold text-foreground">{svc.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{svc.desc}</p>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* TRAINING PROGRAMS */}
        <section className="border-y border-border bg-surface py-24">
          <Container>
            <SectionHeading
              center
              eyebrow="Training Programs"
              title="Build skills that matter"
              subtitle="Industry-focused courses designed to take you from beginner to job-ready."
            />
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {trainingPrograms.map((p) => {
                const Icon = trainingIcons[p.icon];
                return (
                  <div
                    key={p.title}
                    className="reveal group overflow-hidden rounded-xl border border-border bg-white transition-all hover:shadow-card-hover"
                  >
                    <div className={`bg-gradient-to-r ${p.color} p-6`}>
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20 text-white">
                        {Icon && <Icon className="h-6 w-6" />}
                      </div>
                      <h3 className="mt-4 font-display text-lg font-bold text-white">{p.title}</h3>
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-muted-foreground">{p.description}</p>
                      <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-brand" />
                          {p.duration}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <GraduationCap className="h-3.5 w-3.5 text-brand" />
                          {p.mode}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Award className="h-3.5 w-3.5 text-brand" />
                          {p.level}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* WHY LEARN WITH US */}
        <section className="py-24">
          <Container>
            <SectionHeading
              center
              eyebrow="Why Learn With Us"
              title="Designed for your success"
              subtitle="Everything you need to accelerate your career in technology."
            />
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {whyLearnWithUs.map((w) => {
                const Icon = whyIcons[w.icon];
                return (
                  <div
                    key={w.title}
                    className="reveal flex gap-4 rounded-xl border border-border bg-white p-6 transition-all hover:border-brand/30 hover:shadow-card-hover"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                      {Icon && <Icon className="h-5 w-5" />}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-foreground">{w.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{w.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* PRODUCTS */}
        <section className="border-y border-border bg-surface py-24">
          <Container>
            <div className="flex items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Our Products"
                title="Intelligent tools built to solve real problems"
              />
              <Link to="/products" className="hidden whitespace-nowrap text-sm font-medium text-brand hover:text-brand-bright md:block">
                View All Products →
              </Link>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {displayProducts
                ? displayProducts.map((p) => (
                    <div
                      key={p.id}
                      className="reveal group flex flex-col rounded-xl border border-border bg-white p-6 transition-all hover:border-brand/30 hover:shadow-card-hover"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand text-white font-display text-sm font-bold">
                          {p.name.charAt(0)}
                        </div>
                        <StatusBadge status={p.status} />
                      </div>
                      <h3 className="mt-5 font-display text-lg font-bold text-foreground">{p.name}</h3>
                      <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.short_description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {(p.tags ?? []).map((t) => (
                          <span key={t} className="rounded-md bg-brand/10 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-brand">
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="mt-5 flex gap-3">
                        {p.demo_url && (
                          <a href={p.demo_url} className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:text-brand-bright">
                            Live Demo <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                        {p.github_url && (
                          <a href={p.github_url} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                            <Github className="h-3.5 w-3.5" /> Code
                          </a>
                        )}
                      </div>
                    </div>
                  ))
                : products === undefined
                  ? Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="animate-pulse rounded-xl border border-border bg-white p-6">
                        <div className="h-10 w-10 rounded-lg bg-brand/20" />
                        <div className="mt-5 h-5 w-3/4 rounded bg-brand/10" />
                        <div className="mt-2 h-4 w-full rounded bg-brand/5" />
                      </div>
                    ))
                  : null}
            </div>
          </Container>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24">
          <Container>
            <SectionHeading
              center
              eyebrow="Testimonials"
              title="What people say about us"
              subtitle="Hear from our students, partners, and collaborators."
            />
            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="reveal rounded-xl border border-border bg-white p-6 transition-all hover:shadow-card-hover"
                >
                  <div className="flex gap-1 text-amber-400">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="mt-3 h-6 w-6 text-brand/30" />
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.content}</p>
                  <div className="mt-4 border-t border-border pt-4">
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}, {t.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* PARTNERS */}
        <section className="border-y border-border bg-surface py-16">
          <Container>
            <p className="text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Trusted by teams and companies
            </p>
            <div className="mt-8 overflow-hidden">
              <div className="flex animate-marquee gap-12">
                {[...partners, ...partners].map((p, i) => (
                  <div
                    key={i}
                    className="flex h-12 w-36 shrink-0 items-center justify-center rounded-lg border border-border bg-white px-6"
                  >
                    <span className="font-display text-sm font-bold text-muted-foreground">{p.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* GALLERY PREVIEW */}
        <section className="py-24">
          <Container>
            <div className="flex items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Gallery"
                title="Moments from our journey"
              />
              <Link to="/portfolio" className="hidden whitespace-nowrap text-sm font-medium text-brand hover:text-brand-bright md:block">
                View Full Gallery →
              </Link>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((g, i) => (
                <div
                  key={i}
                  className="reveal aspect-[4/3] overflow-hidden rounded-xl border border-border bg-gradient-to-br from-brand/5 to-brand/10"
                >
                  <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                    <GraduationCap className="h-10 w-10 text-brand/40" />
                    <p className="mt-3 font-medium text-foreground">{g.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{g.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* BLOG PREVIEW */}
        <section className="border-y border-border bg-surface py-24">
          <Container>
            <div className="flex items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Our Blog"
                title="Insights and articles"
                subtitle="Thoughts on technology, education, and building for the future."
              />
              <Link to="/blog" className="hidden whitespace-nowrap text-sm font-medium text-brand hover:text-brand-bright md:block">
                View All Posts →
              </Link>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {articles.slice(0, 3).map((a) => (
                <Link
                  key={a.slug}
                  to="/blog"
                  className="reveal group overflow-hidden rounded-xl border border-border bg-white transition-all hover:border-brand/30 hover:shadow-card-hover"
                >
                  <div className="relative h-40 overflow-hidden bg-gradient-to-br from-brand to-brand-bright">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-white/20" />
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="rounded-md bg-brand/10 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-brand">
                      {a.category}
                    </span>
                    <h3 className="mt-3 font-display text-lg font-bold text-foreground">{a.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{a.excerpt}</p>
                    <p className="mt-4 font-mono text-xs text-muted-foreground">
                      {a.readTime} · {a.date} · {a.author}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        {/* NEWSLETTER */}
        <Newsletter />
      </div>
    </PageLayout>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await subscribeNewsletter({ data: { email } });
      setSubscribed(true);
      setEmail("");
      toast.success("Subscribed! Check your inbox for updates.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Subscription failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="bg-brand">
      <Container>
        <div className="py-20">
          <div className="mx-auto max-w-2xl text-center">
            {subscribed ? (
              <div className="flex flex-col items-center text-white">
                <CheckCircle2 className="h-12 w-12 text-white/80" />
                <h2 className="mt-4 text-3xl font-bold">You're in!</h2>
                <p className="mt-4 text-white/80">
                  Thanks for subscribing. We'll send insights and updates straight to your inbox.
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-white md:text-4xl">Stay ahead of the curve.</h2>
                <p className="mt-4 text-white/80">
                  Get tech insights, course updates and industry deep-dives — directly to your inbox.
                </p>
                <form className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center" onSubmit={handleSubmit}>
                  <input
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="min-w-72 flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 outline-none transition-colors focus:border-white/50 focus:ring-2 focus:ring-white/30"
                  />
                  <button
                    type="submit"
                    disabled={busy}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-brand transition-all hover:bg-white/90 disabled:opacity-60"
                  >
                    {busy ? "Subscribing..." : "Subscribe"} <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
