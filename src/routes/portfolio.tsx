import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageLayout, Badge, SectionHeading, Container } from "@/components/Layout";
import { useReveal } from "@/hooks/use-reveal";
import { gallery } from "@/lib/site-data";
import { GraduationCap, Monitor, Image, ArrowRight, ExternalLink, Github } from "lucide-react";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio | Miken Labs" },
      { name: "description", content: "Explore our portfolio of websites, AI projects, dashboards, research, and mobile apps built by Miken Labs." },
      { property: "og:title", content: "Portfolio | Miken Labs" },
      { property: "og:description", content: "Explore our work — websites, AI projects, dashboards, research, and mobile apps." },
    ],
  }),
  component: Portfolio,
});

const categories = ["All", "Websites", "AI Projects", "Dashboards", "Research", "Mobile Apps"];

const portfolioItems = [
  { title: "E-Commerce Platform", category: "Websites", tech: ["React", "Node.js", "MongoDB"], image: "" },
  { title: "AI Chat Assistant", category: "AI Projects", tech: ["Python", "LLM", "FastAPI"], image: "" },
  { title: "Analytics Dashboard", category: "Dashboards", tech: ["React", "D3.js", "PostgreSQL"], image: "" },
  { title: "Research Paper Portal", category: "Research", tech: ["Next.js", "TypeScript"], image: "" },
  { title: "Fitness Tracking App", category: "Mobile Apps", tech: ["React Native", "Firebase"], image: "" },
  { title: "Learning Management System", category: "Websites", tech: ["Next.js", "PostgreSQL", "Tailwind"], image: "" },
  { title: "Image Recognition API", category: "AI Projects", tech: ["PyTorch", "FastAPI", "Docker"], image: "" },
  { title: "Real-time Monitoring", category: "Dashboards", tech: ["React", "WebSockets", "Redis"], image: "" },
  { title: "Data Visualization Tool", category: "Research", tech: ["Python", "Pandas", "Plotly"], image: "" },
];

function Portfolio() {
  const ref = useReveal<HTMLDivElement>();
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? portfolioItems : portfolioItems.filter((p) => p.category === activeCategory);

  return (
    <PageLayout>
      <div ref={ref}>
        <section className="relative overflow-hidden bg-hero-glow border-b border-border">
          <Container>
            <div className="pt-36 pb-20">
              <Badge>Our Portfolio</Badge>
              <h1 className="reveal mt-6 max-w-3xl text-4xl font-extrabold text-foreground md:text-6xl">
                Work we're <span className="text-gradient">proud of</span>
              </h1>
              <p className="reveal mt-6 max-w-2xl text-lg text-muted-foreground">
                Explore our projects — from websites and AI systems to dashboards, research, and mobile applications.
              </p>
            </div>
          </Container>
        </section>

        <section className="py-16">
          <Container>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    activeCategory === c ? "bg-brand text-white" : "bg-surface text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item, i) => (
                <div
                  key={i}
                  className="reveal group overflow-hidden rounded-xl border border-border bg-white transition-all hover:shadow-card-hover"
                >
                  <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-brand/10 to-brand/5">
                    <div className="flex h-full items-center justify-center">
                      <Monitor className="h-16 w-16 text-brand/30" />
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="rounded-md bg-brand/10 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-brand">
                      {item.category}
                    </span>
                    <h3 className="mt-3 font-display text-lg font-bold text-foreground">{item.title}</h3>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {item.tech.map((t) => (
                        <span key={t} className="rounded bg-surface px-2 py-0.5 text-xs text-muted-foreground">{t}</span>
                      ))}
                    </div>
                    <div className="mt-4 flex gap-3">
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-brand">
                        View Project <ExternalLink className="h-3.5 w-3.5" />
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                        <Github className="h-3.5 w-3.5" /> Source
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* GALLERY */}
        <section className="border-t border-border bg-surface py-24">
          <Container>
            <SectionHeading center eyebrow="Gallery" title="Moments from our journey" />
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
      </div>
    </PageLayout>
  );
}
