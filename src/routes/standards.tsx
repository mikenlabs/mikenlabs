import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Eye, Scale, Users, Activity, Lock } from "lucide-react";
import { PageLayout, Badge, SectionHeading } from "@/components/Layout";
import { CircuitBackground } from "@/components/CircuitBackground";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/standards")({
  head: () => ({
    meta: [
      { title: "AI Standards & Responsible AI | Miken Labs" },
      { name: "description", content: "Miken Labs' commitment to ethical, responsible and human-centered AI — covering governance, safety, transparency and model evaluation." },
      { property: "og:title", content: "AI Standards & Responsible AI | Miken Labs" },
      { property: "og:description", content: "Building AI with safety, transparency and human benefit in mind." },
    ],
  }),
  component: Standards,
});

const topics = [
  { icon: Scale, title: "Ethical & Responsible AI", desc: "Principles and guardrails that keep AI aligned with human values." },
  { icon: ShieldCheck, title: "AI Governance", desc: "Clear processes for accountability across the model lifecycle." },
  { icon: Activity, title: "Model Evaluation", desc: "Rigorous testing for accuracy, robustness and bias before shipping." },
  { icon: Users, title: "Human-Centered AI", desc: "Systems designed to augment people, not replace judgment." },
  { icon: Eye, title: "Transparency", desc: "Documenting how systems work, their limits and their data." },
  { icon: Lock, title: "Security Best Practices", desc: "Defense-in-depth for data, models and tool access." },
];

function Standards() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <PageLayout>
      <div ref={ref}>
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-hero-glow" />
          <CircuitBackground />
          <div className="relative mx-auto max-w-[1200px] px-6 pt-36 pb-20 lg:px-12">
            <Badge>Responsible AI</Badge>
            <h1 className="reveal mt-6 max-w-3xl text-4xl font-extrabold md:text-6xl">
              AI built with <span className="text-gradient">trust</span> at the core
            </h1>
            <p className="reveal mt-6 max-w-2xl text-lg text-muted-foreground">
              We believe powerful technology demands responsibility. These are the standards
              that guide how we research, build and ship AI.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-6 py-24 lg:px-12">
          <SectionHeading center eyebrow="Our Principles" title="How we build responsibly" />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((t) => (
              <div key={t.title} className="reveal rounded-xl border border-border bg-surface p-6 transition-all hover:border-brand-bright hover:shadow-glow">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand/15 text-brand-glow">
                  <t.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold">{t.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
