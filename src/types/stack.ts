/** One app icon in the stack tile's dock. */
export interface StackItem {
  readonly name: string;
  /** Shown in the window title, e.g. "Frontend". */
  readonly category: string;
  /** Shown as "Used in: …" when the icon is opened. */
  readonly usedIn: string;
  /** Icon tile colours. */
  readonly icon: { readonly bg: string; readonly fg: string };
  /** Logo as a single SVG path on a 24×24 grid (Simple Icons). */
  readonly path?: string;
  /** Letter shown when there is no logo path. */
  readonly monogram?: string;
}
