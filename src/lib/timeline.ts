import type { YearMonth } from "@/types/experience";

/** Months since year 0, so two months can be subtracted. */
function monthIndex(value: YearMonth): number {
  const [year = 0, month = 1] = value.split("-").map(Number);
  return year * 12 + (month - 1);
}

function monthIndexOf(date: Date): number {
  return date.getFullYear() * 12 + date.getMonth();
}

export interface TimelineBar {
  /** Percent from the left of the track. */
  readonly left: number;
  /** Percent of the track's width. */
  readonly width: number;
}

/**
 * Positions a role on the experience timeline. The track runs from `start` to the
 * beginning of next year; an ongoing role runs to `today`. `end` months are inclusive.
 */
export function timelineBar(
  role: { readonly start: YearMonth; readonly end?: YearMonth },
  start: YearMonth,
  today: Date,
): TimelineBar {
  const from = monthIndex(start);
  const to = (today.getFullYear() + 1) * 12;
  const span = to - from;

  const roleStart = monthIndex(role.start);
  const roleEnd = role.end ? monthIndex(role.end) + 1 : monthIndexOf(today) + today.getDate() / 31;

  const clamp = (value: number) => Math.min(100, Math.max(0, value));
  const left = clamp(((roleStart - from) / span) * 100);
  const width = clamp(((roleEnd - roleStart) / span) * 100);
  return { left, width: Math.min(width, 100 - left) };
}
