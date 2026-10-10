/**
 * Bento grid geometry: pure functions, no DOM. Port of the prototype's layout engine.
 *
 * Packing is first-fit: each tile, in order, takes the earliest row (then leftmost
 * column) where its span fits. CSS grid's `grid-auto-flow: row dense` does the same,
 * which is why the server-rendered first paint and the JS engine agree.
 */

import type { GridFilter, TileCategory, TileSpan } from "@/types/grid";

export interface GridConfig {
  /** Container width at which the grid gets 3 columns. */
  readonly threeColumnsFrom: number;
  /** Container width at which the grid gets 4 columns. */
  readonly fourColumnsFrom: number;
  /** Gap with 2 columns. */
  readonly gap: number;
  /** Gap with 3 or 4 columns. */
  readonly gapWide: number;
  /** Minimum row height with 3 or 4 columns. */
  readonly rowMin: number;
  /** Minimum row height with 2 columns. */
  readonly rowMinNarrow: number;
}

export interface GridMetrics {
  readonly columns: number;
  readonly gap: number;
  readonly cell: number;
  readonly rowHeight: number;
}

export interface Rect {
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
}

export interface PackItem {
  readonly id: string;
  readonly span: TileSpan;
}

export interface Packing {
  readonly rects: ReadonlyMap<string, Rect>;
  readonly height: number;
}

export function measureGrid(width: number, config: GridConfig): GridMetrics {
  const columns = width >= config.fourColumnsFrom ? 4 : width >= config.threeColumnsFrom ? 3 : 2;
  const gap = width >= config.threeColumnsFrom ? config.gapWide : config.gap;
  const cell = (width - gap * (columns - 1)) / columns;
  const rowHeight = Math.max(cell, columns === 2 ? config.rowMinNarrow : config.rowMin);
  return { columns, gap, cell, rowHeight };
}

export function packGrid(items: readonly PackItem[], metrics: GridMetrics): Packing {
  const { columns, gap, cell, rowHeight } = metrics;
  const taken: boolean[][] = [];
  const rects = new Map<string, Rect>();
  let rowCount = 0;

  const fits = (row: number, column: number, width: number): boolean => {
    for (let x = column; x < column + width; x++) if (taken[row]?.[x]) return false;
    return true;
  };

  const findSlot = (width: number): { row: number; column: number } => {
    for (let row = 0; ; row++) {
      for (let column = 0; column <= columns - width; column++) {
        if (fits(row, column, width)) return { row, column };
      }
    }
  };

  for (const item of items) {
    const width = Math.min(item.span, columns);
    const { row, column } = findSlot(width);
    const cells = (taken[row] ??= []);
    for (let x = column; x < column + width; x++) cells[x] = true;
    rowCount = Math.max(rowCount, row + 1);

    rects.set(item.id, {
      x: column * (cell + gap),
      y: row * (rowHeight + gap),
      w: width * cell + (width - 1) * gap,
      h: rowHeight,
    });
  }

  return { rects, height: rowCount ? rowCount * (rowHeight + gap) - gap : 0 };
}

/**
 * The order tiles are packed in: pinned tiles first; with a filter on, matching tiles
 * move to the front (keeping their relative order) and the rest follow.
 */
export function viewSequence(
  pinned: readonly string[],
  order: readonly string[],
  filter: GridFilter,
  categoryOf: (id: string) => TileCategory | undefined,
): string[] {
  if (filter === "all") return [...pinned, ...order];
  const matching = order.filter((id) => categoryOf(id) === filter);
  const rest = order.filter((id) => categoryOf(id) !== filter);
  return [...pinned, ...matching, ...rest];
}

/** Moves `id` to the position `targetId` currently holds. */
export function moveTo(order: readonly string[], id: string, targetId: string): string[] {
  const from = order.indexOf(id);
  const to = order.indexOf(targetId);
  if (from < 0 || to < 0 || from === to) return [...order];
  const next = [...order];
  next.splice(from, 1);
  next.splice(to, 0, id);
  return next;
}

/** The first tile whose box strictly contains the point, ignoring tiles `skip` rejects. */
export function hitTest(
  rects: ReadonlyMap<string, Rect>,
  x: number,
  y: number,
  skip: (id: string) => boolean,
): string | null {
  for (const [id, r] of rects) {
    if (skip(id)) continue;
    if (x > r.x && x < r.x + r.w && y > r.y && y < r.y + r.h) return id;
  }
  return null;
}
