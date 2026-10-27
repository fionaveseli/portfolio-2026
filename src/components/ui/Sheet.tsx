"use client";

import { useReducedMotion } from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
  type MouseEvent,
  type ReactNode,
  type SyntheticEvent,
} from "react";

import { Pill, type PillVariant } from "@/components/ui/Pill";
import { TileLabel } from "@/components/ui/TileLabel";
import { cn } from "@/lib/cn";
import { morphFrames } from "@/lib/morph";
import { toneVars } from "@/lib/tone";
import { readDuration, readToken } from "@/lib/tokens";
import type { Tone } from "@/types/ui";

interface SheetContextValue {
  /** Plays the close animation, then calls the sheet's `onClose`. */
  close: () => void;
}

const SheetContext = createContext<SheetContextValue | null>(null);

export function useSheet(): SheetContextValue {
  const context = useContext(SheetContext);
  if (!context) throw new Error("useSheet must be used inside <Sheet>.");
  return context;
}

export interface SheetProps {
  /** Accessible name, usually the project or company name. */
  label: string;
  /** Header colours. */
  tone: Tone;
  /** Called after the close animation has finished. The parent should then unmount the sheet. */
  onClose: () => void;
  /** Returns the element the sheet grows out of and shrinks back into (usually its tile). */
  getOrigin?: () => Element | null;
  children: ReactNode;
}

/**
 * A modal case-study card. Mount it to open, unmount it (from `onClose`) to finish closing.
 * Built on the native <dialog>, so focus is trapped, the page behind is inert and Escape
 * closes it. It grows out of its origin tile and shrinks back into it, unless the visitor
 * prefers reduced motion.
 */
export function Sheet({ label, tone, onClose, getOrigin, children }: SheetProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closingRef = useRef(false);
  const reduceMotion = useReducedMotion() === true;

  const openDialog = useEffectEvent((dialog: HTMLDialogElement) => {
    dialog.showModal();
    if (reduceMotion) return;
    const frames = morphFrames(dialog, getOrigin?.() ?? null);
    if (!frames) return;
    dialog.animate([frames.collapsed, frames.expanded], {
      duration: readDuration("--duration-sheet-in"),
      easing: readToken("--ease-sheet-in"),
    });
  });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    openDialog(dialog);
    return () => {
      if (dialog.open) dialog.close();
    };
  }, []);

  const requestClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;

    const dialog = dialogRef.current;
    const frames = dialog && !reduceMotion ? morphFrames(dialog, getOrigin?.() ?? null) : null;
    if (!dialog || !frames) {
      onClose();
      return;
    }

    const animation = dialog.animate([frames.expanded, { ...frames.collapsed, opacity: 0 }], {
      duration: readDuration("--duration-sheet-out"),
      easing: readToken("--ease-sheet-out"),
      fill: "forwards",
    });
    animation.finished.then(onClose, onClose);
  }, [getOrigin, onClose, reduceMotion]);

  // Escape: run our animation instead of the browser's instant close.
  const handleCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    requestClose();
  };

  // A click on the backdrop lands on the <dialog> itself, outside its box.
  const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target !== event.currentTarget) return;
    const box = event.currentTarget.getBoundingClientRect();
    const inside =
      event.clientX >= box.left &&
      event.clientX <= box.right &&
      event.clientY >= box.top &&
      event.clientY <= box.bottom;
    if (!inside) requestClose();
  };

  const context = useMemo(() => ({ close: requestClose }), [requestClose]);

  return (
    <SheetContext value={context}>
      <dialog
        ref={dialogRef}
        // Rendered inside a grid tile: keep presses in the sheet from dragging the tile.
        data-nodrag=""
        aria-label={label}
        onCancel={handleCancel}
        onClick={handleClick}
        style={toneVars(tone)}
        className="m-auto size-sheet overflow-auto rounded-sheet bg-sheet p-0 text-sheet-fg shadow-sheet backdrop:animate-fade backdrop:bg-scrim motion-reduce:backdrop:animate-none"
      >
        {children}
      </dialog>
    </SheetContext>
  );
}

export interface SheetHeaderProps {
  /** Left part of the small label, e.g. "Project 05 of 07" or "Jul 2026 to present". */
  eyebrow: ReactNode;
  /** Right part of the small label, e.g. "Client rebrand". */
  eyebrowAside?: ReactNode;
  title: string;
  /** A line under the title, e.g. the job title on a role sheet. */
  subtitle?: string;
}

/** The coloured top of a sheet, painted in the sheet's tone. */
export function SheetHeader({ eyebrow, eyebrowAside, title, subtitle }: SheetHeaderProps) {
  const heading = (
    <h2 className={subtitle ? "text-sheet-title-role" : "text-sheet-title"}>{title}</h2>
  );

  return (
    <header className="flex rise-children flex-col gap-10 bg-(--accent) px-7 pt-7 pb-10 text-(--on-accent)">
      <TileLabel size="caption" aside={eyebrowAside}>
        {eyebrow}
      </TileLabel>
      {subtitle ? (
        <div className="flex flex-col gap-2">
          {heading}
          <span className="text-subtitle font-medium opacity-85">{subtitle}</span>
        </div>
      ) : (
        heading
      )}
    </header>
  );
}

export interface SheetBodyProps {
  className?: string;
  children: ReactNode;
}

/** The white lower part of a sheet; its children rise in one after another. */
export function SheetBody({ className, children }: SheetBodyProps) {
  return (
    <div className={cn("flex rise-stagger flex-col gap-4.5 px-7 pt-6 pb-7", className)}>
      {children}
    </div>
  );
}

export interface SheetCloseProps {
  variant?: PillVariant;
  children?: ReactNode;
}

/** A pill that closes the surrounding sheet with its animation. */
export function SheetClose({ variant = "sheet", children = "Close" }: SheetCloseProps) {
  const { close } = useSheet();
  return (
    <Pill variant={variant} onClick={close}>
      {children}
    </Pill>
  );
}
