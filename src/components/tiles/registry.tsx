import type { ReactNode } from "react";

import { projects } from "@/content/projects";

import { AboutTile } from "./About/AboutTile";
import { ContactTile } from "./Contact/ContactTile";
import { ContributionsTile } from "./Contributions/ContributionsTile";
import { EducationTile } from "./Education/EducationTile";
import { ExperienceTile } from "./Experience/ExperienceTile";
import { IntroTile } from "./Intro/IntroTile";
import { KiraTile } from "./Kira/KiraTile";
import { LightsTile } from "./Lights/LightsTile";
import { MapTile } from "./Map/MapTile";
import { ProjectTile } from "./Project/ProjectTile";
import { StackTile } from "./Stack/StackTile";
import { TerminalTile } from "./Terminal/TerminalTile";

/** Tiles that aren't projects, by grid id. */
const fixedTiles: Readonly<Record<string, () => ReactNode>> = {
  intro: () => <IntroTile />,
  about: () => <AboutTile />,
  contact: () => <ContactTile />,
  contributions: () => <ContributionsTile />,
  education: () => <EducationTile />,
  experience: () => <ExperienceTile />,
  kira: () => <KiraTile />,
  lights: () => <LightsTile />,
  map: () => <MapTile />,
  stack: () => <StackTile />,
  terminal: () => <TerminalTile />,
};

/** The tile for a grid id: a project's slug, or one of the fixed tiles. */
export function renderTile(id: string): ReactNode {
  const project = projects.find((candidate) => candidate.slug === id);
  if (project) return <ProjectTile project={project} />;
  const render = fixedTiles[id];
  if (!render) throw new Error(`No tile is registered for grid id "${id}".`);
  return render();
}
