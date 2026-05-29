import { LongFormPage } from "@/components/shared/LongFormPage";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  title: "Journey",
  description:
    "The growth arc of Yashveer Singh Rajpoot. From SEO content pages in 2024 to a full lab shipping five live products in 2026.",
  path: "/journey",
  keywords: ["Yashveer journey", "developer journey", "Yashveer Labs timeline"],
});

export default function Page() {
  return (
    <LongFormPage
      eyebrow="Journey"
      title="Two years, in one honest paragraph at a time."
      intro="The journey is the part most portfolios skip. This one does not. Where I started, what compounded, what bent the trajectory, and where it is pointing next."
      backdropVariant="gold"
      backdropImage="/images/journey-backdrop.webp"
      stats={[
        { label: "Started", value: "2024" },
        { label: "Live products", value: "5" },
        { label: "Years writing code", value: "5+" },
        { label: "Trajectory", value: "ML / AI / Sec" },
      ]}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Journey", path: "/journey" },
      ]}
      sections={[
        {
          heading: "2024. Content as a forcing function.",
          paragraphs: [
            "The work started with content. I took on freelance SEO and content engineering for a restaurant group, with a brutal rule: one optimized page per day, deployed live. 120 pages in four months. The point of the exercise was not the pages. It was the cadence.",
            "By the time the engagement ended, the muscle for shipping was built in. It taught me that the gap between people who finish things and people who almost finish things is not talent, it is structure and the willingness to put the file online.",
          ],
        },
        {
          heading: "2025. From content to systems.",
          paragraphs: [
            "The interest moved underneath. Static pages became dynamic dashboards. Marketing copy became real workflows. The internship that year was the structured version of what I was already doing: building dashboards, wiring auth, pushing to production, learning the parts of the craft that take real reps to get right.",
            "Sport Buddy and the gym management system shipped during this stretch. The first hint of what the lab would look like started to take shape. Real systems, real users, real deployment.",
          ],
        },
        {
          heading: "2026. The lab gets a name.",
          paragraphs: [
            "Yashveer Labs becomes the umbrella. Dwarka Bricks ships. The Expert Tutorials site goes live with a teaching role on top. Prominence Football Academy joins the roster. Velmora launches on Roblox. Nexli enters private testing inside a school.",
            "This is the year the body of work starts to feel like a body of work. Five separate surfaces, each on a different stack, each with a different audience. The breadth is intentional. The depth is committed: every public surface has to ship, every private surface has to be in real use.",
          ],
          pullQuote:
            "A portfolio with one project is a portfolio with one bet. The lab is several bets, on purpose.",
        },
        {
          heading: "What compounded.",
          paragraphs: [
            "Three things compounded harder than expected. Shipping cadence: each project shipped faster than the one before, even as the projects got more complex. Taste: what looked acceptable in 2024 looks unfinished in 2026, and that gap is the most honest signal of growth. Audience: people started finding the work, not the other way around.",
            "The compounding is not magic. It is just compounding. Show up daily, finish the thing, put it online, raise the bar. Repeat. The graph looks like a hockey stick only in retrospect.",
          ],
        },
        {
          heading: "What is next.",
          paragraphs: [
            "The next year is Nyxera moving from manifesto to interface, Nexli graduating from private testing, the blog becoming a real publication surface, and the machine learning layer of the lab getting real. The Stark Protocol arc names the destination. The work between now and then is what determines whether the arc is honest.",
            "Read the rest of the Journey folder for the specific milestones, achievements, and work history. The shape is on this page; the detail is in the rest.",
          ],
        },
      ]}
      related={[
        { href: "/journey/achievements", label: "Achievements", description: "Concrete, dated, real." },
        { href: "/journey/milestones", label: "Milestones", description: "The moments that bent the curve." },
        { href: "/journey/work-history", label: "Work History", description: "Professional and project work." },
      ]}
      faq={[
        {
          q: "Why does this page exist?",
          a: "Because a portfolio without context is just a list of projects. The journey makes the list make sense.",
        },
        {
          q: "Is the timeline above complete?",
          a: "No. It is the shape. The full detail is across the rest of the Journey folder. Milestones, Achievements, Work History, Evolution.",
        },
        {
          q: "What is the biggest surprise so far?",
          a: "How much the people side compounds. Clients refer other clients. Teachers want to bring me into the classroom. Students see the work and ask honest questions. None of that was on the plan.",
        },
        {
          q: "Did anything almost not happen?",
          a: "Yes. The lab almost did not get a name. I was happy to keep building under my personal handle. Naming it Yashveer Labs changed the standard the work had to clear. That was worth the friction.",
        },
        {
          q: "What is one thing you would tell yourself in early 2024?",
          a: "Pick the project that scares you most and finish it first. The portfolio compounds harder when the first item on it is the hardest one, not the easiest.",
        },
        {
          q: "What is one thing you would tell yourself today?",
          a: "Choose less, push harder. The breadth is in place. The next year is about specific depth in machine learning and security, and saying no to work that does not move that needle.",
        },
      ]}
    />
  );
}
