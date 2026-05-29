import Image from "next/image";
import { PageShell } from "@/components/shared/PageShell";
import { PageHero } from "@/components/shared/PageHero";
import { FAQ, type FAQItem } from "@/components/sections/FAQ";
import { ContactForm } from "@/components/sections/ContactForm";
import { AmbientBackdrop } from "@/components/three/lazy";
import { AmbientImage } from "@/components/shared/AmbientImage";
import { buildMeta } from "@/lib/seo";
import { AUTHOR, SOCIAL_LINKS } from "@/lib/site-config";
import {
  breadcrumbSchema,
  faqSchema,
  jsonLdScriptProps,
} from "@/lib/schema";

export const metadata = buildMeta({
  title: "Contact",
  description:
    "Direct contact for Yashveer Singh Rajpoot. Email, form, social. New Delhi, India. I reply to anyone building something serious.",
  path: "/contact",
});

const FAQ_ITEMS: FAQItem[] = [
  {
    q: "How fast do you reply?",
    a: "Usually within 24 to 48 hours. If it is genuinely urgent, say so in the subject. I do not perform fake urgency, so neither should you.",
  },
  {
    q: "What kind of work are you open to?",
    a: "Startup engineering, AI labs, product engineering, structured internships, technical partnerships, and serious collaborators on the Yashveer Labs surface. Recruiter spam is not a fit.",
  },
  {
    q: "Do you take freelance client work?",
    a: "Selectively. The work has to be the kind I would put on the Projects page. If it is interesting and the operator behind it is serious, I will take the call.",
  },
  {
    q: "Do you cold-pitch?",
    a: "No. The contact page exists so the right people can find me on purpose. I do not chase.",
  },
  {
    q: "What should I include in the first message?",
    a: "What you are building, what the actual ask is, and any constraints I should know up front (timeline, budget, technical context). One paragraph beats a vague intro followed by three follow-ups.",
  },
];

export default function ContactPage() {
  return (
    <PageShell
      backdrop={
        <>
          <AmbientImage src="/images/contact-ambient.webp" />
          <div className="absolute inset-0 opacity-30">
            <AmbientBackdrop variant="gold" />
          </div>
        </>
      }
    >
      <script
        {...jsonLdScriptProps(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ])
        )}
      />
      <script {...jsonLdScriptProps(faqSchema(FAQ_ITEMS))} />

      <PageHero
        eyebrow="Contact"
        title="Direct line, no friction."
        intro="If you are building something serious and you think I can help, this is where you reach me. The form lands in my inbox. The email below works too. The dock has my social handles."
      />

      <div className="mt-12 grid items-start gap-6 md:mt-16 md:grid-cols-[1.2fr_1fr] md:gap-8">
        <ContactForm />

        <aside className="space-y-5 md:space-y-6">
          <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 md:p-8">
            <p className="label-eyebrow text-[10px]">Email</p>
            <a
              href={`mailto:${AUTHOR.email}`}
              className="mt-3 block font-display text-[1.375rem] leading-[1.15] text-[var(--text-primary)] transition-colors hover:text-[var(--accent-gold-hover)] md:text-2xl"
            >
              {AUTHOR.email}
            </a>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              I read every message. Spam filters do too. Be specific.
            </p>
          </div>

          <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 md:p-8">
            <p className="label-eyebrow text-[10px]">Location</p>
            <p className="mt-3 font-display text-[1.375rem] leading-[1.15] text-[var(--text-primary)] md:text-2xl">
              {AUTHOR.location.city}, {AUTHOR.location.country}
            </p>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              I work remote with anyone, anywhere.
            </p>
          </div>

          <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 md:p-8">
            <p className="label-eyebrow text-[10px]">Social</p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="group grid place-items-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-3 transition-colors hover:border-[var(--border-gold)]"
                >
                  <Image
                    src={s.icon}
                    alt=""
                    width={36}
                    height={36}
                    className="h-9 w-9 object-contain"
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[color:var(--accent-gold)]/30 bg-[var(--bg-surface)] p-6 md:p-8">
            <p className="label-eyebrow text-[10px]">Response promise</p>
            <p className="mt-3 text-[15px] text-[var(--text-secondary)] md:text-base">
              I reply to every message that is not noise. 24 to 48 hours
              typical. If the answer is no, I will tell you. If the answer is
              yes, we will be talking on a call inside a week.
            </p>
          </div>
        </aside>
      </div>

      <FAQ items={FAQ_ITEMS} />
    </PageShell>
  );
}
