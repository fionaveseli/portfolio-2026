/**
 * Reads design tokens (CSS custom properties defined in globals.css) at runtime,
 * so JS-driven animation uses the same values as the stylesheet. Browser only.
 */

type TokenName = `--${string}`;

export function readToken(name: TokenName): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/** Reads a time token such as `620ms` or `0.6s` and returns milliseconds. */
export function readDuration(name: TokenName): number {
  const value = readToken(name);
  const amount = Number.parseFloat(value);
  if (Number.isNaN(amount)) return 0;
  return value.endsWith("ms") ? amount : amount * 1000;
}
