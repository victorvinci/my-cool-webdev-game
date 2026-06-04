import type { Meta, StoryObj } from '@storybook/react-vite';
import { TicTacToe } from './TicTacToe';

/**
 * TicTacToe is self-contained and takes no props — it owns its own game state.
 * So there is a single, fully interactive story: play it right here in
 * Storybook. The static board variations (mid-game, win, draw, disabled) live
 * in the `Games/TicTacToe/Board` stories instead.
 */
const meta: Meta<typeof TicTacToe> = {
    title: 'Games/TicTacToe/TicTacToe',
    component: TicTacToe,
};

export default meta;

type Story = StoryObj<typeof TicTacToe>;

export const Default: Story = {};
