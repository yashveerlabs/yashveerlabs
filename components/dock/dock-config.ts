/**
 * Single source of truth for every item in the dock.
 *
 * Item kinds:
 *   - "link":   internal route (Next.js Link)
 *   - "folder": expands a glass panel with child items (Framer Motion layoutId)
 *
 * Folders can contain "link", "external", or nested "folder" items.
 * The Why Not folder is nested (folder of folders).
 */

export type DockExternal = {
  kind: "external";
  id: string;
  label: string;
  icon: string;
  href: string;
};

export type DockLink = {
  kind: "link";
  id: string;
  label: string;
  icon: string;
  href: string;
  /** "nyxera" makes the active state cyan instead of gold */
  accent?: "gold" | "nyxera";
};

export type DockFolder = {
  kind: "folder";
  id: string;
  label: string;
  icon: string;
  /** Optional expanded variant icon */
  iconExpanded?: string;
  children: DockItem[];
};

export type DockItem = DockLink | DockExternal | DockFolder;

/** Sub-folders nested inside the Why Not folder. */
const SYSTEMS_FOLDER: DockFolder = {
  kind: "folder",
  id: "systems",
  label: "Systems",
  icon: "/icons/folders/systems.webp",
  children: [
    { kind: "link", id: "stack", label: "Stack", icon: "/icons/sub/stack.webp", href: "/systems/stack" },
    { kind: "link", id: "tools", label: "Tools", icon: "/icons/sub/tools.webp", href: "/systems/tools" },
    { kind: "link", id: "technologies", label: "Technologies", icon: "/icons/sub/technologies.webp", href: "/systems/technologies" },
    { kind: "link", id: "systems-architecture", label: "Systems", icon: "/icons/sub/systems.webp", href: "/systems/systems" },
    { kind: "link", id: "engineering-capabilities", label: "Engineering", icon: "/icons/sub/engineering-capabilities.webp", href: "/systems/engineering-capabilities" },
  ],
};

const JOURNEY_FOLDER: DockFolder = {
  kind: "folder",
  id: "journey",
  label: "Journey",
  icon: "/icons/folders/journey.webp",
  children: [
    { kind: "link", id: "journey-root", label: "Journey", icon: "/icons/sub/journey.webp", href: "/journey" },
    { kind: "link", id: "achievements", label: "Achievements", icon: "/icons/sub/achievements.webp", href: "/journey/achievements" },
    { kind: "link", id: "milestones", label: "Milestones", icon: "/icons/sub/milestones.webp", href: "/journey/milestones" },
    { kind: "link", id: "work-history", label: "Work History", icon: "/icons/sub/work-history.webp", href: "/journey/work-history" },
    { kind: "link", id: "evolution", label: "Evolution", icon: "/icons/sub/evolution.webp", href: "/journey/evolution" },
  ],
};

const LABS_FOLDER: DockFolder = {
  kind: "folder",
  id: "labs",
  label: "Labs",
  icon: "/icons/folders/labs.webp",
  children: [
    { kind: "link", id: "ai-experiments", label: "AI Experiments", icon: "/icons/sub/ai-experiments.webp", href: "/labs/ai-experiments" },
    { kind: "link", id: "robotics", label: "Robotics", icon: "/icons/sub/robotics.webp", href: "/labs/robotics" },
    { kind: "link", id: "vision-systems", label: "Vision Systems", icon: "/icons/sub/vision-systems.webp", href: "/labs/vision-systems" },
    { kind: "link", id: "prototypes", label: "Prototypes", icon: "/icons/sub/prototypes.webp", href: "/labs/prototypes" },
    { kind: "link", id: "interfaces", label: "Interfaces", icon: "/icons/sub/interfaces.webp", href: "/labs/interfaces" },
    { kind: "link", id: "concepts", label: "Concepts", icon: "/icons/sub/concepts.webp", href: "/labs/concepts" },
  ],
};

const SOCIAL_FOLDER: DockFolder = {
  kind: "folder",
  id: "social",
  label: "Social",
  icon: "/icons/folders/social.webp",
  iconExpanded: "/icons/folders/social-expanded.webp",
  children: [
    { kind: "external", id: "instagram", label: "Instagram", icon: "/icons/social/instagram.webp", href: "https://www.instagram.com/yashveerlabs/" },
    { kind: "external", id: "linkedin", label: "LinkedIn", icon: "/icons/social/linkedin.webp", href: "https://www.linkedin.com/in/yashveer-singh-rajpoot/" },
    { kind: "external", id: "github", label: "GitHub", icon: "/icons/social/github.webp", href: "https://github.com/yashveerlabs" },
    { kind: "external", id: "youtube", label: "YouTube", icon: "/icons/social/youtube.webp", href: "https://www.youtube.com/@yashveerlabs" },
    { kind: "external", id: "pinterest", label: "Pinterest", icon: "/icons/social/pinterest.webp", href: "https://www.pinterest.com/yashveerlabs/" },
    { kind: "external", id: "x", label: "X", icon: "/icons/social/x.webp", href: "https://x.com/yashveerlabs" },
  ],
};

const WHY_NOT_FOLDER: DockFolder = {
  kind: "folder",
  id: "why-not",
  label: "Why Not",
  // Reuse the labs alt as the umbrella icon for now; can swap to a dedicated one later.
  icon: "/icons/folders/labs-alt.webp",
  children: [SYSTEMS_FOLDER, JOURNEY_FOLDER, LABS_FOLDER],
};

/** Final left-to-right dock order. */
export const DOCK_ITEMS: DockItem[] = [
  { kind: "link", id: "home", label: "Home", icon: "/icons/dock/home.webp", href: "/" },
  { kind: "link", id: "projects", label: "Projects", icon: "/icons/dock/projects.webp", href: "/projects" },
  { kind: "link", id: "about", label: "About", icon: "/icons/dock/about.webp", href: "/about" },
  { kind: "link", id: "resume", label: "Resume", icon: "/icons/dock/resume.webp", href: "/resume" },
  { kind: "link", id: "blog", label: "Blog", icon: "/icons/dock/blog.webp", href: "/blog" },
  { kind: "link", id: "contact", label: "Contact", icon: "/icons/dock/contact.webp", href: "/contact" },
  { kind: "link", id: "nyxera", label: "Nyxera AI", icon: "/icons/dock/nyxera.webp", href: "/nyxera", accent: "nyxera" },
  SOCIAL_FOLDER,
  WHY_NOT_FOLDER,
];
