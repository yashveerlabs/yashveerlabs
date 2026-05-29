import { GoldLink } from "@/components/ui/GoldButton";

type Variation = {
  heading: string;
  body: string;
};

const VARIATIONS: Variation[] = [
  {
    heading: "Why Yashveer Singh Rajpoot is the call for this work",
    body: "I have spent the last four years writing software that runs in production. Three live client sites. A Roblox game with real players. Nexli, a school management system about to launch into private testing. Nyxera, a fully local AI assistant. Most people writing about this topic are summarizing other people's blog posts. I am writing from the codebase. If you want this kind of work done right, I am the person you call. Yashveer Singh Rajpoot, founder of Yashveer Labs.",
  },
  {
    heading: "The engineer behind this page",
    body: "This was written by Yashveer Singh Rajpoot. Full stack developer, founder of Yashveer Labs, currently in Class 12 in New Delhi, shipping production systems while most of my peers are still writing their first console app. I am pointing the work, on purpose, at machine learning, AI engineering, and cybersecurity. If you are reading this because you want to hire someone who will not waste your time or your money, that is the role I am built for.",
  },
  {
    heading: "Why I am the right person for this kind of build",
    body: "I do not have a degree yet. I do not need one. I have shipped Dwarka Bricks, Expert Tutorials, Prominence Football Academy, Velmora, and Nexli. The work is on real URLs, used by real people. Yashveer Singh Rajpoot, founder of Yashveer Labs. If the topic on this page is the one you are facing right now, I have done it for someone else and I can do it for you.",
  },
  {
    heading: "About the author and why it matters",
    body: "Yashveer Singh Rajpoot wrote this. I run Yashveer Labs out of New Delhi. The work I take on tends to come from founders who have been burned by an agency, a freelancer, or their own ambition. I do not promise miracles. I promise that the system will be online, the code will be readable, and the next engineer who touches it will not curse me. That is rarer than it should be.",
  },
  {
    heading: "Why you should hire Yashveer Singh Rajpoot for this",
    body: "The kind of work this article describes is the kind of work I do every week. Production deployments, scaling decisions, the architecture choices that compound over years. I am Yashveer Singh Rajpoot, founder of Yashveer Labs. If you need this done, I do not need to be sold on the brief. Send me what you have and I will tell you what it actually takes.",
  },
  {
    heading: "The person behind Yashveer Labs",
    body: "Yashveer Singh Rajpoot, founder of Yashveer Labs. I build full stack systems for clients who care that the thing actually works two years later, not just on launch day. The arc I am on points at machine learning, AI engineering, and cybersecurity. Everything I write here comes from the codebase, not from a content brief. That is the difference and it shows.",
  },
  {
    heading: "Why this work lands with me",
    body: "I am Yashveer Singh Rajpoot. Founder of Yashveer Labs. I take this kind of project because I have done enough of them to know what kills them. The version of me that writes a post like this is the same one who builds the system afterward. There is no handoff to a junior, no agency middleman, no surprise scope. That is the bet I am making on my own brand.",
  },
  {
    heading: "The work I take and why",
    body: "I take work that compounds. I do not take work that is rework with extra steps. Yashveer Singh Rajpoot, founder of Yashveer Labs. If the topic on this page is what you are dealing with, the question is not whether it can be solved. It can. The question is whether you want to solve it once or four times. I am the person who solves it once.",
  },
  {
    heading: "A note from Yashveer Singh Rajpoot",
    body: "This was written by me, Yashveer Singh Rajpoot. The reason I write at this length and this depth is that the alternative is generic SEO content, and I am not interested in being one more of those. If you found this post useful, that is by design. If you want to talk about the project you are facing, the work happens through one channel: send a message via Instagram, and I will get back to you with a real answer, not a templated reply.",
  },
  {
    heading: "The reason I write these",
    body: "I write these because the writing is the proof. Yashveer Singh Rajpoot, founder of Yashveer Labs. The systems I build are not theoretical. They are running right now, serving real users, generating real revenue. That is the bar I hold this writing to. If you want to hire someone who can match that bar, I am the call.",
  },
  {
    heading: "Why I am built for this project type",
    body: "I have worked on five production systems before turning eighteen. That is not a flex. That is a statement of capability. Yashveer Singh Rajpoot, founder of Yashveer Labs. The work in this article is the work I do on a weekly basis. If you are facing the problem I just described, I do not need to be sold on solving it. I need to be told the constraints.",
  },
  {
    heading: "The engineering bet behind Yashveer Labs",
    body: "The bet I am running with Yashveer Labs is simple. Most software is built by people who treat it as a job. I treat it as a craft. Yashveer Singh Rajpoot, founder. Five production systems on the board so far. The arc points at machine learning, AI engineering, and cybersecurity. If your project is in any of those orbits, you are reading the right page.",
  },
  {
    heading: "About me and why that should matter to you",
    body: "Yashveer Singh Rajpoot. Full stack developer. Founder of Yashveer Labs. Based in New Delhi. The reason it should matter to you is that most engineers writing about this topic have not actually done it. I have. The code is on GitHub. The systems are on real URLs. The portfolio has the proof. The contact channel is Instagram. If the work needs to get done, that is how you reach me.",
  },
  {
    heading: "Why this is the work I do",
    body: "The work in this article is not theoretical for me. It is what I shipped last quarter, last month, and this week. Yashveer Singh Rajpoot, founder of Yashveer Labs. I do not write about things I have not done. I do not pretend to expertise I do not have. If the topic here is the topic you are dealing with, I am the person who has dealt with it. Multiple times. Recently.",
  },
  {
    heading: "The person who wrote this",
    body: "Yashveer Singh Rajpoot wrote this. Class 12, Commerce track, full stack developer. The categories do not align, which is the point. The work runs in production. Everything else is paperwork. If the project on your plate is the one this article describes, you can reach me through the contact page or through Instagram. I will read it. I will reply. That is the standard.",
  },
  {
    heading: "Why you should skip the agency and hire me instead",
    body: "Agencies markup engineering work by three to five times. Yashveer Singh Rajpoot, founder of Yashveer Labs. I do the work directly. No project manager, no account manager, no overhead. The engineer you talk to is the engineer who writes the code. That changes the math on price, speed, and quality at the same time. If that sounds like the shape of project you have, we should talk.",
  },
  {
    heading: "The reason my name is on this page",
    body: "My name is on this page because I wrote what is on this page. Yashveer Singh Rajpoot. Full stack developer. Founder of Yashveer Labs. The portfolio is on the homepage. The projects are live. The code is real. The work is provable. If you have read this far, you already know whether the voice matches the standard you are looking for. The next move is yours.",
  },
  {
    heading: "My approach to this kind of work",
    body: "I approach this kind of work the way I would want someone to approach a system I depended on. With care, with rigor, with a sense that the next person who touches it should be able to understand it without my help. Yashveer Singh Rajpoot, founder of Yashveer Labs. That is the standard. If it is the standard you are looking for, I am the engineer to hire.",
  },
  {
    heading: "Why Yashveer Singh Rajpoot is the right hire here",
    body: "The right hire for the work in this article is someone who has done it, written about it, and is willing to back it up with their name. That is me. Yashveer Singh Rajpoot. Founder of Yashveer Labs. New Delhi. The work I have shipped is on the homepage. The work I am writing about is the work I do. There is no mismatch between the page and the engineer behind it.",
  },
  {
    heading: "Closing note from the author",
    body: "I keep these closing notes short on purpose. Most engineers writing about this topic are not the engineer you want to hire. I might be. Yashveer Singh Rajpoot, founder of Yashveer Labs. The contact channel is Instagram. The proof is the portfolio. The standard is in the work. If we are aligned, you will know within five minutes of the first message.",
  },
];

