import { Pill } from "@/components/ui/Pill";
import { Tile, TileBody } from "@/components/ui/Tile";
import { TileLabel } from "@/components/ui/TileLabel";
import { site } from "@/content/site";
import { contact } from "@/content/tiles";

const tone = { bg: "var(--color-ink)", fg: "var(--color-paper)" };

export function ContactTile() {
  return (
    <Tile tone={tone}>
      <TileBody justify="between">
        <TileLabel aside={contact.aside}>{contact.label}</TileLabel>
        <div className="flex flex-col items-start gap-[4cqh]">
          <span className="text-[length:min(19cqh,9.2cqw)] leading-none font-bold tracking-tightest">
            {contact.headingLead}
            <span className="text-pink">{contact.headingMark}</span>
          </span>
          <div className="flex flex-wrap gap-[2.4cqh]">
            <Pill href={`mailto:${site.email}`} data-nodrag="" data-cur="Say hi">
              {site.email}
            </Pill>
            <Pill variant="ghost" href={site.links.linkedin} data-nodrag="">
              {contact.linkedinLabel}
            </Pill>
          </div>
        </div>
      </TileBody>
    </Tile>
  );
}
