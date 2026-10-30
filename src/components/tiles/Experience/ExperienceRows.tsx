"use client";

import { useCallback, useRef, useState, type CSSProperties } from "react";

import { roles } from "@/content/experience";
import { experienceTile } from "@/content/tiles";
import { cn } from "@/lib/cn";
import type { Role } from "@/types/experience";

import { RoleSheet } from "./RoleSheet";

export interface TimelineBarStyle {
  /** The bar's position, size and colour. */
  readonly style: CSSProperties;
  /** Where the bar's dates tooltip sits. */
  readonly tooltip: CSSProperties;
  /** True when the tooltip is centred on `tooltip.left` rather than aligned to a bar end. */
  readonly centred: boolean;
}

export interface ExperienceRowsProps {
  /** One per role, worked out on the server so the timeline matches the build. */
  bars: readonly TimelineBarStyle[];
}

/** The timeline rows. Each whole row is a button that opens its role's sheet. */
export function ExperienceRows({ bars }: ExperienceRowsProps) {
  const [open, setOpen] = useState<Role | null>(null);
  const rowsRef = useRef(new Map<string, HTMLButtonElement>());
  const getOrigin = useCallback(
    () => (open ? (rowsRef.current.get(open.id) ?? null) : null),
    [open],
  );
  const close = useCallback(() => setOpen(null), []);

  return (
    <>
      <div className="flex min-h-0 flex-1 flex-col justify-between">
        {roles.map((role, index) => (
          <button
            key={role.id}
            ref={(element) => {
              if (element) rowsRef.current.set(role.id, element);
              else rowsRef.current.delete(role.id);
            }}
            type="button"
            data-nodrag=""
            data-cur="Open"
            aria-haspopup="dialog"
            aria-label={`${role.company}, ${role.title}, ${role.period}. ${experienceTile.open}.`}
            onClick={() => setOpen(role)}
            className="group/row flex w-full cursor-pointer items-center gap-[4cqh] rounded-[1.6cqh] border-t border-line py-[1.9cqh] text-left transition-[padding,background-color] duration-300 ease-bounce outline-none hover:bg-well/60 hover:pr-[1.6cqh] hover:pl-[2.4cqh] focus-visible:bg-well/60 focus-visible:pr-[1.6cqh] focus-visible:pl-[2.4cqh] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-fg motion-reduce:transition-none @max-[440px]:gap-[9px]"
          >
            <b className="min-w-0 shrink-0 grow-0 basis-[28%] truncate text-[length:5.8cqh] leading-[1.15] font-semibold tracking-[-0.025em] @max-[440px]:basis-[36%] @max-[440px]:text-[12.5px]">
              {role.companyShort}
            </b>
            <span className="relative h-[5cqh] flex-1 rounded-full bg-well">
              <i
                className="absolute inset-y-0 min-w-[5cqh] origin-left animate-grow-x rounded-full transition-[filter,transform] duration-300 group-hover/row:scale-y-130 group-hover/row:brightness-115 group-focus-visible/row:scale-y-130 group-focus-visible/row:brightness-115 motion-reduce:animate-none"
                style={bars[index]?.style}
              />
              {/* Exact dates over the bar, on hover or keyboard focus. */}
              <span
                aria-hidden="true"
                className={cn(
                  bars[index]?.centred && "-translate-x-1/2",
                  "pointer-events-none absolute bottom-[calc(100%+1.2cqh)] z-3 translate-y-1 rounded-md bg-sheet-fg px-2 py-1 text-caption font-semibold whitespace-nowrap text-paper opacity-0 transition-[opacity,translate] duration-150 group-hover/row:translate-y-0 group-hover/row:opacity-100 group-focus-visible/row:translate-y-0 group-focus-visible/row:opacity-100 @max-[440px]:hidden",
                )}
                style={bars[index]?.tooltip}
              >
                {role.period}
              </span>
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
              className="size-[5cqh] flex-none opacity-35 transition-[opacity,translate] duration-300 group-hover/row:translate-x-[1cqh] group-hover/row:opacity-100 group-focus-visible/row:translate-x-[1cqh] group-focus-visible/row:opacity-100 @max-[440px]:hidden"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ))}
      </div>
      {open && <RoleSheet role={open} onClose={close} getOrigin={getOrigin} />}
    </>
  );
}
