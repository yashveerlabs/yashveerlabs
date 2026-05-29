import type { Metadata } from "next";
import { SITE, AUTHOR } from "./site-config";
import { absoluteUrl } from "./utils";

type BuildMetaInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
};

export function buildMeta({
  title,
  description,
  path,
  keywords,
  ogImage,
}: BuildMetaInput): Metadata {
  const url = absoluteUrl(path, SITE.url);
  const image = absoluteUrl(ogImage ?? SITE.defaultOgImage, SITE.url);

  return {
    title,
    description,
    keywords,
    authors: [{ name: AUTHOR.name, url: AUTHOR.url }],
    creator: AUTHOR.name,
    metadataBase: new URL(SITE.url),
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      locale: SITE.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: SITE.twitterHandle,
    },
    alternates: { canonical: url },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
