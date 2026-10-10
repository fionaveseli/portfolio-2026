/**
 * Copy for the smaller tiles. Projects, roles and the stack have their own files.
 */

export const intro = {
  eyebrow: "Portfolio 2026",
  wave: "Hello",
  greeting: "Hi, I'm Fiona.",
  taglineLead: "A frontend engineer with ",
  taglineMark: "an eye for design.",
  hint: "Everything here does something. Have a poke around.",
} as const;

export const about = {
  label: "About",
  aside: "Who I am",
  lead: "I'm a bit all over the place, in a good way. ",
  body: "I like the business side. I love meetings, which I know is rare. I love design, and I love building things and solving problems. By day I'm a frontend developer, and on the side I build products of my own.",
} as const;

export const terminal = {
  title: "when I'm not coding",
  prompt: "fiona ~ %",
  firstCommand: "ls hobbies/",
  hobbies: ["running/", "mountains/", "pilates/", "painting/", "fashion/", "makeup/"],
  secondCommand: "git status",
  status: ["On branch weekend", "nothing to commit, going outside"],
  replay: "Run it again",
} as const;

export const kira = {
  photoAlt: "Kira, a white long-haired cat, sitting in a sunny window",
  name: "Kira",
  title: "Outsmart my cat",
  newGame: "New game",
  /** What the bubble says Kira is doing, after her name. */
  verbs: {
    "your-turn": "is waiting",
    "kira-thinks": "is thinking",
    "kira-wins": "won",
    "you-win": "lost",
    draw: "called it a draw",
  },
  says: {
    start: "Play with me.",
    "your-turn": "Your move.",
    "kira-thinks": "hmm.",
    "kira-wins": "I win. Feed me.",
    "you-win": "Fine. You win.",
    draw: "Draw. Nap time.",
  },
  squares: { empty: "empty", visitor: "yours", kira: "Kira" },
} as const;

export const experienceTile = {
  label: "Experience",
  aside: "Click a role",
  axisStart: "2020",
  axisEnd: "Now",
} as const;

export const education = {
  label: "Education",
  years: "2021 to 2025",
  degree: "BSc Computing and Information Technologies",
  school: "Rochester Institute of Technology",
} as const;

export const contributions = {
  label: "Contributions",
  countSuffix: "from you",
  hint: "Hover or tap to commit.",
  description:
    "A contribution graph that spells HI. Hover or tap the squares to add your own commits.",
} as const;

export const lights = {
  label: "Lights",
  on: "On",
  off: "Off",
  hint: "Go on, flip it.",
  switchLabel: "Dark mode",
} as const;

export const contact = {
  label: "Contact",
  aside: "Open to work",
  headingLead: "Let's work ",
  headingMark: "together.",
  linkedinLabel: "LinkedIn",
} as const;

export const map = {
  location: "Prishtina, Kosova",
} as const;

export const stackTile = {
  usedInPrefix: "Used in: ",
  closeWindow: "Close window",
} as const;

export const projectTile = {
  view: "View",
} as const;
