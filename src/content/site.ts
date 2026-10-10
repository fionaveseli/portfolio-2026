import type { SiteConfig } from "@/types/site";

export const site = {
  name: "Fiona Veseli",
  firstName: "Fiona",
  title: "Fiona Veseli, portfolio",
  tagline: "A frontend engineer with an eye for design.",
  description: "Fiona Veseli is a frontend engineer with an eye for design.",
  email: "fionaveseli2@gmail.com",
  credit: "Designed and built by Fiona Veseli, 2026.",
  links: {
    linkedin: "https://www.linkedin.com/in/fiona-veseli/",
  },
} as const satisfies SiteConfig;
