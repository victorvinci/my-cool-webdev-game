import {
    applyMove,
    createEmptyBoard,
    findWinningLine,
    getCurrentPlayer,
    getGameStatus,
    WINNING_LINES,
} from './logic';
import type { Board } from './logic';

describe('tic-tac-toe logic', () => {
    describe('createEmptyBoard', () => {
        it('returns 9 empty cells', () => {
            const board = createEmptyBoard();
            expect(board).toHaveLength(9);
            expect(board.every((cell) => cell === null)).toBe(true);
        });

        it('returns a fresh array each call (games never share state)', () => {
            expect(createEmptyBoard()).not.toBe(createEmptyBoard());
        });
    });

    describe('getCurrentPlayer', () => {
        it('starts with X on an empty board', () => {
            expect(getCurrentPlayer(createEmptyBoard())).toBe('X');
        });

        it('is O after X has moved once', () => {
            const board: Board = ['X', null, null, null, null, null, null, null, null];
            expect(getCurrentPlayer(board)).toBe('O');
        });

        it('is X again once both players have moved', () => {
            const board: Board = ['X', 'O', null, null, null, null, null, null, null];
            expect(getCurrentPlayer(board)).toBe('X');
        });
    });

    describe('findWinningLine', () => {
        it('detects a row win', () => {
            const board: Board = ['X', 'X', 'X', null, null, null, null, null, null];
            expect(findWinningLine(board)).toEqual({ winner: 'X', line: [0, 1, 2] });
        });

        it('detects a diagonal win', () => {
            const board: Board = ['O', null, null, null, 'O', null, null, null, 'O'];
            expect(findWinningLine(board)).toEqual({ winner: 'O', line: [0, 4, 8] });
        });

        it('returns null when there is no winner', () => {
            expect(findWinningLine(createEmptyBoard())).toBeNull();
        });

        it('recognises every documented winning line', () => {
            for (const line of WINNING_LINES) {
                const board = createEmptyBoard();
                for (const i of line) {
                    board[i] = 'X';
                }
                expect(findWinningLine(board)?.winner).toBe('X');
            }
        });
    });

    describe('getGameStatus', () => {
        it('reports playing with the next player on a fresh board', () => {
            expect(getGameStatus(createEmptyBoard())).toEqual({ kind: 'playing', next: 'X' });
        });

        it('reports a win with the winner and line', () => {
            const board: Board = ['X', 'X', 'X', 'O', 'O', null, null, null, null];
            expect(getGameStatus(board)).toEqual({ kind: 'won', winner: 'X', line: [0, 1, 2] });
        });

        it('reports a draw when the board is full with no winner', () => {
            const board: Board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
            expect(getGameStatus(board)).toEqual({ kind: 'draw' });
        });
    });

    describe('applyMove', () => {
        it('places the current player mark on an empty cell', () => {
            expect(applyMove(createEmptyBoard(), 4)[4]).toBe('X');
        });

        it('does not mutate the input board', () => {
            const board = createEmptyBoard();
            applyMove(board, 0);
            expect(board[0]).toBeNull();
        });

        it('returns the same board (no-op) for an occupied cell', () => {
            const board: Board = ['X', null, null, null, null, null, null, null, null];
            expect(applyMove(board, 0)).toBe(board);
        });

        it('returns the same board (no-op) once the game is won', () => {
            const board: Board = ['X', 'X', 'X', 'O', 'O', null, null, null, null];
            expect(applyMove(board, 5)).toBe(board);
        });

        it('alternates players across successive moves', () => {
            let board = createEmptyBoard();
            board = applyMove(board, 0);
            board = applyMove(board, 1);
            expect(board[0]).toBe('X');
            expect(board[1]).toBe('O');
        });
    });
});
