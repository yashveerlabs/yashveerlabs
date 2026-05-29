import type { Metadata } from "next";
import { PageShell } from "@/components/shared/PageShell";
import { GoldLink } from "@/components/ui/GoldButton";
import { AmbientBackdrop } from "@/components/three/lazy";
import { AmbientImage } from "@/components/shared/AmbientImage";
import { Reveal, Count } from "@/components/about/Reveal";
import { buildMeta } from "@/lib/seo";
import { breadcrumbSchema, jsonLdScriptProps } from "@/lib/schema";
import { SITE, AUTHOR } from "@/lib/site-config";
import { absoluteUrl } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  ...buildMeta({
    title: "Yashveer Singh Rajpoot, Full Stack Developer and AI Systems Builder",
    description:
      "Yashveer Singh Rajpoot, founder of Yashveer Labs. Five production systems shipped at seventeen. Full stack, local AI, education technology. Based in New Delhi.",
    path: "/about",
    keywords: [
      "Yashveer Singh Rajpoot",
      "Yashveer Labs",
      "full stack developer",
      "AI systems builder",
      "Nexli school management",
      "Nyxera local AI",
      "New Delhi developer",
    ],
  }),
  title: {
    absolute:
      "Yashveer Singh Rajpoot — Full Stack Developer, AI Systems Builder",
  },
};

// ---------------------------------------------------------------------------
// Rich Person JSON-LD (about-page specific, more detailed than the
// minimal personSchema injected by the global layout)
// ---------------------------------------------------------------------------

const aboutPersonSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE.url}#yashveer`,
  name: AUTHOR.name,
  alternateName: "Yashveer Labs",
  jobTitle: "Full Stack Developer",
  description:
    "Full stack developer and AI systems builder based in New Delhi. Founder of Yashveer Labs, with five production systems shipped including Nyxera, a fully local AI assistant, and Nexli, a school management platform with seven login types.",
  url: SITE.url,
  email: `mailto:${AUTHOR.email}`,
  image: absoluteUrl("/images/portrait.webp", SITE.url),
  worksFor: {
    "@type": "Organization",
    name: SITE.brand,
    url: SITE.url,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: AUTHOR.location.city,
    addressCountry: "IN",
  },
  nationality: {
    "@type": "Country",
    name: "India",
  },
  sameAs: [...AUTHOR.sameAs],
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Firebase",
    "Node.js",
    "Python",
    "Tailwind CSS",
    "Artificial Intelligence",
    "Machine Learning",
    "Full Stack Web Development",
    "School Management Systems",
    "SaaS Architecture",
    "Web Architecture",
    "System Design",
  ],
  knowsLanguage: ["en", "hi"],
};

// ---------------------------------------------------------------------------
// Content data (kept inline so the page reads top-to-bottom like a script)
// ---------------------------------------------------------------------------

const SYSTEMS: Array<{ name: string; line: string; tag: string }> = [
  {
    name: "Nexli",
    tag: "School management platform",
    line: "Seven login types, one shared database. Real workflows for students, parents, teachers, admins, and finance, compressed into a system that does not collapse under the load of a real school day.",
  },
  {
    name: "Nyxera",
    tag: "Fully local AI assistant",
    line: "6,000+ lines, 58 files. Runs entirely on-device. No API key, no telemetry, no round trip. The interface I want for an assistant that knows my work without leaking it.",
  },
  {
    name: "Shelvra",
    tag: "Library management",
    line: "Catalog, lending, returns, late ledger. Built for institutions where the librarian is also the IT department. Boring in the right way.",
  },
  {
    name: "Areniq",
    tag: "Sports day management",
    line: "Heats, scoring, leaderboards, certificates. The kind of system that runs once a year and has to be right the first time.",
  },
];

const CLIENT_WORK: Array<{ name: string; line: string }> = [
  {
    name: "Dwarka Bricks",
    line: "Brick manufacturing brand site, end to end.",
  },
  {
    name: "Expert Tutorials",
    line: "Education site with SEO content arc and a quiet pipeline of organic traffic.",
  },
  {
    name: "Prominence Football Academy",
    line: "Academy platform, intake to enrollment, with a brand that feels worth the fee.",
  },
  {
    name: "Velmora",
    line: "Roblox build with real players. Different runtime, same discipline.",
  },
];

