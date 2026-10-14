import { projects } from "@/content/projects";
import type { GridFilterOption, GridItem } from "@/types/grid";

/** Always first, never dragged, never dimmed by a filter. */
export const pinnedTiles = [
  { id: "intro", span: 2, category: "about" },
] as const satisfies readonly GridItem[];

/** Cursor labels over draggable tiles. */
const cursor = {
  tile: "Drag me",
  project: "Drag, or click to open",
} as const;

/**
 * Every other tile, in its starting order. Visitors can drag these around.
 * Project tiles use the project's slug as their id.
 */
const tiles = [
  { id: "stack", span: 2, category: "about" },
  { id: "experience", span: 2, category: "about" },
  { id: "about", span: 2, category: "about" },
  { id: "ku", span: 1, category: "work" },
  { id: "sasa", span: 1, category: "work" },
  { id: "spot", span: 1, category: "work" },
  { id: "terminal", span: 1, category: "about" },
  { id: "kira", span: 2, category: "play" },
  { id: "medical-practice", span: 1, category: "work" },
  { id: "map", span: 1, category: "about" },
  { id: "education", span: 1, category: "about" },
  { id: "lexxical", span: 1, category: "work" },
  { id: "contributions", span: 1, category: "play" },
  { id: "lights", span: 1, category: "play" },
  { id: "flight-search-chatbot", span: 1, category: "work" },
  { id: "visiar-assist", span: 1, category: "work" },
  { id: "contact", span: 2, category: "about" },
] as const satisfies readonly GridItem[];

const isProject = (id: string) => projects.some((project) => project.slug === id);

export const gridTiles: readonly GridItem[] = tiles.map((tile) => ({
  ...tile,
  cursor: isProject(tile.id) ? cursor.project : cursor.tile,
}));

const placed = new Set<string>(gridTiles.map((tile) => tile.id));

/** The draggable tiles, plus any project not placed above (appended at the end). */
export const gridItems: readonly GridItem[] = [
  ...gridTiles,
  ...projects
    .filter((project) => !placed.has(project.slug))
    .map(
      (project) =>
        ({ id: project.slug, span: 1, category: "work", cursor: cursor.project }) as const,
    ),
];

export const gridFilters = [
  { value: "all", label: "All" },
  { value: "about", label: "About" },
  { value: "work", label: "Work" },
  { value: "play", label: "Play" },
] as const satisfies readonly GridFilterOption[];
