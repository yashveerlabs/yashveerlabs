import Link from "next/link";
import { PageShell } from "@/components/shared/PageShell";
import { PageHero } from "@/components/shared/PageHero";
import { WhyMe } from "@/components/sections/WhyMe";
import { ProjectsPreview } from "@/components/sections/ProjectsPreview";
import { FAQ, type FAQItem } from "@/components/sections/FAQ";
import { GoldLink } from "@/components/ui/GoldButton";
import { AmbientBackdrop, HeroSigil } from "@/components/three/lazy";
import { AmbientImage } from "@/components/shared/AmbientImage";
import { buildMeta } from "@/lib/seo";
import {
  breadcrumbSchema,
  faqSchema,
  jsonLdScriptProps,
} from "@/lib/schema";

export const metadata = buildMeta({
  title: "Yashveer Singh Rajpoot | Full Stack Developer, Founder of Yashveer Labs",
  description:
    "Full stack developer building production web platforms in TypeScript, Next.js, and React. Founder of Yashveer Labs. The home dock of the operating system.",
  path: "/",
  keywords: [
    "Yashveer Singh Rajpoot",
    "Yashveer Labs",
    "full stack developer",
    "Next.js",
    "TypeScript",
    "React",
    "system design",
    "AI engineer",
    "machine learning",
    "Nyxera",
    "Stark Protocol",
  ],
});

const FAQ_ITEMS: FAQItem[] = [
  {
    q: "Who are you and what do you actually do?",
    a: "I am Yashveer Singh Rajpoot. I build full stack web platforms in TypeScript and Next.js, design the systems behind them, and ship them to production. Yashveer Labs is the lab I do it under. The work spans real estate, education, sports, school operations, and AI.",
  },
  {
    q: "Is this a portfolio or a product?",
    a: "Both. The site is a portfolio. The dock, the routing, the 3D, the way folders morph open, all of it is part of how I think about interface design. If something on this site feels like a product surface, that is intentional.",
  },
  {
    q: "What stack do you build in?",
    a: "Primary stack is TypeScript and JavaScript on the frontend and the backend. I work in Next.js and React for product surfaces, Node and serverless for APIs, Firebase and SQL for data. Python, Java, PHP, Ruby, Go, and Rust come out when the problem calls for them.",
  },
  {
    q: "What is Nyxera?",
    a: "Nyxera is the AI identity of the ecosystem. It is not a chatbot dressed up in branding. It is the long arc of the lab pointing at agentic systems, local models, and the kind of interface that feels like it is anticipating you, not reacting to you. The Nyxera page goes deeper.",
  },
  {
    q: "Are you available for work?",
    a: "I am open to high intensity collaboration: startup engineering, product building, structured internships, and technical partnerships. The contact page has the direct line. If you are building something serious, write to me.",
  },
  {
    q: "Where are you based?",
    a: "New Delhi, India. I work remote with anyone, anywhere.",
  },
  {
    q: "What is the long arc here?",
    a: "Current role: Full Stack Developer. Trajectory: Machine Learning Developer, AI Engineer, Cybersecurity Expert. The progression is deliberate. The web work is the foundation; everything above it is being layered on top in order.",
  },
];

