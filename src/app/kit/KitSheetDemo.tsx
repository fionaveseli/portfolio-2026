"use client";

import { useCallback, useRef, useState } from "react";

import { InfoList, InfoRow } from "@/components/ui/InfoRow";
import { Pill } from "@/components/ui/Pill";
import { Sheet, SheetBody, SheetClose, SheetHeader } from "@/components/ui/Sheet";
import { Tile, TileBody } from "@/components/ui/Tile";
import { TileLabel } from "@/components/ui/TileLabel";
import type { Tone } from "@/types/ui";

const tone: Tone = { bg: "var(--color-ink)", fg: "var(--color-paper)" };

/** Opens a sample role sheet from a tile, to check the grow and shrink animation. */
export function KitSheetDemo() {
  const [open, setOpen] = useState(false);
  const originRef = useRef<HTMLDivElement>(null);
  const getOrigin = useCallback(() => originRef.current, []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <div ref={originRef} className="h-57 max-w-sm">
        <Tile tone={tone}>
          <TileBody justify="between">
            <TileLabel aside="Origin">Sheet demo</TileLabel>
            <Pill className="self-start" onClick={() => setOpen(true)}>
              Open sheet
            </Pill>
          </TileBody>
        </Tile>
      </div>

      {open && (
        <Sheet label="Code Invention" tone={tone} onClose={close} getOrigin={getOrigin}>
          <SheetHeader
            eyebrow="Jul 2026 to present"
            eyebrowAside="2026, now"
            title="Code Invention"
            subtitle="Frontend Engineer"
          />
          <SheetBody>
            <p className="text-lead">
              Building the frontend of an enterprise video surveillance and video management
              product.
            </p>
            <InfoList>
              <InfoRow label="Stack">Angular, TypeScript, Nx</InfoRow>
            </InfoList>
            <div className="flex flex-wrap gap-2">
              <Pill variant="ink">Next role</Pill>
              <SheetClose />
            </div>
          </SheetBody>
        </Sheet>
      )}
    </>
  );
}
