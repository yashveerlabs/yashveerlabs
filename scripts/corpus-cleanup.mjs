#!/usr/bin/env node
// Corpus cleanup for pre-existing 614 posts. Applies 6 fixes in order.
// Logs every change. Idempotent: safe to re-run.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIR = path.join(ROOT, "content", "blog");

const BRANDING_HEADINGS = new Set([
  "A Note From Yashveer Singh Rajpoot",
  "About Me and Why That Should Matter to You",
  "About the Author and Why It Matters",
  "Closing Note From the Author",
  "My Approach to This Kind of Work",
  "The Engineer Behind This Page",
  "The Engineer Behind This Post",
  "The Engineering Bet Behind Yashveer Labs",
  "The Person Behind Yashveer Labs",
  "The Person Who Wrote This",
  "The Reason I Write These",
  "The Reason My Name Is on This Page",
  "The Work I Take and Why",
  "Why I Am Built for This Project Type",
  "Why I Am the Right Person for This Kind of Build",
  "Why This Is the Work I Do",
  "Why This Work Lands With Me",
  "Why Yashveer Singh Rajpoot",
  "Why Yashveer Singh Rajpoot Is the Call for This Work",
  "Why Yashveer Singh Rajpoot Is the Right Hire Here",
  "Why Yashveer Singh Rajpoot Is the Right Person for This Kind of Build",
  "Why Yashveer Singh Rajpoot Wrote This",
  "Why You Should Hire Yashveer Singh Rajpoot for This",
  "Why You Should Skip the Agency and Hire Me Instead",
]);

const stats = {
  filesScanned: 0,
  brandingStripped: 0,
  faqMigrated: 0,
  expertNormalized: 0,
  emDashesRemoved: 0,
  linksRepointed: 0,
  linksRemoved: 0,
  filesModified: new Set(),
  brokenLinksUnresolved: {},
  linkRepointMap: {},
};

function listMdx() {
  return fs.readdirSync(DIR).filter((f) => f.endsWith(".mdx")).sort();
}

function splitFrontmatter(src) {
  if (!src.startsWith("---\n")) return { fm: "", body: src, hasFm: false };
  const end = src.indexOf("\n---\n", 4);
  if (end === -1) return { fm: "", body: src, hasFm: false };
  return {
    fm: src.slice(4, end),
    body: src.slice(end + 5),
    hasFm: true,
  };
}

function joinFrontmatter(fm, body) {
  return `---\n${fm}\n---\n${body}`;
}

