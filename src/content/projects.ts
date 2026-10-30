import type { Project } from "@/types/project";

/**
 * Every project, in numbering order: the first is "01". Adding one here adds its tile
 * to the grid (at the end, unless src/content/grid.ts places it) and its page.
 *
 * Each project's details fill the sheet that opens from its tile.
 */
export const projects = [
  {
    slug: "nomi",
    title: "Nomi",
    kind: "Own product",
    tone: { bg: "#FF5FA2", fg: "#111114" },
    wordmark: {
      text: "nomi",
      family: "grotesque",
      weight: 800,
      size: 34,
      leading: 0.85,
      tracking: -0.06,
    },
    summary:
      "Different cravings, same table. A food app for finding somewhere to eat when everyone wants something different. Launching in Amsterdam, as a website first.",
    highlights: [
      "My own product: the idea, the brand, the design and the code.",
      "Website first, with a landing page that explains Nomi and leads into the app. A store app comes next.",
      "Two ways to browse places, swiping or an Explore-style grid, because swiping alone felt too limiting.",
    ],
    role: "Founder, design and build",
    year: "2026",
    stack: "Next.js, TypeScript, TailwindCSS",
    status: "Coming soon",
  },
  {
    slug: "dayli",
    title: "Dayli",
    kind: "Mobile app",
    tone: { bg: "#FFD6E0", fg: "#2B1B3D" },
    wordmark: {
      text: "Dayli",
      family: "sans",
      weight: 600,
      size: 30,
      leading: 0.9,
      tracking: -0.05,
    },
    summary:
      "A visual life planner: a calendar for fixed commitments, a checklist for flexible tasks, and Life Chapters for the bigger goals.",
    highlights: [
      "Started from juggling a full-time job with university.",
      "Made for the big goals and the small daily reminders, like a school pickup or leaving work early.",
      "A native app for iPhone and Android, with a website that explains it.",
      "Building it end to end: frontend, backend, mobile and an AI-guided onboarding.",
    ],
    role: "Own product, design and build",
    year: "2026",
    stack: "Expo, React Native, Supabase",
    status: "In progress",
    link: { label: "View on GitHub", href: "https://github.com/fionaveseli/dayli" },
  },
  {
    slug: "blue-bamboo",
    title: "Blue Bamboo",
    kind: "Client rebrand",
    tone: { bg: "#173B2C", fg: "#B9DDB6" },
    wordmark: {
      text: "Blue Bamboo",
      family: "serif",
      weight: 400,
      size: 24,
      leading: 0.9,
      italic: true,
    },
    summary:
      "A full rebrand of a calm, interactive learning platform. No gamification, no rewards, just a quiet place to learn.",
    highlights: [
      "Working directly with the founder on design, features and priorities.",
      "A warm watercolour direction across the landing page, the dashboard and the learning canvas: human, but never childish.",
      "Planning a UI refactor of the learning canvas, starting with an inventory of everything it does so nothing breaks.",
    ],
    role: "Design and frontend",
    year: "2026",
    stack: "React",
    status: "In progress",
  },
  {
    slug: "sasa",
    title: "Sasa",
    kind: "Full-stack app",
    tone: { bg: "#6D28D9", fg: "#FFFFFF" },
    wordmark: {
      text: "Sasa",
      family: "mono",
      weight: 500,
      size: 34,
      leading: 0.9,
      tracking: -0.06,
    },
    summary: "A platform for running board game tournaments, built as a university project.",
    highlights: [
      "Built the app and its logic from a design I was given.",
      "Full stack: a Next.js frontend with a Node.js backend.",
    ],
    role: "Development",
    stack: "Next.js, TypeScript, Zustand, TailwindCSS, Node.js",
    link: { label: "View on GitHub", href: "https://github.com/fionaveseli/sasa" },
  },
] as const satisfies readonly Project[];

/** "01", "02" … from a project's position in the list. */
export function projectNumber(slug: string): string {
  const index = projects.findIndex((project) => project.slug === slug);
  return String(index + 1).padStart(2, "0");
}
