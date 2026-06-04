import { useState } from 'react';
import { Board } from './Board';
import { applyMove, createEmptyBoard, getGameStatus } from './logic';

/**
 * The playable game. This is the only stateful piece: it holds the board in
 * React state, derives everything else (whose turn, winner, draw) from that
 * board via the pure helpers in `logic.ts`, and hands a flat board down to the
 * presentational `Board`. The whole component is self-contained — drop
 * `<TicTacToe />` anywhere and it works.
 */
export function TicTacToe() {
    const [board, setBoard] = useState(createEmptyBoard);
    const status = getGameStatus(board);

    const handleCellClick = (index: number) => {
        // applyMove returns the board unchanged for illegal moves, so React
        // sees the same reference and skips a re-render — no guards needed here.
        setBoard((current) => applyMove(current, index));
    };

    let message: string;
    if (status.kind === 'won') {
        message = `Player ${status.winner} wins! 🎉`;
    } else if (status.kind === 'draw') {
        message = "It's a draw.";
    } else {
        message = `Player ${status.next}'s turn`;
    }

    return (
        <section className="ttt-game" aria-label="Tic-tac-toe game">
            <p className="ttt-status" role="status">
                {message}
            </p>
            <Board
                board={board}
                onCellClick={handleCellClick}
                winningLine={status.kind === 'won' ? status.line : null}
                disabled={status.kind !== 'playing'}
            />
            <button
                type="button"
                className="ttt-reset"
                onClick={() => setBoard(createEmptyBoard())}
            >
                New game
            </button>
        </section>
    );
}
