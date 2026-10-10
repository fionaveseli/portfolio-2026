import { Tile, TileBody } from "@/components/ui/Tile";
import { TileLabel } from "@/components/ui/TileLabel";
import type { GridItem } from "@/types/grid";

/** Stand-in used until each real tile is built (step 4). */
export function PlaceholderTile({ item }: { item: GridItem }) {
  return (
    <Tile>
      <TileBody justify="between">
        <TileLabel aside={item.category}>{item.id}</TileLabel>
        <span className="text-tile-label text-muted">Placeholder</span>
      </TileBody>
    </Tile>
  );
}
