import { useCallback, useMemo, useRef, type PointerEvent, type RefObject } from "react";

import { hitTest, type Rect } from "@/lib/grid";

/** Pointer travel (|dx| + |dy|) before a press becomes a drag. */
const DRAG_THRESHOLD_PX = 8;
/** Minimum time between two reorders while dragging, so tiles don't flicker. */
const REORDER_INTERVAL_MS = 260;

interface DragSession {
  readonly id: string;
  readonly slot: HTMLElement;
  /** Pointer offset inside the tile when the press started. */
  readonly offsetX: number;
  readonly offsetY: number;
  readonly startX: number;
  readonly startY: number;
  moved: boolean;
}

export interface DragReorderOptions {
  rectsRef: RefObject<ReadonlyMap<string, Rect>>;
  draggingRef: RefObject<string | null>;
  /** Pinned tiles can't be picked up or displaced. */
  isLocked: (id: string) => boolean;
  /** Called while dragging when the pointer is over another tile. */
  onReorder: (id: string, targetId: string) => void;
  relayout: () => void;
}

export interface DragReorderHandlers {
  onPointerDown: (event: PointerEvent<HTMLDivElement>) => void;
  onPointerMove: (event: PointerEvent<HTMLDivElement>) => void;
  onPointerUp: (event: PointerEvent<HTMLDivElement>) => void;
  onPointerCancel: (event: PointerEvent<HTMLDivElement>) => void;
}

/**
 * Mouse drag-to-reorder for the grid, as in the prototype: pick up any unpinned tile
 * (but not its buttons, marked `data-nodrag`), it tilts and follows the pointer, and
 * hovering another tile moves it into that spot. Touch dragging is not built yet.
 */
export function useDragReorder({
  rectsRef,
  draggingRef,
  isLocked,
  onReorder,
  relayout,
}: DragReorderOptions): DragReorderHandlers {
  const sessionRef = useRef<DragSession | null>(null);
  const lastReorderRef = useRef(0);

  const onPointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      if (!(event.target instanceof Element) || event.target.closest("[data-nodrag]")) return;
      const slot = event.target.closest<HTMLElement>("[data-slot]");
      const id = slot?.dataset.slot;
      if (!slot || !id || isLocked(id)) return;
      const rect = rectsRef.current.get(id);
      if (!rect) return;

      const grid = event.currentTarget.getBoundingClientRect();
      sessionRef.current = {
        id,
        slot,
        offsetX: event.clientX - grid.left - rect.x,
        offsetY: event.clientY - grid.top - rect.y,
        startX: event.clientX,
        startY: event.clientY,
        moved: false,
      };
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [isLocked, rectsRef],
  );

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const session = sessionRef.current;
      if (!session) return;

      if (!session.moved) {
        const travel =
          Math.abs(event.clientX - session.startX) + Math.abs(event.clientY - session.startY);
        if (travel < DRAG_THRESHOLD_PX) return;
        session.moved = true;
        draggingRef.current = session.id;
        session.slot.setAttribute("data-dragging", "");
      }

      const grid = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - grid.left;
      const y = event.clientY - grid.top;
      session.slot.style.transform =
        `translate(${(x - session.offsetX).toFixed(1)}px, ${(y - session.offsetY).toFixed(1)}px) ` +
        "rotate(var(--drag-tilt)) scale(var(--drag-scale))";

      const now = performance.now();
      if (now - lastReorderRef.current < REORDER_INTERVAL_MS) return;
      const target = hitTest(rectsRef.current, x, y, (id) => id === session.id || isLocked(id));
      if (!target) return;
      lastReorderRef.current = now;
      onReorder(session.id, target);
    },
    [draggingRef, isLocked, onReorder, rectsRef],
  );

  const endDrag = useCallback(() => {
    const session = sessionRef.current;
    if (!session) return;
    sessionRef.current = null;
    if (!session.moved) return;
    session.slot.removeAttribute("data-dragging");
    draggingRef.current = null;
    relayout();
  }, [draggingRef, relayout]);

  return useMemo(
    () => ({ onPointerDown, onPointerMove, onPointerUp: endDrag, onPointerCancel: endDrag }),
    [onPointerDown, onPointerMove, endDrag],
  );
}
