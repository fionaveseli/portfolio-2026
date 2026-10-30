import type { Role } from "@/types/experience";

/** Most recent first. The experience tile's timeline starts at `timelineStart`. */
export const timelineStart = "2020-01";

export const roles = [
  {
    id: "code-invention",
    company: "Code Invention",
    companyShort: "Code Invention",
    title: "Frontend Engineer",
    titleShort: "Frontend Engineer",
    start: "2026-07",
    period: "Jul 2026 to present",
    duration: "2026, now",
    tone: { bg: "#2233FF", fg: "#FFFFFF" },
    intro:
      "I work on the frontend of an enterprise video surveillance and video management product.",
    highlights: [
      "Building features in Angular and TypeScript inside an Nx monorepo.",
      "Creating reusable components and helping shape how the application is structured as it grows.",
    ],
    stack: "Angular, TypeScript, Nx",
  },
  {
    id: "visiar-healthcare",
    company: "Visiar Healthcare",
    companyShort: "Visiar Healthcare",
    title: "Frontend Engineer",
    titleShort: "Frontend Engineer",
    start: "2023-04",
    end: "2026-06",
    period: "Apr 2023 to Jun 2026",
    duration: "3 years",
    tone: { bg: "#6D28D9", fg: "#FFFFFF" },
    intro:
      "I worked on a production healthcare SaaS platform built around complex document and asset management workflows.",
    highlights: [
      "Built grid and table views, tagging, filtering and advanced search.",
      "Made complex workflows easier to use through better interaction design and component structure.",
      "Worked closely with the .NET backend and product teams, and took part in product and UX decisions.",
      "Worked on performance through efficient state management and a reusable component architecture.",
    ],
    stack: "React, Next.js, Zustand, TailwindCSS",
  },
  {
    id: "muler-digital",
    company: "Muler Digital",
    companyShort: "Muler Digital",
    title: "Frontend Developer",
    titleShort: "Frontend Developer",
    start: "2022-09",
    end: "2023-03",
    period: "Sep 2022 to Mar 2023",
    duration: "7 months",
    tone: { bg: "#F472A0", fg: "#FFFFFF" },
    intro:
      "I built web applications as part of a distributed team spread across several time zones.",
    highlights: [
      "Built responsive web applications with React and Next.js.",
      "Focused on performance, clean UI implementation and maintainable code.",
    ],
    stack: "React, Next.js",
  },
  {
    id: "equ-art",
    company: "Equ-art, Innovation Centre Kosovo",
    companyShort: "Equ-art, ICK",
    title: "Frontend Developer",
    titleShort: "Frontend Developer",
    start: "2020-04",
    end: "2021-12",
    period: "Apr 2020 to Dec 2021",
    duration: "1.5 years",
    tone: { bg: "#0E9F8E", fg: "#FFFFFF" },
    intro:
      "I built web platforms for clients, working with them directly from start to finish.",
    highlights: [
      "Built sites with React, Next.js, Shopify and WordPress.",
      "Developed custom themes and worked on SEO and conversion improvements.",
    ],
    stack: "React, Next.js, Shopify, WordPress",
  },
  {
    id: "freelance",
    company: "Freelance",
    companyShort: "Freelance",
    title: "Designer and developer",
    titleShort: "Designer, developer",
    start: "2020-01",
    period: "2020 to present",
    duration: "Ongoing",
    tone: { bg: "#1D1D1F", fg: "#FFFFFF" },
    barColor: "var(--color-fg)",
    intro: "I design and build websites and digital products for clients.",
    highlights: [
      "Use Framer for rapid prototyping and visual storytelling, alongside modern frontend tools.",
      "Handle client communication, requirements and delivery myself, from start to finish.",
    ],
    stack: "Design, frontend, Framer",
  },
] as const satisfies readonly Role[];
