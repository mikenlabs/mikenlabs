import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, Badge, SectionHeading, Container } from "@/components/Layout";
import { useReveal } from "@/hooks/use-reveal";
import { trainingPrograms, whyLearnWithUs } from "@/lib/site-data";
import { BrainCircuit, Code2, BarChart3, FileText, Terminal, FileSpreadsheet, Award, Calendar, GraduationCap, BookOpen, ScrollText, Briefcase, ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/training")({
  head: () => ({
    meta: [
      { title: "Training Programs | Miken Labs" },
      { name: "description", content: "Explore our industry-focused training programs in Machine Learning, Full Stack Development, Data Analytics, DevOps, and more." },
      { property: "og:title", content: "Training Programs | Miken Labs" },
      { property: "og:description", content: "Build skills that matter with industry-focused training programs." },
    ],
  }),
  component: Training,
});

const trainingIcons: Record<string, React.ElementType> = { BrainCircuit, Code2, BarChart3, FileText, Terminal, FileSpreadsheet };
const whyIcons: Record<string, React.ElementType> = { Award, Code2, Calendar, BookOpen, ScrollText, Briefcase };

function Training() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <PageLayout>
      <div ref={ref}>
        <section className="relative overflow-hidden bg-hero-glow border-b border-border">
          <Container>
            <div className="pt-36 pb-20">
              <Badge>Training Programs</Badge>
              <h1 className="reveal mt-6 max-w-3xl text-4xl font-extrabold text-foreground md:text-6xl">
                Build skills that <span className="text-gradient">matter</span>
              </h1>
              <p className="reveal mt-6 max-w-2xl text-lg text-muted-foreground">
                Industry-focused courses designed to take you from beginner to job-ready. Learn from experts, build real projects, and advance your career.
              </p>
            </div>
          </Container>
        </section>

        <section className="py-24">
          <Container>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                      <h3 className="mt-4 font-display text-xl font-bold text-white">{p.title}</h3>
                    </div>
                    <div className="p-6">
                      <p className="text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                      <div className="mt-5 flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5 rounded-md bg-surface px-3 py-1.5">
                          <Calendar className="h-3.5 w-3.5 text-brand" />
                          {p.duration}
                        </span>
                        <span className="flex items-center gap-1.5 rounded-md bg-surface px-3 py-1.5">
                          <GraduationCap className="h-3.5 w-3.5 text-brand" />
                          {p.mode}
                        </span>
                        <span className="flex items-center gap-1.5 rounded-md bg-surface px-3 py-1.5">
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

        <section className="border-y border-border bg-surface py-24">
          <Container>
            <SectionHeading center eyebrow="Why Learn With Us" title="Designed for your success" />
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {whyLearnWithUs.map((w) => {
                const Icon = whyIcons[w.icon];
                return (
                  <div
                    key={w.title}
                    className="reveal flex items-start gap-4 rounded-xl border border-border bg-white p-6 transition-all hover:border-brand/30 hover:shadow-card-hover"
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

        <section className="py-24">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">Ready to start learning?</h2>
              <p className="mt-4 text-muted-foreground">
                Join hundreds of students who have transformed their careers through our programs.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 font-medium text-white transition-all hover:bg-brand-bright"
                >
                  Enroll Now <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-6 py-3 font-medium text-foreground transition-all hover:border-brand/30"
                >
                  Request Information
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </PageLayout>
  );
}
