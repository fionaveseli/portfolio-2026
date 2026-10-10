import { useCallback, useEffect, useLayoutEffect, useRef, type RefObject } from "react";

import { measureGrid, packGrid, type GridConfig, type PackItem, type Rect } from "@/lib/grid";
import { readToken } from "@/lib/tokens";

/** Delay before moves start animating, so the first layout doesn't fly in. */
const READY_DELAY_MS = 60;

function readPx(name: `--${string}`): number {
  return Number.parseFloat(readToken(name)) || 0;
}

function readGridConfig(): GridConfig {
  return {
    threeColumnsFrom: readPx("--container-grid-3"),
    fourColumnsFrom: readPx("--container-grid-4"),
    gap: readPx("--spacing-grid-gap"),
    gapWide: readPx("--spacing-grid-gap-wide"),
    rowMin: readPx("--grid-row-min"),
    rowMinNarrow: readPx("--grid-row-min-narrow"),
  };
}

export interface GridLayoutOptions {
  gridRef: RefObject<HTMLDivElement | null>;
  /** Slot elements by tile id. */
  slotsRef: RefObject<Map<string, HTMLElement>>;
  /** Tiles in packing order. */
  sequence: readonly PackItem[];
  /** Tiles a filter has faded out. */
  dimmed: ReadonlySet<string>;
  /** The tile being dragged, which follows the pointer instead of its slot. */
  draggingRef: RefObject<string | null>;
}

export interface GridLayout {
  /** Where each tile currently sits, relative to the grid. */
  rectsRef: RefObject<ReadonlyMap<string, Rect>>;
  relayout: () => void;
}

/**
 * Takes over from the server-rendered CSS grid after hydration: packs the tiles,
 * positions every slot absolutely, and repacks on resize, reorder and filter changes.
 * Writes styles straight to the DOM so dragging never re-renders the tiles.
 */
export function useGridLayout({
  gridRef,
  slotsRef,
  sequence,
  dimmed,
  draggingRef,
}: GridLayoutOptions): GridLayout {
  const rectsRef = useRef<ReadonlyMap<string, Rect>>(new Map());
  const configRef = useRef<GridConfig | null>(null);

  const relayout = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const width = grid.clientWidth;
    if (!width) return;

    configRef.current ??= readGridConfig();
    const { rects, height } = packGrid(sequence, measureGrid(width, configRef.current));
    rectsRef.current = rects;

    for (const [id, rect] of rects) {
      const slot = slotsRef.current.get(id);
      if (!slot) continue;
      slot.style.width = `${rect.w}px`;
      slot.style.height = `${rect.h}px`;
      if (id !== draggingRef.current) {
        slot.style.transform = `translate(${rect.x.toFixed(1)}px, ${rect.y.toFixed(1)}px)`;
      }
      slot.toggleAttribute("data-dimmed", dimmed.has(id));
    }

    grid.style.height = `${height}px`;
    grid.dataset.engine = "js";
  }, [gridRef, slotsRef, sequence, dimmed, draggingRef]);

  // Before paint, so the switch from CSS grid to absolute positions is invisible.
  useLayoutEffect(() => {
    relayout();
  }, [relayout]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const observer = new ResizeObserver(() => relayout());
    observer.observe(grid);
    return () => observer.disconnect();
  }, [gridRef, relayout]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      gridRef.current?.setAttribute("data-ready", "");
    }, READY_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [gridRef]);

  return { rectsRef, relayout };
}
