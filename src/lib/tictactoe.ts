/**
 * Noughts and crosses against Kira. Pure functions; the tile keeps the state.
 * Port of the prototype's rules, including Kira's slightly lazy strategy.
 */

export type Mark = 0 | 1 | 2; // empty, visitor, Kira
export type Board = readonly Mark[];

export type GameStatus = "your-turn" | "kira-thinks" | "you-win" | "kira-wins" | "draw";

export const VISITOR: Mark = 1;
export const KIRA: Mark = 2;
export const EMPTY_BOARD: Board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

/** How long Kira "thinks" before moving. */
export const KIRA_DELAY_MS = 520;

/** How often Kira notices a line she can finish or must block. */
const KIRA_ATTENTION = 0.85;

const LINES: ReadonlyArray<readonly [number, number, number]> = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/** The winning line, or null. */
export function winningLine(board: Board): readonly [number, number, number] | null {
  for (const line of LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) return line;
  }
  return null;
}

/** Who has won (1 or 2), "draw" when the board is full, or null while the game is on. */
export function outcome(board: Board): Mark | "draw" | null {
  const line = winningLine(board);
  if (line) return board[line[0]] ?? null;
  return board.includes(0) ? null : "draw";
}

export function place(board: Board, index: number, mark: Mark): Board {
  return board.map((cell, i) => (i === index ? mark : cell));
}

/**
 * Kira's move: finish her own line, else block yours (each noticed 85% of the time),
 * else take the centre, else any free square.
 */
export function kiraMove(board: Board, random: () => number = Math.random): number {
  for (const who of [KIRA, VISITOR]) {
    for (const line of LINES) {
      const marks = line.map((i) => board[i]);
      const empty = marks.indexOf(0);
      const count = marks.filter((mark) => mark === who).length;
      if (count === 2 && empty >= 0 && random() < KIRA_ATTENTION) return line[empty] ?? 4;
    }
  }
  if (!board[4]) return 4;
  const free = board.flatMap((cell, i) => (cell ? [] : [i]));
  return free[Math.floor(random() * free.length)] ?? 0;
}

export function statusAfterVisitor(board: Board): GameStatus {
  const result = outcome(board);
  if (result === VISITOR) return "you-win";
  if (result === "draw") return "draw";
  return "kira-thinks";
}

export function statusAfterKira(board: Board): GameStatus {
  const result = outcome(board);
  if (result === KIRA) return "kira-wins";
  if (result === "draw") return "draw";
  return "your-turn";
}
