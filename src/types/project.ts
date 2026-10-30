import type { StaticImageData } from "next/image";

import type { Tone } from "@/types/ui";

/** Font family a project's name is set in on its tile. */
export type WordmarkFamily = "sans" | "mono" | "grotesque" | "serif";

/**
 * How a project's name looks on its tile: each one is set like its own logo.
 * `size` is a percentage of the tile's shorter side.
 */
export interface Wordmark {
  readonly text: string;
  readonly family: WordmarkFamily;
  readonly weight: 400 | 500 | 600 | 800;
  readonly size: number;
  readonly leading: number;
  /** Letter spacing in em. */
  readonly tracking?: number;
  readonly italic?: boolean;
}

/** An outside link shown at the bottom of a project sheet. */
export interface ProjectLink {
  /** Pill text, e.g. "View on GitHub". */
  readonly label: string;
  readonly href: `https://${string}`;
}

/** A screenshot shown in the project sheet. Phone shots are recognised by being taller than wide. */
export interface ProjectScreenshot {
  readonly src: StaticImageData;
  /** What the screenshot shows, for screen readers. */
  readonly alt: string;
}

export interface Project {
  /** URL slug and grid tile id: /work/<slug>. */
  readonly slug: string;
  readonly title: string;
  /** Short kind shown on the tile, e.g. "Own product". */
  readonly kind: string;
  readonly tone: Tone;
  readonly wordmark: Wordmark;
  /** First paragraph of the project sheet: what it is, in a sentence or two. */
  readonly summary: string;
  /** What I did and what's worth knowing, one point per line. */
  readonly highlights: readonly string[];
  /** My part in it, e.g. "Design and build". */
  readonly role: string;
  /** e.g. "2026" or "2023 to 2026"; left out when unsure. */
  readonly year?: string;
  readonly stack?: string;
  /** e.g. "Coming soon" or "In progress"; left out once it's live. */
  readonly status?: string;
  readonly link?: ProjectLink;
  /** Shown in a row under the summary, in this order. */
  readonly screenshots?: readonly ProjectScreenshot[];
}
