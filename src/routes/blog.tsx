import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageLayout, Badge, SectionHeading, Container } from "@/components/Layout";
import { useReveal } from "@/hooks/use-reveal";
import { articles, blogCategories } from "@/lib/site-data";
import { BookOpen, Search, Clock, User, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog | Miken Labs" },
      { name: "description", content: "Read articles and insights from Miken Labs on AI, software engineering, career tips, and technology education." },
      { property: "og:title", content: "Blog | Miken Labs" },
      { property: "og:description", content: "Insights and articles on technology, education, and building for the future." },
    ],
  }),
  component: Blog,
});

function Blog() {
  const ref = useReveal<HTMLDivElement>();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = articles.filter((a) => {
    const matchesCategory = !activeCategory || a.category === activeCategory;
    const matchesSearch = !searchQuery || 
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featured = articles.filter((a) => a.featured);

  return (
    <PageLayout>
      <div ref={ref}>
        <section className="relative overflow-hidden bg-hero-glow border-b border-border">
          <Container>
            <div className="pt-36 pb-20">
              <Badge>Our Blog</Badge>
              <h1 className="reveal mt-6 max-w-3xl text-4xl font-extrabold text-foreground md:text-6xl">
                Insights & <span className="text-gradient">articles</span>
              </h1>
              <p className="reveal mt-6 max-w-2xl text-lg text-muted-foreground">
                Thoughts on technology, education, and building for the future from the Miken Labs team.
              </p>
            </div>
          </Container>
        </section>

        {featured.length > 0 && (
          <section className="border-b border-border bg-surface py-16">
            <Container>
              <h2 className="font-display text-xl font-bold text-foreground">Featured Articles</h2>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {featured.slice(0, 2).map((a) => (
                  <div key={a.slug} className="reveal overflow-hidden rounded-xl border border-border bg-white transition-all hover:shadow-card-hover">
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-brand to-brand-bright">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BookOpen className="h-16 w-16 text-white/20" />
                      </div>
                    </div>
                    <div className="p-6">
                      <span className="rounded-md bg-brand/10 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-brand">
                        {a.category}
                      </span>
                      <h3 className="mt-3 font-display text-xl font-bold text-foreground">{a.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{a.excerpt}</p>
                      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {a.readTime}</span>
                        <span className="flex items-center gap-1"><User className="h-3 w-3" /> {a.author}</span>
                        <span>{a.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}

        <section className="py-16">
          <Container>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    !activeCategory ? "bg-brand text-white" : "bg-surface text-muted-foreground hover:text-foreground"
                  }`}
                >
                  All
                </button>
                {blogCategories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setActiveCategory(c === activeCategory ? null : c)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                      activeCategory === c ? "bg-brand text-white" : "bg-surface text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full rounded-lg border border-border bg-white py-2 pl-10 pr-4 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-ring/30 sm:w-64"
                />
              </div>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filtered.length > 0 ? (
                filtered.map((a) => (
                  <div key={a.slug} className="reveal overflow-hidden rounded-xl border border-border bg-white transition-all hover:shadow-card-hover">
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
                      <div className="mt-4 flex items-center justify-between">
                        <p className="font-mono text-xs text-muted-foreground">{a.readTime} · {a.date}</p>
                        <span className="text-sm font-medium text-brand">Read →</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full rounded-xl border border-dashed border-border bg-surface p-12 text-center text-muted-foreground">
                  No articles found matching your criteria.
                </div>
              )}
            </div>
          </Container>
        </section>
      </div>
    </PageLayout>
  );
}
