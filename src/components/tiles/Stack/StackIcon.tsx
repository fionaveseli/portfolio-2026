import { cn } from "@/lib/cn";
import type { StackItem } from "@/types/stack";

export interface StackIconProps {
  item: StackItem;
  className?: string;
}

/**
 * One app icon: the tool's logo on its own colour, with macOS-style rounded corners.
 * It is a size container, so the logo scales with whatever size the parent gives it.
 */
export function StackIcon({ item, className }: StackIconProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "container-size flex items-center justify-center rounded-[27%] shadow-icon",
        className,
      )}
      style={{ background: item.icon.bg, color: item.icon.fg }}
    >
      {item.path ? (
        <svg viewBox="0 0 24 24" className="block size-[58cqw]">
          <path d={item.path} fill="currentColor" />
        </svg>
      ) : (
        <span className="text-[length:44cqw] leading-none font-bold">{item.monogram}</span>
      )}
    </span>
  );
}
