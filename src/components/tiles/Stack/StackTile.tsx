"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef, useState, type KeyboardEvent } from "react";

import { Tile, TileBody } from "@/components/ui/Tile";
import { stack, stackIntro } from "@/content/stack";
import { stackTile } from "@/content/tiles";
import { cn } from "@/lib/cn";
import type { StackItem } from "@/types/stack";

import { StackIcon } from "./StackIcon";

/** Content swap: a short fade with a small rise, around 200ms. */
const SWAP = { duration: 0.2, ease: [0.2, 0.8, 0.2, 1] } as const;

const tools: readonly StackItem[] = stack;

function WindowContent({ item }: { item: StackItem | undefined }) {
  if (!item) {
    return (
      <>
        <h3 className="text-[length:8.6cqh] leading-[1.08] font-bold tracking-tightest @max-[440px]:text-[19px]">
          {stackIntro.heading}
        </h3>
        <p className="max-w-[46ch] text-[length:5cqh] leading-[1.4] text-muted @max-[440px]:text-[12px]">
          {stackIntro.description}
        </p>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center gap-[3.4cqh] @max-[440px]:gap-3">
        <StackIcon item={item} className="size-[14cqh] flex-none @max-[440px]:size-10" />
        <div className="flex min-w-0 flex-col items-start gap-[1.4cqh]">
          <span className="rounded-full bg-well px-[2.2cqh] py-[0.8cqh] text-[length:3.8cqh] leading-none font-semibold text-muted @max-[440px]:px-2 @max-[440px]:py-1 @max-[440px]:text-[10px]">
            {item.category}
          </span>
          <h3 className="truncate text-[length:9.5cqh] leading-none font-bold tracking-tightest @max-[440px]:text-[22px]">
            {item.name}
          </h3>
        </div>
      </div>
      <p className="max-w-[52ch] text-[length:5cqh] leading-[1.4] text-muted @max-[440px]:text-[12px]">
        {item.description}
      </p>
    </>
  );
}

/**
 * A tiny macOS app: pick a tool in the dock and the window says how I use it.
 * Picking the open tool again, or the red button, goes back to the start.
 */
export function StackTile() {
  const [open, setOpen] = useState(-1);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const reduceMotion = useReducedMotion() === true;
  const item = tools[open];

  const toggle = (index: number) => setOpen((current) => (current === index ? -1 : index));

  // Arrow keys move along the dock; Tab still moves in and out of it.
  const onDockKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const current = buttonsRef.current.findIndex((button) => button === document.activeElement);
    const last = tools.length - 1;
    let next: number;
    if (event.key === "ArrowRight") next = current === last ? 0 : current + 1;
    else if (event.key === "ArrowLeft") next = current <= 0 ? last : current - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    else return;
    event.preventDefault();
    buttonsRef.current[next]?.focus();
  };

  return (
    <Tile className="bg-(image:--gradient-wall)">
      <TileBody padding="none" className="p-[4.5cqh] @max-[440px]:p-2.5">
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[5cqh] bg-tile shadow-window @max-[440px]:rounded-2xl">
          {/* Title bar. */}
          <div className="flex flex-none items-center gap-[2cqh] border-b border-line px-[4cqh] py-[2.6cqh] @max-[440px]:gap-1.5 @max-[440px]:px-3 @max-[440px]:py-2">
            <button
              type="button"
              data-nodrag=""
              aria-label={stackTile.closeWindow}
              disabled={!item}
              onClick={() => setOpen(-1)}
              className="relative block size-[4cqh] min-w-0 rounded-full bg-mac-red p-0 not-disabled:cursor-pointer after:absolute after:-inset-3 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg @max-[440px]:size-2.5"
            />
            <i className="block size-[4cqh] rounded-full bg-mac-yellow @max-[440px]:size-2.5" />
            <i className="block size-[4cqh] rounded-full bg-mac-green @max-[440px]:size-2.5" />
            <span className="ml-[1.6cqh] truncate text-[length:4.4cqh] leading-none font-semibold text-muted @max-[440px]:text-[11px]">
              {item ? item.name : stackIntro.title}
            </span>
          </div>

          {/* Window content. Both states sit in the same box, so the window never resizes. */}
          <div aria-live="polite" className="relative min-h-0 flex-1">
            <AnimatePresence initial={false}>
              <motion.div
                key={item?.name ?? "intro"}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
                transition={SWAP}
                className="absolute inset-0 flex flex-col justify-center gap-[2.6cqh] px-[6cqh] @max-[440px]:gap-2 @max-[440px]:px-3.5"
              >
                <WindowContent item={item} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* The dock, anchored to the bottom of the window. */}
          <div
            role="toolbar"
            aria-label={stackTile.dockLabel}
            data-nodrag=""
            onKeyDown={onDockKeyDown}
            className="flex flex-none justify-center border-t border-line bg-well/70 px-[3cqh] pt-[2.4cqh] pb-[3.2cqh] @max-[440px]:justify-start @max-[440px]:overflow-x-auto @max-[440px]:px-3 @max-[440px]:pt-2.5 @max-[440px]:pb-3.5 @max-[440px]:[scrollbar-width:none]"
          >
            <div className="flex gap-[min(1.8cqh,0.9cqw)] @max-[440px]:gap-2">
              {tools.map((tool, index) => {
                const active = index === open;
                return (
                  <button
                    key={tool.name}
                    ref={(element) => {
                      buttonsRef.current[index] = element;
                    }}
                    type="button"
                    aria-label={tool.name}
                    aria-pressed={active}
                    onClick={() => toggle(index)}
                    className="group/icon relative size-[min(9.5cqh,5cqw)] flex-none animate-icon-in cursor-pointer rounded-[27%] p-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg motion-reduce:animate-none @max-[440px]:size-9"
                    style={{ animationDelay: `${index * 0.04}s` }}
                  >
                    <StackIcon
                      item={tool}
                      className={cn(
                        "size-full transition-transform duration-200 ease-out-soft group-hover/icon:-translate-y-[1.2cqh] group-hover/icon:scale-110 motion-reduce:transition-none motion-reduce:group-hover/icon:translate-y-0 motion-reduce:group-hover/icon:scale-100",
                        active && "-translate-y-[0.6cqh] scale-105",
                      )}
                    />
                    {/* Tooltip: pointer hover or keyboard focus only, never on touch. */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-[calc(100%+1.6cqh)] left-1/2 z-3 -translate-x-1/2 translate-y-1 rounded-md bg-sheet-fg px-2 py-1 text-caption font-semibold whitespace-nowrap text-paper opacity-0 transition-[opacity,translate] duration-150 group-hover/icon:translate-y-0 group-hover/icon:opacity-100 group-focus-visible/icon:translate-y-0 group-focus-visible/icon:opacity-100 @max-[440px]:hidden"
                    >
                      {tool.name}
                    </span>
                    {/* Running indicator. */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute top-[calc(100%+0.9cqh)] left-1/2 size-[1.1cqh] -translate-x-1/2 rounded-full bg-fg opacity-0 transition-opacity duration-200 @max-[440px]:top-[calc(100%+3px)] @max-[440px]:size-1",
                        active && "opacity-100",
                      )}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </TileBody>
    </Tile>
  );
}
