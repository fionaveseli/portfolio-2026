import { readToken } from "@/lib/tokens";

export interface MorphFrames {
  /** The panel squeezed onto the origin's box. */
  readonly collapsed: Keyframe;
  /** The panel at rest. */
  readonly expanded: Keyframe;
}

/**
 * Keyframes that make `panel` look as if it starts from `origin`'s box: used to grow a
 * sheet out of the tile that opened it, and shrink it back on close.
 * Returns null when there is nothing sensible to morph from.
 */
export function morphFrames(panel: Element, origin: Element | null): MorphFrames | null {
  if (!origin) return null;

  const from = origin.getBoundingClientRect();
  const to = panel.getBoundingClientRect();
  if (!from.width || !to.width) return null;

  const dx = from.left + from.width / 2 - (to.left + to.width / 2);
  const dy = from.top + from.height / 2 - (to.top + to.height / 2);
  const sx = from.width / to.width;
  const sy = from.height / to.height;

  return {
    collapsed: {
      transform: `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px) scale(${sx.toFixed(3)}, ${sy.toFixed(3)})`,
      opacity: 0.4,
      borderRadius: readToken("--radius-sheet-morph"),
    },
    expanded: {
      transform: "translate(0px, 0px) scale(1, 1)",
      opacity: 1,
      borderRadius: readToken("--radius-sheet"),
    },
  };
}
