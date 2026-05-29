export type CategoryDef = {
  slug: string;
  name: string;
  cluster: string;
  blurb: string;
};

export const CATEGORIES: CategoryDef[] = [
  {
    slug: "mvp-development",
    cluster: "A",
    name: "MVP Development and Startup Builds",
    blurb:
      "How to scope, time, budget, and ship a first version that survives contact with real users.",
  },
  {
    slug: "software-costs",
    cluster: "B",
    name: "Software Costs and Budgeting",
    blurb:
      "Honest numbers, hidden line items, and the math behind what software actually costs over time.",
  },
  {
    slug: "hiring-developers",
    cluster: "C",
    name: "Hiring Developers, Freelancers, and Agencies",
    blurb:
      "Vetting frameworks, red flags, trial sprints, and the decisions behind every good engineering hire.",
  },
  {
    slug: "saas-architecture",
    cluster: "D",
    name: "SaaS Architecture and Scaling",
    blurb:
      "Architecture patterns, scaling decisions, and the boring discipline behind systems that survive growth.",
  },
  {
    slug: "ai-integration",
    cluster: "E",
    name: "AI Integration and Vibe Coding Rescue",
    blurb:
      "Production grade AI features, vector search, LLM cost control, and rescue work on AI generated codebases.",
  },
  {
    slug: "mobile-development",
    cluster: "F",
    name: "Cross Platform and Mobile Development",
    blurb:
      "Native versus cross platform, mobile lifecycle, store policy, and the realities of building for phones.",
  },
  {
    slug: "backend-and-apis",
    cluster: "G",
    name: "Backend, APIs, and System Design",
    blurb:
      "API design, database choice, distributed patterns, and the engineering decisions that compound for years.",
  },
  {
    slug: "security-and-compliance",
    cluster: "H",
    name: "Security, Auth, and Compliance",
    blurb:
      "Auth, compliance, OWASP, and the security work that enterprise buyers will ask about on day one.",
  },
  {
    slug: "performance",
    cluster: "I",
    name: "Performance Optimization",
    blurb:
      "Core web vitals, database query work, profiling, and the discipline of staying fast as the product grows.",
  },
  {
    slug: "devops-and-infra",
    cluster: "J",
    name: "DevOps, Deployment, Infrastructure",
    blurb:
      "Pipelines, containers, observability, on call rotation, and the operational layer that keeps SaaS alive.",
  },
  {
    slug: "tech-debt",
    cluster: "K",
    name: "Tech Debt and Refactoring",
    blurb:
      "Refactor strategies, rewrites, migrations, and the cultural patterns that turn legacy into leverage.",
  },
  {
    slug: "founder-decisions",
    cluster: "L",
    name: "Founder Decision Frameworks",
    blurb:
      "Decision trees for the calls every founder eventually has to make about people, pricing, and platforms.",
  },
  {
    slug: "frontend",
    cluster: "M",
    name: "Web App and Frontend Development",
    blurb:
      "Modern web stacks, state management, design systems, and the frontend craft that scales past a year.",
  },
  {
    slug: "career-positioning",
    cluster: "N",
    name: "Recruiter and Career Positioning",
    blurb:
      "Portfolios, interviews, compensation, and the long game of building an engineering career that compounds.",
  },
  {
    slug: "startup-strategy",
    cluster: "O",
    name: "Startup Technical Strategy",
    blurb:
      "Roadmaps, org design, engineering culture, and the strategic moves behind technical companies that scale.",
  },
  {
    slug: "failure-postmortems",
    cluster: "P",
    name: "Startup Failure Postmortems and Fear",
    blurb:
      "The decisions, incidents, and quiet failures that killed real startups, written down so you avoid them.",
  },
  {
    slug: "automation-ops",
    cluster: "Q",
    name: "Business Automation and Ops",
    blurb:
      "Workflow automation, internal tooling, billing, finance, and the operations stack behind every modern SaaS.",
  },
  {
    slug: "comparisons",
    cluster: "R",
    name: "Comparisons and Vendor Decisions",
    blurb:
      "Head to head reads on the platforms, vendors, and tools that founders are choosing between in 2026.",
  },
];

export const CATEGORY_BY_CLUSTER: Record<string, CategoryDef> =
  Object.fromEntries(CATEGORIES.map((c) => [c.cluster, c]));

export const CATEGORY_BY_SLUG: Record<string, CategoryDef> = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c])
);

export const CATEGORY_BY_NAME: Record<string, CategoryDef> = Object.fromEntries(
  CATEGORIES.map((c) => [c.name, c])
);

export function categorySlugFromName(name: string): string {
  return CATEGORY_BY_NAME[name]?.slug ?? "uncategorized";
}