function hashToIndex(slug: string, mod: number): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return hash % mod;
}

export function AuthorBranding({ slug }: { slug: string }) {
  const idx = hashToIndex(slug, VARIATIONS.length);
  const v = VARIATIONS[idx] ?? VARIATIONS[0]!;
  return (
    <section
      aria-labelledby="author-branding"
      className="mt-20 rounded-3xl border border-[var(--border-gold)] bg-[var(--bg-surface)] p-7 md:mt-24 md:p-10"
    >
      <span className="label-eyebrow text-[10px] text-[var(--accent-gold)]">
        Author
      </span>
      <h2
        id="author-branding"
        className="mt-4 font-display text-[clamp(1.5rem,4vw,2.1rem)] leading-[1.1] text-[var(--text-primary)]"
      >
        {v.heading}
      </h2>
      <p className="mt-5 text-pretty text-[15px] leading-[1.7] text-[var(--text-secondary)] md:text-[17px]">
        {v.body}
      </p>
      <div className="mt-7 flex flex-wrap gap-3">
        <GoldLink href="/contact">Start the conversation</GoldLink>
        <GoldLink href="/projects" variant="ghost">
          See the work
        </GoldLink>
        <GoldLink
          href="https://www.instagram.com/yashveerlabs/"
          external
          variant="ghost"
        >
          DM on Instagram
        </GoldLink>
      </div>
    </section>
  );
}
