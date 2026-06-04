import { createFileRoute, Link } from '@tanstack/react-router';
import { TicTacToe } from '../components/tic-tac-toe/TicTacToe';

function TicTacToePage() {
    return (
        <main>
            <h1>Tic-Tac-Toe</h1>
            <TicTacToe />
            <p>
                <Link to="/">← Back to games</Link>
            </p>
        </main>
    );
}

export const Route = createFileRoute('/tic-tac-toe')({
    component: TicTacToePage,
});
