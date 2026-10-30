import { Tile, TileBody } from "@/components/ui/Tile";
import { TileLabel } from "@/components/ui/TileLabel";
import { roles, timelineStart } from "@/content/experience";
import { experienceTile } from "@/content/tiles";
import { timelineBar } from "@/lib/timeline";

import { ExperienceRows, type TimelineBarStyle } from "./ExperienceRows";

/**
 * Every role on one timeline, newest first, each bar sized by its real dates.
 * The timeline is measured on the day the site is built. Each row opens its role sheet.
 */
export function ExperienceTile() {
  const today = new Date();
  const bars: TimelineBarStyle[] = roles.map((role, index) => {
    const { left, width } = timelineBar(role, timelineStart, today);
    return {
      style: {
        left: `${left.toFixed(1)}%`,
        width: `${width.toFixed(1)}%`,
        background: "barColor" in role ? role.barColor : role.tone.bg,
        animationDelay: `${index * 0.1}s`,
      },
      // Centred over the bar, but kept inside the track near its ends.
      tooltip:
        left + width / 2 > 65
          ? { right: `${(100 - left - width).toFixed(1)}%` }
          : left + width / 2 < 35
            ? { left: `${left.toFixed(1)}%` }
            : { left: `${(left + width / 2).toFixed(1)}%` },
      centred: left + width / 2 >= 35 && left + width / 2 <= 65,
    };
  });

  return (
    <Tile>
      <TileBody className="gap-[2.4cqh]">
        <TileLabel aside={experienceTile.aside}>{experienceTile.label}</TileLabel>
        <ExperienceRows bars={bars} />
        <div
          aria-hidden="true"
          className="flex gap-[4cqh] text-[length:4.2cqh] leading-none text-muted @max-[440px]:gap-[9px]"
        >
          <span className="shrink-0 grow-0 basis-[28%] @max-[440px]:basis-[36%]" />
          <div className="flex flex-1 justify-between">
            <span>{experienceTile.axisStart}</span>
            <span>{experienceTile.axisEnd}</span>
          </div>
          <span className="shrink-0 grow-0 basis-[calc(27%+9cqh)] @max-[440px]:basis-[33%]" />
        </div>
      </TileBody>
    </Tile>
  );
}
