/**
 * Copy for the smaller tiles. Projects, roles and the stack have their own files.
 */

export const intro = {
  eyebrow: "Portfolio 2026",
  wave: "Hello",
  greeting: "Hi, I'm Fiona.",
  taglineLead: "Frontend engineer, ",
  taglineMark: "product-minded.",
} as const;

export const about = {
  label: "About",
  aside: "Who I am",
  /** The tile shows the lead and the short line; the sheet tells the rest. */
  lead: "I'm a little all over the place, in a good way. ",
  body: "I started coding pretty young, and somewhere along the way it turned into a career.",
  more: "Read more",
  sheetEyebrow: "About",
  sheetTitle: "A bit more about me.",
  tone: { bg: "#1D1D1F", fg: "#FFFFFF" },
  paragraphs: [
    "I'm a little all over the place, in a good way.",
    "I started coding pretty young, and somewhere along the way it turned into a career: the past few years building production apps alongside backend and product teams. What I didn't expect was how much I'd enjoy everything around the code, too. The design, the ideas, the business decisions, the conversations about how something should work. I even love meetings, which apparently makes me unusual for a developer.",
    "I'm naturally curious, and I get interested in things that have absolutely nothing to do with each other. One minute I'm figuring out a complicated feature at work, the next I'm sketching an app idea that popped into my head on a random Tuesday.",
    "I like making things look good, but I care just as much about how they work and how people feel using them. And I love the moment when something that only existed in my head becomes something real.",
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
  open: "Open details",
} as const;

export const roleSheet = {
  highlights: "What I worked on",
  role: "Role",
  dates: "Dates",
  stack: "Technologies",
  close: "Close",
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
  closeWindow: "Close window",
  dockLabel: "My stack",
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
