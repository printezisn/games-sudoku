"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=`<script>
  let theme = localStorage.getItem('sudoku_theme');
  if (!theme) {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  document.documentElement.setAttribute('data-theme', theme);
<\/script>
`,e=`<div class="container curtain">
  <a
    href="#sudoku-cell-0-0"
    class="sr-only"
    onclick="document.getElementById('sudoku-cell-0-0').focus(); return false;"
    >Skip to main content</a
  >
  <div class="container-inner">
    <header>
      <div class="align-right block">
        <app-theme-switch></app-theme-switch>
      </div>
      <h1>Decisive Sudoku | Find easy to hard sudoku puzzles</h1>
      <p class="align-justify">
        Find and solve easy to hard sudoku puzzles with a variety of tools in
        your arsenal. You can use multiple colors for marking and undo actions.
        Check <a href="#how-to-play">how to play</a>.
      </p>
    </header>
    <main>
      <section class="block">
        <h2 id="menu-label" class="sr-only">Actions</h2>
        <ul role="menu" aria-labelledby="menu-label">
          <li role="presentation">
            <app-action-button menu="new-game-menu" icon="plus"
              >New</app-action-button
            >
            <ul id="new-game-menu" role="menu" aria-label="New game options">
              <li role="presentation">
                <app-action-button action="newEasyGame">Easy</app-action-button>
              </li>
              <li role="presentation">
                <app-action-button action="newNormalGame"
                  >Normal</app-action-button
                >
              </li>
              <li role="presentation">
                <app-action-button action="newHardGame">Hard</app-action-button>
              </li>
              <li role="presentation">
                <app-action-button action="newEmptyGame"
                  >Empty</app-action-button
                >
              </li>
            </ul>
          </li>
          <li role="presentation">
            <app-action-button menu="undo-menu" icon="rotate-arrow"
              >Undo</app-action-button
            >
            <ul id="undo-menu" role="menu" aria-label="Undo options">
              <li role="presentation">
                <app-action-button action="undoOne"
                  >Undo Last Action</app-action-button
                >
              </li>
              <li role="presentation">
                <app-action-button action="undoColor"
                  >Undo Color</app-action-button
                >
              </li>
            </ul>
          </li>
          <li role="presentation">
            <app-action-button action="solve" icon="check"
              >Solve</app-action-button
            >
          </li>
          <li role="presentation">
            <app-action-button action="changeColor" icon="changeColor"
              >Change Color</app-action-button
            >
          </li>
        </ul>
      </section>
      <article class="block">
        <h2 class="sr-only">Sudoku Board</h2>
        <app-sudoku-board></app-sudoku-board>
      </article>
      <article class="block align-justify">
        <h2 id="how-to-play">How to play</h2>
        <p>
          A <strong>sudoku</strong> puzzle consists of 3x3 groups, each
          containing 3x3 cells. Each <strong>cell</strong> must have a value
          between <strong>1 - 9</strong>. Some cells are pre-filled, but you
          have to fill the rest following the rules below:
        </p>
        <ul>
          <li>Each value (1 - 9) may appear only once in a row.</li>
          <li>Each value (1 - 9) may appear only once in a column.</li>
          <li>Each value (1 - 9) may appear only once in a group.</li>
        </ul>
        <p>
          If any of the above rules is violated, the wrong cells are highlighted
          in red.
        </p>
        <p>
          When you fill all the cells correctly, the sudoku puzzle is complete.
          It will be highlighted in green to indicate that it's now finished.
        </p>
        <article>
          <h3>New Puzzle</h3>
          <p>You can start a new puzzle with the following difficulties:</p>
          <ul>
            <li>Easy</li>
            <li>Normal</li>
            <li>Hard</li>
            <li>Empty</li>
          </ul>
          <p>
            The <strong>Empty</strong> difficulty contains an empty puzzle. It's
            useful if you just want to enter a puzzle you found somewhere and
            solve it.
          </p>
          <p>Finally, you can also select to automatically solve the puzzle.</p>
        </article>
        <article>
          <h3>Multiple colors</h3>
          <p>
            You can choose between 5 different colors while filling the cells.
            This is useful if you want to try a value and undo it leads to a
            dead end.
          </p>
        </article>
        <article>
          <h3>Undo</h3>
          <p>
            You can undo your last action or all the actions you did with the
            current color. This is especially useful if you tried a series of
            actions which led to a dead end.
          </p>
        </article>
      </article>
    </main>
    <footer class="block page-footer">
      <p>
        © <span class="current-year">2025</span> Nikos Printezis. All Rights
        Reserved.
      </p>
      <nav>
        <ul class="no-style">
          <li>
            <a class="more-content-link">Find more content</a>
          </li>
          <li class="separator">|</li>
          <li>
            <a class="privacy-policy-link">Privacy Policy</a>
          </li>
        </ul>
      </nav>
    </footer>
  </div>
</div>
`;exports.BodyHtml=e;exports.HeadHtml=n;
