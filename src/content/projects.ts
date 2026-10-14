import type { Project } from "@/types/project";

/**
 * Every project, in numbering order: the first is "01". Adding one here adds its tile
 * to the grid (at the end, unless src/content/grid.ts places it) and its page.
 *
 * Case-study details (summary, role, stack, links) arrive with the sheets in step 5.
 */
export const projects = [
  {
    slug: "ku",
    title: "KU?",
    kind: "Own product",
    tone: { bg: "#FF5FA2", fg: "#111114" },
    wordmark: {
      text: "KU?",
      family: "grotesque",
      weight: 800,
      size: 23,
      leading: 0.85,
      tracking: -0.06,
    },
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
  },
  {
    slug: "spot",
    title: "Spot",
    kind: "Own product",
    tone: { bg: "#2233FF", fg: "#FFFFFF" },
    wordmark: {
      text: "spot",
      family: "grotesque",
      weight: 800,
      size: 42,
      leading: 0.85,
      tracking: -0.06,
    },
  },
  {
    slug: "medical-practice",
    title: "Medical Practice",
    kind: "Client website",
    tone: { bg: "#0E3B43", fg: "#A9E5D2" },
    wordmark: {
      text: "Medical Practice",
      family: "serif",
      weight: 400,
      size: 21,
      leading: 0.95,
    },
  },
  {
    slug: "lexxical",
    title: "Lexxical",
    kind: "Client rebrand",
    tone: { bg: "#173B2C", fg: "#B9DDB6" },
    wordmark: {
      text: "Lexxical",
      family: "serif",
      weight: 400,
      size: 24,
      leading: 0.9,
      italic: true,
    },
  },
  {
    slug: "flight-search-chatbot",
    title: "Flight Search Chatbot",
    kind: "Mobile app",
    tone: { bg: "#7DD3FC", fg: "#0F172A" },
    wordmark: {
      text: "Flight Search Chatbot",
      family: "sans",
      weight: 600,
      size: 19,
      leading: 0.98,
      tracking: -0.035,
    },
  },
  {
    slug: "visiar-assist",
    title: "Visiar Assist",
    kind: "Healthcare SaaS",
    tone: { bg: "#1463FF", fg: "#FFFFFF" },
    wordmark: {
      text: "Visiar Assist",
      family: "sans",
      weight: 600,
      size: 21,
      leading: 0.95,
      tracking: -0.04,
    },
  },
] as const satisfies readonly Project[];

/** "01", "02" … from a project's position in the list. */
export function projectNumber(slug: string): string {
  const index = projects.findIndex((project) => project.slug === slug);
  return String(index + 1).padStart(2, "0");
}
