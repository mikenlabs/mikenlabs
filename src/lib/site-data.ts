import logoAsset from "@/assets/miken-logo.jpg.asset.json";
import coverAsset from "@/assets/miken-cover.png.asset.json";
import flyerAsset from "@/assets/miken-flyer.png.asset.json";

export const brand = {
  name: "Miken Labs",
  tagline: "Train It • Build It • Ship It",
  founder: "Uche Michael Ikenna",
  logo: logoAsset.url,
  cover: coverAsset.url,
  flyer: flyerAsset.url,
  email: "info@mikenlabs.com",
  site: "www.mikenlabs.com",
};

export const navLinks = [
  { label: "About", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Research", to: "/research" },
  { label: "Standards", to: "/standards" },
  { label: "Contact", to: "/contact" },
];

export const stats = [
  { value: "5+", label: "AI Products" },
  { value: "10+", label: "Projects Built" },
  { value: "3+", label: "Years Building" },
  { value: "100%", label: "Open to Collaborate" },
];

export const services = [
  { icon: "GraduationCap", title: "IT Training", desc: "Hands-on training in tech skills that matter." },
  { icon: "Code2", title: "Software Development", desc: "Custom software solutions for your business." },
  { icon: "Smartphone", title: "Web & Mobile", desc: "Modern, responsive and scalable apps." },
  { icon: "BrainCircuit", title: "Data & AI", desc: "Data-driven insights and AI that drives growth." },
  { icon: "Lightbulb", title: "Tech Consulting", desc: "Expert guidance to help you build and scale." },
];

export const products = [
  {
    slug: "synapse-ai",
    name: "Synapse AI",
    short: "An autonomous agent platform for orchestrating multi-step AI workflows.",
    tags: ["AI", "Agents"],
    status: "BETA",
    category: "ai_product",
  },
  {
    slug: "ledgerflow",
    name: "LedgerFlow",
    short: "SaaS finance automation that reconciles books and forecasts cash flow.",
    tags: ["SaaS", "Automation"],
    status: "LIVE",
    category: "saas",
  },
  {
    slug: "codecampus",
    name: "CodeCampus",
    short: "An interactive learning platform that trains engineers through real projects.",
    tags: ["Educational", "Web"],
    status: "LIVE",
    category: "educational",
  },
  {
    slug: "promptforge",
    name: "PromptForge",
    short: "A developer toolkit for testing, versioning and evaluating LLM prompts.",
    tags: ["Developer", "LLM"],
    status: "COMING SOON",
    category: "developer_tool",
  },
];

export const articles = [
  {
    slug: "engineering-reliable-agents",
    title: "Engineering Reliable AI Agents",
    excerpt: "Patterns for building agents that fail gracefully and stay observable in production.",
    category: "AI Agents",
    readTime: "7 min read",
    date: "Jun 2025",
  },
  {
    slug: "responsible-ai-in-practice",
    title: "Responsible AI in Practice",
    excerpt: "Moving beyond principles into concrete guardrails, evaluations and governance.",
    category: "AI Safety",
    readTime: "9 min read",
    date: "May 2025",
  },
  {
    slug: "scaling-llm-products",
    title: "Scaling LLM Products",
    excerpt: "Cost, latency and quality tradeoffs when taking a prototype to real users.",
    category: "LLM",
    readTime: "6 min read",
    date: "Apr 2025",
  },
];

export const research = [
  {
    slug: "agentic-evaluation-harness",
    title: "Agentic Evaluation Harness",
    summary: "A framework for benchmarking multi-step agent reliability across tasks.",
    status: "prototype",
  },
  {
    slug: "edge-inference-toolkit",
    title: "Edge Inference Toolkit",
    summary: "Running compact models efficiently on constrained edge hardware.",
    status: "research",
  },
  {
    slug: "safe-tool-use",
    title: "Safe Tool Use for LLMs",
    summary: "Sandboxing and permissioning strategies for tool-calling models.",
    status: "beta",
  },
];

export const values = [
  { title: "Innovation", desc: "We pursue ideas at the frontier and turn them into working systems." },
  { title: "Engineering Excellence", desc: "We ship robust, well-crafted software built to last." },
  { title: "Responsible AI", desc: "We build with safety, transparency and human benefit in mind." },
  { title: "Education", desc: "We share knowledge and grow the next generation of builders." },
  { title: "Impact", desc: "We measure success by the real problems we help solve." },
  { title: "Collaboration", desc: "We build alongside businesses, creators and communities." },
];
