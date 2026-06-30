import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ShieldCheck, Eye, Scale, Users, Activity, Lock } from "lucide-react";
import { PageLayout, Badge, SectionHeading, Container } from "@/components/Layout";
import { useReveal } from "@/hooks/use-reveal";
import { listStandards } from "@/lib/api/standards.functions";

export const Route = createFileRoute("/standards")({
  head: () => ({
    meta: [
      { title: "AI Standards & Responsible AI | Miken Labs" },
      { name: "description", content: "Miken Labs' commitment to ethical, responsible and human-centered AI." },
      { property: "og:title", content: "AI Standards & Responsible AI | Miken Labs" },
      { property: "og:description", content: "Building AI with safety, transparency and human benefit in mind." },
    ],
  }),
  component: Standards,
});

const iconMap: Record<string, React.ElementType> = {
  ShieldCheck, Eye, Scale, Users, Activity, Lock,
};

const fallbackTopics = [
  { icon: Scale, title: "Ethical & Responsible AI", desc: "Principles and guardrails that keep AI aligned with human values." },
  { icon: ShieldCheck, title: "AI Governance", desc: "Clear processes for accountability across the model lifecycle." },
  { icon: Activity, title: "Model Evaluation", desc: "Rigorous testing for accuracy, robustness and bias before shipping." },
  { icon: Users, title: "Human-Centered AI", desc: "Systems designed to augment people, not replace judgment." },
  { icon: Eye, title: "Transparency", desc: "Documenting how systems work, their limits and their data." },
  { icon: Lock, title: "Security Best Practices", desc: "Defense-in-depth for data, models and tool access." },
];

function Standards() {
  const ref = useReveal<HTMLDivElement>();
  const { data: dbStandards, isLoading } = useQuery({
    queryKey: ["standards-public"],
    queryFn: listStandards,
  });

  const topics = dbStandards && dbStandards.length > 0
    ? dbStandards.map((s) => ({
        icon: iconMap[s.icon] ?? ShieldCheck,
        title: s.title,
        desc: s.description ?? "",
      }))
    : fallbackTopics;

  return (
    <PageLayout>
      <div ref={ref}>
        <section className="relative overflow-hidden bg-hero-glow border-b border-border">
          <Container>
            <div className="pt-36 pb-20">
              <Badge>Responsible AI</Badge>
              <h1 className="reveal mt-6 max-w-3xl text-4xl font-extrabold text-foreground md:text-6xl">
                AI built with <span className="text-gradient">trust</span> at the core
              </h1>
              <p className="reveal mt-6 max-w-2xl text-lg text-muted-foreground">
                We believe powerful technology demands responsibility. These are the standards that guide how we research, build and ship AI.
              </p>
            </div>
          </Container>
        </section>

        <section className="py-24">
          <Container>
            <SectionHeading center eyebrow="Our Principles" title="How we build responsibly" />
            {isLoading ? (
              <div className="mt-14 flex items-center justify-center py-10">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent" />
              </div>
            ) : (
              <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {topics.map((t) => (
                  <div key={t.title} className="reveal rounded-xl border border-border bg-white p-6 transition-all hover:border-brand/30 hover:shadow-card-hover">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand/10 text-brand">
                      <t.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold text-foreground">{t.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
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
