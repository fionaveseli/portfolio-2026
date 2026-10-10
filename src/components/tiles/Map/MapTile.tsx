import { Tile, TileBody } from "@/components/ui/Tile";
import { map } from "@/content/tiles";

const tone = { bg: "var(--color-map-land)", fg: "var(--color-map-ink)" };

/** A little street map with a pulsing pin where I live. */
export function MapTile() {
  return (
    <Tile tone={tone}>
      <svg
        viewBox="0 0 200 200"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        className="absolute inset-0 size-full"
      >
        <path
          d="M-10 60L80 40L120 90L210 70M-10 140L60 120L130 160L210 130M40 -10L70 80L50 210M150 -10L130 90L160 210"
          className="fill-none stroke-paper"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          d="M-10 100L210 104M96 -10L104 210"
          className="fill-none stroke-paper"
          strokeWidth="4"
        />
        <circle
          cx="100"
          cy="102"
          r="26"
          className="origin-center animate-ping fill-map-pin opacity-20 [transform-box:fill-box] motion-reduce:animate-none"
        />
        <circle cx="100" cy="102" r="9" className="fill-map-pin stroke-paper" strokeWidth="4" />
      </svg>
      <TileBody justify="end">
        <span className="self-start rounded-full bg-paper px-[4.4cqh] py-[2.4cqh] text-[length:min(6cqh,6.4cqw)] font-semibold whitespace-nowrap">
          {map.location}
        </span>
      </TileBody>
    </Tile>
  );
}
