import type { Tone } from "@/types/ui";

/** A month as "YYYY-MM". */
export type YearMonth = `${number}-${number}`;

export interface Role {
  readonly id: string;
  /** Full name, used on the role sheet. */
  readonly company: string;
  /** Shorter name for the experience tile. */
  readonly companyShort: string;
  readonly title: string;
  /** Shorter title for the experience tile. */
  readonly titleShort: string;
  /** First month in the role. */
  readonly start: YearMonth;
  /** Last month in the role (inclusive); omit while it's ongoing. */
  readonly end?: YearMonth;
  /** Dates as written on the sheet, e.g. "Apr 2023 to Jun 2026". */
  readonly period: string;
  /** Length as written on the sheet, e.g. "3 years". */
  readonly duration: string;
  /** Sheet header colours; the timeline bar uses `tone.bg` unless `barColor` is set. */
  readonly tone: Tone;
  readonly barColor?: string;
  readonly highlights: readonly string[];
  readonly stack: string;
}
