import { LongFormPage } from "@/components/shared/LongFormPage";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  title: "Vision Systems",
  description:
    "Computer vision work at Yashveer Labs. Image processing, recognition systems, and the vision layer of the lab's future robotics work.",
  path: "/labs/vision-systems",
  keywords: ["computer vision", "image processing", "OpenCV", "vision systems"],
});

export default function Page() {
  return (
    <LongFormPage
      eyebrow="Labs · Vision Systems"
      title="Teaching machines to see the thing that matters."
      intro="Computer vision is one of the most useful layers a system can have. The lab's work here is split between practical image processing for shipped surfaces and groundwork for the upcoming robotics direction."
      backdropVariant="cyan"
      backdropImage="/images/labs-backdrop.webp"
      stats={[
        { label: "Working with", value: "OpenCV" },
        { label: "Models", value: "Light, fast" },
        { label: "Targets", value: "Edge devices" },
        { label: "Bias", value: "Small models" },
      ]}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Labs", path: "/labs/ai-experiments" },
        { name: "Vision Systems", path: "/labs/vision-systems" },
      ]}
      sections={[
        {
          heading: "Why vision is a load-bearing layer.",
          paragraphs: [
            "Vision is the cheapest way for a system to perceive the world. Cameras are ubiquitous. The math has matured. The models that run them have gotten small enough to fit on edge devices. The combination makes vision one of the highest-leverage layers a modern system can ship with.",
            "The lab's interest is specifically in the systems vision enables, not in vision for its own sake. Object recognition that triggers a workflow. Document parsing that turns paper into data. Spatial awareness for robotics. Every experiment in this folder is in service of a system, not a paper.",
          ],
        },
        {
          heading: "What I am working on today.",
          paragraphs: [
            "Practical image processing in the lab's web products. Thumbnail generation pipelines, image classification for tagging, OCR for documents that schools still hand to the system on paper. Useful, narrow, well-tested.",
            "Adjacent learning on small vision models, especially the ones that fit on the same kind of consumer hardware the AI experiments folder is targeting. The thesis is the same. Small models, run locally, beat large models that are too expensive to call.",
          ],
          bullets: [
            "Light image processing pipelines on shipped surfaces",
            "OCR for document-heavy school workflows",
            "Small classifier experiments on consumer hardware",
            "Spatial primitives for the upcoming robotics work",
          ],
        },
        {
          heading: "The robotics bridge.",
          paragraphs: [
            "Vision is half of what a robot needs. The other half is action. Building the vision layer ahead of the robotics builds means the robotics work, when it lands, is not starting from scratch. The folder is intentionally one of the older ones, because the dependency goes through it.",
            "Specifically, the work here is on perception primitives: detect, classify, track, estimate distance. The robotics folder will use these as a substrate.",
          ],
          pullQuote:
            "Build the perception layer before you need it. The robot will be cheaper that way.",
        },
        {
          heading: "What the lab will not do here.",
          paragraphs: [
            "Generic computer vision tutorials. They exist already, in better form, from people who specialize in them. The lab's contribution will be specific systems that prove the value of vision in a real workflow, not introductory material that anyone can find on YouTube.",
            "Surveillance work. The lab is not going to build vision systems that point at people without their consent. The rule is non-negotiable, regardless of who asks.",
          ],
        },
        {
          heading: "Where this folder is heading.",
          paragraphs: [
            "Each experiment will get its own deep-dive in the blog as it earns one. The first real public surface that benefits from a non-trivial vision pipeline will live on Projects. The first robotics build that depends on this work will live on Robotics. The folder grows in service of the rest of the lab.",
          ],
        },
      ]}
      related={[
        { href: "/labs/robotics", label: "Robotics", description: "The body the vision feeds into." },
        { href: "/labs/ai-experiments", label: "AI Experiments", description: "The brain the vision speaks to." },
        { href: "/labs/prototypes", label: "Prototypes", description: "Where vision experiments incubate." },
      ]}
      faq={[
        {
          q: "Are you using existing vision models or training your own?",
          a: "Existing, almost always. Training a vision model from scratch is the wrong default for a lab this size. The leverage is in picking the right model and wiring it into a useful system.",
        },
        {
          q: "Which library do you reach for first?",
          a: "OpenCV for the classical operations. Lightweight ONNX-runtime models for the neural net work. The stack stays small because the surface area of the work is small.",
        },
        {
          q: "Will the vision work power Nyxera?",
          a: "Eventually. A presence that can see is a different kind of presence. The vision layer will plug into the Nyxera surface once the latency and the privacy stories are clean.",
        },
        {
          q: "Have any vision experiments shipped yet?",
          a: "The image pipelines on the lab's web products use vision-adjacent tooling. The standalone vision experiments are still incubating. When one lands publicly, it will be in Projects.",
        },
        {
          q: "What kind of vision work is hardest?",
          a: "Real-time, on edge hardware, with low light and motion blur. Get a system to work reliably in those conditions and most easier conditions become trivial. That is the bar I am working toward.",
        },
        {
          q: "Privacy?",
          a: "Default to local processing. Default to keeping the bytes on the device. Default to not pointing the camera at people without consent. The defaults are non-negotiable.",
        },
      ]}
    />
  );
}
