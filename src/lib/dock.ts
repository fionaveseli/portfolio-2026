/**
 * macOS-style dock magnification: icons near the pointer grow, easing off with
 * distance. Port of the prototype's maths.
 */

/** How many icon widths the swell reaches on each side. */
const REACH = 2.6;
/** Extra size at the centre of the swell (0.8 = 180%). */
const BOOST = 0.8;

export interface DockMetrics {
  /** Resting icon size in px. */
  readonly base: number;
  readonly gap: number;
  /** Centre x of the dock, in the same coordinates as the pointer. */
  readonly center: number;
  readonly count: number;
}

/** Scale factor for every icon, and the index of the icon closest to the pointer. */
export function magnify(
  pointerX: number,
  dock: DockMetrics,
): { scales: number[]; nearest: number } {
  const { base, gap, center, count } = dock;
  let nearest = -1;
  let nearestDistance = Number.POSITIVE_INFINITY;

  const scales = Array.from({ length: count }, (_, i) => {
    const iconCenter = center + (i - (count - 1) / 2) * (base + gap);
    const distance = Math.abs(pointerX - iconCenter);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearest = i;
    }
    const closeness = Math.max(0, 1 - distance / (base * REACH));
    return 1 + BOOST * (0.5 - 0.5 * Math.cos(Math.PI * closeness));
  });

  return { scales, nearest };
}
