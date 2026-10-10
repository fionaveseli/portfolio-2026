"use client";

import { Tile, TileBody } from "@/components/ui/Tile";
import { TileLabel } from "@/components/ui/TileLabel";
import { lights } from "@/content/tiles";
import { setTheme, useTheme } from "@/lib/theme";

/** The dark-mode switch: a sun that slides over and turns into a moon. */
export function LightsTile() {
  const dark = useTheme() === "dark";

  return (
    <Tile>
      <TileBody justify="between" className="items-center">
        <TileLabel aside={dark ? lights.off : lights.on} className="self-stretch">
          {lights.label}
        </TileLabel>
        <button
          type="button"
          role="switch"
          aria-checked={dark}
          aria-label={lights.switchLabel}
          data-nodrag=""
          data-cur="Flip it"
          onClick={() => setTheme(dark ? "light" : "dark")}
          className="group/switch relative h-[25cqh] w-[46cqh] cursor-pointer rounded-full bg-well transition-colors duration-400"
        >
          <i className="absolute top-[2.5cqh] left-[2.5cqh] size-[20cqh] rounded-full bg-sun shadow-sun transition-[translate,background-color] duration-500 ease-swell group-aria-checked/switch:translate-x-[21cqh] group-aria-checked/switch:bg-moon group-aria-checked/switch:shadow-moon" />
        </button>
        <span className="text-[length:5.6cqh] text-muted">{lights.hint}</span>
      </TileBody>
    </Tile>
  );
}
