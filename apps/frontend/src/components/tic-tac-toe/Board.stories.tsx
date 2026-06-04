import type { Meta, StoryObj } from '@storybook/react-vite';
import { Board } from './Board';
import { createEmptyBoard } from './logic';

const meta: Meta<typeof Board> = {
    title: 'Games/TicTacToe/Board',
    component: Board,
    args: {
        // Stories are static snapshots; clicks are exercised by TicTacToe.
        onCellClick: () => undefined,
    },
};

export default meta;

type Story = StoryObj<typeof Board>;

export const Empty: Story = {
    args: { board: createEmptyBoard() },
};

export const MidGame: Story = {
    args: { board: ['X', 'O', 'X', null, 'O', null, null, null, null] },
};

export const XWins: Story = {
    args: {
        board: ['X', 'X', 'X', 'O', 'O', null, null, null, null],
        winningLine: [0, 1, 2],
        disabled: true,
    },
};

export const Draw: Story = {
    args: {
        board: ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'],
        disabled: true,
    },
};

export const Disabled: Story = {
    args: { board: createEmptyBoard(), disabled: true },
};
