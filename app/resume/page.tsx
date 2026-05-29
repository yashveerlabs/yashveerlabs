import path from "node:path";
import fs from "node:fs/promises";
import { PageShell } from "@/components/shared/PageShell";
import { PageHero } from "@/components/shared/PageHero";
import { FAQ, type FAQItem } from "@/components/sections/FAQ";
import { GoldLink } from "@/components/ui/GoldButton";
import { AmbientBackdrop } from "@/components/three/lazy";
import { buildMeta } from "@/lib/seo";
import {
  breadcrumbSchema,
  faqSchema,
  jsonLdScriptProps,
  personSchema,
} from "@/lib/schema";

export const metadata = buildMeta({
  title: "Resume",
  description:
    "Resume of Yashveer Singh Rajpoot. Full stack developer, TypeScript and Next.js, founder of Yashveer Labs. Downloadable PDF and live work history.",
  path: "/resume",
  keywords: [
    "Yashveer Singh Rajpoot resume",
    "full stack developer resume",
    "TypeScript engineer",
    "Next.js developer",
  ],
});

const FAQ_ITEMS: FAQItem[] = [
  {
    q: "Is the PDF the same as this page?",
    a: "Same content, different format. The page lives, the PDF travels. Both stay current.",
  },
  {
    q: "Are you open to internships and full time roles?",
    a: "Both. Anything with intensity and shipping cadence. Startup engineering, AI labs, infrastructure, security, product engineering. The contact page is the direct line.",
  },
  {
    q: "What is the most important number on this resume?",
    a: "The deployment count. Every project listed has been to production. That is the only metric I trust about a developer my age.",
  },
  {
    q: "Why is school still on here?",
    a: "Because Class 12 (2026 to 2027) is the current context, not the limit. The work I am shipping does not wait for college. Including it is a frame, not a credential.",
  },
  {
    q: "Do you know languages other than the JS family?",
    a: "Yes. Primary day to day is JavaScript and TypeScript. Secondary working knowledge: Python, Java, PHP, Ruby, Go, Rust. The right language is whichever one the problem actually demands.",
  },
  {
    q: "Where do you want to be in five years?",
    a: "Machine Learning Developer, AI Engineer, Cybersecurity Expert, with the lab as the vehicle. The web work is the foundation. The trajectory is on the About page.",
  },
];

async function resumePdfExists() {
  try {
    await fs.stat(path.join(process.cwd(), "public", "resume.pdf"));
    return true;
  } catch {
    return false;
  }
}

