import { LongFormPage } from "@/components/shared/LongFormPage";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  title: "Stack",
  description:
    "The full technology stack behind Yashveer Labs. Languages, frameworks, infrastructure, and why each choice was made.",
  path: "/systems/stack",
  keywords: ["TypeScript stack", "Next.js stack", "Yashveer Labs stack", "React", "Firebase"],
});

export default function Page() {
  return (
    <LongFormPage
      eyebrow="Systems · Stack"
      title="The stack is the boring part on purpose."
      intro="Tools that disappear into the work. Stack picks are made once, deliberately, then defended against churn until the problem demands a change. Here is what runs the lab."
      backdropVariant="gold"
      backdropImage="/images/systems-backdrop.webp"
      stats={[
        { label: "Primary lang", value: "TS / JS" },
        { label: "UI runtime", value: "React 19" },
        { label: "Framework", value: "Next.js 15" },
        { label: "Deploy", value: "Vercel" },
      ]}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Systems", path: "/systems/stack" },
        { name: "Stack", path: "/systems/stack" },
      ]}
      sections={[
        {
          heading: "Languages, in honest order.",
          paragraphs: [
            "Primary is TypeScript. Secondary is JavaScript when a project predates the TS migration or when the runtime does not support it. That is the truth of 90 percent of the lab.",
            "Working knowledge across Python, Java, PHP, Ruby, Go, and Rust. Each one is real, not aspirational. Python comes out when the work is data, ML, or scripting. Go and Rust come out when the constraint is latency or memory. PHP and Ruby come out when the brief is to maintain something that already runs on them. Lua is the Roblox layer.",
            "The order matters because polyglot claims usually do not survive a real audit. The order above does. I would rather be honest about what I reach for first than build a resume that lies about my muscle memory.",
          ],
          bullets: [
            "TypeScript: every new project, frontend and backend",
            "JavaScript: legacy surfaces and Roblox-adjacent tooling",
            "Python: AI experiments, scripting, data work",
            "Java, PHP, Ruby, Go, Rust: situational, real but not daily",
            "Lua: Velmora and the Roblox runtime",
          ],
        },
        {
          heading: "Frameworks and runtimes.",
          paragraphs: [
            "Next.js 15 with the App Router is the default for product surfaces. The reason is not novelty. The reason is that the framework collapses a long list of decisions (routing, data fetching, image optimization, image formats, edge runtime, server components, metadata) into a coherent default that lets me ship faster without breaking convention.",
            "React 19 underneath, with server components used wherever the data is non-interactive. Tailwind v4 for the design system, because CSS variables plus utility classes is faster than maintaining a parallel design tokens file. Framer Motion for choreography. GSAP when the scroll work needs more control. R3F when the surface needs 3D.",
            "On the API side, route handlers and server actions cover most of it. When the work needs something bigger, the answer is Node-flavored serverless on Vercel for the hosted surface, or a small Python service for the work that genuinely belongs in Python.",
          ],
        },
        {
          heading: "Data, auth, storage.",
          paragraphs: [
            "Firebase Firestore plus Firebase Auth is the data layer for the school-system class of project (Nexli, Shelvra adjacent work, the academy site infra). The reason is that the data model is hierarchical, the role separation is built in, and the realtime is free.",
            "SQL comes out when the work is relational. Postgres on Supabase or Neon, depending on the deploy target. SQLite when the project is single-tenant and small enough to be honest about it.",
            "Storage is whatever the platform gives me cleanly. Firebase Storage when the rest of the project lives in Firebase. Vercel Blob and Supabase Storage for the rest. The wrong place to spend time is rolling your own object storage in 2026.",
          ],
          pullQuote:
            "The stack is the boring part on purpose. The interesting part is what you do with it.",
        },
        {
          heading: "Deployment and observability.",
          paragraphs: [
            "Vercel for everything that ships to the open web. Git push to deploy, preview URLs on every branch, edge configuration where it matters. The lab does not run servers it does not have to run.",
            "Observability is honest. Vercel Analytics for traffic, application logs for behavior, manual alerting for the things that matter until the surface area justifies more. Premature observability tooling is the same kind of yak-shave as premature optimization.",
          ],
        },
        {
          heading: "Why the stack does not change every six months.",
          paragraphs: [
            "There is a temptation to chase. Bun this week, Hono next week, a new build tool the week after. The lab does not. The cost of changing the stack is paid in product time, and product time is the scarce resource.",
            "The rule is simple. A stack change has to come with a real reason: a constraint the current stack cannot meet, a meaningful productivity win the new tool actually delivers in a real project, or a deprecation that is forcing the move. Without one of those, the stack stays. Discipline is the multiplier.",
          ],
          pullQuote:
            "Tools should be invisible. The work should be visible.",
        },
      ]}
      related={[
        {
          href: "/systems/tools",
          label: "Tools",
          description: "The instruments behind the work, day to day.",
        },
        {
          href: "/systems/technologies",
          label: "Technologies",
          description: "Deeper than stack. Paradigms and patterns.",
        },
        {
          href: "/systems/engineering-capabilities",
          label: "Capabilities",
          description: "The full engineering surface across disciplines.",
        },
      ]}
      faq={[
        {
          q: "Why Next.js 15 instead of a lighter framework?",
          a: "Because the lab ships multi-page product surfaces with metadata, image work, server-rendered SEO, and route handlers, all under one mental model. A lighter framework would force me to assemble those by hand, every project. The framework cost is repaid in shipping time.",
        },
        {
          q: "Why Tailwind v4 with CSS variables instead of CSS-in-JS?",
          a: "Because the runtime cost of CSS-in-JS is real, the design system speed of utilities is real, and CSS variables solve the theme-token problem cleanly. The combination is faster than any alternative I have actually shipped on.",
        },
        {
          q: "Why Firebase instead of a custom Node API?",
          a: "Because for the school-system and event-tracking class of project, Firebase collapses auth, realtime, and storage into one decision. When a project crosses the line where those defaults become a constraint, I move it to Postgres and a proper API. Not before.",
        },
        {
          q: "Do you use AI in the stack?",
          a: "Yes. Local and hosted models, depending on the surface. The Nyxera page explains the direction. The lab uses AI to accelerate the work without letting AI be the work.",
        },
        {
          q: "What is the most recent stack change you made?",
          a: "Moving the lab default to React 19 server components plus Tailwind v4 inline theme. That changed how data flows from server to client and how design tokens are expressed. Both deliver shipping speed I can feel.",
        },
        {
          q: "What is the next change you are considering?",
          a: "More Rust for the parts of the lab that need to be fast and small. More Python for the parts that are clearly ML. The TypeScript core does not change.",
        },
      ]}
    />
  );
}
