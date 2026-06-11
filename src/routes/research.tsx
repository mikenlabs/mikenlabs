import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, Badge, SectionHeading, StatusBadge } from "@/components/Layout";
import { CircuitBackground } from "@/components/CircuitBackground";
import { useReveal } from "@/hooks/use-reveal";
import { research, articles } from "@/lib/site-data";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research | Miken Labs" },
      { name: "description", content: "Research initiatives, experiments and insights from Miken Labs on AI agents, machine learning, LLMs and responsible AI." },
      { property: "og:title", content: "Research | Miken Labs" },
      { property: "og:description", content: "Deep dives into AI engineering, standards and emerging technology." },
    ],
  }),
  component: Research,
});

function Research() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <PageLayout>
      <div ref={ref}>
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-hero-glow" />
          <CircuitBackground />
          <div className="relative mx-auto max-w-[1200px] px-6 pt-36 pb-20 lg:px-12">
            <Badge>Research Lab</Badge>
            <h1 className="reveal mt-6 text-4xl font-extrabold md:text-6xl">
              Exploring the <span className="text-gradient">frontier</span>
            </h1>
            <p className="reveal mt-6 max-w-2xl text-lg text-muted-foreground">
              Experimental projects, publications and engineering deep-dives from the lab.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-6 py-24 lg:px-12">
          <SectionHeading eyebrow="Active Research" title="Initiatives & experiments" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {research.map((r) => (
              <div key={r.slug} className="reveal rounded-xl border border-border bg-surface p-6 transition-all hover:border-brand-bright hover:shadow-glow">
                <StatusBadge status={r.status} />
                <h3 className="mt-4 font-display text-lg font-bold">{r.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{r.summary}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-border bg-elevated">
          <div className="mx-auto max-w-[1200px] px-6 py-24 lg:px-12">
            <SectionHeading eyebrow="Insights" title="Latest articles" />
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {articles.map((a) => (
                <div key={a.slug} className="reveal overflow-hidden rounded-xl border border-border bg-surface transition-all hover:border-brand-bright hover:shadow-glow">
                  <div className="relative h-36 overflow-hidden bg-brand-gradient">
                    <CircuitBackground className="opacity-60" />
                  </div>
                  <div className="p-6">
                    <span className="rounded-md bg-brand/10 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-brand-glow">
                      {a.category}
                    </span>
                    <h3 className="mt-3 font-display text-lg font-bold">{a.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{a.excerpt}</p>
                    <p className="mt-4 font-mono text-xs text-muted-foreground">{a.readTime} · {a.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
