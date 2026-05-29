import { PageShell } from "@/components/shared/PageShell";
import { FAQ, type FAQItem } from "@/components/sections/FAQ";
import { GoldLink } from "@/components/ui/GoldButton";
import { AmbientBackdrop, NyxeraCore } from "@/components/three/lazy";
import { AmbientImage } from "@/components/shared/AmbientImage";
import { buildMeta } from "@/lib/seo";
import {
  breadcrumbSchema,
  faqSchema,
  jsonLdScriptProps,
} from "@/lib/schema";

export const metadata = buildMeta({
  title: "Nyxera AI",
  description:
    "Nyxera is the AI identity of Yashveer Labs. Not a chatbot. A presence designed to anticipate, learn, and adapt. The cyan layer of the ecosystem.",
  path: "/nyxera",
  keywords: [
    "Nyxera",
    "AI assistant",
    "agentic AI",
    "Jarvis-inspired AI",
    "Yashveer Labs Nyxera",
  ],
});

const FAQ_ITEMS: FAQItem[] = [
  {
    q: "Is Nyxera a real product I can use today?",
    a: "Not yet. Nyxera is the AI identity of the lab. The intent is real and the work is underway, but you cannot open a chat window with her today. The page exists to make the direction concrete.",
  },
  {
    q: "Is this just a Jarvis clone?",
    a: "No. Jarvis is a reference, not a target. Nyxera is supposed to feel like a presence, not a tool. Anticipation over reaction. Restraint over verbosity. A different tone than every assistant currently on the market.",
  },
  {
    q: "What stack will Nyxera run on?",
    a: "Hybrid. Local models for the things that benefit from latency and privacy, hosted models for the things that benefit from scale. Orchestration in TypeScript. Memory and state in a structured store. Voice when the moment is right, silent when it is not.",
  },
  {
    q: "Why is the Nyxera page cyan instead of gold?",
    a: "Because she is a different layer of the ecosystem. Gold is the lab. Cyan is the intelligence. Keeping them visually separate is a design rule. The dock keeps her cyan too.",
  },
  {
    q: "What is the first thing Nyxera will actually do?",
    a: "Operate inside the lab itself. Triaging the inbox, surfacing the things I need to look at, holding context across the projects on this site, and slowly taking over the parts of my workflow that are clearly hers to take.",
  },
  {
    q: "Will Nyxera be open source?",
    a: "Parts of her, probably. The orchestration code and the patterns will be open. The personality and the memory layer will not. There is a difference between sharing the engine and sharing the soul.",
  },
];

