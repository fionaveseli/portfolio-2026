import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { InfoList, InfoRow } from "@/components/ui/InfoRow";
import { Pill } from "@/components/ui/Pill";
import { Tile, TileBody } from "@/components/ui/Tile";
import { TileLabel } from "@/components/ui/TileLabel";

import { KitSheetDemo } from "./KitSheetDemo";

export const metadata: Metadata = {
  title: "UI kit",
  robots: { index: false, follow: false },
};

const swatches = [
  "bg",
  "tile",
  "well",
  "fg",
  "muted",
  "line",
  "ink",
  "pink",
  "pink-soft",
  "pink-strong",
  "pink-deep",
] as const;

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-ui font-semibold text-muted">{title}</h2>
      {children}
    </section>
  );
}

/** Development-only page for reviewing tokens and UI components. 404 in production. */
export default function KitPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <main className="mx-auto flex max-w-page flex-col gap-12 px-gutter py-10">
      <h1 className="text-sheet-title">UI kit</h1>

      <Section title="Colour tokens">
        <ul className="grid grid-cols-3 gap-3 md:grid-cols-6">
          {swatches.map((name) => (
            <li key={name} className="flex flex-col gap-1.5 text-fine">
              <span
                className="h-14 rounded-card shadow-tile"
                style={{ backgroundColor: `var(--color-${name})` }}
              />
              {name}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Tile, TileBody, TileLabel (contents scale with the tile)">
        <div className="grid grid-cols-2 gap-4.5 md:grid-cols-4">
          <div className="h-57">
            <Tile>
              <TileBody justify="between">
                <TileLabel aside="Who I am">About</TileLabel>
                <p className="text-muted">Default surface</p>
              </TileBody>
            </Tile>
          </div>
          <div className="col-span-2 h-57">
            <Tile>
              <TileBody justify="between">
                <TileLabel aside="Click a role">Experience</TileLabel>
                <p className="text-muted">Wide tile: the label grows with the height.</p>
              </TileBody>
            </Tile>
          </div>
          <div className="h-57">
            <Tile tone={{ bg: "var(--color-ink)", fg: "var(--color-paper)" }}>
              <TileBody justify="between">
                <TileLabel aside="Open to work">Contact</TileLabel>
                <div className="flex flex-wrap gap-2">
                  <Pill href="mailto:fionaveseli2@gmail.com">Email</Pill>
                  <Pill variant="ghost" href="https://www.linkedin.com/in/fiona-veseli/">
                    LinkedIn
                  </Pill>
                </div>
              </TileBody>
            </Tile>
          </div>
          <div className="group/slot h-57" data-dragging="">
            <Tile>
              <TileBody justify="end">
                <p className="text-muted">While dragged (deeper shadow)</p>
              </TileBody>
            </Tile>
          </div>
        </div>
      </Section>

      <Section title="Pill">
        <div className="flex flex-wrap items-center gap-2 rounded-panel bg-ink p-4">
          <Pill>Paper</Pill>
          <Pill variant="ghost">Ghost</Pill>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Pill variant="ink">Ink</Pill>
          <Pill variant="well">Well</Pill>
          <Pill variant="sheet">Sheet</Pill>
        </div>
      </Section>

      <Section title="InfoRow">
        <div className="max-w-sheet rounded-panel bg-sheet p-6 text-sheet-fg">
          <InfoList>
            <InfoRow label="Company">Code Invention</InfoRow>
            <InfoRow label="Stack">Angular, TypeScript, Nx</InfoRow>
          </InfoList>
        </div>
      </Section>

      <Section title="Sheet (click the tile's button; Escape, the backdrop or Close shut it)">
        <KitSheetDemo />
      </Section>
    </main>
  );
}
