import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

const sizeClasses = {
  /** Scales with the tile. */
  tile: "text-tile-label",
  /** Fixed 12px, used in sheet headers. */
  caption: "text-caption",
} as const;

export interface TileLabelProps {
  /** Left side, e.g. "Experience". */
  children: ReactNode;
  /** Optional right side, e.g. "Click a role". */
  aside?: ReactNode;
  size?: keyof typeof sizeClasses;
  className?: string;
}

/** The small two-part label at the top of a tile or sheet. */
export function TileLabel({ children, aside, size = "tile", className }: TileLabelProps) {
  return (
    <span
      className={cn(
        "flex justify-between gap-tile-label font-semibold opacity-75",
        sizeClasses[size],
        className,
      )}
    >
      <span>{children}</span>
      {aside !== undefined && <span>{aside}</span>}
    </span>
  );
}
