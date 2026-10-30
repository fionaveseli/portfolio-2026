/**
 * Copy for the smaller tiles. Projects, roles and the stack have their own files.
 */

export const intro = {
  eyebrow: "Portfolio 2026",
  wave: "Hello",
  greeting: "Hi, I'm Fiona.",
  taglineLead: "Frontend engineer, ",
  taglineMark: "product-minded.",
  blurb:
    "I spend a lot of time figuring out how things should work, how they should feel, and whether I could build them myself. The answer to that last one usually becomes a side project.",
} as const;

export const about = {
  label: "About",
  aside: "Who I am",
  /** The tile shows the lead and the short line; the sheet tells the rest. */
  lead: "I'm a frontend engineer who likes being involved in more than just the frontend. ",
  body: "I've spent the past few years building production applications and working closely with backend teams.",
  more: "Read more",
  sheetEyebrow: "About",
  sheetTitle: "Hi, I'm Fiona.",
  tone: { bg: "#1D1D1F", fg: "#FFFFFF" },
  paragraphs: [
    "I'm a frontend engineer who likes being involved in more than just the frontend.",
    "I've spent the past few years building production applications, working closely with backend teams, and figuring out how to turn complicated ideas into interfaces that actually make sense.",
    "I love the creative side of development just as much as the technical side. Design, product decisions, understanding why something should exist in the first place: all of it interests me. I'm also one of those rare developers who genuinely enjoys meetings.",
    "Outside of work, I'm usually experimenting with an idea of my own. Sometimes it becomes a real product, sometimes it's just something I wanted to see if I could build.",
    "I guess I just really like making things.",
  ],
  close: "Close",
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

export const projectSheet = {
  /** Eyebrow: "Project 03 of 08". */
  counter: (number: string, total: number) =>
    `Project ${number} of ${String(total).padStart(2, "0")}`,
  role: "Role",
  year: "Year",
  stack: "Stack",
  status: "Status",
  close: "Close",
} as const;
