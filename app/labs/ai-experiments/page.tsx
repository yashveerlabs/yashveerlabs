import { LongFormPage } from "@/components/shared/LongFormPage";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  title: "AI Experiments",
  description:
    "Agentic systems, local LLMs, model orchestration, and the experiments behind the Nyxera AI direction.",
  path: "/labs/ai-experiments",
  keywords: ["AI experiments", "agentic systems", "local LLM", "Nyxera"],
});

export default function Page() {
  return (
    <LongFormPage
      eyebrow="Labs · AI Experiments"
      title="The AI work that does not have a public launch yet."
      intro="Most of the lab's AI work lives in this folder. Experiments, internal tooling, model orchestration, and the slow walk toward what Nyxera is going to become."
      backdropVariant="cyan"
      backdropImage="/images/labs-backdrop.webp"
      stats={[
        { label: "Direction", value: "Agentic" },
        { label: "Models", value: "Hybrid" },
        { label: "Surface", value: "Internal" },
        { label: "Bias", value: "Local-first" },
      ]}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Labs", path: "/labs/ai-experiments" },
        { name: "AI Experiments", path: "/labs/ai-experiments" },
      ]}
      sections={[
        {
          heading: "What I am actually trying to do here.",
          paragraphs: [
            "The lab's AI thesis is simple. The hard part of building useful AI products is not the model. It is the system around the model. Latency budgets, evaluation, memory, fallbacks, the human-in-the-loop UX. The experiments in this folder are aimed at those, not at the model itself.",
            "The reason is leverage. The model is improving on someone else's roadmap. The system around it is the part the lab owns. Getting good at the second is more durable than betting on the first.",
          ],
        },
        {
          heading: "Model orchestration.",
          paragraphs: [
            "The orchestration layer routes a request to the right model based on cost, latency, and task. A short rewrite request goes to a small local model running on a laptop. A long-context reasoning request goes to a hosted frontier model. The router is the lab's, not the provider's.",
            "Building this once means every AI surface the lab ships afterward can lean on the same primitive. That compounds.",
          ],
          bullets: [
            "Local models for latency-bound and privacy-bound work",
            "Hosted models for reasoning-heavy work",
            "A router that picks based on task signature, not author preference",
            "A consistent evaluation harness across both surfaces",
          ],
        },
        {
          heading: "Local-first inference.",
          paragraphs: [
            "Running small models on consumer hardware is the experiment that has the most upside for the lab. Latency becomes a non-issue. Privacy becomes a non-issue. The economics flip from per-token to per-machine.",
            "The experiments here cover quantization tradeoffs, the kind of tasks small models are actually good at, and the orchestration patterns that make them feel as capable as hosted models when paired with the right context.",
          ],
          pullQuote:
            "A small model that ships beats a large model that is too expensive to call.",
        },
        {
          heading: "Agentic patterns.",
          paragraphs: [
            "The interesting agentic work is not 'the model can use tools'. The interesting work is 'the system around the model knows what to ask, in what order, with what budget'. The experiments here cover task decomposition, retry strategies, and the boundary between letting the model decide and letting the system decide.",
            "Nyxera will inherit the patterns that prove themselves here. The rest will be left as lessons.",
          ],
        },
        {
          heading: "Evaluation, the part nobody talks about.",
          paragraphs: [
            "If you ship AI without a clear evaluation harness, you are guessing. The lab's experiments build small, project-specific eval sets that test the surfaces that matter. Not benchmark scores. Real workflows.",
            "The discipline is to never ship an AI feature without an eval that proves it is doing what it claims to do. The discipline is also to keep the eval small enough that it actually gets run.",
          ],
        },
      ]}
      related={[
        { href: "/nyxera", label: "Nyxera AI", description: "Where the experiments are pointed." },
        { href: "/labs/concepts", label: "Concepts", description: "Speculative AI directions." },
        { href: "/labs/prototypes", label: "Prototypes", description: "Other things being built." },
      ]}
      faq={[
        {
          q: "Are any of these experiments public?",
          a: "Not yet. The work is internal while it stabilizes. The patterns that prove themselves will surface in Nyxera and in lab tooling first, then likely as open-source posts.",
        },
        {
          q: "Which models do you use?",
          a: "A rotating set. Frontier hosted models for the heavy reasoning work. Small local models for latency-bound surfaces. The lab does not pick favorites; it picks per task.",
        },
        {
          q: "Are you fine-tuning?",
          a: "Sparingly. Fine-tuning is the expensive answer to a problem that retrieval and prompting can usually solve first. The lab fine-tunes only when the eval set proves it earns the cost.",
        },
        {
          q: "What is the most useful AI tool you have built for yourself?",
          a: "A small triage helper that prioritizes the day. Boring, narrow, useful every morning. The bar for useful AI is lower than people think; the bar for actually using it is higher.",
        },
        {
          q: "What is the riskiest assumption in the lab's AI direction?",
          a: "That local inference on consumer hardware will continue to improve faster than hosted inference becomes cheap. If that assumption breaks, the lab pivots without changing the system patterns.",
        },
        {
          q: "Will the experiments ship as products?",
          a: "Some will, under Nyxera or as standalone surfaces. Some will not. The point of an experiments folder is that the failure rate is allowed to be high. That is the lab's runway.",
        },
      ]}
    />
  );
}
