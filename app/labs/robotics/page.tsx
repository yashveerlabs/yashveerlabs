import { LongFormPage } from "@/components/shared/LongFormPage";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  title: "Robotics",
  description:
    "Robotics interest, learning track, and future direction at Yashveer Labs. Honest framing of what is real, what is exploratory, and what is next.",
  path: "/labs/robotics",
  keywords: ["robotics", "Yashveer Labs robotics", "physical computing"],
});

export default function Page() {
  return (
    <LongFormPage
      eyebrow="Labs · Robotics"
      title="Bringing the lab into the physical world, eventually."
      intro="Robotics is on the trajectory, not the shipped list. This page is honest about the gap and explicit about the direction. The web work funds the bench; the bench funds the next layer."
      backdropVariant="violet"
      backdropImage="/images/labs-backdrop.webp"
      stats={[
        { label: "Status", value: "Exploratory" },
        { label: "Bias", value: "Learn first" },
        { label: "Adjacent", value: "Vision" },
        { label: "Target", value: "Real builds" },
      ]}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Labs", path: "/labs/ai-experiments" },
        { name: "Robotics", path: "/labs/robotics" },
      ]}
      sections={[
        {
          heading: "Why robotics belongs on the trajectory.",
          paragraphs: [
            "The lab's long arc is intelligence plus systems. A robot is the place where intelligence meets the physical world. Once the AI work matures, the natural next surface is a body for the brain to live in. That is the throughline.",
            "The other reason is range. Software-only engineers have a blind spot for the messiness of the physical world. The constraints are sharper, the feedback loops are slower, the failure modes are louder. Building inside those constraints, even at small scale, changes how you build everything else.",
          ],
        },
        {
          heading: "What I am doing about it today.",
          paragraphs: [
            "Reading the foundations: control theory, kinematics, the basics of embedded systems. Working in simulation before working with hardware, because simulation is the cheapest place to make mistakes. Watching what the open-source robotics community is shipping and learning from the patterns that hold up.",
            "I am not pretending to have shipped a robot. I have not. The page exists to make the direction clear and the timeline honest.",
          ],
        },
        {
          heading: "The hardware plan.",
          paragraphs: [
            "Start small. A microcontroller, a few sensors, a single actuator. Build something that does one thing well, end to end. Sensor read, decision logic, motor output, feedback loop. The first build will be modest on purpose. The point is to learn the loop, not to impress anyone.",
            "Scale from there. A wheeled platform with vision. A manipulator that picks up a known object. A small autonomous task that combines all of the above. Each step is a real build, not a demo.",
          ],
          pullQuote:
            "A robot that does one thing reliably beats a robot that does ten things sometimes.",
        },
        {
          heading: "Where AI fits in.",
          paragraphs: [
            "The lab's AI work and robotics work are joined at the hip. Vision systems for object recognition. Local model inference for fast decision making on edge hardware. Agentic planning patterns for multi-step physical tasks. Every robotics experiment will pull from the AI experiments folder.",
            "The reverse is also true. The constraints of physical hardware will sharpen the AI work in ways that pure software cannot. Latency is real. Failure is real. Tolerances are real. That pressure makes the system stronger.",
          ],
        },
        {
          heading: "What this folder will look like in a year.",
          paragraphs: [
            "Specific builds with specific learnings. A repository for each. Video of the thing working and video of the thing failing, because both teach the reader something. Notes on what the simulation got right and what only emerged from contact with reality.",
            "The bar for this folder will be the same as the rest of the lab. Real, shipped, honest. Not promises.",
          ],
        },
      ]}
      related={[
        { href: "/labs/vision-systems", label: "Vision Systems", description: "The eyes the robotics work depends on." },
        { href: "/labs/ai-experiments", label: "AI Experiments", description: "The brain the body needs." },
        { href: "/labs/concepts", label: "Concepts", description: "Speculative directions, robotics-adjacent." },
      ]}
      faq={[
        {
          q: "Have you actually built a robot yet?",
          a: "No. The honest answer is that this is the exploratory folder, not the shipped folder. The page exists to make the direction explicit, not to inflate the record.",
        },
        {
          q: "What is the first build you are planning?",
          a: "Something small with a sensor, a decision loop, and an actuator. The point is to learn the loop end to end. The build itself will be modest.",
        },
        {
          q: "Why not just stay in software?",
          a: "Because the long arc of the lab includes physical systems. Bridging software and hardware is a discipline that pays back across every other layer.",
        },
        {
          q: "Are you doing this for school or for the lab?",
          a: "The lab. School and competition robotics are different worlds; this work is going to be operator-flavored, not contest-flavored.",
        },
        {
          q: "Will you open-source the builds?",
          a: "The patterns and the lessons, yes. The specific configurations, maybe. The lab's bias is to share what helps other people learn faster.",
        },
        {
          q: "When does the first build land on this page?",
          a: "When it is real. No earlier. The lab does not announce on this folder; it ships on it.",
        },
      ]}
    />
  );
}