export default async function ResumePage() {
  const hasPdf = await resumePdfExists();

  return (
    <PageShell
      backdrop={
        <div className="absolute inset-0 opacity-30">
          <AmbientBackdrop variant="gold" />
        </div>
      }
    >
      <script
        {...jsonLdScriptProps(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Resume", path: "/resume" },
          ])
        )}
      />
      <script {...jsonLdScriptProps(personSchema)} />
      <script {...jsonLdScriptProps(faqSchema(FAQ_ITEMS))} />

      <PageHero
        eyebrow="Resume"
        title="The full record, in one page."
        intro="Yashveer Singh Rajpoot. Full stack developer. Founder of Yashveer Labs. New Delhi, India. Class 12 (2026 to 2027). Building production systems since 2024."
      />

      <div className="mt-10 flex flex-wrap items-center gap-3">
        {hasPdf ? (
          <GoldLink href="/resume.pdf" external>
            Download PDF
          </GoldLink>
        ) : (
          <span
            className="label-eyebrow-muted inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] px-4 py-2 text-[10px] md:text-[11px]"
            title="PDF will be available once Yashveer drops public/resume.pdf"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--text-muted)]" />
            PDF coming soon
          </span>
        )}
        <GoldLink href="https://www.instagram.com/yashveerlabs/" external variant="ghost">
          Connect
        </GoldLink>
      </div>

      {/* Snapshot grid */}
      <section className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4 md:mt-20">
        {[
          { k: "Role", v: "Full Stack Developer" },
          { k: "Lab", v: "Yashveer Labs (founder)" },
          { k: "Based", v: "New Delhi, India" },
          { k: "Trajectory", v: "ML, AI, Security" },
        ].map((x) => (
          <div key={x.k} className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5">
            <span className="label-eyebrow-muted text-[10px]">{x.k}</span>
            <p className="mt-2 font-display text-[1.0625rem] leading-[1.2] text-[var(--text-primary)] md:text-lg">{x.v}</p>
          </div>
        ))}
      </section>

      {/* Experience timeline */}
      <section className="mt-20 md:mt-24">
        <h2 className="font-display text-[clamp(1.75rem,5vw,2.5rem)] leading-[1.1] text-[var(--text-primary)]">
          Experience
        </h2>
        <ol className="mt-8 space-y-10 border-l border-[var(--border-subtle)] pl-5 md:mt-10 md:space-y-12 md:pl-8">
          <Role
            year="2025 to present"
            title="Founder, Yashveer Labs"
            place="Independent · New Delhi"
            bullets={[
              "Shipped Dwarka Bricks, a hyper-local real estate platform for the 22 sectors of Dwarka.",
              "Built and maintain the Expert Tutorials site; also teach AI, Informatics Practices, Computer Science, and programming languages on weekends on the same platform.",
              "Shipped Prominence Football Academy's site, from program tiers and schedules to registration flow.",
              "Built Nexli, a full stack school management system with seven login types; in private testing inside one school.",
              "Published Velmora on Roblox, expanding the lab into game runtimes and Lua scripting.",
            ]}
          />
          <Role
            year="2025"
            title="Frontend Developer Intern"
            place="Structured internship"
            bullets={[
              "Built Gym Management Dashboard and Sport Buddy.",
              "Wired admin authentication systems and role-based dashboards.",
              "Strengthened component architecture, dashboard UI, version control, and deployment workflows.",
            ]}
          />
          <Role
            year="2024"
            title="Freelance Developer and Content Engineer"
            place="Wah Ji Wah Restaurant Group"
            bullets={[
              "Shipped 120 SEO optimized pages in four months, one per day.",
              "Learned the part of the craft no tutorial teaches: deployment cadence and consistency under pressure.",
            ]}
          />
        </ol>
      </section>

      {/* Education */}
      <section className="mt-20 md:mt-24">
        <h2 className="font-display text-[clamp(1.75rem,5vw,2.5rem)] leading-[1.1] text-[var(--text-primary)]">Education</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4 md:mt-8">
          <Card title="Class 12 (2026 to 2027)" body="Currently enrolled. The bar is to keep shipping while the academics happen, not to wait for them to finish." />
          <Card title="Self-directed engineering" body="Production systems since 2024. The lab is the lab. School is the schedule." />
        </div>
      </section>

      {/* Skills */}
      <section className="mt-20 md:mt-24">
        <h2 className="font-display text-[clamp(1.75rem,5vw,2.5rem)] leading-[1.1] text-[var(--text-primary)]">Stack</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 md:mt-8">
          <SkillGroup
            label="Primary"
            items={["TypeScript", "JavaScript", "Next.js", "React", "Node.js", "Tailwind"]}
          />
          <SkillGroup
            label="Data and infra"
            items={["Firebase", "Firestore", "Firebase Auth", "SQL", "Vercel", "GitHub"]}
          />
          <SkillGroup
            label="Working knowledge"
            items={["Python", "Java", "PHP", "Ruby", "Go", "Rust", "Lua"]}
          />
          <SkillGroup
            label="Markup and styling"
            items={["HTML", "CSS", "Design systems"]}
          />
          <SkillGroup
            label="Engineering disciplines"
            items={[
              "System design",
              "Role-based auth",
              "Real-time data",
              "PDF generation",
              "API design",
            ]}
          />
          <SkillGroup
            label="Trajectory (in progress)"
            items={["Machine learning", "AI engineering", "Cybersecurity"]}
          />
        </div>
      </section>

      {/* Selected work links */}
      <section className="mt-20 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 md:mt-24 md:p-10">
        <h2 className="font-display text-[clamp(1.5rem,4.5vw,2rem)] leading-[1.1] text-[var(--text-primary)]">Selected work</h2>
        <p className="mt-3 max-w-2xl text-[15px] text-[var(--text-secondary)] md:text-base">
          Each entry on this page links to the deeper case study on the
          Projects page. Numbers are tied to systems, not slideshows.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 md:mt-7">
          <GoldLink href="/projects">Open Projects</GoldLink>
          <GoldLink href="/about" variant="ghost">
            Read About
          </GoldLink>
        </div>
      </section>

      <FAQ items={FAQ_ITEMS} />
    </PageShell>
  );
}

function Role({
  year,
  title,
  place,
  bullets,
}: {
  year: string;
  title: string;
  place: string;
  bullets: string[];
}) {
  return (
    <li className="relative">
      <span
        aria-hidden
        className="absolute -left-[27px] top-2 inline-block h-2.5 w-2.5 rounded-full border-2 border-[var(--accent-gold)] bg-[var(--bg-primary)] md:-left-[33px]"
      />
      <div className="flex flex-col">
        <span className="label-eyebrow text-[10px] md:text-[11px]">{year}</span>
        <h3 className="mt-2 font-display text-[1.375rem] leading-[1.15] text-[var(--text-primary)] md:text-2xl">{title}</h3>
        <p className="mt-1 text-sm text-[var(--text-muted)]">{place}</p>
        <ul className="mt-4 space-y-2 text-[15px] text-[var(--text-secondary)] md:text-base">
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-[var(--accent-gold)]" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

function Card({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 md:p-6">
      <h3 className="font-display text-[1.0625rem] leading-[1.2] text-[var(--text-primary)] md:text-xl">{title}</h3>
      <p className="mt-2 text-sm text-[var(--text-secondary)]">{body}</p>
    </div>
  );
}

function SkillGroup({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 md:p-6">
      <span className="label-eyebrow text-[10px]">{label}</span>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {items.map((s) => (
          <span
            key={s}
            className="rounded-full border border-[var(--border-subtle)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-secondary)]"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
