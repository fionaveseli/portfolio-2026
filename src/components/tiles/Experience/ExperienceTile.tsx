import type { CSSProperties } from "react";

import { Tile, TileBody } from "@/components/ui/Tile";
import { TileLabel } from "@/components/ui/TileLabel";
import { roles, timelineStart } from "@/content/experience";
import { experienceTile } from "@/content/tiles";
import { timelineBar } from "@/lib/timeline";
import type { Role } from "@/types/experience";

function barStyle(role: Role, today: Date, index: number): CSSProperties {
  const { left, width } = timelineBar(role, timelineStart, today);
  return {
    left: `${left.toFixed(1)}%`,
    width: `${width.toFixed(1)}%`,
    background: role.barColor ?? role.tone.bg,
    animationDelay: `${index * 0.1}s`,
  };
}

/**
 * Every role on one timeline, newest first. Each row will open its role sheet (step 5).
 * The timeline is measured on the day the site is built.
 */
export function ExperienceTile() {
  const today = new Date();

  return (
    <Tile>
      <TileBody className="gap-[2.4cqh]">
        <TileLabel aside={experienceTile.aside}>{experienceTile.label}</TileLabel>
        <div className="flex min-h-0 flex-1 flex-col justify-between">
          {roles.map((role, index) => (
            <button
              key={role.id}
              type="button"
              data-nodrag=""
              data-cursor="Open"
              aria-label={`${role.companyShort}, ${role.title}. Open details.`}
              className="group/row flex w-full cursor-pointer items-center gap-[4cqh] border-t border-line py-[1.9cqh] text-left transition-[padding-left] duration-300 ease-bounce hover:pl-[2.4cqh] @max-[440px]:gap-[9px]"
            >
              <b className="min-w-0 shrink-0 grow-0 basis-[28%] truncate text-[length:5.8cqh] leading-[1.15] font-semibold tracking-[-0.025em] @max-[440px]:basis-[36%] @max-[440px]:text-[12.5px]">
                {role.companyShort}
              </b>
              <span className="relative h-[5cqh] flex-1 rounded-full bg-well">
                <i
                  className="absolute inset-y-0 min-w-[5cqh] origin-left animate-grow-x rounded-full transition-[filter,transform] duration-300 group-hover/row:scale-y-130 group-hover/row:brightness-115 motion-reduce:animate-none"
                  style={barStyle(role, today, index)}
                />
              </span>
              <span className="shrink-0 grow-0 basis-[27%] truncate text-[length:4.6cqh] leading-[1.15] text-muted @max-[440px]:basis-[33%] @max-[440px]:text-[10.5px]">
                {role.titleShort}
              </span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="size-[5cqh] flex-none opacity-35 transition-[opacity,translate] duration-300 group-hover/row:translate-x-[1cqh] group-hover/row:opacity-100 @max-[440px]:hidden"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
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
