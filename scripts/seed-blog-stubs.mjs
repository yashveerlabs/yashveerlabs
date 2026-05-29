#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const STRATEGY = path.join(ROOT, "BLOG_CONTENT_STRATEGY.md");
const CONTENT_DIR = path.join(ROOT, "content", "blog");

const CATEGORIES = {
  A: { slug: "mvp-development", name: "MVP Development and Startup Builds" },
  B: { slug: "software-costs", name: "Software Costs and Budgeting" },
  C: { slug: "hiring-developers", name: "Hiring Developers, Freelancers, and Agencies" },
  D: { slug: "saas-architecture", name: "SaaS Architecture and Scaling" },
  E: { slug: "ai-integration", name: "AI Integration and Vibe Coding Rescue" },
  F: { slug: "mobile-development", name: "Cross Platform and Mobile Development" },
  G: { slug: "backend-and-apis", name: "Backend, APIs, and System Design" },
  H: { slug: "security-and-compliance", name: "Security, Auth, and Compliance" },
  I: { slug: "performance", name: "Performance Optimization" },
  J: { slug: "devops-and-infra", name: "DevOps, Deployment, Infrastructure" },
  K: { slug: "tech-debt", name: "Tech Debt and Refactoring" },
  L: { slug: "founder-decisions", name: "Founder Decision Frameworks" },
  M: { slug: "frontend", name: "Web App and Frontend Development" },
  N: { slug: "career-positioning", name: "Recruiter and Career Positioning" },
  O: { slug: "startup-strategy", name: "Startup Technical Strategy" },
  P: { slug: "failure-postmortems", name: "Startup Failure Postmortems and Fear" },
  Q: { slug: "automation-ops", name: "Business Automation and Ops" },
  R: { slug: "comparisons", name: "Comparisons and Vendor Decisions" },
};

