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

export interface Project {
  /** URL slug and grid tile id: /work/<slug>. */
  readonly slug: string;
  readonly title: string;
  /** Short kind shown on the tile, e.g. "Own product". */
  readonly kind: string;
  readonly tone: Tone;
  readonly wordmark: Wordmark;
}
