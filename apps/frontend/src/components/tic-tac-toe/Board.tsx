import type { Board as BoardState } from './logic';

export type BoardProps = {
    /** The 9-cell board to render. */
    board: BoardState;
    /** Called with the cell index (0–8) when an empty, enabled cell is clicked. */
    onCellClick: (index: number) => void;
    /** Indices of the winning line, highlighted when the game has been won. */
    winningLine?: readonly number[] | null;
    /** When true, every cell is non-interactive (e.g. the game is over). */
    disabled?: boolean;
};

/**
 * Pure presentational board: it knows how to draw 9 cells and report clicks,
 * but nothing about the rules. All game logic lives in `logic.ts`, and the
 * stateful wiring lives in `TicTacToe.tsx`. Keeping this dumb makes it trivial
 * to render any board shape in Storybook (mid-game, win, draw, …).
 */
export function Board({ board, onCellClick, winningLine = null, disabled = false }: BoardProps) {
    return (
        <div className="ttt-board" role="group" aria-label="Tic-tac-toe board">
            {board.map((cell, index) => {
                const isWinning = winningLine?.includes(index) ?? false;
                const className = ['ttt-cell', isWinning && 'ttt-cell--winning']
                    .filter(Boolean)
                    .join(' ');

                return (
                    <button
                        // Cells never reorder, so the index is a stable key here.
                        key={index}
                        type="button"
                        className={className}
                        aria-label={`Cell ${index + 1}, ${cell ?? 'empty'}`}
                        onClick={() => onCellClick(index)}
                        disabled={disabled || cell !== null}
                    >
                        {cell}
                    </button>
                );
            })}
        </div>
    );
}
