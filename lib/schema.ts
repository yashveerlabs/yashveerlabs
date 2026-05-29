import type {
  Person,
  WebSite,
  BreadcrumbList,
  FAQPage,
  WithContext,
} from "schema-dts";
import { SITE, AUTHOR } from "./site-config";
import { absoluteUrl } from "./utils";

export const personSchema: WithContext<Person> = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: AUTHOR.name,
  url: AUTHOR.url,
  jobTitle: AUTHOR.jobTitle,
  email: `mailto:${AUTHOR.email}`,
  worksFor: {
    "@type": "Organization",
    name: SITE.brand,
    url: SITE.url,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: AUTHOR.location.city,
    addressCountry: AUTHOR.location.country,
  },
  sameAs: [...AUTHOR.sameAs],
  knowsAbout: [
    "Full Stack Web Development",
    "React",
    "Next.js",
    "Firebase",
    "System Architecture",
    "Artificial Intelligence",
    "Machine Learning",
    "Computer Vision",
    "Robotics",
  ],
};

export const websiteSchema: WithContext<WebSite> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  inLanguage: "en-US",
  publisher: {
    "@type": "Person",
    name: AUTHOR.name,
    url: AUTHOR.url,
  },
};

export function breadcrumbSchema(
  crumbs: { name: string; path: string }[]
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path, SITE.url),
    })),
  };
}

export function faqSchema(
  items: { q: string; a: string }[]
): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

/**
 * Inline JSON-LD as a <script>. Use inside server components.
 */
export function jsonLdScriptProps(data: unknown) {
  return {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  };
}
