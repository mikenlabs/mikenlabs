import logoAsset from "@/assets/miken-logo.jpg.asset.json";
import coverAsset from "@/assets/miken-cover.png.asset.json";
import flyerAsset from "@/assets/miken-flyer.png.asset.json";

export const brand = {
  name: "Miken Labs",
  tagline: "Train It • Build It • Ship It",
  mission: "Empowering individuals and businesses through practical technology education, software engineering, AI innovation, and digital transformation.",
  founder: "Uche Michael Ikenna",
  logo: logoAsset.url,
  cover: coverAsset.url,
  flyer: flyerAsset.url,
  email: "mikenlabs@gmail.com",
  phone: "+234 813 200 3036",
  site: "https://mikenlabs.com",
};

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Training", to: "/training" },
  { label: "Products", to: "/products" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Research", to: "/research" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export const stats = [
  { value: "50+", label: "Courses" },
  { value: "500+", label: "Students Trained" },
  { value: "20+", label: "Products Shipped" },
  { value: "97%", label: "Satisfaction Rate" },
];

export const services = [
  { icon: "GraduationCap", title: "IT Training", desc: "Hands-on training in practical tech skills that matter for your career." },
  { icon: "Code2", title: "Software Development", desc: "Custom software solutions built with modern stacks and best practices." },
  { icon: "Smartphone", title: "Web & Mobile Apps", desc: "Responsive, scalable applications for web and mobile platforms." },
  { icon: "BrainCircuit", title: "Data & AI", desc: "Data-driven insights, AI automation, and intelligent systems." },
  { icon: "Lightbulb", title: "Tech Consulting", desc: "Expert guidance to help you build, scale, and innovate." },
];

export const trainingPrograms = [
  {
    icon: "BrainCircuit",
    title: "Machine Learning",
    description: "Learn AI, neural networks, deep learning, model deployment and practical ML projects.",
    duration: "12 Weeks",
    mode: "Online",
    level: "Beginner to Advanced",
    color: "from-blue-500 to-blue-700",
  },
  {
    icon: "Code2",
    title: "Full Stack Web Development",
    description: "Frontend, Backend, Databases, Authentication, Deployment — React, Node.js, Next.js, Express, MongoDB, PostgreSQL.",
    duration: "16 Weeks",
    mode: "Online",
    level: "Beginner to Advanced",
    color: "from-indigo-500 to-indigo-700",
  },
  {
    icon: "BarChart3",
    title: "Data Analytics",
    description: "Excel, SQL, Power BI, Python, Pandas, Visualization, Business Intelligence.",
    duration: "10 Weeks",
    mode: "Online",
    level: "Beginner to Intermediate",
    color: "from-emerald-500 to-emerald-700",
  },
  {
    icon: "FileText",
    title: "Research Writing",
    description: "Academic writing, proposal writing, journal publication, literature review, referencing, research methodology.",
    duration: "8 Weeks",
    mode: "Online",
    level: "Intermediate",
    color: "from-purple-500 to-purple-700",
  },
  {
    icon: "Terminal",
    title: "DevOps",
    description: "Linux, Docker, Git, GitHub, CI/CD, AWS, Monitoring, Deployment automation.",
    duration: "12 Weeks",
    mode: "Online",
    level: "Intermediate",
    color: "from-amber-500 to-amber-700",
  },
  {
    icon: "FileSpreadsheet",
    title: "Office Practice",
    description: "Microsoft Word, Excel, PowerPoint, Internet, Professional communication, Documentation, Office productivity.",
    duration: "6 Weeks",
    mode: "Online",
    level: "Beginner",
    color: "from-rose-500 to-rose-700",
  },
];

export const whyLearnWithUs = [
  { icon: "Award", title: "Expert Instructors", desc: "Learn from industry professionals with years of real-world experience." },
  { icon: "Code2", title: "Hands-on Projects", desc: "Build real projects that go into your portfolio, not just theory." },
  { icon: "Calendar", title: "Flexible Learning", desc: "Self-paced and instructor-led options to fit your schedule." },
  { icon: "BookOpen", title: "Industry Standard Curriculum", desc: "Stay current with curricula designed around market demands." },
  { icon: "ScrollText", title: "Certificate of Completion", desc: "Earn a recognized certificate to boost your career prospects." },
  { icon: "Briefcase", title: "Career Support", desc: "CV review, interview prep, and job placement assistance." },
];

export const values = [
  { title: "Innovation", desc: "We pursue new ideas at the frontier of technology and turn them into working solutions." },
  { title: "Learning", desc: "We believe in continuous learning and sharing knowledge to grow the next generation." },
  { title: "Research", desc: "We conduct rigorous research to push the boundaries of what's possible." },
  { title: "Community", desc: "We build alongside businesses, creators, and communities to create lasting impact." },
  { title: "Execution", desc: "We ship well-crafted solutions built to last — ideas are valuable, execution is everything." },
  { title: "Integrity", desc: "We build with transparency, honesty, and a genuine commitment to human benefit." },
];

export const focusAreas = [
  "Artificial Intelligence", "Software Engineering", "Research",
  "Product Development", "Technology Education", "Digital Solutions",
];

