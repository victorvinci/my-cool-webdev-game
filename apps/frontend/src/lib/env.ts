import { z } from 'zod';

// VITE_API_URL points the frontend at the Express backend. This is a
// client-side games playground where the backend is usually dormant, so we
// default it rather than hard-failing when it's unset — a missing .env should
// never blank-screen a game that doesn't even call the API. Set VITE_API_URL
// in a .env (see .env.example) when you actually run the backend.
const EnvSchema = z.object({
    VITE_API_URL: z.string().url().default('http://localhost:3000'),
});

const parsed = EnvSchema.safeParse(import.meta.env);

if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('\n');
    throw new Error(`Invalid frontend env:\n${issues}`);
}

export const env = parsed.data;
