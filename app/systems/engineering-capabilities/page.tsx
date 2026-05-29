import { LongFormPage } from "@/components/shared/LongFormPage";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  title: "Engineering Capabilities",
  description:
    "Engineering capabilities across backend, frontend, AI, infrastructure, security, and mobile at Yashveer Labs. Honest depth, not a feature list.",
  path: "/systems/engineering-capabilities",
  keywords: ["full stack capabilities", "backend", "frontend", "AI engineering", "cybersecurity"],
});

export default function Page() {
  return (
    <LongFormPage
      eyebrow="Systems · Capabilities"
      title="The full engineering surface, honestly mapped."
      intro="Six disciplines. Different depths in each. The honest answer is that depth in some, working competence in others, and a deliberate plan for where the depth is being built next."
      backdropVariant="gold"
      backdropImage="/images/systems-backdrop.webp"
      stats={[
        { label: "Depth (today)", value: "Frontend, Full stack" },
        { label: "Building depth", value: "AI, Security" },
        { label: "Working", value: "Backend, Infra" },
        { label: "Exploring", value: "Mobile" },
      ]}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Systems", path: "/systems/stack" },
        { name: "Capabilities", path: "/systems/engineering-capabilities" },
      ]}
      sections={[
        {
          heading: "Frontend.",
          paragraphs: [
            "Strong. The work the lab is most known for. React, Next.js, TypeScript, Tailwind, design systems, motion, 3D. Every site on the Projects page is mine front to back, and the patterns repeat across them: component-driven architecture, design tokens in CSS variables, motion that is intentional rather than decorative.",
            "The opinion I hold most strongly here: a fast frontend is a values choice, not a technical one. The bundle is the budget. Server components and edge rendering are the levers. Treating performance as part of the brief, not part of the polish, is what separates products from portfolios.",
          ],
        },
        {
          heading: "Backend.",
          paragraphs: [
            "Working. Comfortable in Node serverless, route handlers, server actions, REST and lightweight RPC patterns. Firebase Functions when the project lives there; small Python services when the work is clearly Python; PostgreSQL with a proper schema when the data is relational.",
            "Honest gap: I have not yet shipped a backend that holds tens of thousands of QPS. The lab projects do not need that load yet. When they do, the architecture is ready and the operator will learn the rest.",
          ],
        },
        {
          heading: "AI.",
          paragraphs: [
            "Building. The Nyxera page is the public direction. The work in progress: model orchestration, local inference, retrieval patterns, evaluation harnesses, the human-in-the-loop UX that decides whether the surface feels trustworthy.",
            "The intent is to be operator-fluent, not just demo-fluent. Most developers can call an AI API. Fewer can ship a system that uses AI in a way that does not fall over the moment the model is wrong, slow, or expensive. That second category is where the lab is heading.",
          ],
          pullQuote:
            "Anyone can call an API. The hard part is the system that survives the API being wrong.",
        },
        {
          heading: "Infrastructure.",
          paragraphs: [
            "Working. Vercel, Firebase, Supabase, GitHub Actions. CI for every deployable surface. Environment management that does not get tangled. Logs, alerts, and rollbacks that work when they need to.",
            "Where I am less deep: Kubernetes, Terraform, full IaC pipelines. The lab does not need those yet, and I am not going to fake fluency. When a project demands them, the foundation will let me learn them in the open.",
          ],
        },
        {
          heading: "Security.",
          paragraphs: [
            "Building. The basics are in place across every shipped project: secure auth, proper secret management, environment variables outside the repo, role-based mutations, server-side validation on every write, sanitized inputs, parameterized queries.",
            "The next layer is what I am working on intentionally. Threat modeling as a discipline, dependency auditing as a habit, OWASP-aware reviews on the work the lab takes most seriously. The Stark Protocol arc names this layer for a reason. The intent is to be unembarrassed by a real security audit.",
          ],
        },
        {
          heading: "Mobile.",
          paragraphs: [
            "Exploring. Mobile-first responsive web is fluent; every site the lab ships works as well on a phone as on a laptop. Native mobile (React Native, Swift, Kotlin) is on the roadmap, not yet shipped under the lab's name.",
            "The honest framing: I would rather be excellent at responsive web than mediocre at React Native this year. When the lab needs native, I will commit to it properly, ship a real surface, and put it on this page.",
          ],
          pullQuote:
            "Honest about depth beats wide about breadth. Always.",
        },
        {
          heading: "What this map is for.",
          paragraphs: [
            "This page is not a brochure. It is a map of where the work is today and where it is going. Recruiters and collaborators get the truth; readers who want to understand the trajectory get the shape of it. The lab will update this page as the depth changes.",
            "If you read this and your work needs depth in a discipline I marked as working, talk to me. If your work needs depth in one I marked as building, also talk to me. The conversation is more useful than the label.",
          ],
        },
      ]}
      related={[
        { href: "/systems/stack", label: "Stack", description: "What the capabilities are built in." },
        { href: "/projects", label: "Projects", description: "The capabilities, in production." },
        { href: "/contact", label: "Contact", description: "If you have a brief that matches the surface." },
      ]}
      faq={[
        {
          q: "What is the strongest capability today?",
          a: "Frontend and full stack web. The shipped surface is the proof. Backend, infrastructure, AI, and security are real but at different depths.",
        },
        {
          q: "Are you trying to be a generalist or a specialist?",
          a: "Both, in sequence. Generalist breadth today, specialist depth in machine learning, AI engineering, and cybersecurity over the next several years. The Stark Protocol arc is on the About page.",
        },
        {
          q: "What kind of work plays to your strengths today?",
          a: "Product engineering with a real interface, where the system underneath matters as much as the screen above it. Roles, real-time, role-aware UX. Anything where 'just slap a form on it' is not the right answer.",
        },
        {
          q: "Do you do design?",
          a: "Yes, the engineer-flavored version. I design what I build. I do not run an agency that designs for someone else. The visual taste is part of the engineering, not a separate department.",
        },
        {
          q: "What can you not do?",
          a: "Native iOS or Android at production depth, large-scale Kubernetes, hardcore numerical computing. Naming those honestly is part of the discipline.",
        },
        {
          q: "How quickly do you ramp on something new?",
          a: "Fast on patterns that share roots with what I already know. Slow on disciplines that demand new instincts (cryptography, low-level systems). I commit to learning, not pretending.",
        },
      ]}
    />
  );
}
