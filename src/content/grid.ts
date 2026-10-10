import type { GridFilterOption, GridItem } from "@/types/grid";

/** Always first, never dragged, never dimmed by a filter. */
export const pinnedTiles = [
  { id: "intro", span: 2, category: "about" },
] as const satisfies readonly GridItem[];

/**
 * Every other tile, in its starting order. Visitors can drag these around.
 * Project tiles use the project's slug as their id.
 */
export const gridTiles = [
  { id: "stack", span: 2, category: "about" },
  { id: "experience", span: 2, category: "about" },
  { id: "about", span: 2, category: "about" },
  { id: "ku", span: 1, category: "work" },
  { id: "sasa", span: 1, category: "work" },
  { id: "spot", span: 1, category: "work" },
  { id: "terminal", span: 1, category: "about" },
  { id: "kira", span: 2, category: "play" },
  { id: "dr-nicholas-wallace", span: 1, category: "work" },
  { id: "map", span: 1, category: "about" },
  { id: "education", span: 1, category: "about" },
  { id: "lexxical", span: 1, category: "work" },
  { id: "contributions", span: 1, category: "play" },
  { id: "lights", span: 1, category: "play" },
  { id: "flight-search-chatbot", span: 1, category: "work" },
  { id: "visiar-assist", span: 1, category: "work" },
  { id: "contact", span: 2, category: "about" },
] as const satisfies readonly GridItem[];

export const gridFilters = [
  { value: "all", label: "All" },
  { value: "about", label: "About" },
  { value: "work", label: "Work" },
  { value: "play", label: "Play" },
] as const satisfies readonly GridFilterOption[];
