import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

import {
  EMPTY_BOARD,
  KIRA,
  KIRA_DELAY_MS,
  VISITOR,
  kiraMove,
  outcome,
  place,
  statusAfterKira,
  statusAfterVisitor,
  winningLine,
  type Board,
  type GameStatus,
} from "@/lib/tictactoe";

export interface KiraGame {
  board: Board;
  status: GameStatus;
  /** Squares of the winning line, if any. */
  winning: ReadonlySet<number>;
  play: (index: number) => void;
  reset: () => void;
}

function clearTimer(timerRef: RefObject<number | null>): void {
  if (timerRef.current !== null) window.clearTimeout(timerRef.current);
  timerRef.current = null;
}

/** Game state for the Kira tile: you move, Kira "thinks", then answers. */
export function useKiraGame(): KiraGame {
  const [board, setBoard] = useState<Board>(EMPTY_BOARD);
  const [status, setStatus] = useState<GameStatus>("your-turn");
  const timerRef = useRef<number | null>(null);

  useEffect(() => () => clearTimer(timerRef), []);

  const play = useCallback(
    (index: number) => {
      if (board[index] || outcome(board) !== null || status === "kira-thinks") return;

      const afterVisitor = place(board, index, VISITOR);
      const next = statusAfterVisitor(afterVisitor);
      setBoard(afterVisitor);
      setStatus(next);
      if (next !== "kira-thinks") return;

      timerRef.current = window.setTimeout(() => {
        timerRef.current = null;
        const afterKira = place(afterVisitor, kiraMove(afterVisitor), KIRA);
        setBoard(afterKira);
        setStatus(statusAfterKira(afterKira));
      }, KIRA_DELAY_MS);
    },
    [board, status],
  );

  const reset = useCallback(() => {
    clearTimer(timerRef);
    setBoard(EMPTY_BOARD);
    setStatus("your-turn");
  }, []);

  const line = winningLine(board);
  return { board, status, winning: new Set(line ?? []), play, reset };
}
