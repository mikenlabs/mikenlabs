import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, Badge, SectionHeading } from "@/components/Layout";
import { CircuitBackground } from "@/components/CircuitBackground";
import { useReveal } from "@/hooks/use-reveal";
import { brand, values } from "@/lib/site-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Miken Labs" },
      { name: "description", content: "Miken Labs is an AI research and engineering lab founded by Uche Michael Ikenna — empowering people, building solutions and shaping the future." },
      { property: "og:title", content: "About Miken Labs" },
      { property: "og:description", content: "An AI research and engineering lab empowering people and building world-class technology." },
    ],
  }),
  component: About,
});

const focusAreas = [
  "AI Engineering", "Software Engineering", "Product Development",
  "AI Agents", "Machine Learning", "Startup Building", "Technology Education",
];

function About() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <PageLayout>
      <div ref={ref}>
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-hero-glow" />
          <CircuitBackground />
          <div className="relative mx-auto max-w-[1200px] px-6 pt-36 pb-20 lg:px-12">
            <Badge>Our Story</Badge>
            <h1 className="reveal mt-6 max-w-3xl text-4xl font-extrabold md:text-6xl">
              About <span className="text-gradient">Miken Labs</span>
            </h1>
            <p className="reveal mt-6 max-w-2xl text-lg text-muted-foreground">
              We are an AI research and engineering lab building practical, world-class
              technology — and sharing what we learn along the way.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-6 py-24 lg:px-12">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="reveal border-l-2 border-brand-bright pl-6">
              <h2 className="font-display text-2xl font-bold">Our Mission</h2>
              <p className="mt-4 text-muted-foreground">
                To design, engineer and deploy intelligent systems that solve real problems —
                empowering businesses, creators and communities to thrive in the age of AI.
              </p>
            </div>
            <div className="reveal border-l-2 border-brand-bright pl-6">
              <h2 className="font-display text-2xl font-bold">Our Vision</h2>
              <p className="mt-4 text-muted-foreground">
                A future where powerful, responsible AI is accessible to everyone — built with
                rigor, transparency and a genuine commitment to human benefit.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-elevated">
          <div className="mx-auto max-w-[1200px] px-6 py-24 lg:px-12">
            <SectionHeading center eyebrow="What We Stand For" title="Core Values" />
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((v) => (
                <div key={v.title} className="reveal rounded-xl border border-border bg-surface p-6 transition-all hover:border-brand-bright hover:shadow-glow">
                  <h3 className="font-display text-lg font-bold">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOUNDER */}
        <section className="mx-auto max-w-[1200px] px-6 py-24 lg:px-12">
          <SectionHeading eyebrow="Founder" title="Meet the builder behind Miken Labs" />
          <div className="reveal mt-12 grid gap-10 rounded-2xl border border-border bg-surface p-8 md:grid-cols-[260px_1fr] md:p-12">
            <div className="flex aspect-square items-center justify-center rounded-2xl bg-brand-gradient">
              <span className="font-display text-7xl font-extrabold text-primary-foreground">UI</span>
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold">{brand.founder}</h3>
              <p className="mt-1 font-mono text-sm text-brand-glow">Founder &amp; Lead Builder</p>
              <p className="mt-5 text-muted-foreground">
                Uche Michael Ikenna is an AI and software engineer building world-class
                technology from Africa. He founded Miken Labs to train people, build solutions,
                and ship intelligent products that create lasting impact — combining deep
                engineering with a passion for education and responsible AI.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {focusAreas.map((a) => (
                  <span key={a} className="rounded-full border border-border bg-brand/10 px-3 py-1.5 text-xs text-foreground">
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
