import type { SiteConfig } from "@/types/site";

export const site = {
  name: "Fiona Veseli",
  firstName: "Fiona",
  title: "Fiona Veseli, portfolio",
  tagline: "Frontend engineer, product-minded.",
  description:
    "Fiona Veseli builds thoughtful interfaces professionally and turns her own ideas into real products after hours.",
  email: "fionaveseli2@gmail.com",
  credit: "Designed and built by Fiona Veseli, 2026.",
  links: {
    linkedin: "https://www.linkedin.com/in/fiona-veseli/",
  },
} as const satisfies SiteConfig;
