import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { createHtmlPlugin } from 'vite-plugin-html';

const body = fs
  .readFileSync(path.join(import.meta.dirname, 'templates', 'body.html'))
  .toString();
const head = fs
  .readFileSync(path.join(import.meta.dirname, 'templates', 'head.html'))
  .toString();

export default defineConfig({
  build: {
    lib: {
      entry: ['src/index.ts', 'src/templates.ts'],
      name: 'sudoku',
    },
    copyPublicDir: true,
    assetsDir: 'module-assets',
  },
  plugins: [
    dts({ rollupTypes: true }),
    createHtmlPlugin({
      inject: {
        data: {
          head,
          body,
        },
      },
    }),
  ],
});
