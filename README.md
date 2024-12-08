# Decisive Sudoku

Find and solve easy to hard sudoku puzzles with a variety of tools in your arsenal. You can use multiple colors for marking and undo actions.

## Prerequisites

1. Install **NodeJS** >= 20.0.0. If you already have **nvm**, you can just do the following steps:
   1. `nvm install`
   1. `nvm use`
1. Install **pnpm** (e.g. with `npm i -g pnpm`).
1. Download the node packages with `pnpm i`.

## Scripts

1. `pnpm start:dev`: starts the game in development mode.
1. `pnpm build`: builds the game and makes it ready to be consumed by web applications.
1. `pnpm lint`: uses eslint to find linting issues.
1. `pnpm lint:fix`: uses eslint to find linting issues and fix them if possible.
1. `pnpm prettier:format`: uses prettier to find formatting issues and fix them if possible.
1. `pnpm test:unit`: runs the unit tests.
1. `pnpm test:unit:coverage`: runs the unit tests and creates a coverage report.