export default function HomePage() {
  return (
    <PageShell
      backdrop={
        <>
          <AmbientImage src="/images/home-ambient.webp" />
          <div className="absolute inset-0 opacity-40">
            <AmbientBackdrop variant="gold" />
          </div>
        </>
      }
    >
      <script {...jsonLdScriptProps(breadcrumbSchema([{ name: "Home", path: "/" }]))} />
      <script {...jsonLdScriptProps(faqSchema(FAQ_ITEMS))} />

      <PageHero
        eyebrow="Yashveer Labs · An operating system, not a portfolio"
        title="I build full stack systems and the interfaces that earn them."
        intro="Founder of Yashveer Labs. Full stack developer working in TypeScript and Next.js. The work is shipped to production, sits on real URLs, and is used by real people. The trajectory points at machine learning, AI engineering, and the security work that has to come with it."
        visual={<HeroSigil />}
      />

      <div className="mt-8 flex flex-wrap gap-3 md:mt-10">
        <GoldLink href="/projects">See the work</GoldLink>
        <GoldLink href="/nyxera" variant="cyan">
          Meet Nyxera
        </GoldLink>
        <GoldLink href="https://www.instagram.com/yashveerlabs/" external variant="ghost">
          Connect
        </GoldLink>
      </div>

      {/* Identity block */}
      <section className="mt-24 grid gap-10 md:mt-32 md:grid-cols-[1fr_1.4fr] md:gap-20">
        <div>
          <span className="label-eyebrow text-[10px] md:text-[11px]">Identity</span>
          <h2 className="mt-4 font-display text-[clamp(1.875rem,5vw,3rem)] leading-[1.05] text-[var(--text-primary)]">
            I treat engineering as a long term discipline.
          </h2>
        </div>
        <div className="space-y-5 text-[var(--text-secondary)] md:space-y-6">
          <p className="text-[16px] md:text-lg">
            I am a full stack developer based in New Delhi. The work started in
            2024 with one rule. Move from learning to execution as fast as
            possible, without skipping the parts that matter. Two years in, the
            output is a set of production systems with real users on them, a
            coaching platform I teach on, a school operations product in private
            testing, and a Roblox game on a completely different runtime than
            the rest of the work.
          </p>
          <p>
            The pattern is not accidental. Each project is a different surface,
            a different stack, a different audience. That breadth keeps the
            instincts honest and the toolbox sharp. The depth comes from
            committing to ship. Everything here has a URL.
          </p>
          <p>
            The long arc is the part that does not fit in a normal portfolio.
            The web work is the foundation. On top of it I am building toward
            machine learning, AI engineering, and the cybersecurity layer that
            keeps everything above the bar of being safe to ship. Nyxera is the
            anchor for that direction. The rest of this site is the proof that
            the foundation is real.
          </p>
        </div>
      </section>

      <WhyMe />

      <ProjectsPreview />

      {/* Nyxera teaser */}
      <section className="mt-24 overflow-hidden rounded-3xl border border-[color:var(--nyxera-cyan)]/30 bg-[var(--bg-surface)] md:mt-32">
        <div className="grid items-stretch gap-0 md:grid-cols-[1.1fr_1fr]">
          <div className="relative h-[220px] md:h-auto">
            <div className="absolute inset-0">
              <AmbientBackdrop variant="cyan" />
            </div>
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(70% 70% at 50% 50%, rgba(0,217,255,0.18), transparent 70%)",
              }}
            />
          </div>
          <div className="relative p-6 md:p-12">
            <span className="label-eyebrow text-[10px] md:text-[11px]" style={{ color: "var(--nyxera-cyan)" }}>
              Nyxera AI
            </span>
            <h2 className="mt-4 font-display text-[clamp(1.75rem,4.5vw,2.5rem)] leading-[1.05] text-[var(--text-primary)]">
              An intelligence that anticipates, not reacts.
            </h2>
            <p className="mt-4 max-w-md text-[15px] text-[var(--text-secondary)] md:mt-5 md:text-base">
              Nyxera is the AI identity of the lab. Not a chatbot. Not a model
              wrapper. A presence designed to feel one step ahead of you, with
              the kind of restraint that makes that interesting rather than
              uncomfortable. The Nyxera page goes deeper.
            </p>
            <div className="mt-6 md:mt-8">
              <GoldLink href="/nyxera" variant="cyan">
                Open the Nyxera page
              </GoldLink>
            </div>
          </div>
        </div>
      </section>

      {/* Bridge to Projects + About */}
      <section className="mt-24 grid gap-4 md:mt-32 md:grid-cols-2 md:gap-6">
        <Link
          href="/about"
          className="group block rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 transition-all hover:-translate-y-1 hover:border-[var(--border-gold)] md:p-8"
        >
          <span className="label-eyebrow-muted text-[10px] md:text-[11px]">About</span>
          <h3 className="mt-3 font-display text-[1.75rem] leading-[1.05] text-[var(--text-primary)] md:text-3xl">
            How I think, in long form.
          </h3>
          <p className="mt-3 text-[15px] text-[var(--text-secondary)] md:text-base">
            Philosophy, the Stark Protocol vision, the reason the lab exists at
            all. The page is not a bio, it is a frame.
          </p>
        </Link>
        <Link
          href="/journey"
          className="group block rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 transition-all hover:-translate-y-1 hover:border-[var(--border-gold)] md:p-8"
        >
          <span className="label-eyebrow-muted text-[10px] md:text-[11px]">Journey</span>
          <h3 className="mt-3 font-display text-[1.75rem] leading-[1.05] text-[var(--text-primary)] md:text-3xl">
            The trajectory in one page.
          </h3>
          <p className="mt-3 text-[15px] text-[var(--text-secondary)] md:text-base">
            Where I started, what compounded, what is coming next, and the
            specific work that bent the curve.
          </p>
        </Link>
      </section>

      <FAQ items={FAQ_ITEMS} />
    </PageShell>
  );
}
