/** @type {import('next-sitemap').IConfig} */
const fs = require("node:fs");
const path = require("node:path");

function listBlogSlugs() {
  const dir = path.join(__dirname, "content", "blog");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

const SITE_URL = process.env.SITE_URL || "https://yashveerlabs.vercel.app";

const CATEGORY_SLUGS = [
  "mvp-development",
  "software-costs",
  "hiring-developers",
  "saas-architecture",
  "ai-integration",
  "mobile-development",
  "backend-and-apis",
  "security-and-compliance",
  "performance",
  "devops-and-infra",
  "tech-debt",
  "founder-decisions",
  "frontend",
  "career-positioning",
  "startup-strategy",
  "failure-postmortems",
  "automation-ops",
  "comparisons",
];

module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ["/api/*"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: "/api/" },
    ],
    additionalSitemaps: [`${SITE_URL}/blog/feed.xml`],
    /**
     * Append the llms.txt reference to robots.txt. This is a non-standard
     * but widely-recognised convention for pointing LLM crawlers at a
     * machine-readable site manifest.
     */
    transformRobotsTxt: async (_config, robotsTxt) => {
      return (
        robotsTxt.trimEnd() +
        "\n\n" +
        "# LLM manifest (https://llmstxt.org)\n" +
        `LLM-Manifest: ${SITE_URL}/llms.txt\n` +
        `# Also reachable at: ${SITE_URL}/llms.txt\n`
      );
    },
  },
  additionalPaths: async () => {
    const slugs = listBlogSlugs();
    return [
      ...CATEGORY_SLUGS.map((s) => ({
        loc: `/blog/category/${s}`,
        changefreq: "weekly",
        priority: 0.6,
      })),
      ...slugs.map((s) => ({
        loc: `/blog/${s}`,
        changefreq: "monthly",
        priority: 0.7,
      })),
    ];
  },
};
