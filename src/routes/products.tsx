import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { PageLayout, Badge, StatusBadge, Container } from "@/components/Layout";
import { useReveal } from "@/hooks/use-reveal";
import { listProductsPublic } from "@/lib/api/products.functions";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products | Miken Labs" },
      { name: "description", content: "Explore the intelligent AI products, SaaS tools and developer platforms built by Miken Labs." },
      { property: "og:title", content: "Products | Miken Labs" },
      { property: "og:description", content: "Intelligent tools built to solve real problems." },
    ],
  }),
  component: Products,
});

function Products() {
  const ref = useReveal<HTMLDivElement>();
  const { data: products, isLoading } = useQuery({
    queryKey: ["products-public"],
    queryFn: listProductsPublic,
  });

  return (
    <PageLayout>
      <div ref={ref}>
        <section className="relative overflow-hidden bg-hero-glow border-b border-border">
          <Container>
            <div className="pt-36 pb-20">
              <Badge>Our Products</Badge>
              <h1 className="reveal mt-6 text-4xl font-extrabold text-foreground md:text-6xl">
                Intelligent tools, <span className="text-gradient">shipped.</span>
              </h1>
              <p className="reveal mt-6 max-w-2xl text-lg text-muted-foreground">
                AI products, SaaS platforms, educational tools and developer utilities — all engineered to solve real problems and drive growth.
              </p>
            </div>
          </Container>
        </section>

        <section className="py-24">
          <Container>
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent" />
              </div>
            ) : !products || products.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border bg-white p-12 text-center text-muted-foreground">
                No products available yet. Check back soon.
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="reveal group flex flex-col rounded-xl border border-border bg-white p-6 transition-all hover:border-brand/30 hover:shadow-card-hover"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand text-white font-display text-base font-bold">
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
                    <div className="mt-5 flex gap-4">
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
                      {!p.demo_url && !p.github_url && (
                        <span className="inline-flex items-center gap-1 text-sm text-brand">
                          View Product <ArrowRight className="h-4 w-4" />
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Container>
        </section>
      </div>
    </PageLayout>
  );
}
