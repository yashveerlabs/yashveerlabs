import { LongFormPage } from "@/components/shared/LongFormPage";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  title: "Concepts",
  description:
    "Speculative concepts and R&D thinking at Yashveer Labs. Future surfaces, future products, future arguments. The horizon folder.",
  path: "/labs/concepts",
  keywords: ["speculative design", "R&D", "future concepts", "Yashveer Labs concepts"],
});

export default function Page() {
  return (
    <LongFormPage
      eyebrow="Labs · Concepts"
      title="Ideas that have not earned their shape yet."
      intro="The horizon folder. Half-formed product concepts, speculative interface bets, future arguments. Most will not ship. The point is that the lab keeps the surface open for the ones that do."
      backdropVariant="violet"
      backdropImage="/images/labs-backdrop.webp"
      stats={[
        { label: "Maturity", value: "Idea stage" },
        { label: "Bias", value: "Long-arc" },
        { label: "Default", value: "Speculative" },
        { label: "Rule", value: "Honest" },
      ]}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Labs", path: "/labs/ai-experiments" },
        { name: "Concepts", path: "/labs/concepts" },
      ]}
      sections={[
        {
          heading: "Why the concepts folder exists.",
          paragraphs: [
            "Most labs hide the half-formed ideas. The result is a body of work that looks complete but is structurally incomplete: it gives no clue about where the lab is pointing, only where the lab has been. The Concepts folder fixes that. The horizon belongs on the site too.",
            "Putting concepts in public has a forcing function attached to it. The ideas get described. The arguments get tightened. The bad ones get embarrassed out of the lab faster than they would have privately. That is the point.",
          ],
        },
        {
          heading: "Three concepts the lab is sitting with right now.",
          paragraphs: [
            "First: the Nyxera ambient interface. A presence that lives in the background of the operating system, surfacing the right thing at the right moment without asking. Most of this is on the Nyxera page; the speculative parts (the cross-device continuity, the silent triage) live here until they earn the surface.",
            "Second: a school operations layer that goes beyond Nexli. Multi-school cooperation, district-level visibility, parent communication that is structured but not robotic. The seed is in Nexli; the surface is not built yet.",
            "Third: a developer-facing AI tooling layer. Not the next AI-IDE. The opposite. A small, opinionated set of CLI primitives that make the boring parts of shipping disappear without delegating the thinking. The lab's internal tools are the prototype.",
          ],
          bullets: [
            "Concept 1 · Nyxera as ambient OS layer",
            "Concept 2 · A district-level school operations layer past Nexli",
            "Concept 3 · A small, opinionated dev-tooling CLI",
          ],
        },
        {
          heading: "The rule for what goes here.",
          paragraphs: [
            "A concept earns a page in this folder if it is real enough to be argued about, but not real enough to be a project yet. Three sentences of description; three sentences of why it matters; one paragraph on what would have to be true for it to ship. No more, no less.",
            "When a concept either dies or graduates, the page updates. Dying concepts get a brief retrospective. Graduating concepts get a link to the prototype, the project, or the surface they became. The Concepts folder is supposed to evolve, not accumulate.",
          ],
          pullQuote:
            "The horizon is part of the lab. Hide it, and the lab looks smaller than it is.",
        },
        {
          heading: "What the Concepts folder is not.",
          paragraphs: [
            "A pitch deck. A roadmap. A promise. Concepts are explicitly speculative. Readers are invited to argue with them, not to plan around them. The lab does not pre-commit to shipping any specific concept on any specific timeline.",
            "It is also not a brainstorm log. Random ideas without structure do not earn a page. The bar is, the concept is sharp enough to defend in writing. If it is not, it stays in a notebook.",
          ],
        },
        {
          heading: "Where this leads.",
          paragraphs: [
            "Some of what is on this page becomes the next Projects entry. Some becomes a blog post arguing for or against a direction. Some becomes a quiet line in a future retrospective that says, 'considered, did not ship, here is why'. All of those outcomes are valid. None of them are failure.",
            "The folder is going to grow. As the lab's surface area widens, the horizon does too. Check back when the wind changes.",
          ],
        },
      ]}
      related={[
        { href: "/labs/prototypes", label: "Prototypes", description: "Where concepts get their first test." },
        { href: "/nyxera", label: "Nyxera AI", description: "The closest concept to becoming a surface." },
        { href: "/journey/evolution", label: "Evolution", description: "The shape concepts grow into." },
      ]}
      faq={[
        {
          q: "Are these concepts going to ship?",
          a: "Some yes, some no. The folder is honest about that. The point is to make the horizon visible, not to pre-commit to outcomes.",
        },
        {
          q: "Can I help build one of these?",
          a: "Maybe. If a concept genuinely overlaps with what you are working on, the contact page is the place. Real collaborations beat enthusiastic ones.",
        },
        {
          q: "What is the riskiest concept on this page?",
          a: "The Nyxera ambient OS layer. The technical pieces are real; the product question is, will people actually want an AI that surfaces things rather than answers them. The answer is unknown, and that is exactly why the concept is interesting.",
        },
        {
          q: "Do you share these concepts elsewhere?",
          a: "The argued versions live in the blog. The dock-level summary lives here. Both should hold up under scrutiny.",
        },
        {
          q: "What happens to a concept when it dies?",
          a: "Brief retrospective on the page, then archived. The folder is not a graveyard; it is a working surface.",
        },
        {
          q: "Why is this folder visible at all?",
          a: "Because the lab is supposed to look like a lab. A lab without a horizon is a vendor. The Concepts folder is the difference.",
        },
      ]}
    />
  );
}
