import { LongFormPage } from "@/components/shared/LongFormPage";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  title: "Interfaces",
  description:
    "Interface experiments at Yashveer Labs. UI systems, motion language, and the design DNA that shows up across the lab's surfaces.",
  path: "/labs/interfaces",
  keywords: ["UI design", "motion design", "interface design", "design system"],
});

export default function Page() {
  return (
    <LongFormPage
      eyebrow="Labs · Interfaces"
      title="The skin of the system is part of the system."
      intro="Interfaces are not decoration. They are the most-touched surface of the engineering underneath. The work here is about turning that surface into something that earns its presence."
      backdropVariant="gold"
      backdropImage="/images/labs-backdrop.webp"
      stats={[
        { label: "Engine", value: "Tailwind v4" },
        { label: "Motion", value: "Framer + GSAP" },
        { label: "3D", value: "R3F" },
        { label: "Tokens", value: "CSS vars" },
      ]}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Labs", path: "/labs/ai-experiments" },
        { name: "Interfaces", path: "/labs/interfaces" },
      ]}
      sections={[
        {
          heading: "The lab's design language.",
          paragraphs: [
            "Carbon-black surfaces. Champagne gold reserved for the 5 percent of the UI that has to carry weight. Warm off-white text, cool stone gray body, generous spacing, thin borders, soft shadows. The language is intentional restraint, because the work behind it is intentional ambition.",
            "The design system is expressed in CSS variables, not in a parallel design tokens file. The codebase is the source of truth. Changing a token is one edit. The design language lives where the code lives.",
          ],
          pullQuote:
            "Restraint in the design language buys ambition in the engineering. Both directions.",
        },
        {
          heading: "Motion as a language.",
          paragraphs: [
            "Motion in the lab is not decorative. It is functional. Every animation either communicates state, directs attention, or makes a transition feel inevitable. If it cannot pass that test, it does not ship.",
            "The choreography is split. Framer Motion for component-level motion: tooltips, hovers, the dock magnification, the folder morph. GSAP for page-level choreography: cinematic transitions, scroll-driven sequences. Lenis for the underlying scroll feel. Each tool does one thing well; the lab does not pick favorites by team.",
          ],
        },
        {
          heading: "3D as a primitive, not a stunt.",
          paragraphs: [
            "3D shows up across the site because the lab's surface deserves the depth it adds. The home page sigil. The Nyxera core. The ambient backdrops on every long-form page. None of these are decoration; each one carries part of the identity that flat design cannot.",
            "The discipline is performance. Pixel ratio capped at two. Frame loop paused when the tab is hidden. Every 3D component lazy-loaded with ssr off. Heavy effects skipped on mobile. The visual finish does not come at the cost of the Lighthouse score.",
          ],
          bullets: [
            "MeshTransmissionMaterial for the glassy surfaces",
            "Drei Environment presets for realistic reflections",
            "Instanced meshes for particles",
            "Postprocessing only when the surface earns it",
          ],
        },
        {
          heading: "The dock as a design statement.",
          paragraphs: [
            "The dock is the lab's most opinionated piece of interface so far. It replaces the standard top navbar with a floating bottom-anchored dock that magnifies on hover and morphs folders into glass panels on click. It is the page where the operating system metaphor goes from a phrase to a feeling.",
            "The technical pieces (Framer Motion layoutId, spring physics, focus trap, scroll hide) are documented elsewhere. The interface point is simpler. The navigation surface should feel like part of the product, not like furniture that came with the framework.",
          ],
        },
        {
          heading: "What is being worked on in this folder.",
          paragraphs: [
            "New interface experiments live here. A keyboard command palette aimed at the lab's surfaces. A spatial audio cue layer for the Nyxera page. A scroll-driven storytelling pattern that the long-form pages can opt into. Most of these will graduate into specific shipped surfaces; a few will be left as lessons in this folder.",
            "The bar is the same as the rest of the lab. Interfaces ship or they are documented as deliberate non-ships. Nothing sits half-built.",
          ],
        },
      ]}
      related={[
        { href: "/labs/prototypes", label: "Prototypes", description: "Where interface ideas get tested first." },
        { href: "/labs/concepts", label: "Concepts", description: "Speculative interface directions." },
        { href: "/systems/technologies", label: "Technologies", description: "The 3D, motion, and CSS underneath." },
      ]}
      faq={[
        {
          q: "Is the design language going to stay this dark?",
          a: "Yes. The carbon-and-gold direction is the lab's permanent visual identity. Nyxera adds cyan as the second accent layer. No light mode planned.",
        },
        {
          q: "Why so much motion?",
          a: "Because motion is information. A static interface forces the user to infer state from layout alone. A well-motioned interface explains itself in the act of changing. The cost is real; the payoff is larger.",
        },
        {
          q: "Why the operating system metaphor specifically?",
          a: "Because the lab is the kind of place that should feel like a system to inhabit, not a page to scroll through. The dock, the folders, the routed surfaces all serve that metaphor. The interface is the lab's first product.",
        },
        {
          q: "Do you use a design system library like shadcn?",
          a: "I use a few shadcn primitives, restyled to match the lab's language. The rest is custom. The lab's design language is too specific to outsource to a library default.",
        },
        {
          q: "What is the hardest interface decision you have made on this site?",
          a: "Removing the top navbar. It is the standard, it is what everyone expects, and replacing it with a dock invited the risk that users would not find their way around. The decision was the bet that the operating system metaphor was worth the friction. The dock works because it is consistent, magnified, and immediately readable.",
        },
        {
          q: "Can I copy your design language?",
          a: "Influence is fair, copying is not. The lab's language exists in service of the lab's specific work. Pull the principles; build your own version.",
        },
      ]}
    />
  );
}
