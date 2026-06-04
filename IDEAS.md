# Ideas & Brainstorm

The single place to jot game ideas, capture decisions, and keep our discussion
in one spot. Informal by design — edit freely, leave half-baked thoughts, strike
things out. (Named `IDEAS.md` rather than `TODO.md` because it's for thinking out
loud, not just a checklist.)

---

## How we work

- **Stack:** React + Vite + TypeScript frontend from the template (`apps/frontend`).
  Each game is client-side; the Express/MySQL backend stays dormant unless a game
  needs scores/multiplayer.
- **Rendering choice per game:**
    - _Turn-based / discrete UI_ (tic-tac-toe, puzzles) → plain React + DOM.
    - _Real-time / animated_ (Pong, Snake, platformers) → an HTML5 `<canvas>` with a
      `requestAnimationFrame` game loop, wrapped in a React component.
- **Structure convention:** game logic goes in framework-free modules (e.g.
  `logic.ts`) that are unit-tested on their own; React/canvas is a thin renderer on
  top. Keeps rules portable and easy to reason about.
- Each new component ships with a Storybook story (`*.stories.tsx`) — repo rule.

---

## Game backlog

Status key: 💡 idea · 🔨 building · ✅ playable · ❄️ on ice

| Game                | Status      | Rendering | Notes                                                                                        |
| ------------------- | ----------- | --------- | -------------------------------------------------------------------------------------------- |
| Tic-Tac-Toe         | ✅ playable | React/DOM | Two-player hot-seat. `apps/frontend/src/components/tic-tac-toe/`. Possible next steps below. |
| Pong                | 💡 idea     | Canvas    | Classic intro to the game loop + paddle input.                                               |
| Snake               | 💡 idea     | Canvas    | Grid movement, growth, self-collision.                                                       |
| Breakout            | 💡 idea     | Canvas    | Ball physics, brick grid, paddle.                                                            |
| Memory / card match | 💡 idea     | React/DOM | Flip-and-match grid; good DOM-only candidate.                                                |
| 2048                | 💡 idea     | React/DOM | Tile merging on a grid; pure-logic heavy.                                                    |
| Minesweeper         | 💡 idea     | React/DOM | Flood-fill reveal, flagging.                                                                 |

---

## Possible next steps for Tic-Tac-Toe

- [ ] Single-player vs. a simple AI (random, then minimax for unbeatable).
- [ ] Score tracker across rounds (X wins / O wins / draws).
- [ ] Highlight the winning line with an animation.
- [ ] Optional larger boards (e.g. 4×4, or "get 4 in a row").
- [ ] Persist the last result in `localStorage`.

---

## Open questions / discussion

- Do we want a shared "game shell" (title, back link, restart) so every game has a
  consistent frame? Could become a `<GameLayout>` component.
- When the first canvas game lands, factor out a reusable `useGameLoop` hook
  (handles `requestAnimationFrame`, delta time, pause/resume).
- Eventually: a leaderboard would be the first real use of the Express backend.

---

## Scratchpad

_(Drop loose thoughts here.)_
