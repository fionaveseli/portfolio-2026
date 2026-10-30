/** Site-wide facts used by metadata, the intro tile and the contact tile. */
export interface SiteConfig {
  readonly name: string;
  /** Production address, used for canonical URLs, the sitemap and link previews. */
  readonly url: `https://${string}`;
  readonly firstName: string;
  /** Browser tab / share title. */
  readonly title: string;
  /** The headline's second line. */
  readonly tagline: string;
  /** Meta description for search and link previews. */
  readonly description: string;
  readonly email: string;
  /** Footer line under the grid. */
  readonly credit: string;
  readonly links: {
    readonly linkedin: string;
  };
}
