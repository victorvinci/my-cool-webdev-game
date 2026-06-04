import { test, expect } from '@playwright/test';

test('home page renders the games-hub heading and a game link', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toHaveText('my-cool-webdev-game');
    await expect(page.getByRole('link', { name: 'Tic-Tac-Toe' })).toBeVisible();
});

test('users page eventually shows the users list from the backend', async ({ page }) => {
    await page.goto('/users');
    // The list depends on the backend being up with the seed data loaded.
    await expect(page.getByRole('region', { name: 'Users' })).toBeVisible({ timeout: 10_000 });
});

test('tic-tac-toe: navigate from home and play a move', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Tic-Tac-Toe' }).click();
    await expect(page.getByRole('status')).toHaveText("Player X's turn");

    await page.getByRole('button', { name: /^Cell 1,/ }).click();
    await expect(page.getByRole('button', { name: /^Cell 1,/ })).toHaveText('X');
    await expect(page.getByRole('status')).toHaveText("Player O's turn");
});
