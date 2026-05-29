import { LongFormPage } from "@/components/shared/LongFormPage";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  title: "Tools",
  description:
    "The day-to-day instruments behind Yashveer Labs. IDEs, design tools, automation, and the philosophy of tool selection.",
  path: "/systems/tools",
  keywords: ["VS Code", "developer tools", "design tools", "Yashveer Labs workflow"],
});

export default function Page() {
  return (
    <LongFormPage
      eyebrow="Systems · Tools"
      title="Tools are the cheap part. Taste is the expensive part."
      intro="The instruments behind the work, listed honestly. The interesting question is never which tool, it is what you do with it. Here are the choices and the rationale."
      backdropVariant="gold"
      backdropImage="/images/systems-backdrop.webp"
      stats={[
        { label: "Editor", value: "VS Code" },
        { label: "Design", value: "Figma" },
        { label: "Versioning", value: "GitHub" },
        { label: "Browser", value: "Arc / Chrome" },
      ]}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Systems", path: "/systems/stack" },
        { name: "Tools", path: "/systems/tools" },
      ]}
      sections={[
        {
          heading: "The editor and the loop.",
          paragraphs: [
            "VS Code is the editor. Customized lightly. The defaults are good enough that fighting them is a waste of focus. The extensions that earn their place are the ones that compound across every project, not the ones that solve a single quirk.",
            "GitHub Copilot and Claude Code sit beside it, not above it. AI completion is useful when the work is mechanical and dangerous when the work is structural. The rule is, AI accelerates the writing, not the thinking. The thinking has to be mine or the code rots in six months.",
            "The feedback loop is the most important tool of all. Fast dev server, hot reload that does not lie, deploy previews on every commit. Anything that slows the loop gets removed; anything that tightens it gets kept.",
          ],
        },
        {
          heading: "Design tools, deliberately light.",
          paragraphs: [
            "Figma for layouts when the surface is complex enough to warrant it, which is fewer projects than you would think. Most of the work goes from sketch to component in the editor, because the design system is already in the codebase. Iterating in code is faster than iterating in a parallel design file when the code is the source of truth.",
            "When a project does need a real design pass, the pattern is the same: low-fidelity wireframe in Figma, design tokens already in the codebase, then build the real thing in TSX. The high-fidelity Figma is the documentation, not the design.",
          ],
          pullQuote:
            "The fastest design tool I own is the codebase. Everything else is a sketchbook.",
        },
        {
          heading: "Version control and review.",
          paragraphs: [
            "GitHub for everything. Branch per feature, descriptive commits, no fear of force-push on feature branches before they merge. The discipline is in the commit history, not in the diff size.",
            "Code review is mostly self-review. Walk the diff before pushing. Read the PR description like a stranger would. The amount of bad code you do not ship by reading your own diff out loud is genuinely embarrassing.",
          ],
        },
        {
          heading: "Browsers and the inspector.",
          paragraphs: [
            "Arc for daily work because the way it handles workspaces matches how my projects are organized. Chrome for debugging because the DevTools are the most capable. Safari and Firefox during QA because shipping a site that does not work in one of them is a small humiliation.",
            "The inspector is a tool I lean on harder than most developers seem to. Every layout problem has an answer in the computed styles panel; every performance bug has a signature in the performance tab. Learning to read those panels is a permanent skill upgrade.",
          ],
        },
        {
          heading: "Automation and the small scripts.",
          paragraphs: [
            "The lab runs on a quiet collection of small scripts. Shell helpers, Node CLIs, a handful of GitHub Actions. The pattern is consistent: if I do something twice and dislike it, I script it. If I do it three times, the script gets a flag.",
            "AI helps here. Generating the boilerplate of a CLI in 30 seconds means the threshold for writing one drops significantly. The work that used to be too small to bother automating is now exactly the work that gets automated first.",
          ],
        },
        {
          heading: "The philosophy.",
          paragraphs: [
            "Pick the smallest set of tools that gets the work shipped. Do not collect new tools the way you collect new languages. Every new tool has a tax: configuration, mental overhead, integration cost. The tax is rarely worth it.",
            "The good news is that the bar is high. A new tool has to clearly improve a feedback loop, a default, or a constraint to make the cut. Most do not. The toolbox stays tight on purpose. That is what frees attention for the work itself.",
          ],
          pullQuote:
            "Tool churn looks like progress and feels like motion. It is neither.",
        },
      ]}
      related={[
        { href: "/systems/stack", label: "Stack", description: "Languages, frameworks, runtime." },
        { href: "/systems/technologies", label: "Technologies", description: "Paradigms and patterns." },
        { href: "/systems/systems", label: "Systems", description: "Architecture, end to end." },
      ]}
      faq={[
        {
          q: "Do you use AI tools to write code?",
          a: "Yes, for completion and for boilerplate. Not for structural decisions and not for code I do not understand. The line is sharp, and it stays sharp.",
        },
        {
          q: "What is your terminal setup?",
          a: "Default shell on macOS or Windows, customized lightly. Starship prompt. A handful of aliases. Nothing exotic. The terminal is a tool, not a hobby.",
        },
        {
          q: "Do you use a code formatter?",
          a: "Prettier, with a few overrides. Lint and format on save. The rule is, never argue about whitespace, ever.",
        },
        {
          q: "Why VS Code over Cursor or Zed?",
          a: "Stability and reach. VS Code's extension ecosystem and remote workflows are unmatched, and the AI assistants I rely on plug in cleanly. The newer editors are interesting, but the lab does not switch editors lightly.",
        },
        {
          q: "What is the most underrated tool in your workflow?",
          a: "The Vercel preview URL. Being able to share a working build of the work in progress with anyone in 90 seconds changes how feedback flows. It is the most powerful productivity tool in modern web development, and it is invisible until you have it.",
        },
        {
          q: "How do you handle screenshots and design references?",
          a: "Notion for clipping, an iCloud folder for fast saves, Raycast for OS level capture. The lab does not run a Pinterest of inspiration. The references go directly into the project they are going to be used in.",
        },
      ]}
    />
  );
}
