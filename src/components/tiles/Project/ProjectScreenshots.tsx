import Image from "next/image";

import { cn } from "@/lib/cn";
import type { ProjectScreenshot } from "@/types/project";

export interface ProjectScreenshotsProps {
  screenshots: readonly ProjectScreenshot[];
  /** Accessible name for the scrolling row, e.g. "Nomi screenshots". */
  label: string;
}

/**
 * A row of screenshots that scrolls sideways, bleeding to the sheet's edges.
 * Desktop shots sit in a rounded frame; phone shots already have their own.
 */
export function ProjectScreenshots({ screenshots, label }: ProjectScreenshotsProps) {
  return (
    <div
      role="region"
      aria-label={label}
      tabIndex={0}
      className="-mx-7 flex snap-x snap-mandatory scroll-px-7 gap-3 overflow-x-auto px-7 pb-2 outline-none [scrollbar-width:thin] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sheet-fg"
    >
      {screenshots.map((shot) => {
        const phone = shot.src.height > shot.src.width;
        return (
          <Image
            key={shot.src.src}
            src={shot.src}
            alt={shot.alt}
            placeholder="blur"
            sizes={phone ? "130px" : "560px"}
            draggable={false}
            className={cn(
              "h-62 w-auto max-w-none flex-none snap-start",
              !phone && "rounded-panel border border-sheet-line",
            )}
          />
        );
      })}
    </div>
  );
}