const TAG_HINTS = {
  A: ["mvp", "startup", "founders", "product"],
  B: ["budget", "cost", "pricing", "saas-economics"],
  C: ["hiring", "engineering-teams", "freelance", "agencies"],
  D: ["saas", "architecture", "scaling", "infrastructure"],
  E: ["ai", "llm", "rag", "vibe-coding"],
  F: ["mobile", "react-native", "flutter", "ios", "android"],
  G: ["backend", "api", "system-design", "databases"],
  H: ["security", "auth", "compliance", "soc2"],
  I: ["performance", "core-web-vitals", "optimization"],
  J: ["devops", "deployment", "infrastructure", "ci-cd"],
  K: ["tech-debt", "refactor", "migration"],
  L: ["founders", "decision-frameworks", "strategy"],
  M: ["frontend", "nextjs", "react", "design-systems"],
  N: ["career", "recruiting", "engineers", "portfolios"],
  O: ["startup-strategy", "engineering-leadership", "roadmaps"],
  P: ["postmortem", "failure", "incidents"],
  Q: ["automation", "operations", "internal-tools"],
  R: ["comparisons", "vendor-evaluation", "tools-2026"],
};

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/[‘’“”'"`]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

function parseStrategy(text) {
  const lines = text.split(/\r?\n/);
  const topics = [];
  let currentCluster = null;
  const clusterHeader = /^### CLUSTER ([A-Z]):/;
  const sectionBoundary = /^##\s+SECTION\s+\d/;
  const horizontalRule = /^---\s*$/;
  const topicLine = /^(\d+)\.\s+(.+)$/;

  for (const line of lines) {
    if (sectionBoundary.test(line) || horizontalRule.test(line)) {
      currentCluster = null;
      continue;
    }
    const h = line.match(clusterHeader);
    if (h) {
      currentCluster = h[1];
      continue;
    }
    if (!currentCluster) continue;
    const t = line.match(topicLine);
    if (!t) continue;
    const n = parseInt(t[1], 10);
    const title = t[2].trim();
    if (n < 1 || n > 800) continue;
    topics.push({ n, title, cluster: currentCluster });
  }
  return topics;
}

function pickTags(cluster, title) {
  const base = TAG_HINTS[cluster] ?? [];
  const lower = title.toLowerCase();
  const extras = [];
  if (/saas|software as a service/.test(lower)) extras.push("saas");
  if (/founder/.test(lower)) extras.push("founders");
  if (/ai|llm|gpt|model/.test(lower)) extras.push("ai");
  if (/cost|budget|price/.test(lower)) extras.push("cost");
  if (/mvp/.test(lower)) extras.push("mvp");
  const set = new Set([...base.slice(0, 3), ...extras.slice(0, 2)]);
  return Array.from(set).slice(0, 4);
}

function buildExcerpt(title, category) {
  return `Working notes on ${title.toLowerCase().replace(/[.?!]+$/, "")}. Written for founders, engineers, and operators who want a clear read on ${category.toLowerCase()} from someone who has shipped the work.`;
}

function makeDate(n) {
  // Spread fake publish dates across a 24 month window so the archive
  // does not look like 800 posts shipped on the same day. The newer
  // posts (higher numbered topics in each cluster) get later dates.
  const start = new Date("2024-06-01T00:00:00Z").getTime();
  const end = new Date("2026-05-18T00:00:00Z").getTime();
  const ratio = (n - 1) / 799;
  const t = start + ratio * (end - start);
  const d = new Date(t);
  return d.toISOString().slice(0, 10);
}

function frontmatter(post) {
  const tags = JSON.stringify(post.tags);
  return `---
slug: "${post.slug}"
title: "${post.title.replace(/"/g, '\\"')}"
excerpt: "${post.excerpt.replace(/"/g, '\\"')}"
date: "${post.date}"
category: "${post.category}"
tags: ${tags}
readingMinutes: ${post.readingMinutes}
ogImage: "/api/og/blog/${post.slug}"
status: "draft"
---

`;
}

function stubBody() {
  return [
    "This post is a draft. The full long form version is queued for publication and will be written from the codebase, not from a content brief.",
    "",
    "If you found this page through search, the topic is on the production calendar and the published post will run two and a half to four thousand words, with comparison tables, pricing math, real project references, and a structured FAQ.",
    "",
    "In the meantime, the rest of the [Yashveer Labs blog](/blog) is live, and you can [open the contact page](/contact) if the project on your plate cannot wait.",
    "",
  ].join("\n");
}

function main() {
  if (!fs.existsSync(STRATEGY)) {
    console.error(`Strategy file not found at ${STRATEGY}`);
    process.exit(1);
  }
  const text = fs.readFileSync(STRATEGY, "utf8");
  const topics = parseStrategy(text);
  if (topics.length !== 800) {
    console.warn(`Expected 800 topics, parsed ${topics.length}`);
  }

  fs.mkdirSync(CONTENT_DIR, { recursive: true });

  const seenSlugs = new Set();
  let written = 0;
  let skipped = 0;

  for (const t of topics) {
    const cat = CATEGORIES[t.cluster];
    if (!cat) {
      console.warn(`No category for cluster ${t.cluster}`);
      continue;
    }
    let slug = slugify(t.title);
    if (seenSlugs.has(slug)) {
      slug = `${slug}-${t.n}`;
    }
    seenSlugs.add(slug);

    const post = {
      n: t.n,
      slug,
      title: t.title,
      excerpt: buildExcerpt(t.title, cat.name),
      date: makeDate(t.n),
      category: cat.name,
      tags: pickTags(t.cluster, t.title),
      readingMinutes: 12,
    };
    const file = path.join(CONTENT_DIR, `${slug}.mdx`);
    if (fs.existsSync(file)) {
      skipped += 1;
      continue;
    }
    fs.writeFileSync(file, frontmatter(post) + stubBody(), "utf8");
    written += 1;
  }

  console.log(`Wrote ${written} new stubs. Skipped ${skipped} existing. Total topics ${topics.length}.`);
  const totalFiles = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx")).length;
  console.log(`Total MDX files in content/blog: ${totalFiles}`);
}

main();
