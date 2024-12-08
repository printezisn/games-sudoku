import type { Board } from './models';

export const saveBoard = (board: Board) => {
  const boardStr = JSON.stringify(board, (_, value) =>
    value instanceof Set ? Array.from(value) : value,
  );

  localStorage.setItem('sudoku_board', boardStr);
};

export const loadBoard = () => {
  const boardStr = localStorage.getItem('sudoku_board');
  if (!boardStr) return null;

  const board = JSON.parse(boardStr, (key, value) =>
    key === 'options' ? new Set(value) : value,
  ) as Board;

  return board;
};
