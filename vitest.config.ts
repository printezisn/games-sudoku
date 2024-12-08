import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['vitest.setup.ts', '@vitest/web-worker'],
    clearMocks: true,
    environment: 'jsdom',
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
    coverage: {
      include: ['src'],
    },
  },
});
