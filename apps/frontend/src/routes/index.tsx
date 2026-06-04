import { createFileRoute, Link } from '@tanstack/react-router';

function Home() {
    return (
        <main>
            <h1>my-cool-webdev-game</h1>
            <p>A playground for building simple browser games.</p>

            <h2>Games</h2>
            <ul>
                <li>
                    <Link to="/tic-tac-toe">Tic-Tac-Toe</Link> — two-player, hot-seat.
                </li>
            </ul>

            <p>
                More to come — see <code>IDEAS.md</code> for the backlog.
            </p>
        </main>
    );
}

export const Route = createFileRoute('/')({
    component: Home,
});
