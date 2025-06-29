import ActionButton from './components/action-button';
import SudokuBoard from './components/sudoku-board';
import SudokuCell from './components/sudoku-cell';
import ThemeSwitch from './components/theme-switch';
import { initGame } from './stores/game/actions';
import './styles/main.scss';

interface Options {
  moreContentUrl: string;
  privacyPolicyUrl: string;
}

export const init = (options: Options) => {
  // Initialize components
  customElements.define('app-theme-switch', ThemeSwitch);
  customElements.define('app-action-button', ActionButton);
  customElements.define('app-sudoku-board', SudokuBoard);
  customElements.define('app-sudoku-cell', SudokuCell);

  // Initialize dynamic elements
  Array.from(document.getElementsByClassName('current-year')).forEach((el) => {
    el.innerHTML = new Date().getFullYear().toString();
  });
  Array.from(document.getElementsByClassName('more-content-link')).forEach(
    (el) => {
      (el as HTMLAnchorElement).href = options.moreContentUrl;
    },
  );
  Array.from(document.getElementsByClassName('privacy-policy-link')).forEach(
    (el) => {
      (el as HTMLAnchorElement).href = options.privacyPolicyUrl;
    },
  );

  // Initialize game
  initGame();

  // Remove curtain
  setTimeout(() => {
    document.getElementsByClassName('curtain')[0].classList.remove('curtain');
  }, 0);
};
