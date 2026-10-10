import { useCallback, useRef, type PointerEvent, type RefObject } from "react";

import { magnify } from "@/lib/dock";

/** Below this tile width the dock wraps instead of magnifying. */
const MIN_TILE_WIDTH = 440;
/** Icon size and gap as fractions of the tile: min(h × a, w × b). */
const ICON = { height: 0.115, width: 0.056 } as const;
const GAP = { height: 0.015, width: 0.0075 } as const;

export interface DockMagnify {
  iconsRef: RefObject<Map<number, HTMLElement>>;
  onPointerMove: (event: PointerEvent<HTMLElement>) => void;
  onPointerLeave: () => void;
}

/**
 * Grows the dock icons near the mouse, like the macOS dock, and reports which icon is
 * closest so its tooltip shows. Sizes are written to the DOM directly, not React state.
 */
export function useDockMagnify(onNearest: (index: number) => void): DockMagnify {
  const iconsRef = useRef(new Map<number, HTMLElement>());

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      const dock = event.currentTarget;
      const tile = dock.closest<HTMLElement>("[data-slot]") ?? dock.parentElement;
      if (event.pointerType !== "mouse" || !tile || tile.clientWidth < MIN_TILE_WIDTH) return;

      const base = Math.min(tile.clientHeight * ICON.height, tile.clientWidth * ICON.width);
      const gap = Math.min(tile.clientHeight * GAP.height, tile.clientWidth * GAP.width);
      const box = dock.getBoundingClientRect();
      const { scales, nearest } = magnify(event.clientX, {
        base,
        gap,
        center: box.left + box.width / 2,
        count: iconsRef.current.size,
      });

      scales.forEach((scale, index) => {
        const icon = iconsRef.current.get(index);
        if (!icon) return;
        icon.style.width = `${(base * scale).toFixed(1)}px`;
        icon.style.height = `${(base * scale).toFixed(1)}px`;
      });
      onNearest(nearest);
    },
    [onNearest],
  );

  const onPointerLeave = useCallback(() => {
    for (const icon of iconsRef.current.values()) {
      icon.style.width = "";
      icon.style.height = "";
    }
    onNearest(-1);
  }, [onNearest]);

  return { iconsRef, onPointerMove, onPointerLeave };
}
