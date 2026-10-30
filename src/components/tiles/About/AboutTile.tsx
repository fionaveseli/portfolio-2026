"use client";

import { useCallback, useRef, useState } from "react";

import { Tile, TileBody } from "@/components/ui/Tile";
import { TileLabel } from "@/components/ui/TileLabel";
import { about } from "@/content/tiles";

import { AboutSheet } from "./AboutSheet";

/** A short introduction; "Read more" opens the full text in a sheet. */
export function AboutTile() {
  const [open, setOpen] = useState(false);
  const tileRef = useRef<HTMLDivElement>(null);
  const getOrigin = useCallback(() => tileRef.current, []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <div ref={tileRef} className="size-full">
        <Tile className="group/about">
          <TileBody justify="between">
            <TileLabel aside={about.aside}>{about.label}</TileLabel>
            <p className="text-[length:7.2cqh] leading-[1.3] font-medium tracking-snug">
              {about.lead}
              <span className="text-muted">{about.body}</span>
            </p>
            <button
              type="button"
              data-nodrag=""
              data-cur="Open"
              aria-haspopup="dialog"
              onClick={() => setOpen(true)}
              className="inline-flex min-h-11 cursor-pointer items-center gap-[0.45em] self-start rounded-full bg-well px-[5cqh] text-[length:5.6cqh] font-semibold transition-colors duration-300 group-hover/about:bg-ink group-hover/about:text-paper focus-visible:bg-ink focus-visible:text-paper"
            >
              {about.more}
              <span aria-hidden="true">→</span>
            </button>
          </TileBody>
        </Tile>
      </div>
      {open && <AboutSheet onClose={close} getOrigin={getOrigin} />}
    </>
  );
}
