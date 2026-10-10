"use client";

import { cn } from "@/lib/cn";
import type { GridFilterOption } from "@/types/grid";

import { useGridFilter } from "./GridFilter";

export interface FilterNavProps {
  options: readonly GridFilterOption[];
}

/** All / About / Work / Play. Brings matching tiles to the front and fades the rest. */
export function FilterNav({ options }: FilterNavProps) {
  const { filter, setFilter } = useGridFilter();

  return (
    <nav aria-label="Filter tiles" className="flex gap-0.5 rounded-full bg-tile p-1">
      {options.map((option) => {
        const active = option.value === filter;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => setFilter(option.value)}
            className={cn(
              "min-h-11 cursor-pointer rounded-full px-4.5 text-ui font-medium transition-colors duration-300",
              active ? "bg-pink text-on-pink" : "text-fg",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </nav>
  );
}