// ============================================================
// PHASE 1: Strip in-body branding sections
// ============================================================
function stripBranding(body) {
  const lines = body.split("\n");
  const out = [];
  let i = 0;
  let stripped = false;
  while (i < lines.length) {
    const line = lines[i];
    const m = line.match(/^## (.+?)\s*$/);
    if (m && BRANDING_HEADINGS.has(m[1].trim())) {
      stripped = true;
      // Skip from this H2 until next H2 or EOF
      i += 1;
      while (i < lines.length && !lines[i].match(/^## /)) i += 1;
      // Trim trailing blank lines from `out`
      while (out.length && out[out.length - 1].trim() === "") out.pop();
      continue;
    }
    out.push(line);
    i += 1;
  }
  return { body: out.join("\n"), stripped };
}

// ============================================================
// PHASE 2: Migrate body FAQ to frontmatter
// ============================================================
function migrateFaq(fm, body) {
  // Only migrate if frontmatter does not already have faq:
  if (/^faq:/m.test(fm)) return { fm, body, migrated: false };

  const lines = body.split("\n");
  // Find FAQ heading: `## FAQ` or `## Frequently asked questions`
  let faqStart = -1;
  let faqEnd = lines.length;
  for (let i = 0; i < lines.length; i += 1) {
    if (/^##\s+(FAQ|Frequently asked questions)\s*$/i.test(lines[i])) {
      faqStart = i;
      break;
    }
  }
  if (faqStart === -1) return { fm, body, migrated: false };
  for (let i = faqStart + 1; i < lines.length; i += 1) {
    if (/^## /.test(lines[i])) {
      faqEnd = i;
      break;
    }
  }

  // Parse Q/A pairs inside [faqStart+1, faqEnd)
  const block = lines.slice(faqStart + 1, faqEnd);
  const items = [];
  let curQ = null;
  let curA = [];
  for (const raw of block) {
    const line = raw;
    // Question forms:
    //   **Question text?**
    //   ### Question text
    let qMatch = line.match(/^\*\*(.+?\??)\*\*\s*$/);
    if (!qMatch) {
      qMatch = line.match(/^###\s+(.+?)\s*$/);
    }
    if (qMatch) {
      if (curQ !== null) {
        items.push({ q: curQ, a: curA.join(" ").trim() });
      }
      curQ = qMatch[1].trim();
      curA = [];
    } else if (curQ !== null) {
      if (line.trim() === "") {
        if (curA.length && curA[curA.length - 1] !== "") curA.push("");
      } else {
        curA.push(line.trim());
      }
    }
  }
  if (curQ !== null) {
    items.push({ q: curQ, a: curA.join(" ").trim() });
  }
  if (items.length === 0) return { fm, body, migrated: false };

  // Clean each answer: collapse whitespace, remove trailing empties
  const cleaned = items
    .filter((it) => it.q && it.a)
    .map((it) => ({
      q: it.q.replace(/\s+/g, " ").trim(),
      a: it.a.replace(/\s+/g, " ").trim(),
    }));
  if (cleaned.length === 0) return { fm, body, migrated: false };

  // Build frontmatter faq block
  const faqLines = ["faq: ["];
  for (let i = 0; i < cleaned.length; i += 1) {
    const obj = cleaned[i];
    const qEsc = obj.q.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    const aEsc = obj.a.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    const comma = i === cleaned.length - 1 ? "" : ",";
    faqLines.push(`  {"q":"${qEsc}","a":"${aEsc}"}${comma}`);
  }
  faqLines.push("]");
  const faqBlock = faqLines.join("\n");

  // Append faq to frontmatter (after existing fields)
  const newFm = fm.replace(/\s+$/, "") + "\n" + faqBlock;

  // Remove FAQ section from body
  const newLines = lines.slice(0, faqStart).concat(lines.slice(faqEnd));
  // Trim consecutive blank lines at the boundary
  while (
    newLines.length > faqStart &&
    newLines[faqStart - 1]?.trim() === "" &&
    newLines[faqStart]?.trim() === ""
  ) {
    newLines.splice(faqStart, 1);
  }
  return { fm: newFm, body: newLines.join("\n"), migrated: true };
}

// ============================================================
// PHASE 3: Normalize expert opinion heading
// ============================================================
function normalizeExpert(body) {
  if (/^## expert opinion/im.test(body)) return { body, changed: false };
  const lines = body.split("\n");
  // Find a Yashveer attribution blockquote line:
  //   > Yashveer Singh Rajpoot, founder of Yashveer Labs
  let attribIdx = -1;
  for (let i = 0; i < lines.length; i += 1) {
    if (/^>\s*Yashveer Singh Rajpoot,\s*founder of Yashveer Labs\.?/.test(lines[i])) {
      attribIdx = i;
      break;
    }
  }
  if (attribIdx === -1) return { body, changed: false };

  // Walk backwards to find the start of the blockquote (first line beginning with `>`)
  let bqStart = attribIdx;
  while (bqStart > 0 && /^>/.test(lines[bqStart - 1])) bqStart -= 1;

  // Look at what precedes bqStart, skipping blanks. If it's not already a heading, insert one.
  let probe = bqStart - 1;
  while (probe >= 0 && lines[probe].trim() === "") probe -= 1;
  // If the line above is "## A note from the field" or any other H2 that is NOT "## Expert opinion",
  // we'll just rename it. If there's no heading directly above, insert one.
  if (probe >= 0 && /^##\s+/.test(lines[probe])) {
    const head = lines[probe].match(/^##\s+(.+?)\s*$/);
    if (head && !/^expert opinion$/i.test(head[1].trim())) {
      lines[probe] = "## Expert opinion";
      return { body: lines.join("\n"), changed: true };
    }
    return { body, changed: false };
  }
  // Insert before the blockquote with surrounding blank line
  const insertion = ["", "## Expert opinion", ""];
  lines.splice(bqStart, 0, ...insertion);
  return { body: lines.join("\n"), changed: true };
}

// ============================================================
// PHASE 4: Em-dash removal
// ============================================================
function removeEmDashes(body) {
  if (!/—/.test(body)) return { body, count: 0 };
  let count = 0;
  // Replace ` — ` with `, ` (commaspace) where surrounded by space
  let next = body.replace(/ — /g, () => {
    count += 1;
    return ", ";
  });
  // Then any remaining em-dashes -> colon
  next = next.replace(/—/g, () => {
    count += 1;
    return ":";
  });
  return { body: next, count };
}

// ============================================================
// PHASE 5: Fix broken internal links
// ============================================================
function tokenize(slug) {
  return slug.split("-").filter(Boolean);
}
function jaccard(a, b) {
  const A = new Set(a);
  const B = new Set(b);
  let inter = 0;
  for (const x of A) if (B.has(x)) inter += 1;
  return inter / (A.size + B.size - inter);
}
function findBestMatch(brokenSlug, realSlugs) {
  const toks = tokenize(brokenSlug);
  let best = null;
  let bestScore = 0;
  for (const r of realSlugs) {
    const rt = tokenize(r);
    const s = jaccard(toks, rt);
    if (s > bestScore) {
      bestScore = s;
      best = r;
    }
  }
  return { match: best, score: bestScore };
}

function fixLinks(body, realSlugs) {
  let repointed = 0;
  let removed = 0;
  const rePoints = {};
  // Match `[text](/blog/slug)` and possibly with anchors like `#section`
  const rx = /(\[[^\]]+\])\((\/blog\/[a-z0-9-]+)(\)|#[^)]*\))/g;
  const next = body.replace(rx, (m, text, url, tail) => {
    const slug = url.replace(/^\/blog\//, "");
    if (realSlugs.has(slug)) return m;
    const { match, score } = findBestMatch(slug, [...realSlugs]);
    if (match && score >= 0.6) {
      rePoints[slug] = match;
      repointed += 1;
      return `${text}(/blog/${match}${tail.startsWith("#") ? tail : ")"}`;
    }
    // Otherwise, drop the link, keep text
    removed += 1;
    stats.brokenLinksUnresolved[slug] = (stats.brokenLinksUnresolved[slug] || 0) + 1;
    return text.slice(1, -1); // strip the [ ]
  });
  return { body: next, repointed, removed, rePoints };
}

// ============================================================
// Main
// ============================================================
const files = listMdx();
const realSlugs = new Set(files.map((f) => f.replace(/\.mdx$/, "")));

// PHASE 6 (early): handle the duplicate. Delete shorter, redirect links to longer.
const SHORTER = "mobile-performance-profiling-a-founders-reading-guide";
const LONGER = "mobile-performance-profiling-a-founders-reading-guide-450";
let duplicateDeleted = false;
if (realSlugs.has(SHORTER) && realSlugs.has(LONGER)) {
  const shorterPath = path.join(DIR, `${SHORTER}.mdx`);
  fs.unlinkSync(shorterPath);
  realSlugs.delete(SHORTER);
  duplicateDeleted = true;
}
// We'll fix links pointing to the deleted SHORTER -> LONGER below as part of normal link fix
// (the link fix uses realSlugs which no longer contains SHORTER, so fuzzy match will resolve to LONGER).

for (const file of files) {
  if (duplicateDeleted && file === `${SHORTER}.mdx`) continue;
  const full = path.join(DIR, file);
  if (!fs.existsSync(full)) continue;
  stats.filesScanned += 1;
  const src = fs.readFileSync(full, "utf8");
  let { fm, body, hasFm } = splitFrontmatter(src);
  if (!hasFm) continue;
  let modified = false;

  // Phase 1: strip branding
  const r1 = stripBranding(body);
  if (r1.stripped) {
    body = r1.body;
    stats.brandingStripped += 1;
    modified = true;
  }

  // Phase 2: migrate FAQ
  const r2 = migrateFaq(fm, body);
  if (r2.migrated) {
    fm = r2.fm;
    body = r2.body;
    stats.faqMigrated += 1;
    modified = true;
  }

  // Phase 3: normalize expert heading
  const r3 = normalizeExpert(body);
  if (r3.changed) {
    body = r3.body;
    stats.expertNormalized += 1;
    modified = true;
  }

  // Phase 4: em-dashes
  const r4 = removeEmDashes(body);
  if (r4.count > 0) {
    body = r4.body;
    stats.emDashesRemoved += r4.count;
    modified = true;
  }

  // Phase 5: links
  const r5 = fixLinks(body, realSlugs);
  if (r5.repointed > 0 || r5.removed > 0) {
    body = r5.body;
    stats.linksRepointed += r5.repointed;
    stats.linksRemoved += r5.removed;
    Object.assign(stats.linkRepointMap, r5.rePoints);
    modified = true;
  }

  if (modified) {
    stats.filesModified.add(file);
    fs.writeFileSync(full, joinFrontmatter(fm, body), "utf8");
  }
}

console.log("=== CORPUS CLEANUP COMPLETE ===");
console.log(`Files scanned:           ${stats.filesScanned}`);
console.log(`Files modified:          ${stats.filesModified.size}`);
console.log(`Branding sections stripped: ${stats.brandingStripped}`);
console.log(`Body FAQ migrated to frontmatter: ${stats.faqMigrated}`);
console.log(`Expert opinion headings normalized: ${stats.expertNormalized}`);
console.log(`Em-dashes removed:       ${stats.emDashesRemoved}`);
console.log(`Internal links repointed: ${stats.linksRepointed}`);
console.log(`Internal links removed:   ${stats.linksRemoved}`);
console.log(`Duplicate (mobile-perf): ${duplicateDeleted ? "deleted shorter" : "no-op"}`);
console.log("");
console.log("Link repoint map sample:");
const repointEntries = Object.entries(stats.linkRepointMap);
for (let i = 0; i < Math.min(15, repointEntries.length); i += 1) {
  console.log(`  ${repointEntries[i][0]} -> ${repointEntries[i][1]}`);
}
if (repointEntries.length > 15) console.log(`  ... and ${repointEntries.length - 15} more`);

console.log("");
console.log("Unresolved (removed) link slugs:");
const unresolved = Object.entries(stats.brokenLinksUnresolved);
for (let i = 0; i < Math.min(20, unresolved.length); i += 1) {
  console.log(`  ${unresolved[i][0]} (referenced ${unresolved[i][1]} times)`);
}
if (unresolved.length > 20) console.log(`  ... and ${unresolved.length - 20} more`);
