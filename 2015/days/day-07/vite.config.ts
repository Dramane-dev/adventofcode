import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['./**/*.ts'],
      exclude: ['**/*.test.ts', '**/*.spec.ts', '**/*.d.ts'],
      thresholds: {
        functions: 90,
        lines: -10,
      },
    },
  },
});