const PRINCIPLES: string[] = [
  "Most developers write code. I design outcomes.",
  "I treat every project like it is the one that defines my reputation. Because it is.",
  "Velocity without architecture is hacking. Architecture without velocity is talking. I do both.",
];

const PROMISES: string[] = [
  "Systems that actually run in production, not demos that look good on a screenshot.",
  "Code another engineer can read on day one and own by day three.",
  "Architecture that scales without a rewrite for the first hundred thousand users.",
  "Direct communication with the person who built it. No account manager in the middle.",
  "Documentation that does not get stale because the system enforces it.",
];

const NUMBERS: Array<{
  to: number;
  suffix?: string;
  label: string;
  caption: string;
}> = [
  {
    to: 5,
    label: "production systems",
    caption: "Nexli, Nyxera, Shelvra, Areniq, plus client work running on real URLs.",
  },
  {
    to: 6000,
    suffix: "+",
    label: "lines in Nyxera",
    caption: "Across 58 files. Fully local AI. No API calls.",
  },
  {
    to: 799,
    label: "blog posts published",
    caption: "Long form on full stack, AI, SaaS, founder decisions, and engineering judgement.",
  },
  {
    to: 17,
    label: "years old",
    caption: "Class 12 in New Delhi. Shipping in production since before sixteen.",
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AboutPage() {
  return (
    <PageShell
      backdrop={
        <>
          <AmbientImage src="/images/about-story.webp" />
          <div className="absolute inset-0 opacity-25">
            <AmbientBackdrop variant="gold" />
          </div>
        </>
      }
    >
      <script
        {...jsonLdScriptProps(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ])
        )}
      />
      <script {...jsonLdScriptProps(aboutPersonSchema)} />

      {/* ================================================================
          HERO
          ================================================================ */}
      <Hero />

      {/* ================================================================
          THE STORY
          ================================================================ */}
      <Story />

      {/* ================================================================
          WHAT I BUILD
          ================================================================ */}
      <Work />

      {/* ================================================================
          PHILOSOPHY
          ================================================================ */}
      <Philosophy />

      {/* ================================================================
          WHAT YOU GET
          ================================================================ */}
      <Promises />

      {/* ================================================================
          THE NUMBERS
          ================================================================ */}
      <Numbers />

      {/* ================================================================
          CONTACT
          ================================================================ */}
      <Contact />
    </PageShell>
  );
}

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-10 bg-[var(--accent-gold)] md:w-12" />
      <span className="label-eyebrow text-[10px] md:text-[11px]">
        {children}
      </span>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative pt-4 md:pt-10">
      <Reveal>
        <SectionLabel>About</SectionLabel>
      </Reveal>

      <Reveal delay={0.1} className="mt-7 md:mt-9">
        <h1
          className="text-balance font-display text-[clamp(2.75rem,11vw,7.5rem)] leading-[0.95] tracking-[-0.03em] text-[var(--text-primary)]"
        >
          Yashveer Singh
          <br />
          Rajpoot.
        </h1>
      </Reveal>

      <Reveal
        delay={0.25}
        className="mt-7 max-w-2xl md:mt-10"
      >
        <p
          className="font-label text-[12px] uppercase tracking-[0.18em] text-[var(--accent-gold)] md:text-[13px]"
        >
          Full Stack Developer. AI Systems Builder. Founder of Yashveer Labs.
        </p>
      </Reveal>

      <Reveal
        delay={0.45}
        className="mt-10 max-w-3xl md:mt-14"
      >
        <p
          className="font-display text-[clamp(1.35rem,3.5vw,2.25rem)] italic leading-[1.25] tracking-[-0.01em] text-[var(--text-primary)]"
        >
          &ldquo;I do not build websites. I build systems that make businesses
          dangerous.&rdquo;
        </p>
      </Reveal>

      <Reveal delay={0.75} className="mt-20 md:mt-32">
        <div className="flex items-center gap-3">
          <span className="font-label text-[10px] uppercase tracking-[0.3em] text-[var(--text-muted)]">
            Scroll
          </span>
          <span className="h-px w-12 bg-[var(--border-subtle)]" />
        </div>
      </Reveal>
    </section>
  );
}

