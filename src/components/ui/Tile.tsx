import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";
import { toneVars } from "@/lib/tone";
import type { Tone } from "@/types/ui";

export interface TileProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** Custom colours (project tiles, the map, the contact tile). Defaults to the theme's tile surface. */
  tone?: Tone;
  children: ReactNode;
}

/**
 * The rounded surface every tile sits on. It fills its parent (the grid positions the
 * parent) and is a size container, so contents scale with cqh / cqw.
 * While the grid slot carries `data-dragging`, the tile lifts with a deeper shadow.
 */
export function Tile({ tone, className, style, children, ...rest }: TileProps) {
  return (
    <div
      {...rest}
      className={cn(
        "container-size relative size-full overflow-hidden rounded-tile shadow-tile transition-tile select-none group-data-dragging/slot:shadow-tile-drag hover:shadow-tile-hover",
        tone ? "bg-(--accent) text-(--on-accent)" : "bg-tile text-fg",
        className,
      )}
      style={tone ? { ...toneVars(tone), ...style } : style}
    >
      {children}
    </div>
  );
}

const justifyClasses = {
  start: "justify-start",
  between: "justify-between",
  end: "justify-end",
} as const;

const paddingClasses = {
  /** The standard tile padding. */
  tile: "p-tile",
  /** No padding: the tile sets its own through `className`. */
  none: "",
} as const;

export interface TileBodyProps {
  /** Vertical distribution of the children. */
  justify?: keyof typeof justifyClasses;
  padding?: keyof typeof paddingClasses;
  className?: string;
  children: ReactNode;
}

/** The padded column most tiles lay their content out in. */
export function TileBody({
  justify = "start",
  padding = "tile",
  className,
  children,
}: TileBodyProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col",
        paddingClasses[padding],
        justifyClasses[justify],
        className,
      )}
    >
      {children}
    </div>
  );
}
