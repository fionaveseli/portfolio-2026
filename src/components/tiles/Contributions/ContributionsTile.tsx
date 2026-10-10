"use client";

import { useRef, useState, type PointerEvent } from "react";

import { Tile, TileBody } from "@/components/ui/Tile";
import { TileLabel } from "@/components/ui/TileLabel";
import { contributions } from "@/content/tiles";
import { commit, initialLevels } from "@/lib/contributions";

const levelClasses = [
  "bg-well",
  "bg-commit-1",
  "bg-commit-2",
  "bg-commit-3",
  "bg-commit-4",
] as const;

/** A contribution graph that says HI; sweeping over it adds your own commits. */
export function ContributionsTile() {
  const [levels, setLevels] = useState(initialLevels);
  const [count, setCount] = useState(0);
  const lastCellRef = useRef(-1);

  const hit = (event: PointerEvent<HTMLDivElement>, force: boolean) => {
    const cell = event.target instanceof HTMLElement ? event.target.dataset.cell : undefined;
    if (cell === undefined) {
      lastCellRef.current = -1;
      return;
    }
    const index = Number(cell);
    if (!force && index === lastCellRef.current) return;
    lastCellRef.current = index;
    setLevels((current) => commit(current, index));
    setCount((current) => current + 1);
  };

  return (
    <Tile>
      <TileBody justify="between">
        <TileLabel aside={`${count} ${contributions.countSuffix}`}>{contributions.label}</TileLabel>
        <div
          role="img"
          aria-label={contributions.description}
          data-nodrag=""
          data-cur="Commit"
          onPointerMove={(event) => hit(event, false)}
          onPointerDown={(event) => hit(event, true)}
          className="grid w-full cursor-pointer touch-manipulation grid-cols-13 gap-[1.3cqw]"
        >
          {levels.map((level, index) => (
            <i
              key={index}
              data-cell={index}
              className={`block aspect-square rounded-[24%] transition-[background-color,scale] duration-250 ease-pop hover:scale-125 ${levelClasses[level] ?? levelClasses[0]}`}
            />
          ))}
        </div>
        <span className="text-[length:min(5.6cqh,6.6cqw)] text-muted">{contributions.hint}</span>
      </TileBody>
    </Tile>
  );
}