function Story() {
  return (
    <section className="mt-40 md:mt-56">
      <Reveal>
        <SectionLabel>The story</SectionLabel>
      </Reveal>

      <Reveal delay={0.1} className="mt-7 max-w-3xl md:mt-9">
        <h2 className="font-display text-[clamp(2rem,6vw,4rem)] leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)]">
          Started before sixteen.
        </h2>
      </Reveal>

      <div className="mt-12 max-w-2xl space-y-8 text-[16px] leading-[1.75] text-[var(--text-secondary)] md:mt-16 md:space-y-9 md:text-[18px]">
        <Reveal delay={0.05}>
          <p>
            I started building before I turned sixteen. Not portfolio pieces.
            Not tutorial replicas. Production systems with auth layers, role
            hierarchies, and real users waiting on the other side of the
            deploy.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p>
            By seventeen, I had five production systems running. Nexli, a
            school management platform with seven login types. Shelvra, a
            library management system. Areniq, a sports day management
            engine. Nyxera, a fully local AI assistant in six thousand lines
            across fifty-eight files. Plus client work for real businesses
            paying real money.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <p>
            I am seventeen, entering Class 12, and I have shipped more
            production code than most computer science graduates. Not because
            I am special. Because I did not wait. For permission. For a
            degree. For someone to tell me the version of the work I am
            allowed to do.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <p>
            Based in New Delhi. Building on my own clock. Holding a long arc
            that does not need a quarterly review.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section className="mt-40 md:mt-56">
      <Reveal>
        <SectionLabel>The work</SectionLabel>
      </Reveal>

      <Reveal delay={0.1} className="mt-7 max-w-3xl md:mt-9">
        <h2 className="font-display text-[clamp(2rem,6vw,4rem)] leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)]">
          What I build.
        </h2>
      </Reveal>

      {/* Systems grid */}
      <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2 md:gap-6">
        {SYSTEMS.map((s, i) => (
          <Reveal key={s.name} delay={i * 0.08}>
            <article className="group relative h-full overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/70 p-7 backdrop-blur-md transition-colors duration-500 hover:border-[var(--border-gold)] md:p-9">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--border-gold)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-[clamp(1.6rem,4vw,2.4rem)] leading-tight text-[var(--text-primary)]">
                  {s.name}
                </h3>
                <span className="font-label text-[9px] uppercase tracking-[0.22em] text-[var(--accent-gold)] md:text-[10px]">
                  System
                </span>
              </div>
              <p className="mt-2 font-label text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)] md:text-[12px]">
                {s.tag}
              </p>
              <p className="mt-6 text-[15px] leading-[1.7] text-[var(--text-secondary)] md:text-[16px]">
                {s.line}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      {/* Client work */}
      <Reveal className="mt-20 md:mt-28">
        <p className="font-label text-[11px] uppercase tracking-[0.22em] text-[var(--accent-gold)]">
          Client work
        </p>
      </Reveal>

      <div className="mt-6 grid gap-x-10 gap-y-6 md:mt-8 md:grid-cols-2 md:gap-y-7">
        {CLIENT_WORK.map((c, i) => (
          <Reveal key={c.name} delay={i * 0.06}>
            <div className="flex items-start gap-4 border-t border-[var(--border-subtle)] pt-5">
              <span className="mt-2 inline-block h-[6px] w-[6px] flex-none rounded-full bg-[var(--accent-gold)]" />
              <div>
                <h4 className="font-display text-[1.35rem] leading-tight text-[var(--text-primary)] md:text-[1.5rem]">
                  {c.name}
                </h4>
                <p className="mt-1 text-[14px] leading-[1.6] text-[var(--text-secondary)] md:text-[15px]">
                  {c.line}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section className="mt-40 md:mt-56">
      <Reveal>
        <SectionLabel>Operating principles</SectionLabel>
      </Reveal>

      <Reveal delay={0.1} className="mt-7 max-w-3xl md:mt-9">
        <h2 className="font-display text-[clamp(2rem,6vw,4rem)] leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)]">
          What I actually believe.
        </h2>
      </Reveal>

      <div className="mt-14 max-w-4xl space-y-12 md:mt-20 md:space-y-16">
        {PRINCIPLES.map((line, i) => (
          <Reveal key={i} delay={i * 0.12}>
            <div>
              <span className="font-mono text-[11px] tracking-[0.2em] text-[var(--text-muted)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 font-display text-[clamp(1.4rem,3.8vw,2.5rem)] italic leading-[1.25] tracking-[-0.01em] text-[var(--text-primary)]">
                {line}
              </p>
              <div className="mt-9 h-px w-full bg-gradient-to-r from-[var(--border-gold)] via-[var(--border-subtle)] to-transparent" />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Promises() {
  return (
    <section className="mt-40 md:mt-56">
      <Reveal>
        <SectionLabel>The work you get</SectionLabel>
      </Reveal>

      <Reveal delay={0.1} className="mt-7 max-w-3xl md:mt-9">
        <h2 className="font-display text-[clamp(2rem,6vw,4rem)] leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)]">
          What you get when you work with me.
        </h2>
      </Reveal>

      <ol className="mt-14 max-w-3xl space-y-8 md:mt-20 md:space-y-10">
        {PROMISES.map((line, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <li className="grid grid-cols-[auto_1fr] items-baseline gap-6 border-b border-[var(--border-subtle)] pb-7 md:gap-10 md:pb-9">
              <span className="font-label text-[14px] tracking-[0.2em] text-[var(--accent-gold)] md:text-[16px]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-[16px] leading-[1.65] text-[var(--text-primary)] md:text-[19px]">
                {line}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

function Numbers() {
  return (
    <section className="mt-40 md:mt-56">
      <Reveal>
        <SectionLabel>On the board</SectionLabel>
      </Reveal>

      <Reveal delay={0.1} className="mt-7 max-w-3xl md:mt-9">
        <h2 className="font-display text-[clamp(2rem,6vw,4rem)] leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)]">
          The numbers.
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-x-10 gap-y-14 md:mt-20 md:grid-cols-2 md:gap-y-20">
        {NUMBERS.map((n, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div className="border-t border-[var(--border-subtle)] pt-7 md:pt-9">
              <p className="font-display text-[clamp(3.5rem,9vw,6.5rem)] leading-[0.95] tracking-[-0.02em] text-[var(--accent-gold)]">
                <Count to={n.to} suffix={n.suffix} />
              </p>
              <p className="mt-4 font-label text-[12px] uppercase tracking-[0.22em] text-[var(--text-primary)] md:text-[13px]">
                {n.label}
              </p>
              <p className="mt-3 max-w-md text-[14px] leading-[1.65] text-[var(--text-secondary)] md:text-[15px]">
                {n.caption}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="mt-40 md:mt-56">
      <Reveal>
        <SectionLabel>The line</SectionLabel>
      </Reveal>

      <Reveal delay={0.1} className="mt-7 max-w-3xl md:mt-9">
        <h2 className="font-display text-[clamp(2rem,6vw,4rem)] leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)]">
          How to reach me.
        </h2>
      </Reveal>

      <Reveal delay={0.2} className="mt-10 max-w-2xl md:mt-14">
        <p className="text-[17px] leading-[1.65] text-[var(--text-secondary)] md:text-[20px]">
          Instagram DM is the primary channel. I read every message. I reply
          with a real answer.
        </p>
      </Reveal>

      <Reveal delay={0.35} className="mt-10 md:mt-14">
        <div className="flex flex-wrap items-center gap-3">
          <GoldLink
            href="https://www.instagram.com/yashveerlabs/"
            external
          >
            DM on Instagram
          </GoldLink>
          <GoldLink href="/projects" variant="ghost">
            See the work
          </GoldLink>
          <GoldLink href="/contact" variant="ghost">
            Use the contact page
          </GoldLink>
        </div>
      </Reveal>

      <Reveal delay={0.55} className="mt-24 md:mt-32">
        <div className="flex items-center gap-3">
          <span className="font-label text-[10px] uppercase tracking-[0.3em] text-[var(--text-muted)]">
            End of page
          </span>
          <span className="h-px flex-1 bg-[var(--border-subtle)]" />
        </div>
      </Reveal>
    </section>
  );
}
