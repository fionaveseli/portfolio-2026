import { Tile, TileBody } from "@/components/ui/Tile";
import { TileLabel } from "@/components/ui/TileLabel";
import { education } from "@/content/tiles";

export function EducationTile() {
  return (
    <Tile>
      <TileBody justify="between">
        <TileLabel aside={education.years}>{education.label}</TileLabel>
        <div className="flex flex-col gap-[2cqh]">
          <span className="mb-[3cqh] flex size-[min(26cqh,26cqw)] items-center justify-center rounded-[30%] bg-well">
            {/* Graduation cap (Lucide). */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="size-[56%]"
            >
              <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
              <path d="M22 10v6" />
              <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
            </svg>
          </span>
          <span className="text-[length:6cqh] leading-[1.3]">
            {education.degree}
            <br />
            <span className="text-muted">{education.school}</span>
          </span>
        </div>
      </TileBody>
    </Tile>
  );
}
