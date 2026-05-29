import { LongFormPage } from "@/components/shared/LongFormPage";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  title: "Technologies",
  description:
    "Technologies mastered or actively used at Yashveer Labs. Deeper than stack: paradigms, primitives, and engineering patterns.",
  path: "/systems/technologies",
  keywords: ["React Server Components", "Edge runtime", "WebGL", "system architecture"],
});

export default function Page() {
  return (
    <LongFormPage
      eyebrow="Systems · Technologies"
      title="Beyond the stack. The primitives I actually reach for."
      intro="Stack is the named things. Technologies are the underlying ideas that the named things are made of. The distinction matters because it survives stack churn."
      backdropVariant="gold"
      backdropImage="/images/systems-backdrop.webp"
      stats={[
        { label: "Rendering", value: "RSC + ISR" },
        { label: "Realtime", value: "Streams" },
        { label: "Auth", value: "Roles" },
        { label: "3D", value: "WebGL" },
      ]}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Systems", path: "/systems/stack" },
        { name: "Technologies", path: "/systems/technologies" },
      ]}
      sections={[
        {
          heading: "Rendering strategies.",
          paragraphs: [
            "Server components by default, client components for interactivity. Static rendering when the content is stable, incremental static regeneration when it changes on a known cadence, server rendering on request when the work needs fresh data and personalization. Streaming responses when the user benefits from seeing the page begin before the page is finished.",
            "The decision is per route, not per project. A landing page is static. A dashboard is dynamic. A blog index is ISR. Treating rendering as a strategy choice instead of a project-wide default is what keeps the lab's pages fast.",
          ],
          bullets: [
            "Static for marketing, landing, content surfaces",
            "ISR for blog indexes, product listings",
            "SSR on demand for personalized surfaces",
            "Streaming when above-the-fold can land early",
          ],
        },
        {
          heading: "Realtime, the right way.",
          paragraphs: [
            "Most realtime is fake. A polling loop disguised as a subscription. Real realtime is harder: it requires a stream the client can subscribe to, a server that can push, and a state model that handles out-of-order delivery without losing its mind.",
            "Firestore handles this cleanly for the school-system class of work, with snapshot listeners that reflect changes the moment they land. For the lab's larger surfaces, server-sent events and websockets cover the cases Firestore does not. The principle is the same: the source of truth is the stream, the UI is a projection.",
          ],
        },
        {
          heading: "Auth and role separation.",
          paragraphs: [
            "Real auth is more than a login form. It is the surface that decides which user sees which data, which mutation they are allowed to perform, and how the system stays sound under attack. Nexli alone has seven roles, each with a distinct surface.",
            "The pattern is consistent. The role is established at sign-in and verified server side on every mutation. The client never decides what data it gets, the server does. Permissions live in code that is reviewed like the rest of the system, not in a database column nobody reads.",
          ],
          pullQuote:
            "If the client decides what data it sees, you do not have auth. You have decoration.",
        },
        {
          heading: "3D and the WebGL layer.",
          paragraphs: [
            "Three.js and React Three Fiber for everything 3D. Drei for the common primitives. Postprocessing for bloom, depth of field, the cinematic finish. The hero sigil on the home page, the Nyxera core, the ambient backdrops on every page in the lab. All of it sits on this stack.",
            "The discipline is performance first. Cap the device pixel ratio at two. Pause the frame loop when the tab is hidden. Lazy load every 3D component with ssr: false. Skip the heavy effects on mobile. The Lighthouse score is the contract.",
          ],
          bullets: [
            "MeshTransmissionMaterial for glass with realistic transmission",
            "Instanced meshes for particle systems",
            "Environment maps from Drei presets",
            "Postprocessing only above a viewport threshold",
          ],
        },
        {
          heading: "Edge, serverless, and where to put compute.",
          paragraphs: [
            "Vercel's edge runtime handles auth checks, redirects, and any compute that benefits from being close to the user. Serverless functions handle the heavier work. The line is drawn by latency, not by preference.",
            "When a project needs persistent compute, the answer is a small Node service, a small Python service, or both. The lab does not run servers it does not have to run. When it does, the surface is documented and observable.",
          ],
        },
        {
          heading: "The technologies I am layering in next.",
          paragraphs: [
            "Model orchestration patterns for Nyxera, including local inference, hosted inference, and the routing between them. Vector stores for memory, with a clear opinion about what they are good for and what they are not. Streaming responses from models, because the latency budget for AI surfaces is set by perception, not by the model itself.",
            "Cybersecurity primitives once the AI surface is real. Identity, secret management, threat modeling, dependency auditing. The Stark Protocol arc only works if the foundation can take the weight.",
          ],
        },
      ]}
      related={[
        { href: "/systems/stack", label: "Stack", description: "The named tools the technologies live in." },
        { href: "/systems/systems", label: "Systems", description: "How the technologies fit together." },
        { href: "/systems/engineering-capabilities", label: "Capabilities", description: "What I can build with these." },
      ]}
      faq={[
        {
          q: "Why React Server Components by default?",
          a: "Because the client bundle is the budget, and most of what a page does is not interactive. Sending HTML when HTML is enough is the single biggest performance win available in 2026 React.",
        },
        {
          q: "Are you using AI in production?",
          a: "Yes, for the lab's tooling and inside specific project surfaces. Nyxera is the future-facing direction. The smaller AI work is already inside Nexli and a handful of internal scripts.",
        },
        {
          q: "Do you use WebAssembly?",
          a: "Where it pays. Image processing and a few performance-critical paths. Not as a default. WASM is a tool, not a credential.",
        },
        {
          q: "How do you decide between Firestore and SQL?",
          a: "Hierarchical data with strong role separation and real-time defaults goes Firestore. Relational data with reporting and joins goes Postgres. The wrong default is forcing one model to be both.",
        },
        {
          q: "What is the technology you would never give up?",
          a: "TypeScript. The type system is not a syntactic preference, it is a system design tool. Every project I have shipped in TS is structurally better than the JS version of the same project would have been.",
        },
        {
          q: "What technology are you most curious about next?",
          a: "Local model inference on consumer hardware, paired with a thin orchestration layer in TS. The lab's AI direction is shaped around it.",
        },
      ]}
    />
  );
}
