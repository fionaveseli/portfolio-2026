"use client";

import { useEffect, useRef } from "react";

import { readToken } from "@/lib/tokens";

/** What the cursor should show for the element under the pointer. */
function describe(target: EventTarget | null): { label: string; big: boolean } {
  if (!(target instanceof Element)) return { label: "", big: false };
  const labelled = target.closest("[data-cur]");
  const noDrag = target.closest("[data-nodrag]");
  let label = labelled?.getAttribute("data-cur") ?? "";
  // A control inside a tile, without a label of its own, shouldn't say "Drag me".
  if (noDrag && !noDrag.hasAttribute("data-cur") && labelled?.hasAttribute("data-slot")) label = "";
  return { label, big: target.closest("button, a, [data-cur]") !== null };
}

/** Shows (or re-shows) an element as a top-layer popover, so it sits above dialogs. */
function raise(element: HTMLElement): void {
  if (!("showPopover" in element)) return;
  if (element.matches(":popover-open")) element.hidePopover();
  element.showPopover();
}

/**
 * A pink dot that trails the mouse, grows over interactive things and shows a small
 * label from the nearest `data-cur` attribute. Mouse only: it switches itself on at the
 * first real mouse move and never appears for touch. Runs on requestAnimationFrame with
 * direct style writes, so it never re-renders React.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const tag = labelRef.current;
    if (!dot || !tag) return;

    const follow = Number.parseFloat(readToken("--cursor-follow")) || 0.32;
    // Starts off-screen, so the dot glides in on the first move.
    const pointer = { x: -300, y: -300 };
    const eased = { x: -300, y: -300 };
    let label = "";
    let frame = 0;

    const tick = () => {
      eased.x += (pointer.x - eased.x) * follow;
      eased.y += (pointer.y - eased.y) * follow;
      dot.style.transform = `translate(${eased.x.toFixed(1)}px, ${eased.y.toFixed(1)}px)`;
      tag.style.transform = `translate(${pointer.x}px, ${pointer.y}px)`;
      if (label && tag.textContent !== label) tag.textContent = label;
      const dragging = document.querySelector("[data-dragging]") !== null;
      tag.style.opacity = label && !dragging ? "1" : "0";

      const settled = Math.abs(pointer.x - eased.x) < 0.1 && Math.abs(pointer.y - eased.y) < 0.1;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      document.documentElement.dataset.pointer = "mouse";
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      const state = describe(event.target);
      label = state.label;
      dot.toggleAttribute("data-big", state.big);
      wake();
    };

    // Top layer, and back on top whenever a sheet (<dialog>) opens.
    raise(dot);
    raise(tag);
    const dialogs = new MutationObserver((changes) => {
      if (changes.some((change) => change.target instanceof HTMLDialogElement)) {
        raise(dot);
        raise(tag);
      }
    });
    dialogs.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["open"] });

    window.addEventListener("pointermove", onMove, { passive: true });
    // Dropping a tile changes the label's visibility without a move.
    window.addEventListener("pointerup", wake, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", wake);
      dialogs.disconnect();
      cancelAnimationFrame(frame);
      delete document.documentElement.dataset.pointer;
    };
  }, []);

  return (
    <>
      <span ref={dotRef} popover="manual" aria-hidden="true" className="cursor-dot" />
      <span ref={labelRef} popover="manual" aria-hidden="true" className="cursor-label" />
    </>
  );
}
