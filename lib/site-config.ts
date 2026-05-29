/**
 * Single source of truth for site-wide constants.
 * Swap SITE_URL once when the canonical domain changes.
 */

export const SITE_URL = "https://yashveerlabs.vercel.app";

export const SITE = {
  url: SITE_URL,
  name: "Yashveer Singh Rajpoot",
  brand: "Yashveer Labs",
  shortName: "Yashveer Labs",
  description:
    "Full stack developer, systems thinker, and founder of Yashveer Labs. I build production-grade web platforms, intelligent systems, and the Stark Protocol vision.",
  locale: "en_US",
  defaultOgImage: "/og/default.png",
  themeColor: "#0F0A12",
  twitterHandle: "@yashveerlabs",
} as const;

export const AUTHOR = {
  name: "Yashveer Singh Rajpoot",
  url: SITE_URL,
  jobTitle: "Full Stack Developer, Founder of Yashveer Labs",
  email: "yashveersr4@gmail.com",
  location: {
    city: "New Delhi",
    country: "India",
  },
  sameAs: [
    "https://github.com/yashveerlabs",
    "https://www.linkedin.com/in/yashveer-singh-rajpoot/",
    "https://www.instagram.com/yashveerlabs/",
    "https://x.com/yashveerlabs",
    "https://www.youtube.com/@yashveerlabs",
    "https://www.pinterest.com/yashveerlabs/",
  ],
} as const;

export const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/yashveerlabs/",
    icon: "/icons/social/instagram.webp",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yashveer-singh-rajpoot/",
    icon: "/icons/social/linkedin.webp",
  },
  {
    label: "GitHub",
    href: "https://github.com/yashveerlabs",
    icon: "/icons/social/github.webp",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@yashveerlabs",
    icon: "/icons/social/youtube.webp",
  },
  {
    label: "Pinterest",
    href: "https://www.pinterest.com/yashveerlabs/",
    icon: "/icons/social/pinterest.webp",
  },
  {
    label: "X",
    href: "https://x.com/yashveerlabs",
    icon: "/icons/social/x.webp",
  },
] as const;
