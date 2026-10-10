"use client";

import Image from "next/image";

import { Tile } from "@/components/ui/Tile";
import { kira } from "@/content/tiles";
import { cn } from "@/lib/cn";
import type { GameStatus, Mark } from "@/lib/tictactoe";

import kiraAvatar from "@/assets/kira/kira-avatar.jpg";
import kiraWindow from "@/assets/kira/kira-window.jpg";

import { useKiraGame } from "./useKiraGame";

const badgeClasses: Record<GameStatus, string> = {
  "your-turn": "bg-idle",
  "kira-thinks": "bg-idle",
  "kira-wins": "bg-ok",
  "you-win": "bg-no",
  draw: "bg-idle",
};

function squareLabel(index: number, mark: Mark): string {
  const owner =
    mark === 1 ? kira.squares.visitor : mark === 2 ? kira.squares.kira : kira.squares.empty;
  return `Square ${index + 1}, ${owner}`;
}

/** Your mark: a pink ring. */
function VisitorMark() {
  return (
    <span className="block size-[56%] animate-pop rounded-full border-[1.6cqh] border-pink-strong motion-reduce:animate-none" />
  );
}

/** Kira's mark: a little cat head. */
function KiraMark() {
  return (
    <span className="block size-[56%] animate-pop rounded-[50%_50%_46%_46%] bg-fg [clip-path:polygon(0_30%,18%_0,36%_26%,64%_26%,82%_0,100%_30%,100%_100%,0_100%)] motion-reduce:animate-none" />
  );
}

const resetIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="size-[52%]"
  >
    <path d="M4 12a8 8 0 1 1 2.6 5.9M4 19v-5h5" />
  </svg>
);

/** Kira in her window, and a game of noughts and crosses against her. */
export function KiraTile() {
  const { board, status, winning, play, reset } = useKiraGame();
  const started = board.some(Boolean);
  const says = status === "your-turn" && !started ? kira.says.start : kira.says[status];
  const moves = board.filter(Boolean).length;

  return (
    <Tile>
      {/* Photo: left half. */}
      <div className="absolute inset-y-0 right-1/2 left-0">
        <Image
          src={kiraWindow}
          alt={kira.photoAlt}
          fill
          sizes="(min-width: 900px) 280px, 50vw"
          placeholder="blur"
          draggable={false}
          className="object-cover"
        />
      </div>

      {/* Kira's speech bubble, over the photo. */}
      <div className="absolute inset-y-0 left-0 flex w-1/2 flex-col justify-end p-[5cqh]">
        <div aria-live="polite">
          <div
            key={`${status}-${moves}`}
            className="flex animate-bubble-in items-center gap-[3cqh] rounded-full bg-bubble py-[3cqh] pr-[4cqh] pl-[3cqh] text-sheet-fg shadow-bubble motion-reduce:animate-none"
          >
            <Image
              src={kiraAvatar}
              alt=""
              draggable={false}
              className="size-[12cqh] flex-none rounded-full object-cover"
            />
            <div className="flex min-w-0 flex-col gap-[0.8cqh]">
              <span className="flex items-center gap-[1.6cqh] text-[length:4.6cqh] leading-[1.2] whitespace-nowrap text-sheet-muted">
                <b className="font-bold text-sheet-fg">{kira.name}</b> {kira.verbs[status]}
                <i
                  className={cn("block size-[4.4cqh] flex-none rounded-full", badgeClasses[status])}
                />
              </span>
              <span className="truncate font-mono text-[length:5.6cqh] leading-[1.25] whitespace-nowrap">
                {says}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* The game: right half. */}
      <div className="absolute inset-y-0 right-0 flex w-1/2 flex-col gap-[4cqh] px-[7cqh] pt-[6cqh] pb-[7cqh]">
        <div className="flex items-center justify-between gap-[3cqh]">
          <span className="text-[length:5.6cqh] leading-[1.2] font-semibold">{kira.title}</span>
          <button
            type="button"
            data-nodrag=""
            data-cur={kira.newGame}
            aria-label={kira.newGame}
            onClick={reset}
            className="relative flex size-[11cqh] cursor-pointer items-center justify-center rounded-full bg-well text-fg transition-[rotate] duration-400 ease-bounce after:absolute after:-inset-2.25 after:content-[''] hover:-rotate-180"
          >
            {resetIcon}
          </button>
        </div>
        <div
          data-nodrag=""
          className="grid aspect-square min-h-0 flex-1 grid-cols-3 grid-rows-3 gap-[2.4cqh] self-center"
        >
          {board.map((mark, index) => (
            <button
              key={index}
              type="button"
              data-cur="Play"
              aria-label={squareLabel(index, mark)}
              onClick={() => play(index)}
              className={cn(
                "flex cursor-pointer items-center justify-center rounded-[5cqh] p-0 transition-[background-color,scale] duration-200 hover:scale-106",
                winning.has(index) ? "bg-win-cell" : "bg-well",
              )}
            >
              {mark === 1 && <VisitorMark />}
              {mark === 2 && <KiraMark />}
            </button>
          ))}
        </div>
      </div>
    </Tile>
  );
}
