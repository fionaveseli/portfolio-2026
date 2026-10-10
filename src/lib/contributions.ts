/** The contribution graph: 13 weeks × 7 days, starting with "HI" drawn in. */

export const GRAPH_COLUMNS = 13;
export const GRAPH_ROWS = 7;
export const MAX_LEVEL = 4;

/** Squares that start at level 3, spelling HI. */
const HI = new Set([
  16, 18, 20, 22, 29, 31, 33, 35, 42, 43, 44, 46, 48, 55, 57, 59, 68, 70, 72, 74,
]);

export function initialLevels(): number[] {
  return Array.from({ length: GRAPH_COLUMNS * GRAPH_ROWS }, (_, i) => (HI.has(i) ? 3 : 0));
}

/** One more commit on a square, up to the darkest level. */
export function commit(levels: readonly number[], index: number): number[] {
  return levels.map((level, i) => (i === index ? Math.min(MAX_LEVEL, level + 1) : level));
}
