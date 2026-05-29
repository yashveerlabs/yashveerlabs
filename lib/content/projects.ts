/**
 * Authoritative project list. Single source of truth for the Projects page
 * and any preview strips elsewhere.
 */

export type ProjectStatus = "live" | "private-testing" | "shipped";

export type Project = {
  id: string;
  name: string;
  tagline: string;
  status: ProjectStatus;
  href?: string;
  external?: boolean;
  category: string;
  year: string;
  stack: string[];
  summary: string;
  body: string[];
  highlights: string[];
};

export const PROJECTS: Project[] = [
  {
    id: "dwarka-bricks",
    name: "Dwarka Bricks",
    tagline: "A hyper-local real estate platform for one district of Delhi.",
    status: "live",
    href: "https://www.dwarkabricks.com/",
    external: true,
    category: "Real estate platform",
    year: "2025",
    stack: ["Next.js", "TypeScript", "Tailwind", "Firebase", "Vercel"],
    summary:
      "Buy, rent, and sell across the 22 sectors of Dwarka. Sector filters, budget ranges, verified listings, direct agent contact, no middlemen.",
    body: [
      "Most property portals in India try to serve every city at once. Dwarka Bricks does the opposite. It commits to one district, learns it deeply, and verifies the listings on the ground. The site is the surface; the value is the local network behind it.",
      "Search is structured around the things buyers in Dwarka actually filter by: sector number, property type, budget band. Each listing pulls through verification status and connects directly to the agent on WhatsApp, removing the layer of brokers that usually sits between the buyer and the owner.",
      "On the engineering side, the site uses a clean Next.js + Firebase stack with sector-aware routing and an admin layer for adding, verifying, and retiring listings. The visual identity stays neutral so the property photography does the talking.",
    ],
    highlights: [
      "22 sectors, structured filters",
      "Verified listings only",
      "Direct agent contact, no middle layer",
      "Sector-aware routing and SEO",
    ],
  },
  {
    id: "expert-tutorials",
    name: "Expert Tutorials",
    tagline: "A CBSE coaching institute's full digital presence.",
    status: "live",
    href: "https://experttutorials.in/",
    external: true,
    category: "Education website",
    year: "2024",
    stack: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
    summary:
      "Site, content, and structure for a Dwarka coaching center covering classes 6 to 12. Courses, methodology, faculty intro, transparent reach to parents.",
    body: [
      "Expert Tutorials needed more than a brochure site. The institute runs structured testing, doubt sessions, and four programs across foundation, board prep, and commerce. The site had to communicate that structure clearly without burying parents in marketing copy.",
      "I built it around four pillars: clarity on what is taught, transparency on how it is taught, accessibility for parents who want details before committing, and proof through the director's introduction and the methodology block. Course cards are scannable in seconds; the FAQ section answers the questions parents actually ask, in the order they ask them.",
      "Beyond the site, I joined Expert Tutorials as a weekend instructor for AI, Informatics Practices, Computer Science, and programming languages. Building the platform and teaching on it gave me an unusual feedback loop on what works.",
    ],
    highlights: [
      "Classes 6 to 12, four structured programs",
      "Director introduction, methodology block, FAQ-first design",
      "Local SEO targeting Dwarka sectors and nearby pincodes",
      "I teach on weekends, so I rebuild what does not work",
    ],
  },
  {
    id: "prominence-football",
    name: "Prominence Football Academy",
    tagline: "A football academy's online presence.",
    status: "live",
    href: "https://prominencefootballacademy.com/",
    external: true,
    category: "Sports academy website",
    year: "2025",
    stack: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
    summary:
      "Programs, coaching philosophy, schedule, and registration for a youth football academy.",
    body: [
      "A youth football academy lives or dies on trust. Parents are sending their children into a structured environment, and they want to see the program, the coaching philosophy, and the schedule before they sign up. The site sets that tone in the first scroll.",
      "Structurally it follows the same instinct as the rest of my client work: clear hierarchy, real photography, no jargon. Program tiers, age groups, training schedule, and a registration flow that does not waste anyone's time.",
      "The site is live. Coaching staff bios, age-group programs, and the seasonal calendar are wired in. The registration flow lands directly with the academy's operators, so a parent's first message is the same message the head coach reads.",
    ],
    highlights: [
      "Program tiers and schedule front and center",
      "Trust-first hierarchy designed for parents",
      "Registration flow shipped, no friction",
      "Age-group programs, coaching staff, and seasonal calendar live",
    ],
  },
  {
    id: "velmora",
    name: "Velmora",
    tagline: "My Roblox game.",
    status: "live",
    href: "https://www.roblox.com/users/profile?username=yashveersinghrajpoot",
    external: true,
    category: "Game",
    year: "2025",
    stack: ["Roblox Studio", "Lua"],
    summary:
      "Velmora is a Roblox project under the username @yashveersinghrajpoot. A different surface to build for, with its own constraints and audience.",
    body: [
      "Web is not the only place I ship. Velmora is my Roblox project, built on a platform with a completely different set of constraints: a sandboxed scripting environment, an established player base with strong expectations, and a publishing pipeline that has nothing to do with Vercel.",
      "Working in Roblox forces a different kind of thinking. Physics, collision logic, and player state matter in a way they do not on a static product page. Lua replaces TypeScript. The tooling is unfamiliar. That is exactly the point. Building in an environment I did not grow up in keeps my instincts honest.",
      "Velmora lives under the @yashveersinghrajpoot Roblox profile. The work is iterative: ship a loop, watch players push on it, fix the thing that breaks first. The result is a small piece of evidence that the lab is not limited to the web stack.",
    ],
    highlights: [
      "Built and published on Roblox",
      "Username: @yashveersinghrajpoot",
      "Lua scripting, in-engine physics, player state",
      "Iterative release loop driven by real player behavior",
    ],
  },
  {
    id: "nexli",
    name: "Nexli",
    tagline: "A full-stack school management system. Private testing.",
    status: "private-testing",
    category: "Internal product",
    year: "2025 to present",
    stack: ["React 19", "TypeScript", "Firebase Firestore", "Firebase Auth", "Vite", "Vercel"],
    summary:
      "Seven login types. Attendance, marks, fees, report cards, question bank workflows. Not publicly launched. I am running it inside one school first to see what breaks before it goes wider.",
    body: [
      "Nexli is the largest system I have built so far. It is a full-stack platform that replaces the physical registers, broken spreadsheets, and disconnected workflows that most schools still run on. Seven login types: Superadmin, Principal, HOD, Coordinator, Teacher, Accountant, Parent. Each has its own surface, its own permissions, and its own view of the same shared data.",
      "On the academic side it handles attendance with at-risk flagging when a student dips below the threshold, marks entry per subject, paper generation off a managed question bank, and PDF report card generation per student. On the operational side it handles fee collection with an automatic ledger, parent-teacher messaging, and announcements that route to the right roles.",
      "It is not publicly launched. I am keeping it in private testing inside one school first, because shipping software for an institution is not the same as shipping a product page. There are workflows that only surface when a real principal, a real accountant, and a real parent are using the system on the same day. The product gets stronger by living inside that pressure before anyone else touches it.",
    ],
    highlights: [
      "7 roles with isolated permission surfaces",
      "Attendance with at-risk flagging under 75%",
      "Fee ledger, PDF report cards, question bank",
      "Real-time Firestore sync across stakeholders",
      "Private testing in production with a partner school",
    ],
  },
];
