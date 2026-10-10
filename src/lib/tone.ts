import type { CSSProperties } from "react";

import type { Tone } from "@/types/ui";

/**
 * Exposes a tone as `--accent` / `--on-accent` so children can use
 * `bg-(--accent)` and `text-(--on-accent)`.
 */
export function toneVars(tone: Tone): CSSProperties {
  return { "--accent": tone.bg, "--on-accent": tone.fg } as CSSProperties;
}