export const products = [
  {
    slug: "synapse-ai",
    name: "Synapse AI",
    short: "An autonomous agent platform for orchestrating multi-step AI workflows.",
    tags: ["AI", "Agents"],
    status: "BETA",
    category: "ai_product",
    image: "",
    github_url: "",
    demo_url: "",
  },
  {
    slug: "ledgerflow",
    name: "LedgerFlow",
    short: "SaaS finance automation that reconciles books and forecasts cash flow.",
    tags: ["SaaS", "Finance"],
    status: "LIVE",
    category: "saas",
    image: "",
    github_url: "",
    demo_url: "",
  },
  {
    slug: "codecampus",
    name: "CodeCampus",
    short: "An interactive learning platform that trains engineers through real projects.",
    tags: ["Education", "Web"],
    status: "LIVE",
    category: "educational",
    image: "",
    github_url: "",
    demo_url: "",
  },
  {
    slug: "promptforge",
    name: "PromptForge",
    short: "A developer toolkit for testing, versioning and evaluating LLM prompts.",
    tags: ["Developer", "LLM"],
    status: "COMING SOON",
    category: "developer_tool",
    image: "",
    github_url: "",
    demo_url: "",
  },
];

export const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer",
    company: "TechCorp",
    content: "Miken Labs transformed my career. The hands-on approach to teaching full-stack development gave me the confidence to build production-ready applications from day one.",
    rating: 5,
  },
  {
    name: "David Okafor",
    role: "Data Analyst",
    company: "FinServe",
    content: "The data analytics program was exactly what I needed. Real-world projects, practical tools, and mentorship that actually cared about my progress.",
    rating: 5,
  },
  {
    name: "Amara Eze",
    role: "Product Manager",
    company: "StartupHub",
    content: "We partnered with Miken Labs for our digital transformation. Their team's expertise in AI and software engineering was instrumental in scaling our platform.",
    rating: 5,
  },
  {
    name: "James Adewale",
    role: "AI Engineer",
    company: "DeepLearn Inc",
    content: "The machine learning course at Miken Labs was world-class. From neural networks to deployment, every module was packed with practical insights.",
    rating: 5,
  },
  {
    name: "Chioma Nwosu",
    role: "Freelance Developer",
    company: "Self-employed",
    content: "Thanks to Miken Labs, I transitioned from a complete beginner to a confident developer. The career support and mentorship made all the difference.",
    rating: 5,
  },
];

export const partners = [
  { name: "TechCorp", logo: "" },
  { name: "DataFlow", logo: "" },
  { name: "CloudBase", logo: "" },
  { name: "AI Works", logo: "" },
  { name: "DevStudio", logo: "" },
  { name: "WebCraft", logo: "" },
  { name: "InnovateLab", logo: "" },
  { name: "CodeBridge", logo: "" },
];

export const gallery = [
  { src: "", title: "Training Session", category: "Training" },
  { src: "", title: "Workshop", category: "Workshop" },
  { src: "", title: "Hackathon", category: "Events" },
  { src: "", title: "Seminar", category: "Events" },
  { src: "", title: "Students", category: "Training" },
  { src: "", title: "Conference", category: "Events" },
];

export const blogCategories = [
  "Artificial Intelligence", "Programming", "Software Engineering",
  "Career Tips", "Research", "Technology News",
];

export const articles = [
  {
    slug: "getting-started-with-ai",
    title: "Getting Started with Artificial Intelligence in 2025",
    excerpt: "A comprehensive guide to starting your AI journey — from prerequisites to building your first model.",
    category: "Artificial Intelligence",
    readTime: "8 min read",
    date: "Jun 2025",
    author: "Uche Michael Ikenna",
    featured: true,
  },
  {
    slug: "full-stack-development-guide",
    title: "The Complete Guide to Full Stack Development",
    excerpt: "Everything you need to know about becoming a full stack developer in the modern tech landscape.",
    category: "Programming",
    readTime: "12 min read",
    date: "May 2025",
    author: "Miken Labs Team",
    featured: true,
  },
  {
    slug: "data-analytics-career",
    title: "Building a Career in Data Analytics",
    excerpt: "Learn the skills, tools, and pathways to launch a successful career in data analytics.",
    category: "Career Tips",
    readTime: "6 min read",
    date: "May 2025",
    author: "Miken Labs Team",
    featured: false,
  },
  {
    slug: "intro-to-devops",
    title: "Introduction to DevOps: Bridging Development and Operations",
    excerpt: "Understand the principles, tools, and practices that make DevOps essential for modern software delivery.",
    category: "Software Engineering",
    readTime: "10 min read",
    date: "Apr 2025",
    author: "Miken Labs Team",
    featured: true,
  },
  {
    slug: "machine-learning-basics",
    title: "Machine Learning Basics: From Theory to Practice",
    excerpt: "Demystifying machine learning concepts and building your first ML model from scratch.",
    category: "Artificial Intelligence",
    readTime: "15 min read",
    date: "Apr 2025",
    author: "Uche Michael Ikenna",
    featured: false,
  },
  {
    slug: "tech-education-trends",
    title: "Technology Education Trends Shaping 2025",
    excerpt: "How AI, remote learning, and industry partnerships are transforming technology education.",
    category: "Technology News",
    readTime: "7 min read",
    date: "Mar 2025",
    author: "Miken Labs Team",
    featured: false,
  },
];

export const researchAreas = [
  "Artificial Intelligence", "Machine Learning", "Computer Vision",
  "Natural Language Processing", "Software Engineering", "Cloud Computing",
  "Data Science", "Cybersecurity",
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
