import { fireEvent, render, screen } from '@testing-library/react';
import { TicTacToe } from './TicTacToe';

/** Grab a cell button by its 1-based label, e.g. cell(0) -> "Cell 1, …". */
const cell = (index: number) =>
    screen.getByRole('button', { name: new RegExp(`^Cell ${index + 1},`) });

const statusText = () => screen.getByRole('status').textContent;

describe('TicTacToe', () => {
    it('starts on X’s turn with an empty board', () => {
        render(<TicTacToe />);
        expect(statusText()).toBe("Player X's turn");
        expect(cell(0).textContent).toBe('');
    });

    it('alternates X and O as cells are clicked', () => {
        render(<TicTacToe />);
        fireEvent.click(cell(0));
        expect(cell(0).textContent).toBe('X');
        expect(statusText()).toBe("Player O's turn");

        fireEvent.click(cell(1));
        expect(cell(1).textContent).toBe('O');
        expect(statusText()).toBe("Player X's turn");
    });

    it('ignores clicks on a cell that is already taken', () => {
        render(<TicTacToe />);
        fireEvent.click(cell(0)); // X
        fireEvent.click(cell(0)); // no-op (button is disabled, mark unchanged)
        expect(cell(0).textContent).toBe('X');
        expect(statusText()).toBe("Player O's turn");
    });

    it('announces the winner and freezes the board', () => {
        render(<TicTacToe />);
        // X:0 O:3 X:1 O:4 X:2 -> X completes the top row.
        [0, 3, 1, 4, 2].forEach((i) => fireEvent.click(cell(i)));
        expect(statusText()).toBe('Player X wins! 🎉');

        // Empty cells are disabled now: clicking does nothing.
        fireEvent.click(cell(5));
        expect(cell(5).textContent).toBe('');
    });

    it('starts over when "New game" is clicked', () => {
        render(<TicTacToe />);
        fireEvent.click(cell(0));
        fireEvent.click(screen.getByRole('button', { name: 'New game' }));
        expect(cell(0).textContent).toBe('');
        expect(statusText()).toBe("Player X's turn");
    });
});
