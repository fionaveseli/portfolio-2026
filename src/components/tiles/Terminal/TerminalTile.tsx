"use client";

import { useState, type CSSProperties } from "react";

import { Tile, TileBody } from "@/components/ui/Tile";
import { terminal } from "@/content/tiles";

const tone = { bg: "var(--color-ink)", fg: "var(--color-moon)" };

/** When each line appears, in seconds after the script starts. */
const timing = {
  firstCommand: 0.4,
  hobbies: 1.5,
  hobbyStagger: 0.08,
  secondLine: 2.1,
  secondCommand: 2.3,
  status: 3.4,
  lastPrompt: 4,
  typing: 0.9,
} as const;

function typedStyle(text: string, delay: number): CSSProperties {
  return {
    animation: `type ${timing.typing}s steps(${text.length}, end) ${delay}s forwards`,
    "--type-to": `${text.length}ch`,
  } as CSSProperties;
}

function appearAt(delay: number): CSSProperties {
  return { animationDelay: `${delay}s` };
}

const appearClass = "animate-appear opacity-0 motion-reduce:animate-none motion-reduce:opacity-100";

function Typed({ text, delay }: { text: string; delay: number }) {
  return (
    <span
      className="inline-block w-0 overflow-hidden align-bottom motion-reduce:w-auto motion-reduce:animate-none!"
      style={typedStyle(text, delay)}
    >
      {text}
    </span>
  );
}

function Prompt() {
  return <span className="text-term-dim">{terminal.prompt}</span>;
}

/** The script plays once on mount; remounting it (new key) plays it again. */
function Script() {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-[1.2cqh] font-mono text-[length:min(5.3cqh,6.5cqw)] leading-[1.45] whitespace-nowrap">
      <div>
        <Prompt /> <Typed text={terminal.firstCommand} delay={timing.firstCommand} />
      </div>
      <div className="grid grid-cols-2 gap-x-[3cqh] text-pink">
        {terminal.hobbies.map((hobby, index) => (
          <span
            key={hobby}
            className="animate-appear-soft opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
            style={appearAt(timing.hobbies + index * timing.hobbyStagger)}
          >
            {hobby}
          </span>
        ))}
      </div>
      <div className={appearClass} style={appearAt(timing.secondLine)}>
        <Prompt /> <Typed text={terminal.secondCommand} delay={timing.secondCommand} />
      </div>
      <div
        className={`${appearClass} whitespace-normal text-term-text`}
        style={appearAt(timing.status)}
      >
        {terminal.status[0]}
        <br />
        {terminal.status[1]}
      </div>
      <div className={appearClass} style={appearAt(timing.lastPrompt)}>
        <Prompt />{" "}
        <i className="inline-block h-[5.4cqh] w-[2.6cqh] animate-blink bg-pink align-text-bottom" />
      </div>
    </div>
  );
}

/** A tiny terminal that types out what I do when I'm not coding. */
export function TerminalTile() {
  const [run, setRun] = useState(0);

  return (
    <Tile tone={tone}>
      <TileBody padding="none" className="gap-[4cqh] p-[6cqh]">
        <div className="flex items-center gap-[2.2cqh]">
          <i className="block size-[4.4cqh] rounded-full bg-mac-red @max-[250px]:hidden" />
          <i className="block size-[4.4cqh] rounded-full bg-mac-yellow @max-[250px]:hidden" />
          <i className="block size-[4.4cqh] rounded-full bg-mac-green @max-[250px]:hidden" />
          <span className="ml-[2cqh] font-mono text-[length:4.6cqh] leading-none text-term-dim @max-[250px]:ml-0">
            {terminal.title}
          </span>
          <button
            type="button"
            data-nodrag=""
            data-cur={terminal.replay}
            aria-label={terminal.replay}
            onClick={() => setRun((count) => count + 1)}
            className="relative ml-auto flex size-[9cqh] cursor-pointer items-center justify-center rounded-full bg-tint-soft transition-[background-color,rotate] duration-200 ease-bounce after:absolute after:-inset-3 after:content-[''] hover:-rotate-180"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="size-[56%]"
            >
              <path d="M4 12a8 8 0 1 1 2.6 5.9M4 19v-5h5" />
            </svg>
          </button>
        </div>
        <Script key={run} />
      </TileBody>
    </Tile>
  );
}
