import { LongFormPage } from "@/components/shared/LongFormPage";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  title: "Systems",
  description:
    "Systems thinking and architecture patterns at Yashveer Labs. How systems are designed end to end, not just feature by feature.",
  path: "/systems/systems",
  keywords: ["system architecture", "scalable systems", "system design", "Yashveer Labs"],
});

export default function Page() {
  return (
    <LongFormPage
      eyebrow="Systems · Architecture"
      title="Systems are the units of work I care about most."
      intro="Most early developers focus on pages. I focus on systems. A page is what someone sees. A system is what someone trusts. This page is about how I design the second one."
      backdropVariant="gold"
      backdropImage="/images/systems-backdrop.webp"
      stats={[
        { label: "Roles in Nexli", value: "7" },
        { label: "Layers", value: "4" },
        { label: "Default", value: "Modular" },
        { label: "North star", value: "Trust" },
      ]}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Systems", path: "/systems/stack" },
        { name: "Architecture", path: "/systems/systems" },
      ]}
      sections={[
        {
          heading: "The four-layer mental model.",
          paragraphs: [
            "I model every system in the lab in four layers. The data layer is the source of truth and the schema that protects it. The service layer is the code that mutates the data with intent and policy. The interface layer is what the user actually touches. The orchestration layer is the choreography between the three: scheduled jobs, event triggers, AI routing, observability.",
            "Most bugs live at layer boundaries. Validation that exists in the interface layer but not in the service layer. State that exists in the orchestration layer but is invisible to the interface. Naming the layers explicitly is the first step to keeping the boundaries clean.",
          ],
          bullets: [
            "Data: schema, indices, constraints, the truth",
            "Service: mutation logic, policy, transactions",
            "Interface: what the user sees, reads, edits",
            "Orchestration: triggers, schedulers, AI, observability",
          ],
        },
        {
          heading: "Role separation is a design tool, not a feature.",
          paragraphs: [
            "Nexli has seven roles. They are not seven copies of the same dashboard with different links hidden. Each role has its own surface, its own permissions, its own mental model of the system. A principal sees the school. A teacher sees their classes. A parent sees their child.",
            "The lesson is general. When the system serves multiple kinds of user, separating their surfaces is the cheapest way to make the product feel correct. Trying to make one surface serve everyone is how products become bloated and confusing in equal measure.",
          ],
          pullQuote:
            "If a single interface tries to serve every role, it serves none of them well.",
        },
        {
          heading: "Realtime where it earns its place.",
          paragraphs: [
            "Realtime is expensive. It is not just an engineering cost, it is a mental cost: the user has to make peace with the fact that the screen they are looking at might change underneath them. Real-time is the right answer when the value of seeing the change outweighs the cost of expecting it.",
            "Attendance updating in real time as a teacher marks roll? Yes. Fee ledgers updating live as collection happens? Yes. A blog post showing live read counts to its author? No. The default is not realtime. The default is correctness.",
          ],
        },
        {
          heading: "State, the part everyone underestimates.",
          paragraphs: [
            "State is the silent killer of systems. Cached state that lies, optimistic state that desyncs, server state that has no client mirror, client state that has no server source. Every system the lab ships has a clear answer to one question: where does each piece of state live, and who owns it.",
            "The rule that works for me. Server state is the truth. Client state is a projection. Cache invalidation is a system feature, not an afterthought. Write the answer to that question in a code comment near the top of the relevant file. Future you will thank present you.",
          ],
        },
        {
          heading: "How I sketch a system before writing a line.",
          paragraphs: [
            "Three documents, kept short. A data model that names the entities and the relationships. A role table that names who can do what. A flow diagram for the one or two journeys that matter most. The total page count is usually two. Three if the system is genuinely complex.",
            "The point is not the documents. The point is forcing myself to make the structural decisions before the code starts to make them for me. Once code exists, it has gravity. Sketching with text first keeps the structural decisions where they belong, in my head, on paper, then in the repo.",
          ],
          pullQuote:
            "Code has gravity. Sketches are weightless. Use weightlessness while you still have it.",
        },
        {
          heading: "What scales and what does not.",
          paragraphs: [
            "Architecture patterns scale. Specific tools sometimes do not. A clean four-layer model survives a stack migration; the specific framework choice may not. Designing the system at the right level of abstraction is what makes the system survive its own future.",
            "The other thing that scales is naming. Boring, descriptive, repetitive naming. The exotic name is fun for a week and confusing for a year. The boring name compounds.",
          ],
        },
      ]}
      related={[
        { href: "/systems/engineering-capabilities", label: "Capabilities", description: "What the system thinking enables." },
        { href: "/projects", label: "Projects", description: "The systems in production." },
        { href: "/labs/concepts", label: "Concepts", description: "Where the next systems are being sketched." },
      ]}
      faq={[
        {
          q: "Do you write architecture documents for every project?",
          a: "Yes, even if they are short. Two pages of model, roles, and flows before any code. The discipline is non-negotiable now. I have shipped enough projects without it to know the difference.",
        },
        {
          q: "How do you handle scaling concerns at this stage?",
          a: "Scaling is a real concern, not a fantasy. Most lab projects are well below the scale where the standard tools struggle. Where the projects approach that line, the architecture is sketched to scale, even if today it does not need to.",
        },
        {
          q: "What is the most common architecture mistake you see?",
          a: "Putting business logic in the interface layer. The form does too much. The component owns too much state. The mutation runs client-side. The result is a system that cannot be re-skinned, cannot be re-platformed, and cannot be reasoned about.",
        },
        {
          q: "How do you decide what to make a service?",
          a: "When the work is reusable across surfaces, when it has its own lifecycle, or when the data it owns is sensitive enough to deserve a clear boundary. Otherwise it stays a function.",
        },
        {
          q: "Do you use microservices?",
          a: "Rarely, and only when the project is large enough that the coordination cost is lower than the boundaries it provides. Most lab projects are a monolith on purpose. The monolith is faster, simpler, and shippable by one person.",
        },
        {
          q: "What system are you most proud of?",
          a: "Nexli. Seven roles, real workflows, real users in private testing. Designed and built end to end. It is the most complete system the lab has shipped to date.",
        },
      ]}
    />
  );
}
