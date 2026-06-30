import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, Badge, SectionHeading, Container } from "@/components/Layout";
import { useReveal } from "@/hooks/use-reveal";
import { brand, values, focusAreas } from "@/lib/site-data";
import { Target, Eye, Lightbulb, BookOpen, Code2, Search, Users, Zap, Shield } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Miken Labs" },
      { name: "description", content: "Miken Labs is a technology innovation hub empowering individuals and businesses through practical technology education, software engineering, AI innovation, and digital transformation." },
      { property: "og:title", content: "About Miken Labs" },
      { property: "og:description", content: "Empowering individuals and businesses through practical technology education, software engineering, AI innovation, and digital transformation." },
    ],
  }),
  component: About,
});

const valueIcons: Record<string, React.ElementType> = {
  Innovation: Lightbulb, Learning: BookOpen, Research: Search,
  Community: Users, Execution: Zap, Integrity: Shield,
};

function About() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <PageLayout>
      <div ref={ref}>
        <section className="relative overflow-hidden bg-hero-glow border-b border-border">
          <Container>
            <div className="pt-36 pb-20">
              <Badge>Our Story</Badge>
              <h1 className="reveal mt-6 max-w-3xl text-4xl font-extrabold text-foreground md:text-6xl">
                About <span className="text-gradient">Miken Labs</span>
              </h1>
              <p className="reveal mt-6 max-w-2xl text-lg text-muted-foreground">
                Empowering individuals and businesses through practical technology education, software engineering, AI innovation, and digital transformation.
              </p>
            </div>
          </Container>
        </section>

        {/* MISSION & VISION */}
        <section className="py-24">
          <Container>
            <div className="grid gap-12 md:grid-cols-2">
              <div className="reveal rounded-xl border-l-4 border-brand bg-white p-8 shadow-card">
                <Target className="h-8 w-8 text-brand" />
                <h2 className="mt-4 font-display text-2xl font-bold text-foreground">Our Mission</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {brand.mission}
                </p>
              </div>
              <div className="reveal rounded-xl border-l-4 border-brand-bright bg-white p-8 shadow-card">
                <Eye className="h-8 w-8 text-brand-bright" />
                <h2 className="mt-4 font-display text-2xl font-bold text-foreground">Our Vision</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  A future where powerful, responsible technology is accessible to everyone — built with rigor, transparency and a genuine commitment to human benefit.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* CORE VALUES */}
        <section className="border-y border-border bg-surface py-24">
          <Container>
            <SectionHeading center eyebrow="What We Stand For" title="Core Values" />
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((v) => {
                const Icon = valueIcons[v.title];
                return (
                  <div key={v.title} className="reveal rounded-xl border border-border bg-white p-6 transition-all hover:border-brand/30 hover:shadow-card-hover">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand/10 text-brand">
                      {Icon && <Icon className="h-5 w-5" />}
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold text-foreground">{v.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* FOCUS AREAS */}
        <section className="py-24">
          <Container>
            <SectionHeading
              center
              eyebrow="What We Do"
              title="Our focus areas"
              subtitle="Miken Labs is focused on delivering excellence across multiple domains."
            />
            <div className="mt-14 flex flex-wrap justify-center gap-3">
              {focusAreas.map((a) => (
                <span key={a} className="rounded-full border border-brand/20 bg-brand/5 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-brand/40 hover:bg-brand/10">
                  {a}
                </span>
              ))}
            </div>
          </Container>
        </section>

        {/* FOUNDER */}
        <section className="border-t border-border bg-surface py-24">
          <Container>
            <SectionHeading eyebrow="Founder" title="Meet the builder behind Miken Labs" />
            <div className="reveal mt-12 grid gap-10 rounded-2xl border border-border bg-white p-8 shadow-card md:grid-cols-[260px_1fr] md:p-12">
              <div className="flex aspect-square items-center justify-center rounded-2xl bg-brand">
                <span className="font-display text-7xl font-extrabold text-white">UI</span>
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-foreground">{brand.founder}</h3>
                <p className="mt-1 font-mono text-sm text-brand">Founder & Lead Builder</p>
                <p className="mt-5 leading-relaxed text-muted-foreground">
                  Uche Michael Ikenna is an AI and software engineer building world-class technology from Africa. He founded Miken Labs to train people, build solutions, and ship intelligent products that create lasting impact — combining deep engineering with a passion for education and responsible technology.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {focusAreas.map((a) => (
                    <span key={a} className="rounded-full border border-border bg-brand/5 px-3 py-1.5 text-xs text-foreground">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </PageLayout>
  );
}
