"use client";

import { InfoList, InfoRow } from "@/components/ui/InfoRow";
import { Sheet, SheetBody, SheetClose, SheetHeader } from "@/components/ui/Sheet";
import { roleSheet } from "@/content/tiles";
import type { Role } from "@/types/experience";

export interface RoleSheetProps {
  role: Role;
  /** Called once the close animation has finished; the parent then unmounts the sheet. */
  onClose: () => void;
  /** The row the sheet grows out of and shrinks back into. */
  getOrigin: () => Element | null;
}

/** One role in full: what the work was, what I did, and the facts in rows. */
export function RoleSheet({ role, onClose, getOrigin }: RoleSheetProps) {
  return (
    <Sheet label={role.company} tone={role.tone} onClose={onClose} getOrigin={getOrigin}>
      <SheetHeader
        eyebrow={role.period}
        eyebrowAside={role.duration}
        title={role.company}
        subtitle={role.title}
      />
      <SheetBody>
        <p className="text-lead">{role.intro}</p>
        <div className="flex flex-col gap-2.5">
          <h3 className="text-caption font-semibold text-sheet-muted">{roleSheet.highlights}</h3>
          <ul className="flex flex-col gap-2 text-small text-sheet-muted">
            {role.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-2.5">
                <span
                  aria-hidden="true"
                  className="mt-[0.6em] size-1.5 flex-none rounded-full bg-(--accent)"
                />
                {highlight}
              </li>
            ))}
          </ul>
        </div>
        <InfoList>
          <InfoRow label={roleSheet.role}>{role.title}</InfoRow>
          <InfoRow label={roleSheet.dates}>{role.period}</InfoRow>
          <InfoRow label={roleSheet.stack}>{role.stack}</InfoRow>
        </InfoList>
        <div className="flex flex-wrap gap-2">
          <SheetClose>{roleSheet.close}</SheetClose>
        </div>
      </SheetBody>
    </Sheet>
  );
}
