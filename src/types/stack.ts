/** One app icon in the stack tile's dock. */
export interface StackItem {
  readonly name: string;
  /** Small label above the name when the icon is open, e.g. "Frontend". */
  readonly category: string;
  /** How I use it, in a sentence. Shown when the icon is open. */
  readonly description: string;
  /** Icon tile colours. */
  readonly icon: { readonly bg: string; readonly fg: string };
  /** Logo as a single SVG path on a 24×24 grid (Simple Icons). */
  readonly path?: string;
  /** Letter shown when there is no logo path. */
  readonly monogram?: string;
}
