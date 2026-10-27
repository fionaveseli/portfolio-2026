"use client";

import { InfoList, InfoRow } from "@/components/ui/InfoRow";
import { Pill } from "@/components/ui/Pill";
import { Sheet, SheetBody, SheetClose, SheetHeader } from "@/components/ui/Sheet";
import { projectNumber, projects } from "@/content/projects";
import { projectSheet } from "@/content/tiles";
import type { Project } from "@/types/project";

export interface ProjectSheetProps {
  project: Project;
  /** Called once the close animation has finished; the parent then unmounts the sheet. */
  onClose: () => void;
  /** The tile the sheet grows out of and shrinks back into. */
  getOrigin: () => Element | null;
}

/** A project's details: what it is, what I did, and the facts in rows. */
export function ProjectSheet({ project, onClose, getOrigin }: ProjectSheetProps) {
  const allRows: readonly { label: string; value: string | undefined }[] = [
    { label: projectSheet.role, value: project.role },
    { label: projectSheet.year, value: project.year },
    { label: projectSheet.stack, value: project.stack },
    { label: projectSheet.status, value: project.status },
  ];
  const rows = allRows.filter(
    (row): row is { label: string; value: string } => row.value !== undefined,
  );

  return (
    <Sheet label={project.title} tone={project.tone} onClose={onClose} getOrigin={getOrigin}>
      <SheetHeader
        eyebrow={projectSheet.counter(projectNumber(project.slug), projects.length)}
        eyebrowAside={project.kind}
        title={project.title}
      />
      <SheetBody>
        <p className="text-lead">{project.summary}</p>
        <ul className="flex flex-col gap-2 text-small text-sheet-muted">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-2.5">
              <span
                aria-hidden="true"
                className="mt-[0.6em] size-1.5 flex-none rounded-full bg-(--accent)"
              />
              {highlight}
            </li>
          ))}
        </ul>
        <InfoList>
          {rows.map((row) => (
            <InfoRow key={row.label} label={row.label}>
              {row.value}
            </InfoRow>
          ))}
        </InfoList>
        <div className="flex flex-wrap gap-2">
          {project.link && (
            <Pill variant="ink" href={project.link.href} target="_blank" rel="noreferrer">
              {project.link.label}
            </Pill>
          )}
          <SheetClose>{projectSheet.close}</SheetClose>
        </div>
      </SheetBody>
    </Sheet>
  );
}
