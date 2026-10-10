import { BentoGrid } from "@/components/grid/BentoGrid";
import { FilterNav } from "@/components/grid/FilterNav";
import { GridFilterProvider } from "@/components/grid/GridFilter";
import { renderTile } from "@/components/tiles/registry";
import { gridFilters, gridItems, pinnedTiles } from "@/content/grid";
import { site } from "@/content/site";

export default function HomePage() {
  const tiles = Object.fromEntries(
    [...pinnedTiles, ...gridItems].map((item) => [item.id, renderTile(item.id)]),
  );

  return (
    <GridFilterProvider>
      <header className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-x-5 gap-y-2.5 px-gutter py-4.5">
        <span className="text-wordmark">{site.name}</span>
        <FilterNav options={gridFilters} />
      </header>
      <main className="mx-auto max-w-page px-gutter pt-1.5 pb-14">
        <BentoGrid pinned={pinnedTiles} items={gridItems} tiles={tiles} />
        <p className="mt-7 text-center text-fine text-muted">{site.credit}</p>
      </main>
    </GridFilterProvider>
  );
}
