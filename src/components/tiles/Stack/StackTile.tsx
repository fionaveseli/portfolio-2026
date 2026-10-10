"use client";

import { useState } from "react";

import { Tile, TileBody } from "@/components/ui/Tile";
import { stack, stackIntro } from "@/content/stack";
import { stackTile } from "@/content/tiles";
import { cn } from "@/lib/cn";
import type { StackItem } from "@/types/stack";

import { useDockMagnify } from "./useDockMagnify";

const allTools = `${stack.map((item) => item.name).join(", ")}.`;

function windowText(item: StackItem | undefined) {
  if (!item) return { title: stackIntro.title, heading: stackIntro.heading, detail: allTools };
  return {
    title: `${item.name}, ${item.category}`,
    heading: item.name,
    detail: `${stackTile.usedInPrefix}${item.usedIn}`,
  };
}

/** A tiny desktop: click an app in the dock and its window tells you where I used it. */
export function StackTile() {
  const [hovered, setHovered] = useState(-1);
  const [open, setOpen] = useState(-1);
  /** Counts window changes, so the window pops in again each time. */
  const [opens, setOpens] = useState(0);
  const { iconsRef, onPointerMove, onPointerLeave } = useDockMagnify(setHovered);

  const text = windowText(stack[open]);

  const openApp = (index: number) => {
    setOpen(index);
    setHovered(index);
    setOpens((count) => count + 1);
  };

  const closeApp = () => {
    setOpen(-1);
    setOpens((count) => count + 1);
  };

  return (
    <Tile className="bg-(image:--gradient-wall)">
      <TileBody padding="none" className="items-center gap-[4cqh] p-[5cqh]">
        {/* The window. */}
        <div
          key={opens}
          className={cn(
            "flex min-h-0 flex-1 origin-bottom flex-col self-stretch overflow-hidden rounded-[5cqh] bg-tile shadow-window",
            opens > 0 && "animate-window-in motion-reduce:animate-none",
          )}
        >
          <div className="flex flex-none items-center gap-[2.2cqh] border-b border-line px-[4cqh] py-[3cqh]">
            <button
              type="button"
              data-nodrag=""
              aria-label={stackTile.closeWindow}
              onClick={closeApp}
              className="relative block size-[4.4cqh] min-w-0 cursor-pointer rounded-full bg-mac-red p-0 after:absolute after:-inset-3.5 after:content-['']"
            />
            <i className="block size-[4.4cqh] rounded-full bg-mac-yellow" />
            <i className="block size-[4.4cqh] rounded-full bg-mac-green" />
            <span className="ml-[2cqh] text-[length:4.8cqh] leading-none font-semibold text-muted">
              {text.title}
            </span>
          </div>
          <div
            aria-live="polite"
            className="flex min-h-0 flex-1 flex-col justify-center gap-[1.6cqh] px-[5cqh] @max-[440px]:px-3.5"
          >
            <span className="truncate text-[length:11.5cqh] leading-none font-bold tracking-tightest whitespace-nowrap @max-[440px]:text-[22px]">
              {text.heading}
            </span>
            <span className="text-[length:5cqh] leading-[1.35] text-muted @max-[440px]:text-[11.5px] @max-[440px]:leading-[1.3]">
              {text.detail}
            </span>
          </div>
        </div>

        {/* The dock. */}
        <div
          data-nodrag=""
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          className="flex h-[min(12cqh,5.9cqw)] flex-none items-end gap-[min(1.5cqh,0.75cqw)] rounded-[6cqh] bg-dock px-[2.6cqh] pt-[2cqh] pb-[3cqh] backdrop-blur-md @max-[440px]:h-auto @max-[440px]:max-w-73 @max-[440px]:flex-wrap @max-[440px]:items-center @max-[440px]:justify-center @max-[440px]:gap-2 @max-[440px]:rounded-panel @max-[440px]:p-2"
        >
          {stack.map((item, index) => {
            const running = index === open;
            return (
              <button
                key={item.name}
                ref={(element) => {
                  if (!element) return;
                  iconsRef.current.set(index, element);
                  return () => {
                    iconsRef.current.delete(index);
                  };
                }}
                type="button"
                aria-label={item.name}
                onFocus={() => setHovered(index)}
                onClick={() => openApp(index)}
                className="relative size-[min(11.5cqh,5.6cqw)] flex-none animate-icon-in cursor-pointer p-0 transition-[width,height] duration-140 ease-out motion-reduce:animate-none @max-[440px]:size-9.5"
                style={{ animationDelay: `${index * 0.04}s` }}
              >
                {/* The icon itself; re-keyed to hop each time its app opens. */}
                <span
                  key={running ? opens : "idle"}
                  className={cn(
                    "container-size flex size-full items-center justify-center rounded-[27%] shadow-icon",
                    running && "animate-hop motion-reduce:animate-none",
                  )}
                  style={{ background: item.icon.bg, color: item.icon.fg }}
                >
                  {"path" in item ? (
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="block size-[58cqw]">
                      <path d={item.path} fill="currentColor" />
                    </svg>
                  ) : (
                    <span className="text-[length:44cqw] leading-none font-bold">
                      {item.monogram}
                    </span>
                  )}
                </span>
                {/* Tooltip. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-3 -translate-x-1/2 translate-y-1.5 rounded-lg bg-sheet-fg px-2.5 py-1.25 text-caption font-semibold whitespace-nowrap text-paper opacity-0 transition-[opacity,translate] duration-200 @max-[440px]:hidden",
                    hovered === index && "translate-y-0 opacity-100",
                  )}
                >
                  {item.name}
                </span>
                {/* Running indicator. */}
                {running && (
                  <span
                    aria-hidden="true"
                    className="absolute top-[calc(100%+1cqh)] left-1/2 size-[1.3cqh] -translate-x-1/2 rounded-full bg-fg @max-[440px]:hidden"
                  />
                )}
              </button>
            );
          })}
        </div>
      </TileBody>
    </Tile>
  );
}
