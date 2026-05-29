import { LongFormPage } from "@/components/shared/LongFormPage";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  title: "Evolution",
  description:
    "How thinking, taste, and capability have evolved across the Yashveer Labs arc. The lens has sharpened. Here is how.",
  path: "/journey/evolution",
  keywords: ["developer evolution", "engineering growth", "Yashveer Labs taste"],
});

export default function Page() {
  return (
    <LongFormPage
      eyebrow="Journey · Evolution"
      title="Taste, capability, and thinking, in that order."
      intro="The visible artifacts (Projects, Resume) are what compounded. The invisible part is how the lens that produced them got sharper. This page tries to make the invisible part visible."
      backdropVariant="gold"
      backdropImage="/images/journey-backdrop.webp"
      stats={[
        { label: "From", value: "Pages" },
        { label: "To", value: "Systems" },
        { label: "Next", value: "Intelligence" },
        { label: "Discipline", value: "Compounding" },
      ]}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Journey", path: "/journey" },
        { name: "Evolution", path: "/journey/evolution" },
      ]}
      sections={[
        {
          heading: "Taste, first.",
          paragraphs: [
            "What looked acceptable in 2024 looks unfinished in 2026. That is not a flex. It is the only honest signal of growth I trust. Tasting that gap, every time I open an old project, is the most reliable proof that the lens has sharpened.",
            "The interesting part is what the gap is actually made of. It is not new color palettes or new motion libraries. It is restraint. Knowing what to leave out. Knowing when a quiet design is the right design. Knowing that complexity is the easy answer and simplicity is the earned one.",
          ],
          pullQuote:
            "Restraint is the most expensive thing a designer can buy. It is also the most valuable.",
        },
        {
          heading: "Capability, second.",
          paragraphs: [
            "The capability arc went exactly where you would expect, with one twist. The expected part: HTML and CSS, then JavaScript, then React, then TypeScript, then full stack patterns, then system design. The twist is that the order I learned things in was almost the inverse of the order I now use them.",
            "Today, system design comes first. The data model and role table go on paper before a single component renders. The framework is a downstream decision. The component library is the last thing to get picked. In 2024, the component library was the first thing. Watching the order reverse, for myself, is the part of the evolution that I notice most clearly.",
          ],
        },
        {
          heading: "Thinking, third.",
          paragraphs: [
            "The most important shift is the slowest. In 2024 I thought projects were the unit of work. In 2025 I thought systems were the unit. By 2026 I think the unit is the body of work itself. Each project is a token in a longer sentence the lab is writing.",
            "That changes which projects make the cut. The question is no longer 'is this interesting' but 'does this push the arc'. If yes, it ships. If no, it does not. The list stays shorter on purpose, and the work gets heavier as a result.",
          ],
        },
        {
          heading: "What did not change.",
          paragraphs: [
            "The instinct to ship. The discipline to finish. The habit of putting the file online, even when it is rough, even when it is not the most ambitious thing I could be doing. That habit predates everything else on this site, and it is the only one I am not interested in changing.",
            "The other constant is the long arc. Full stack today, ML next, AI after, security on top. The arc was named in 2025 and has not moved. Tactics evolve. Trajectory does not.",
          ],
        },
        {
          heading: "What I expect to evolve next.",
          paragraphs: [
            "Tooling will compress. AI assistance moves from completion to genuine collaboration on structural decisions, with me staying in the seat. The lab learns to delegate the boilerplate without delegating the thinking.",
            "Surface area will expand. The lab moves from web to web plus AI to web plus AI plus security. Each new layer is a discipline, not a feature. The depth in each is the bet.",
            "Voice will sharpen. The blog gets serious. Public talks get scheduled. The lab becomes more visible without becoming louder. The work still does the talking.",
          ],
        },
      ]}
      related={[
        { href: "/journey", label: "Journey", description: "The shape of the arc." },
        { href: "/journey/milestones", label: "Milestones", description: "The specific moments." },
        { href: "/about", label: "About", description: "The frame the evolution lives in." },
      ]}
      faq={[
        {
          q: "Why is taste at the top of this page?",
          a: "Because it is the slowest-to-acquire and the most decisive. Capability without taste produces noise. Taste with capability produces work that holds up.",
        },
        {
          q: "How do you cultivate taste deliberately?",
          a: "Read more than you write. Look at more than you build. Imitate intentionally. Critique your own work harder than anyone else does. Repeat for years.",
        },
        {
          q: "What is the hardest part of evolving as a developer?",
          a: "Letting go of patterns you spent time learning. The old habit feels productive even when the new pattern is clearly better. Naming the gap out loud helps.",
        },
        {
          q: "How do you handle imposter syndrome?",
          a: "By making the work prove the thing for me. The systems are real. The deployments are public. The streak is documented. Imposter syndrome is a story; evidence is a tool against it.",
        },
        {
          q: "What is one belief you used to hold that you no longer do?",
          a: "That a great portfolio is a long portfolio. The opposite is true. A small body of work that holds up wins, every time.",
        },
        {
          q: "What is one belief you hold now that you expect to change?",
          a: "That solo-mode is the best mode for the lab. It is the right mode today. In a year, the work probably outgrows it. The evolution will be from a one-person lab to a tight team without losing the operator discipline that got the lab here.",
        },
      ]}
    />
  );
}
