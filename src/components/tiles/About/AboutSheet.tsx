"use client";

import { Sheet, SheetBody, SheetClose, SheetHeader } from "@/components/ui/Sheet";
import { about } from "@/content/tiles";

export interface AboutSheetProps {
  /** Called once the close animation has finished; the parent then unmounts the sheet. */
  onClose: () => void;
  /** The tile the sheet grows out of and shrinks back into. */
  getOrigin: () => Element | null;
}

/** The full About text, opened from the About tile. */
export function AboutSheet({ onClose, getOrigin }: AboutSheetProps) {
  const [first, ...rest] = about.paragraphs;

  return (
    <Sheet label={about.sheetTitle} tone={about.tone} onClose={onClose} getOrigin={getOrigin}>
      <SheetHeader
        eyebrow={about.sheetEyebrow}
        eyebrowAside={about.aside}
        title={about.sheetTitle}
      />
      <SheetBody>
        <p className="text-lead">{first}</p>
        {rest.map((paragraph) => (
          <p key={paragraph} className="text-small text-sheet-muted">
            {paragraph}
          </p>
        ))}
        <div className="flex flex-wrap gap-2">
          <SheetClose>{about.close}</SheetClose>
        </div>
      </SheetBody>
    </Sheet>
  );
}
