# portfolio-2026

Fiona Veseli's portfolio: a rearrangeable bento grid of small interactive tiles.

Built with Next.js (App Router), TypeScript (strict), Tailwind CSS v4 and Motion.

## Requirements

- Node 20.9 or newer (`.nvmrc` pins 20.19.4)
- npm

## Scripts

| Command                | What it does                                                 |
| ---------------------- | ------------------------------------------------------------ |
| `npm run dev`          | Dev server on http://localhost:3000                          |
| `npm run build`        | Production build                                             |
| `npm run start`        | Serve the production build                                   |
| `npm run lint`         | ESLint (Next core-web-vitals + TypeScript rules)             |
| `npm run typecheck`    | Generates route types, then `tsc --noEmit`                   |
| `npm run format`       | Prettier, writes changes (sorts Tailwind classes too)        |
| `npm run format:check` | Prettier, check only                                         |
| `npm run check`        | Type-check, lint, format check and build; run before commits |

## Structure

```
src/app                    layout, page, globals.css (all design tokens), metadata
src/components/ui          Tile, TileLabel, Pill, Sheet, InfoRow
src/components/grid        BentoGrid, FilterNav, useGridLayout, useDragReorder
src/components/tiles       one folder per tile
src/components/case-studies  ProjectSheet, RoleSheet, demos/
src/components/cursor      CustomCursor
src/content                typed site data: projects, experience, stack, grid, tile copy, site
src/assets                 images imported by components (Kira's photos)
src/lib                    grid packing, game logic, utilities
src/types                  shared types
```

Folders are added as each step needs them.

During development, http://localhost:3000/kit shows the tokens and UI components. It
returns 404 in production builds.

## Principles

- Design tokens live only in `src/app/globals.css`; components never use raw values.
  Shared values (colours, type, radius, shadow, easing, tile padding) are tokens. The one
  exception is proportional geometry that belongs to a single tile's artwork, written in
  `cqh` / `cqw` because every tile is a size container.
- Content is typed data in `src/content`; adding a project never touches a component.
- Server components by default; client components only where interaction needs them.
- One tile per folder; logic lives in hooks or plain functions, not in markup.

## Build order

1. Scaffold
2. Tokens and UI components
3. Grid engine with placeholder tiles (desktop and phone)
4. Tiles, one at a time
5. Case-study sheets and the two demos
6. Dark mode, cursor, accessibility, performance, deploy

Each step is its own pull request.
