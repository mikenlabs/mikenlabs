import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageLayout, Badge, SectionHeading, StatusBadge, Container } from "@/components/Layout";
import { useReveal } from "@/hooks/use-reveal";
import { researchAreas } from "@/lib/site-data";
import { listResearch } from "@/lib/api/research.functions";
import { Search, BookOpen, FileText } from "lucide-react";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research | Miken Labs" },
      { name: "description", content: "Research initiatives, experiments and insights from Miken Labs on AI, machine learning, computer vision, NLP, and more." },
      { property: "og:title", content: "Research | Miken Labs" },
      { property: "og:description", content: "Exploring the frontier of technology through research and innovation." },
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
        <section className="relative overflow-hidden bg-hero-glow border-b border-border">
          <Container>
            <div className="pt-36 pb-20">
              <Badge>Research Lab</Badge>
              <h1 className="reveal mt-6 text-4xl font-extrabold text-foreground md:text-6xl">
                Exploring the <span className="text-gradient">frontier</span>
              </h1>
              <p className="reveal mt-6 max-w-2xl text-lg text-muted-foreground">
                Experimental projects, publications and engineering deep-dives from the lab. Pushing the boundaries of what's possible.
              </p>
            </div>
          </Container>
        </section>

        {/* RESEARCH AREAS */}
        <section className="border-b border-border bg-surface py-16">
          <Container>
            <SectionHeading center eyebrow="Research Areas" title="Where we explore" />
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {researchAreas.map((a) => (
                <span key={a} className="rounded-full border border-brand/20 bg-white px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-brand/40 hover:bg-brand/5">
                  {a}
                </span>
              ))}
            </div>
          </Container>
        </section>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent" />
          </div>
        ) : (
          <>
            {researchItems.length > 0 && (
              <section className="py-24">
                <Container>
                  <SectionHeading eyebrow="Active Research" title="Initiatives & experiments" />
                  <div className="mt-12 grid gap-5 md:grid-cols-3">
                    {researchItems.map((r) => (
                      <div key={r.id} className="reveal rounded-xl border border-border bg-white p-6 transition-all hover:border-brand/30 hover:shadow-card-hover">
                        <div className="flex items-center gap-3">
                          <Search className="h-5 w-5 text-brand" />
                          <StatusBadge status={r.status} />
                        </div>
                        <h3 className="mt-4 font-display text-lg font-bold text-foreground">{r.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{r.summary}</p>
                      </div>
                    ))}
                  </div>
                </Container>
              </section>
            )}

            {articles.length > 0 && (
              <section className="border-t border-border bg-surface py-24">
                <Container>
                  <SectionHeading eyebrow="Insights" title="Latest publications" />
                  <div className="mt-12 grid gap-5 md:grid-cols-3">
                    {articles.map((a) => (
                      <div key={a.id} className="reveal overflow-hidden rounded-xl border border-border bg-white transition-all hover:border-brand/30 hover:shadow-card-hover">
                        <div className="relative h-36 overflow-hidden bg-gradient-to-br from-brand to-brand-bright">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <FileText className="h-12 w-12 text-white/20" />
                          </div>
                        </div>
                        <div className="p-6">
                          <span className="rounded-md bg-brand/10 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-brand">
                            {a.category}
                          </span>
                          <h3 className="mt-3 font-display text-lg font-bold text-foreground">{a.title}</h3>
                          <p className="mt-2 text-sm text-muted-foreground">{a.summary}</p>
                          <p className="mt-4 font-mono text-xs text-muted-foreground">
                            {a.read_time ?? `${(a.content?.length ?? 0) > 500 ? "5 min read" : "3 min read"}`} · {a.published_at ? new Date(a.published_at).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Coming soon"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Container>
              </section>
            )}

            {researchItems.length === 0 && articles.length === 0 && (
              <div className="py-24 text-center text-muted-foreground">
                No research published yet. Check back soon.
              </div>
            )}
          </>
        )}

        {/* PUBLICATIONS */}
        <section className="border-t border-border py-24">
          <Container>
            <SectionHeading
              center
              eyebrow="Publications"
              title="Papers, reports & articles"
              subtitle="Our research contributions to the broader technology community."
            />
            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {["Published Papers", "White Papers", "Technical Articles", "Innovation Reports"].map((pub) => (
                <div key={pub} className="reveal rounded-xl border border-border bg-white p-6 text-center transition-all hover:border-brand/30 hover:shadow-card-hover">
                  <BookOpen className="mx-auto h-8 w-8 text-brand" />
                  <h3 className="mt-4 font-display font-bold text-foreground">{pub}</h3>
                  <p className="mt-2 text-xs text-muted-foreground">Coming soon</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </div>
    </PageLayout>
  );
}
