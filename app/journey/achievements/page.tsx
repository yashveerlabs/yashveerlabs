import { LongFormPage } from "@/components/shared/LongFormPage";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  title: "Achievements",
  description:
    "Concrete achievements at Yashveer Labs. Shipped products, deployed surfaces, dated entries, no inflation.",
  path: "/journey/achievements",
  keywords: ["Yashveer achievements", "shipped products", "Yashveer Labs"],
});

export default function Page() {
  return (
    <LongFormPage
      eyebrow="Journey · Achievements"
      title="Concrete, dated, real."
      intro="No vague claims. No inflated metrics. The list is short on purpose. Each entry has a URL or a stakeholder behind it."
      backdropVariant="gold"
      backdropImage="/images/journey-backdrop.webp"
      stats={[
        { label: "Public products", value: "4" },
        { label: "In private testing", value: "1" },
        { label: "SEO pages", value: "120" },
        { label: "Teaching role", value: "Yes" },
      ]}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Journey", path: "/journey" },
        { name: "Achievements", path: "/journey/achievements" },
      ]}
      sections={[
        {
          heading: "Shipped products with public URLs.",
          paragraphs: [
            "Four products live on the public internet today. Dwarka Bricks, a hyper-local real estate platform for the 22 sectors of Dwarka. Expert Tutorials, a CBSE coaching site with a teaching role layered on top. Prominence Football Academy, a youth football academy's full digital presence. Velmora, a Roblox game under the username @yashveersinghrajpoot.",
            "Each one is a different brief, a different audience, and a different stack surface. The thing they share is that none of them are screenshots. They are URLs.",
          ],
          bullets: [
            "Dwarka Bricks · live",
            "Expert Tutorials · live",
            "Prominence Football Academy · live",
            "Velmora · live on Roblox",
          ],
        },
        {
          heading: "Systems in private testing.",
          paragraphs: [
            "Nexli is the largest system the lab has built. Seven role-aware surfaces, attendance with at-risk flagging, fee ledger, PDF report cards, paper generator off a managed question bank, parent-teacher messaging. It runs inside one school in private testing right now, on purpose.",
            "The achievement is not the launch. The achievement is the discipline to not launch. School software either survives a full academic cycle with the people who actually use it, or it gets a flashy press moment and a quiet failure six months later. The lab chose the first.",
          ],
        },
        {
          heading: "Content and cadence.",
          paragraphs: [
            "120 SEO-optimized blog pages deployed across four months in 2024 for a restaurant group. One per day, for the full stretch. The work itself is not what gets listed here. The discipline is. Deploying every single day for that long is the kind of muscle that does not show up on a resume but shows up in every project that comes after it.",
          ],
        },
        {
          heading: "Teaching role.",
          paragraphs: [
            "Brought on by Expert Tutorials to teach AI, Informatics Practices, Computer Science, and programming languages, every Saturday and Sunday. Teaching changes the lab's work in a specific way: explaining a concept to a 17-year-old who is going to ask follow-up questions is a sharper test than explaining it to yourself.",
          ],
        },
        {
          heading: "Recognition signals.",
          paragraphs: [
            "Clients refer clients. The football academy and the real estate platform both came through warm intros from previous work. The internship that anchored 2025 turned into a continuing relationship. None of those are accolades. They are the quietest form of validation, which is the one I trust.",
          ],
          pullQuote:
            "The strongest recognition is referrals. The weakest is awards. The lab optimizes for the first.",
        },
      ]}
      related={[
        { href: "/projects", label: "Projects", description: "The full case studies." },
        { href: "/journey/milestones", label: "Milestones", description: "Trajectory-bending moments." },
        { href: "/journey/work-history", label: "Work History", description: "The structured record." },
      ]}
      faq={[
        {
          q: "Why no certifications or competition wins on this page?",
          a: "Because those are not the work. If a competition or certification is genuinely meaningful, it will eventually become a real project on Projects or a teaching unit on Expert Tutorials. The lab does not optimize for stickers.",
        },
        {
          q: "How do you measure 'achievement' here?",
          a: "Something is shipped, used by people who are not me, and demonstrably better than what existed before. If those three are true, it goes on this page. If only two, it does not.",
        },
        {
          q: "What is the achievement you are most proud of?",
          a: "Nexli's discipline of staying in private testing. Anyone can launch. Choosing not to launch until the system has survived the building is rarer and harder.",
        },
        {
          q: "What achievement are you most working toward?",
          a: "Nyxera as a real interface. The moment that lands honestly is the moment the lab moves into its next chapter.",
        },
        {
          q: "Have any of these projects generated revenue?",
          a: "Several. Specific numbers are not public. The economics are healthy enough to keep the lab independent.",
        },
        {
          q: "Are you taking on more client work?",
          a: "Selectively. Contact page has the line.",
        },
      ]}
    />
  );
}
