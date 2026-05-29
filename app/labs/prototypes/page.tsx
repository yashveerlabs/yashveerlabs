import { LongFormPage } from "@/components/shared/LongFormPage";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  title: "Prototypes",
  description:
    "Prototypes built at Yashveer Labs. What each taught me, what survived, and what got cut. The bench notebook of the lab.",
  path: "/labs/prototypes",
  keywords: ["prototypes", "Yashveer Labs experiments", "rapid prototyping"],
});

export default function Page() {
  return (
    <LongFormPage
      eyebrow="Labs · Prototypes"
      title="Things I built to learn one specific thing."
      intro="Not every build is a product. Some are tests. Each prototype here was built to learn a single thing, fast. The lesson is the deliverable. The code is the side effect."
      backdropVariant="gold"
      backdropImage="/images/labs-backdrop.webp"
      stats={[
        { label: "Default", value: "1 week" },
        { label: "Rule", value: "Throwaway-ok" },
        { label: "Survival rate", value: "~30%" },
        { label: "Learning rate", value: "100%" },
      ]}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Labs", path: "/labs/ai-experiments" },
        { name: "Prototypes", path: "/labs/prototypes" },
      ]}
      sections={[
        {
          heading: "Why prototypes deserve their own folder.",
          paragraphs: [
            "Most of what a working developer learns happens in the gap between two production projects. The thing that fits in that gap is a prototype. A focused build, scoped tight, shipped to localhost or to a private URL, killed if it does not earn a longer life.",
            "Naming the folder makes the practice intentional. The lab keeps a steady cadence of prototypes specifically because they are where the structural learning happens. Production work consolidates. Prototypes expand.",
          ],
        },
        {
          heading: "How a prototype gets scoped.",
          paragraphs: [
            "One question, one week, one repo. The question has to be specific. 'Can I use streaming SSE to render a model response in this UX' is a prototype question. 'Should the lab use AI' is not.",
            "The week-long bound is real. If the prototype has not produced an answer by the end of the week, the prototype is the wrong shape. Either the question was too big, the tooling was wrong, or the prototype is secretly a real project in disguise. All three are fine; all three need a different folder.",
          ],
          pullQuote:
            "A prototype that runs long has stopped being a prototype.",
        },
        {
          heading: "What I have learned from the survivors.",
          paragraphs: [
            "The prototypes that survived and became patterns in the lab share a few things. They were honest about the thing they were testing. They were boring on every axis except the one they were testing. They produced a one-page note that captured the lesson, so future-me did not need to re-derive the answer.",
            "Specifically, the work that survived built the dock physics, the route morph patterns, the small-model orchestration ideas, and the FAQ-first content structure used across this site. Each started as a one-week test. Each earned its way into the lab's default toolkit.",
          ],
          bullets: [
            "Honest about what is being tested",
            "Boring on every other axis",
            "A one-page note at the end, every time",
            "Killed or absorbed, never left half-alive",
          ],
        },
        {
          heading: "What I have learned from the failures.",
          paragraphs: [
            "Far more than from the survivors. The failures cluster into patterns. Trying to test two things at once, so the result is ambiguous. Choosing a stack the prototype does not need, so the learning gets tangled up in tooling. Skipping the writeup at the end, so the next time the same question comes up, the answer has to be re-derived from scratch.",
            "Naming these patterns has slowly tightened the prototype loop. The discipline now is one variable, smallest possible stack, writeup before you close the repo.",
          ],
        },
        {
          heading: "Where prototypes go from here.",
          paragraphs: [
            "The folder will get specific case studies as prototypes earn the writeups they deserve. The blog will host the longer notes; this page will host the index. Some prototypes graduate into Concepts, some into Projects, and some into a quiet line that says, 'tried, did not work, here is why'.",
          ],
        },
      ]}
      related={[
        { href: "/labs/concepts", label: "Concepts", description: "Where surviving prototypes get speculative." },
        { href: "/labs/interfaces", label: "Interfaces", description: "Where surface prototypes live." },
        { href: "/labs/ai-experiments", label: "AI Experiments", description: "Where AI prototypes incubate." },
      ]}
      faq={[
        {
          q: "How many prototypes do you actually run?",
          a: "Several per quarter. The cadence varies with how much production work is moving. The discipline does not.",
        },
        {
          q: "What is the most useful prototype you have built?",
          a: "The first version of the dock-morph behavior on this site. The prototype proved the layout-id technique worked under the constraints I cared about. The pattern is now baked into how the lab thinks about navigation.",
        },
        {
          q: "Do you ever turn a prototype into a product?",
          a: "Yes, when the prototype answers its question in a way that opens up a real surface. The boundary is intentional. A prototype that turns into a product needs a real spec; the prototype itself is the input, not the output.",
        },
        {
          q: "Do prototypes ever get shared publicly?",
          a: "Selectively. The ones that produce a teachable lesson get a blog post. The ones that do not get a private note and a closed repo.",
        },
        {
          q: "What is the biggest mistake to avoid in prototyping?",
          a: "Conflating exploration with production. The moment a prototype starts taking the polish a product needs, it is the wrong project. Kill it or graduate it. Do not let it sit in the middle.",
        },
        {
          q: "Should I start a prototypes folder for my own work?",
          a: "Yes. Make it intentional, name it, scope each one to one question, write a one-page note when each is done. You will learn faster than any course you can take.",
        },
      ]}
    />
  );
}
