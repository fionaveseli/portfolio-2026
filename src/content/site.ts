import type { SiteConfig } from "@/types/site";

export const site = {
  name: "Fiona Veseli",
  url: "https://fionaveseli.com",
  firstName: "Fiona",
  title: "Fiona Veseli",
  tagline: "Frontend engineer, product-minded.",
  description:
    "Frontend engineer, product-minded. I design and build interfaces, and turn my own ideas into real products.",
  email: "fionaveseli2@gmail.com",
  credit: "Designed and built by Fiona Veseli, 2026.",
  links: {
    linkedin: "https://www.linkedin.com/in/fiona-veseli/",
  },
} as const satisfies SiteConfig;
