export type TileCategory = "about" | "work" | "play";

export type GridFilter = "all" | TileCategory;

/** How many columns a tile spans. Every tile is one row tall. */
export type TileSpan = 1 | 2;

export interface GridItem {
  readonly id: string;
  readonly span: TileSpan;
  readonly category: TileCategory;
}

export interface GridFilterOption {
  readonly value: GridFilter;
  readonly label: string;
}
