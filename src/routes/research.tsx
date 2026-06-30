import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageLayout, Badge, SectionHeading, StatusBadge } from "@/components/Layout";
import { CircuitBackground } from "@/components/CircuitBackground";
import { useReveal } from "@/hooks/use-reveal";
import { listResearch } from "@/lib/api/research.functions";

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
  const { data: researchList, isLoading } = useQuery({
    queryKey: ["research-public"],
    queryFn: listResearch,
  });

  const researchItems = researchList?.filter((r) => r.status !== "production") ?? [];
  const articles = researchList?.filter((r) => r.status === "production" || r.category === "AI Safety" || r.category === "LLM") ?? [];

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

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-glow border-t-transparent" />
          </div>
        ) : (
          <>
            {researchItems.length > 0 && (
              <section className="mx-auto max-w-[1200px] px-6 py-24 lg:px-12">
                <SectionHeading eyebrow="Active Research" title="Initiatives & experiments" />
                <div className="mt-12 grid gap-5 md:grid-cols-3">
                  {researchItems.map((r) => (
                    <div key={r.id} className="reveal rounded-xl border border-border bg-surface p-6 transition-all hover:border-brand-bright hover:shadow-glow">
                      <StatusBadge status={r.status} />
                      <h3 className="mt-4 font-display text-lg font-bold">{r.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{r.summary}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {articles.length > 0 && (
              <section className="border-t border-border bg-elevated">
                <div className="mx-auto max-w-[1200px] px-6 py-24 lg:px-12">
                  <SectionHeading eyebrow="Insights" title="Latest articles" />
                  <div className="mt-12 grid gap-5 md:grid-cols-3">
                    {articles.map((a) => (
                      <div key={a.id} className="reveal overflow-hidden rounded-xl border border-border bg-surface transition-all hover:border-brand-bright hover:shadow-glow">
                        <div className="relative h-36 overflow-hidden bg-brand-gradient">
                          <CircuitBackground className="opacity-60" />
                        </div>
                        <div className="p-6">
                          <span className="rounded-md bg-brand/10 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-brand-glow">
                            {a.category}
                          </span>
                          <h3 className="mt-3 font-display text-lg font-bold">{a.title}</h3>
                          <p className="mt-2 text-sm text-muted-foreground">{a.summary}</p>
                          <p className="mt-4 font-mono text-xs text-muted-foreground">
                            {a.read_time ?? `${(a.content?.length ?? 0) > 500 ? "5 min read" : "3 min read"}`} · {a.published_at ? new Date(a.published_at).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Coming soon"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {researchItems.length === 0 && articles.length === 0 && (
              <div className="mx-auto max-w-[1200px] px-6 py-24 text-center text-muted-foreground">
                No research published yet. Check back soon.
              </div>
            )}
          </>
        )}
      </div>
    </PageLayout>
  );
}
