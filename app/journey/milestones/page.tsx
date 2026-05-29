import { LongFormPage } from "@/components/shared/LongFormPage";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  title: "Milestones",
  description:
    "Trajectory-bending moments in the Yashveer Labs timeline. The decisions and events that compounded the arc.",
  path: "/journey/milestones",
  keywords: ["Yashveer Labs milestones", "developer milestones", "Yashveer journey"],
});

export default function Page() {
  return (
    <LongFormPage
      eyebrow="Journey · Milestones"
      title="The moments that bent the trajectory."
      intro="Not the things that look impressive on a resume. The specific decisions and events that changed how the work compounded. Honest, dated, short."
      backdropVariant="gold"
      backdropImage="/images/journey-backdrop.webp"
      stats={[
        { label: "First deploy", value: "2024" },
        { label: "Lab named", value: "2025" },
        { label: "Nexli build", value: "2025" },
        { label: "Public surface", value: "2026" },
      ]}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Journey", path: "/journey" },
        { name: "Milestones", path: "/journey/milestones" },
      ]}
      sections={[
        {
          heading: "First deploy. 2024.",
          paragraphs: [
            "The first project I pushed to a public URL. The thing was modest. The shift was massive. The first deploy is the moment a developer's mental model changes from 'I am learning' to 'I am shipping'. Everything after gets easier because the bar moved.",
            "If you are early in your own arc, do not undervalue this moment. Picking the smallest possible project and putting it on a URL is more important than which framework you used to build it.",
          ],
        },
        {
          heading: "120 in 120. 2024.",
          paragraphs: [
            "120 SEO pages deployed in 120 days. One per day. The day count became a streak. The streak became muscle memory. The muscle memory became a default that has not gone away.",
            "The achievement is invisible. The pages are not famous. The internal change was structural. I stopped being a developer who shipped occasionally and became a developer who ships by default.",
          ],
          pullQuote:
            "Cadence eats inspiration. Always.",
        },
        {
          heading: "First real authentication. 2025.",
          paragraphs: [
            "The first time I shipped a project with real role-aware authentication, not just a demo login wall. The number of design decisions that downstream from a real auth model is enormous, and the gap between developers who have shipped one and developers who haven't is enormous too.",
            "From here, the lab's instinct for system design changed. Auth is the spine. Everything else hangs off it.",
          ],
        },
        {
          heading: "The internship. 2025.",
          paragraphs: [
            "The first time someone other than me set the brief, the deadlines, and the bar. Working inside a team forced clean commits, clean handoffs, and the kind of code review discipline that does not exist when you are the only reader.",
            "Sport Buddy and the gym dashboard shipped during this stretch. The structure that produced them is now baked into how every lab project runs.",
          ],
        },
        {
          heading: "Naming the lab. 2025.",
          paragraphs: [
            "Yashveer Labs became the umbrella. This sounds like a branding moment. It is actually a discipline moment. Naming the lab raises the standard the work has to clear. The work that does not clear the standard gets cut, not shipped under a lower bar.",
            "Every project on Projects today exists because it cleared the bar of being good enough to ship under the lab's name. The bar is the milestone. The name is the lever.",
          ],
        },
        {
          heading: "Nexli enters private testing. 2026.",
          paragraphs: [
            "Choosing to not launch is the milestone. Most developers ship the moment the system works on their laptop. The lab held Nexli back, put it inside one school, and committed to learning what only emerges when the real users find the edges.",
            "This decision is the difference between Nexli being a portfolio piece and Nexli being a product. The lab will hold this discipline on every system going forward.",
          ],
        },
        {
          heading: "The site you are reading. 2026.",
          paragraphs: [
            "The operating system metaphor lands. The dock replaces the navbar. Folders morph open. Every page is a route, every page has 3D, every page has structured data. This site is the milestone where the lab's surface starts to feel like the lab itself.",
            "It is also the first project where the design system, the motion choreography, and the 3D direction were treated as core engineering, not polish. That standard now applies to every surface the lab builds.",
          ],
          pullQuote:
            "If the surface does not feel like the lab, the surface is wrong, not the lab.",
        },
      ]}
      related={[
        { href: "/journey/achievements", label: "Achievements", description: "What got shipped." },
        { href: "/journey/evolution", label: "Evolution", description: "How taste and capability changed." },
        { href: "/journey/work-history", label: "Work History", description: "Roles and engagements." },
      ]}
      faq={[
        {
          q: "Why is naming the lab a milestone?",
          a: "Because it raises the bar the work has to clear. Anything shipping under the lab's name has to deserve it. That discipline shapes every decision after.",
        },
        {
          q: "What is the next milestone you are working toward?",
          a: "Nexli graduating from private testing to a real launch, and Nyxera moving from manifesto to interface. Both within the next several months.",
        },
        {
          q: "Are there milestones that did not work out?",
          a: "Yes. Several abandoned projects from 2024 and early 2025 that did not clear the lab's bar. Those are not on this page on purpose. The list is what compounded, not what was attempted.",
        },
        {
          q: "How do you know a milestone matters?",
          a: "It changes a default afterward. If the project comes back the same as before, it was a project. If the project changes how the next ten projects get built, it was a milestone.",
        },
        {
          q: "Is the operating system metaphor permanent?",
          a: "Yes. The dock, the folders, the route structure all stay. The visual design will refine, but the metaphor is the lab's surface now.",
        },
        {
          q: "What did you learn from the milestones that did not work?",
          a: "That premature launch is the most expensive shortcut. Shipping a system before it can survive its users costs more in repair time than waiting would have cost in patience.",
        },
      ]}
    />
  );
}
