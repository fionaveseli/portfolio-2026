"use client";

import { useCallback, useRef, useState, type CSSProperties } from "react";

import { Tile, TileBody } from "@/components/ui/Tile";
import { TileLabel } from "@/components/ui/TileLabel";
import { projectNumber } from "@/content/projects";
import { projectTile } from "@/content/tiles";
import type { Project, Wordmark, WordmarkFamily } from "@/types/project";

import { ProjectSheet } from "./ProjectSheet";

const familyClasses: Record<WordmarkFamily, string> = {
  sans: "font-sans",
  mono: "font-mono",
  grotesque: "font-grotesque",
  serif: "font-serif",
};

function wordmarkStyle(wordmark: Wordmark): CSSProperties {
  return {
    fontSize: `min(${wordmark.size}cqh, ${wordmark.size}cqw)`,
    lineHeight: wordmark.leading,
    fontWeight: wordmark.weight,
    letterSpacing: wordmark.tracking === undefined ? undefined : `${wordmark.tracking}em`,
    fontStyle: wordmark.italic ? "italic" : undefined,
  };
}

/** One project, its name set like its own logo. "View" opens its details sheet. */
export function ProjectTile({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const tileRef = useRef<HTMLDivElement>(null);
  const getOrigin = useCallback(() => tileRef.current, []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <div ref={tileRef} className="size-full">
        <Tile tone={project.tone} className="group/project">
          <TileBody justify="between">
            <TileLabel aside={project.kind}>{projectNumber(project.slug)}</TileLabel>
            <span
              className={familyClasses[project.wordmark.family]}
              style={wordmarkStyle(project.wordmark)}
            >
              {project.wordmark.text}
            </span>
            <button
              type="button"
              data-nodrag=""
              data-cur="Open"
              aria-label={`Open ${project.title}`}
              aria-haspopup="dialog"
              onClick={() => setOpen(true)}
              className="group/view inline-flex min-h-11 cursor-pointer items-center self-start rounded-full bg-tint-strong px-[5cqh] text-[length:5.6cqh] font-semibold transition-colors duration-300 group-hover/project:bg-paper group-hover/project:text-ink hover:bg-paper hover:text-ink focus-visible:bg-paper focus-visible:text-ink"
            >
              {projectTile.view}
              <span
                aria-hidden="true"
                className="inline-block max-w-0 -translate-x-1.5 overflow-hidden opacity-0 transition-[max-width,opacity,translate,margin] duration-350 ease-out-soft group-hover/project:ml-[0.45em] group-hover/project:max-w-[1.2em] group-hover/project:translate-x-0 group-hover/project:opacity-100 group-focus-visible/view:ml-[0.45em] group-focus-visible/view:max-w-[1.2em] group-focus-visible/view:translate-x-0 group-focus-visible/view:opacity-100"
              >
                →
              </span>
            </button>
          </TileBody>
        </Tile>
      </div>
      {open && <ProjectSheet project={project} onClose={close} getOrigin={getOrigin} />}
    </>
  );
}
