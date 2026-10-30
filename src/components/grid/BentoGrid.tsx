"use client";

import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/cn";
import { moveTo, viewSequence } from "@/lib/grid";
import type { GridItem, TileSpan } from "@/types/grid";

import { useDragReorder } from "./useDragReorder";
import { useGridFilter } from "./GridFilter";
import { useGridLayout } from "./useGridLayout";

export interface BentoGridProps {
  /** Tiles fixed at the start of the grid. */
  pinned: readonly GridItem[];
  /** Draggable tiles, in their starting order. */
  items: readonly GridItem[];
  /** The rendered tile for every id in `pinned` and `items`. */
  tiles: Readonly<Record<string, ReactNode>>;
}

/**
 * The rearrangeable tile grid. The server renders it as a plain CSS grid (same packing,
 * no JavaScript needed to see it); after hydration it switches to absolutely positioned
 * slots so filtering and dragging can animate tiles between places.
 *
 * The DOM order never changes: only positions do.
 */
/**
 * Column spans for the CSS fallback before the grid measures itself. Wide tiles are
 * capped at the number of columns the grid has.
 */
const spanClasses: Record<TileSpan, string> = {
  1: "",
  2: "col-span-2",
  3: "col-span-2 @min-[560px]/grid:col-span-3",
  4: "col-span-2 @min-[560px]/grid:col-span-3 @min-[900px]/grid:col-span-4",
};

export function BentoGrid({ pinned, items, tiles }: BentoGridProps) {
  const { filter } = useGridFilter();
  const [order, setOrder] = useState<readonly string[]>(() => items.map((item) => item.id));

  const gridRef = useRef<HTMLDivElement>(null);
  const slotsRef = useRef(new Map<string, HTMLElement>());
  const draggingRef = useRef<string | null>(null);

  const all = useMemo(() => [...pinned, ...items], [pinned, items]);
  const byId = useMemo(() => new Map(all.map((item) => [item.id, item])), [all]);
  const pinnedIds = useMemo(() => new Set(pinned.map((item) => item.id)), [pinned]);

  const sequence = useMemo(
    () =>
      viewSequence([...pinnedIds], order, filter, (id) => byId.get(id)?.category).flatMap((id) => {
        const item = byId.get(id);
        return item ? [{ id, span: item.span }] : [];
      }),
    [pinnedIds, order, filter, byId],
  );

  const dimmed = useMemo(
    () =>
      new Set(
        filter === "all"
          ? []
          : items.filter((item) => item.category !== filter).map((item) => item.id),
      ),
    [filter, items],
  );

  const { rectsRef, relayout } = useGridLayout({
    gridRef,
    slotsRef,
    sequence,
    dimmed,
    draggingRef,
  });

  const isLocked = useCallback((id: string) => pinnedIds.has(id), [pinnedIds]);
  const onReorder = useCallback(
    (id: string, targetId: string) => setOrder((current) => moveTo(current, id, targetId)),
    [],
  );
  const dragHandlers = useDragReorder({ rectsRef, draggingRef, isLocked, onReorder, relayout });

  return (
    <div className="@container/grid">
      <div ref={gridRef} className="bento-flow" {...dragHandlers}>
        {all.map((item) => (
          <div
            key={item.id}
            ref={(element) => {
              if (!element) return;
              slotsRef.current.set(item.id, element);
              return () => {
                slotsRef.current.delete(item.id);
              };
            }}
            data-slot={item.id}
            data-cur={item.cursor}
            data-pinned={pinnedIds.has(item.id) ? "" : undefined}
            className={cn("group/slot", spanClasses[item.span])}
          >
            {tiles[item.id]}
          </div>
        ))}
      </div>
    </div>
  );
}
