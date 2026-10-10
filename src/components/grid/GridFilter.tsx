"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

import type { GridFilter } from "@/types/grid";

interface GridFilterContextValue {
  filter: GridFilter;
  setFilter: (filter: GridFilter) => void;
}

const GridFilterContext = createContext<GridFilterContextValue | null>(null);

/** Shares the active filter between the header's FilterNav and the BentoGrid. */
export function GridFilterProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState<GridFilter>("all");
  const value = useMemo(() => ({ filter, setFilter }), [filter]);
  return <GridFilterContext value={value}>{children}</GridFilterContext>;
}

export function useGridFilter(): GridFilterContextValue {
  const context = useContext(GridFilterContext);
  if (!context) throw new Error("useGridFilter must be used inside <GridFilterProvider>.");
  return context;
}
