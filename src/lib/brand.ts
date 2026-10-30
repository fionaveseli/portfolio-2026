/**
 * Colours for places CSS custom properties can't reach: the browser theme colour
 * and the favicon. They mirror tokens in src/app/globals.css;
 * change both together.
 */
export const brand = {
  bg: "#f5f5f7", // --color-bg
  fg: "#1d1d1f", // --color-fg
  pink: "#f8a9c4", // --color-pink
} as const;
