import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['./**/*.ts', './**/*.ts'],
      exclude: ['**/*.test.ts', '**/*.d.ts'],
      thresholds: {
        // Requires 90% function coverage
        functions: 90,

        // Require that no more than 10 lines are uncovered
        lines: -10,
      },
    },
  },
});
