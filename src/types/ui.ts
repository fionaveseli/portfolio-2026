/**
 * A coloured surface: background and foreground. Content files give each project and
 * role its own tone; any CSS colour works, including token references like
 * `var(--color-ink)`.
 */
export interface Tone {
  readonly bg: string;
  readonly fg: string;
}
