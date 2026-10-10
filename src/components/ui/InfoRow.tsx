import type { ReactNode } from "react";

/** Wraps InfoRows in a description list. */
export function InfoList({ children }: { children: ReactNode }) {
  return <dl>{children}</dl>;
}

export interface InfoRowProps {
  /** e.g. "Stack". */
  label: string;
  /** e.g. "React, Next.js, Zustand". */
  children: ReactNode;
}

/** One label / value line in a sheet, separated by a hairline. */
export function InfoRow({ label, children }: InfoRowProps) {
  return (
    <div className="flex justify-between gap-5 border-t border-sheet-line py-2.5 text-row">
      <dt className="text-sheet-muted">{label}</dt>
      <dd className="text-right font-medium">{children}</dd>
    </div>
  );
}
