/**
 * Pure, framework-free tic-tac-toe rules.
 *
 * There is no React in this file on purpose: the entire "game state" lives
 * here as plain data and pure functions you can read, test, and reason about
 * on their own. The React component (`TicTacToe.tsx`) is just a thin renderer
 * that calls into these functions. This separation is the single most useful
 * habit for building games — keep the rules independent of how you draw them.
 */

/** The two marks. X always moves first. */
export type Player = 'X' | 'O';

/** A single square: a player's mark, or empty. */
export type Cell = Player | null;

/** The board is exactly 9 cells, indexed 0–8 left-to-right, top-to-bottom:
 *
 *      0 | 1 | 2
 *      3 | 4 | 5
 *      6 | 7 | 8
 */
export type Board = Cell[];

/** A line of three cell indices that wins the game. */
export type Line = readonly [number, number, number];

/** Where the game is right now. A discriminated union so the UI can switch
 *  on `kind` and TypeScript guarantees the right fields are present. */
export type GameStatus =
    | { kind: 'playing'; next: Player }
    | { kind: 'won'; winner: Player; line: Line }
    | { kind: 'draw' };

/** The 8 ways to win: 3 rows, 3 columns, 2 diagonals. */
export const WINNING_LINES: readonly Line[] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
];

/** A fresh, empty board. Returns a new array each call so two games never
 *  share state. */
export function createEmptyBoard(): Board {
    return Array<Cell>(9).fill(null);
}

/** Whose turn it is, derived purely from the board: X goes first, so it's X's
 *  turn whenever both players have placed the same number of marks, otherwise
 *  O's. Deriving the turn from the board (instead of tracking it separately)
 *  means there is only one source of truth to keep in sync. */
export function getCurrentPlayer(board: Board): Player {
    const xs = board.filter((cell) => cell === 'X').length;
    const os = board.filter((cell) => cell === 'O').length;
    return xs === os ? 'X' : 'O';
}

/** The winning player and line if someone has three in a row, else null. */
export function findWinningLine(board: Board): { winner: Player; line: Line } | null {
    for (const line of WINNING_LINES) {
        const [a, b, c] = line;
        if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
            return { winner: board[a] as Player, line };
        }
    }
    return null;
}

/** The full status of a board: won (with the winner + line), drawn (full with
 *  no winner), or still playing (with whose turn is next). */
export function getGameStatus(board: Board): GameStatus {
    const win = findWinningLine(board);
    if (win) {
        return { kind: 'won', winner: win.winner, line: win.line };
    }
    if (board.every((cell) => cell !== null)) {
        return { kind: 'draw' };
    }
    return { kind: 'playing', next: getCurrentPlayer(board) };
}

/** Returns a NEW board with the current player's mark placed at `index`, or
 *  the same board unchanged if the move is illegal (cell already taken, or the
 *  game is already over). Never mutates its input — predictable immutable
 *  updates keep React state changes easy to follow. */
export function applyMove(board: Board, index: number): Board {
    if (board[index] !== null) {
        return board;
    }
    if (getGameStatus(board).kind !== 'playing') {
        return board;
    }
    const next = board.slice();
    next[index] = getCurrentPlayer(board);
    return next;
}
