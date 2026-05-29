import { LongFormPage } from "@/components/shared/LongFormPage";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  title: "Work History",
  description:
    "Professional and project work history of Yashveer Singh Rajpoot. Freelance, internships, and the founder role at Yashveer Labs.",
  path: "/journey/work-history",
  keywords: ["Yashveer work history", "developer roles", "Yashveer Labs founder"],
});

export default function Page() {
  return (
    <LongFormPage
      eyebrow="Journey · Work History"
      title="Where I have spent my engineering hours."
      intro="Roles, engagements, and the actual work behind them. The list is short because the rule has been depth over breadth from the first project on."
      backdropVariant="gold"
      backdropImage="/images/journey-backdrop.webp"
      stats={[
        { label: "Roles", value: "4" },
        { label: "Live products", value: "5" },
        { label: "Teaching", value: "Weekends" },
        { label: "Lab status", value: "Active" },
      ]}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Journey", path: "/journey" },
        { name: "Work History", path: "/journey/work-history" },
      ]}
      sections={[
        {
          heading: "Founder, Yashveer Labs (2025 to present).",
          paragraphs: [
            "Independent lab in New Delhi. The container for everything the body of work is built under. Five live products today: Dwarka Bricks, Expert Tutorials, Prominence Football Academy, Velmora on Roblox, and Nexli in private testing.",
            "The role is end to end. Brief, design, engineering, deployment, post-launch ownership. The lab is run by one person right now, on purpose. Scaling the team is a decision that has to be earned.",
          ],
        },
        {
          heading: "Teaching at Expert Tutorials (2025 to present).",
          paragraphs: [
            "Weekend instructor across AI, Informatics Practices, Computer Science, and programming languages. Saturdays and Sundays.",
            "Teaching changes the engineering. The act of explaining a concept to a student who is going to follow up with a hard question is the sharpest pressure test of how well you actually understand something. Several lab decisions changed because a 17-year-old asked the right question at the wrong time.",
          ],
          pullQuote:
            "If you cannot teach it, you do not understand it. If you can, you do.",
        },
        {
          heading: "Frontend Developer Intern (2025).",
          paragraphs: [
            "Structured internship focused on production-grade applications. The work included Gym Management Dashboard and Sport Buddy, plus admin authentication systems for both.",
            "What the internship strengthened: component architecture under team review, dashboard UI design with non-engineer stakeholders, version control discipline, and deployment workflows that survive a team handoff. The lab still uses the patterns I learned here.",
          ],
        },
        {
          heading: "Freelance Developer and Content Engineer (2024).",
          paragraphs: [
            "Wah Ji Wah restaurant group. 120 SEO-optimized blog pages deployed in four months. One per day. The role was content engineering, but the lesson was cadence.",
            "This is the engagement that made shipping a default instead of a discipline. The pages themselves are not the achievement. The streak is.",
          ],
        },
        {
          heading: "What I am not doing.",
          paragraphs: [
            "I am not currently in a full-time role at another company. The lab is the primary surface. I am open to high intensity collaboration: startup engineering, AI labs, structured internships, technical partnerships. The contact page has the line.",
            "I do not run an agency. I do not take on indistinguishable client work for revenue. The work has to be a fit for the lab or it does not happen.",
          ],
        },
      ]}
      related={[
        { href: "/projects", label: "Projects", description: "The shipped work itself." },
        { href: "/journey/achievements", label: "Achievements", description: "What earned its place." },
        { href: "/resume", label: "Resume", description: "The structured version." },
      ]}
      faq={[
        {
          q: "Are you available for full-time roles?",
          a: "Open to the right one. Startup engineering, AI lab, infrastructure, security, or product engineering. The bar is intensity and shipping cadence. Recruiter bait is not a fit.",
        },
        {
          q: "Are you available for freelance?",
          a: "Selectively. The work has to be the kind that would belong on the Projects page. Contact page is the place.",
        },
        {
          q: "Do you have a notice period?",
          a: "I run my own lab and teach on weekends. There is no formal notice. Scheduling a transition is a conversation, not a process.",
        },
        {
          q: "What is the most useful experience you have for a startup?",
          a: "End-to-end ownership. The lab has shipped products under brief, design, engineering, deployment, and post-launch maintenance, all under one operator. Startups feel like an extension of the lab, not a different mode.",
        },
        {
          q: "Have you led a team?",
          a: "Not yet at full-time scale. I have coordinated with stakeholders, clients, teachers, and other developers across the engagements above. The next step is leading a small engineering team. That is on the trajectory.",
        },
        {
          q: "Can you commit to a long term role and the lab?",
          a: "Yes, for the right role. The lab is the long arc. A serious role is a chapter within it, not a competitor to it. Honest framing from day one.",
        },
      ]}
    />
  );
}
