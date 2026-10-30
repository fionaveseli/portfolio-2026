import { Tile, TileBody } from "@/components/ui/Tile";
import { TileLabel } from "@/components/ui/TileLabel";
import { intro } from "@/content/tiles";

/** The pinned headline: who I am, in one breath. */
export function IntroTile() {
  return (
    <Tile>
      <TileBody justify="between">
        <TileLabel
          aside={
            <span className="inline-block origin-[70%_80%] animate-wave motion-reduce:animate-none">
              {intro.wave}
            </span>
          }
        >
          {intro.eyebrow}
        </TileLabel>
        <div className="flex flex-col gap-[3cqh]">
          <h1 className="text-[length:min(16.5cqh,7.9cqw)] leading-none font-bold tracking-tightest">
            {intro.greeting}
            <br />
            <span className="text-muted">
              {intro.taglineLead}
              <span className="text-fg">{intro.taglineMark}</span>
            </span>
          </h1>
        </div>
      </TileBody>
    </Tile>
  );
}
