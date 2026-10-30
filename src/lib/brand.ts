/**
 * Colours for places CSS custom properties can't reach: the browser theme colour,
 * the favicon and the link-preview image. They mirror tokens in src/app/globals.css;
 * change both together.
 */
export const brand = {
  bg: "#f5f5f7", // --color-bg
  fg: "#1d1d1f", // --color-fg
  muted: "#6e6e73", // --color-muted
  pink: "#f8a9c4", // --color-pink
  pinkStrong: "#f472a0", // --color-pink-strong
} as const;