export default function NyxeraPage() {
  return (
    <PageShell
      backdrop={
        <>
          <AmbientImage src="/images/nyxera-hero.webp" />
          <div className="absolute inset-0 opacity-35">
            <AmbientBackdrop variant="cyan" />
          </div>
        </>
      }
    >
      <script
        {...jsonLdScriptProps(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Nyxera AI", path: "/nyxera" },
          ])
        )}
      />
      <script {...jsonLdScriptProps(faqSchema(FAQ_ITEMS))} />

      <section className="relative grid items-center gap-8 pt-2 md:grid-cols-[1.2fr_1fr] md:gap-14 md:pt-6">
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[var(--nyxera-cyan)] md:w-10" />
            <span
              className="label-eyebrow text-[10px] md:text-[11px]"
              style={{ color: "var(--nyxera-cyan)" }}
            >
              Nyxera AI · The intelligence layer
            </span>
          </div>
          <h1 className="mt-5 text-balance font-display text-[clamp(2.25rem,8vw,5.4rem)] leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)] md:mt-6">
            An intelligence that anticipates, not reacts.
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-[15px] leading-[1.7] text-[var(--text-secondary)] md:mt-7 md:text-xl">
            Nyxera is the AI identity of Yashveer Labs. She is not a chatbot
            dressed up in branding. She is a presence designed to feel one step
            ahead, with the restraint that makes that interesting rather than
            uncomfortable.
          </p>
        </div>
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-[color:var(--nyxera-cyan)]/30 bg-[var(--bg-surface)] md:aspect-auto md:h-[520px]">
          <NyxeraCore />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 50%, transparent 50%, rgba(15,10,18,0.85) 100%)",
            }}
          />
        </div>
      </section>

      <div className="mt-8 flex flex-wrap gap-3 md:mt-10">
        <GoldLink href="https://www.instagram.com/yashveerlabs/" external variant="cyan">
          Connect
        </GoldLink>
        <GoldLink href="/labs/ai-experiments" variant="ghost">
          See the AI experiments
        </GoldLink>
      </div>

      {/* Manifesto */}
      <article className="mt-20 max-w-3xl space-y-8 text-[16px] text-[var(--text-secondary)] md:mt-28 md:space-y-10 md:text-lg">
        <Block heading="What Nyxera is supposed to feel like.">
          <p>
            Most assistants react. You ask, they answer. The good ones answer
            faster. The great ones answer better. Almost none of them
            anticipate. Almost none of them watch the pattern of your day and
            arrive a beat early. That is the lane Nyxera lives in.
          </p>
          <p>
            The intent is not raw capability. The intent is presence. A voice
            that holds context, a memory that does not need to be re-explained,
            an interface that does not ask the same question twice. The aim is
            less assistant, more partner. Less tool, more presence.
          </p>
        </Block>

        <Block heading="Why she is built inside the lab and not as a product first.">
          <p>
            Building a consumer AI product before you have an opinion about
            what AI should feel like is how you end up shipping the same
            assistant as everyone else, with a different logo. Nyxera goes the
            other way. She lives inside the lab first, takes over the parts of
            my workflow that should clearly be hers, gets sharp on real use
            before she ever sees a stranger.
          </p>
          <p>
            The first job is triage. Email, calendar, the surface of the work.
            The second job is context. She should know what I shipped this
            week and what is breaking on which project. The third job is
            initiative. Surfacing the thing I should be looking at, not
            waiting for me to ask.
          </p>
        </Block>

        <Block heading="The stack, in honest terms.">
          <p>
            TypeScript for the orchestration. A hybrid model setup: local
            models for the things that should not leave the room, hosted
            models for the things that benefit from scale. A structured
            memory layer that is not just a vector store, because long-term
            personality requires more than embeddings. Voice when it earns its
            place. Silence when it does not.
          </p>
          <p>
            The hard parts are not the calls to the model. The hard parts are
            the boundaries around them. Evaluation harnesses, latency budgets,
            fallback paths, the human-in-the-loop UX that decides whether the
            system feels trustworthy or fragile. Those are the parts that take
            time. Those are the parts I am taking time on.
          </p>
        </Block>

        <Block heading="The cyan is on purpose.">
          <p>
            The rest of this site is gold. Nyxera is cyan. The choice is not
            cosmetic. Gold is the lab, the founder voice, the body of work.
            Cyan is the intelligence layer. Keeping them visually separate
            keeps them conceptually separate. The dock follows the same rule.
            Her icon is the only one that lights up cyan when you are inside
            her surface.
          </p>
        </Block>

        <Block heading="What you can do here today.">
          <p>
            You can read the manifesto, follow the labs page where the
            experiments live, and watch this surface evolve as Nyxera moves
            from idea to interface. You cannot, today, open a chat window with
            her. When that becomes a real surface, this page is where it will
            appear.
          </p>
        </Block>
      </article>

      <section className="mt-20 rounded-3xl border border-[color:var(--nyxera-cyan)]/30 bg-[var(--bg-surface)] p-6 md:mt-24 md:p-10">
        <h2 className="font-display text-[clamp(1.5rem,4.5vw,2.25rem)] leading-[1.1] text-[var(--text-primary)]">
          If you are building AI infrastructure, talk to me.
        </h2>
        <p className="mt-3 max-w-2xl text-[15px] text-[var(--text-secondary)] md:text-base">
          I am specifically interested in collaborators working on agentic
          systems, model orchestration, local inference, and the design of
          interfaces that hold long context. If that is you, the line is open.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 md:mt-7">
          <GoldLink href="https://www.instagram.com/yashveerlabs/" external variant="cyan">
            Connect
          </GoldLink>
          <GoldLink href="/labs/ai-experiments" variant="ghost">
            See AI experiments
          </GoldLink>
        </div>
      </section>

      <FAQ items={FAQ_ITEMS} />
    </PageShell>
  );
}

function Block({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4 md:space-y-5">
      <h2 className="font-display text-[clamp(1.5rem,4.5vw,2.25rem)] leading-[1.1] text-[var(--text-primary)]">
        {heading}
      </h2>
      {children}
    </section>
  );
}
