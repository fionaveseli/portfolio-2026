import { Tile, TileBody } from "@/components/ui/Tile";
import { TileLabel } from "@/components/ui/TileLabel";
import { about } from "@/content/tiles";

export function AboutTile() {
  return (
    <Tile>
      <TileBody justify="between">
        <TileLabel aside={about.aside}>{about.label}</TileLabel>
        <p className="text-[length:7.6cqh] leading-[1.3] font-medium tracking-snug">
          {about.lead}
          <span className="text-muted">{about.body}</span>
        </p>
      </TileBody>
    </Tile>
  );
}
