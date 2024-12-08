var N = Object.defineProperty;
var D = (t, e, n) => e in t ? N(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var l = (t, e, n) => D(t, typeof e != "symbol" ? e + "" : e, n);
const z = (t, e, n = 500, o = 1e3) => {
  let i = null, a = !1;
  return { start: () => {
    i != null && clearTimeout(i), i = setTimeout(() => {
      a = !0, i = null, t();
    }, n);
  }, cancel: () => {
    i != null && (clearTimeout(i), i = null), a ? i = setTimeout(() => {
      a = !1, i = null, e();
    }, o) : e();
  } };
};
var w = /* @__PURE__ */ ((t) => (t[t.CELL_CHANGE = 0] = "CELL_CHANGE", t[t.COLOR_CHANGE = 1] = "COLOR_CHANGE", t))(w || {}), h = /* @__PURE__ */ ((t) => (t[t.EASY = 0] = "EASY", t[t.NORMAL = 1] = "NORMAL", t[t.HARD = 2] = "HARD", t[t.EMPTY = 3] = "EMPTY", t))(h || {}), y = /* @__PURE__ */ ((t) => (t[t.CREATE_NEW = 0] = "CREATE_NEW", t[t.SOLVE = 1] = "SOLVE", t))(y || {});
const O = (t) => {
  const e = JSON.stringify(
    t,
    (n, o) => o instanceof Set ? Array.from(o) : o
  );
  localStorage.setItem("sudoku_board", e);
}, G = () => {
  const t = localStorage.getItem("sudoku_board");
  return t ? JSON.parse(
    t,
    (n, o) => n === "options" ? new Set(o) : o
  ) : null;
}, _ = (t) => {
  const e = [...t];
  for (let n = e.length - 1; n >= 0; n--) {
    const o = Math.floor(Math.random() * (n + 1)), i = e[o];
    e[o] = e[n], e[n] = i;
  }
  return e;
}, $ = 5, A = {
  [h.EASY]: 40,
  [h.NORMAL]: 35,
  [h.HARD]: 30,
  [h.EMPTY]: 0
}, R = (t) => ({
  ...t,
  actions: t.actions.map((e) => ({ ...e })),
  cells: t.cells.map((e) => ({
    ...e,
    options: new Set(e.options)
  }))
}), b = (t) => {
  const e = Array(9).fill(null).map(() => Array(10).fill(0)), n = Array(9).fill(null).map(() => Array(10).fill(0)), o = Array(9).fill(null).map(() => Array(10).fill(0));
  t.finished = !0;
  for (let i = 0; i < t.cells.length; i++) {
    const a = t.cells[i].value;
    if (!a) continue;
    const d = Math.floor(i / 9), c = i % 9, u = Math.floor(d / 3) * 3 + Math.floor(c / 3);
    e[d][a]++, n[c][a]++, o[u][a]++;
  }
  for (let i = 0; i < t.cells.length; i++) {
    const a = t.cells[i], d = a.value, c = Math.floor(i / 9), u = i % 9, E = Math.floor(c / 3) * 3 + Math.floor(u / 3);
    a.options.clear();
    for (let r = 1; r <= 9; r++) {
      const p = d === r ? 2 : 1;
      e[c][r] < p && n[u][r] < p && o[E][r] < p && a.options.add(r);
    }
    a.hasError = d != null && !a.options.has(d), (a.hasError || d == null) && (t.finished = !1);
  }
}, j = (t) => {
  const e = (t.currentColor + 1) % $;
  t.actions.push({
    cellIndex: null,
    from: t.currentColor,
    to: e,
    type: w.COLOR_CHANGE
  }), t.currentColor = e;
}, P = (t, e, n) => {
  t.actions.push({
    cellIndex: e,
    from: t.cells[e].value,
    to: n,
    type: w.CELL_CHANGE
  }), t.cells[e].value = n, t.cells[e].color = t.currentColor, b(t);
}, B = (t, e) => {
  let n = !1;
  switch (e.type) {
    case w.COLOR_CHANGE:
      t.currentColor = e.from;
      break;
    case w.CELL_CHANGE:
      t.cells[e.cellIndex].value = e.from, n = !0;
      break;
  }
  return n;
}, Y = (t) => {
  const e = t.actions.pop();
  e && B(t, e) && b(t);
}, U = (t) => {
  let e = !1;
  for (; t.actions.length > 0; ) {
    const n = t.actions.pop();
    if (e = B(t, n) || e, n.type === w.COLOR_CHANGE)
      break;
  }
  e && b(t);
}, S = (t) => {
  let e = -1;
  for (let o = 0; o < t.cells.length; o++) {
    const i = t.cells[o];
    i.value == null && (e === -1 || i.options.size < t.cells[e].options.size) && (e = o);
  }
  if (e === -1)
    return b(t), t;
  const n = _(Array.from(t.cells[e].options));
  for (let o = 0; o < n.length; o++) {
    const i = Math.floor(e / 9) * 9, a = e % 9, d = Math.floor(e / 27) * 27 + Math.floor(a / 3) * 3, c = R(t);
    let u = !0;
    c.cells[e].value = n[o], c.cells[e].color = c.currentColor;
    for (let r = a; r < 81 + a && u; r += 9)
      r !== e && (c.cells[r].options.delete(n[o]), c.cells[r].options.size === 0 && (u = !1));
    for (let r = i; r < i + 9 && u; r++)
      r !== e && (c.cells[r].options.delete(n[o]), c.cells[r].options.size === 0 && (u = !1));
    for (let r = d; r < 27 + d && u; r += 9)
      for (let p = r; p < r + 3; p++)
        if (p !== e && (c.cells[p].options.delete(n[o]), c.cells[p].options.size === 0)) {
          u = !1;
          break;
        }
    if (!u) continue;
    const E = S(c);
    if (E) return E;
  }
  return null;
}, M = (t) => {
  const e = {
    cells: Array(81).fill(null).map(() => ({
      value: null,
      color: 0,
      hasError: !1,
      initial: !1,
      options: /* @__PURE__ */ new Set()
    })),
    finished: !1,
    actions: [],
    currentColor: 0
  };
  if (b(e), A[t] === 0)
    return e;
  const n = S(e), o = _(n.cells);
  for (let i = 0; i < o.length; i++)
    i < A[t] ? (o[i].initial = !0, o[i].color = n.currentColor) : o[i].value = null;
  return b(n), n;
};
function V(t) {
  return new Worker(
    "/module-assets/worker-VWXZbi3g.js",
    {
      name: t == null ? void 0 : t.name
    }
  );
}
const g = "setGameLoading", m = "updateGameBoard", L = new V();
L.onmessage = (t) => {
  const e = t.data;
  x.cancel(), e.board && k(e.board);
};
const F = () => {
  const t = G();
  return {
    board: t || M(h.EMPTY),
    loading: !1,
    initialized: !!t
  };
}, s = F(), x = z(
  () => {
    s.loading = !0, window.dispatchEvent(new CustomEvent(g));
  },
  () => {
    s.loading = !1, window.dispatchEvent(new CustomEvent(g));
  }
), k = (t) => {
  s.board = t, O(s.board), window.dispatchEvent(new CustomEvent(m));
}, C = (t) => {
  s.loading || (x.start(), L.postMessage({
    type: y.CREATE_NEW,
    difficulty: t
  }));
}, H = () => {
  s.initialized || C(h.EASY);
}, K = () => {
  C(h.EASY);
}, W = () => {
  C(h.NORMAL);
}, J = () => {
  C(h.HARD);
}, q = () => {
  s.loading || k(M(h.EMPTY));
}, X = () => {
  s.loading || s.board.finished || (Y(s.board), k(s.board));
}, Z = () => {
  s.loading || s.board.finished || (U(s.board), k(s.board));
}, Q = () => {
  s.loading || (x.start(), L.postMessage({
    type: y.SOLVE,
    board: s.board
  }));
}, tt = () => {
  s.loading || (j(s.board), k(s.board));
}, T = (t, e) => {
  s.loading || (P(s.board, t, e), k(s.board));
}, et = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  changeColor: tt,
  initGame: H,
  newEasyGame: K,
  newEmptyGame: q,
  newHardGame: J,
  newNormalGame: W,
  solve: Q,
  state: s,
  undoColor: Z,
  undoOne: X,
  updateCell: T
}, Symbol.toStringTag, { value: "Module" })), nt = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>', ot = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-rotate-ccw"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>', it = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>', st = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>', lt = "_colorIcon_1d7c5_1", at = "_actionButton_1d7c5_6", I = {
  colorIcon: lt,
  actionButton: at
}, rt = et, ct = {
  "rotate-arrow": ot,
  plus: it,
  check: st,
  changeColor: `<span class="${I.colorIcon}"></span>`
};
class ut extends HTMLElement {
  constructor() {
    super(...arguments);
    l(this, "menu", "");
    l(this, "action", "");
    l(this, "icon", "");
    l(this, "button", document.createElement("button"));
    l(this, "hasClickedButton", !1);
    l(this, "onButtonClick", () => {
      var n;
      this.button.ariaDisabled !== "true" && (this.hasClickedButton = !0, this.menu && this.button && (this.button.ariaExpanded = this.button.ariaExpanded === "true" ? "false" : "true"), this.action && (rt[this.action](), (n = document.getElementById("sudoku-cell-0-0")) == null || n.focus()));
    });
    l(this, "onDocumentClick", () => {
      this.hasClickedButton ? this.hasClickedButton = !1 : this.button && (this.button.ariaExpanded = "false");
    });
    l(this, "onDocumentKeyDown", (n) => {
      n.key === "Escape" && this.button.ariaExpanded === "true" && (this.button.ariaExpanded = "false", this.button.focus());
    });
    l(this, "setLoading", () => {
      s.loading ? (this.button.ariaDisabled = "true", this.button.ariaExpanded = "false") : this.button.ariaDisabled = "false";
    });
    l(this, "setColor", () => {
      this.button.setAttribute(
        "data-color",
        s.board.currentColor.toString()
      );
    });
  }
  connectedCallback() {
    this.classList.add(I.actionButton), this.action = this.getAttribute("action") ?? "", this.menu = this.getAttribute("menu") ?? "", this.icon = this.getAttribute("icon") ?? "", this.role = "presentation", this.button = document.createElement("button"), this.button.type = "button", this.button.role = "menuitem", this.button.ariaDisabled = "false", this.button.setAttribute(
      "data-color",
      s.board.currentColor.toString()
    ), this.button.classList.add("button"), this.menu && (this.button.ariaHasPopup = "true", this.button.setAttribute("aria-controls", this.menu), this.button.ariaExpanded = "false"), window.addEventListener(g, this.setLoading), window.addEventListener(m, this.setColor), this.button.addEventListener("click", this.onButtonClick), this.menu && (document.addEventListener("keydown", this.onDocumentKeyDown), document.addEventListener("click", this.onDocumentClick)), this.button.innerHTML = `${ct[this.icon] ?? ""}${this.innerHTML}${this.menu ? nt : ""}`, this.replaceChildren(this.button);
  }
  disconnectedCallback() {
    window.removeEventListener(g, this.setLoading), window.removeEventListener(m, this.setColor), this.button.removeEventListener("click", this.onButtonClick), this.menu && (document.removeEventListener("keydown", this.onDocumentKeyDown), document.removeEventListener("click", this.onDocumentClick));
  }
}
const dt = "_board_nmbl0_1", ht = "_inner_nmbl0_10", pt = "_finished_nmbl0_27", v = {
  board: dt,
  inner: ht,
  finished: pt
};
class mt extends HTMLElement {
  constructor() {
    super(...arguments);
    l(this, "updateBoard", () => {
      this.classList.toggle(v.finished, s.board.finished);
    });
  }
  connectedCallback() {
    this.classList.add(v.board), this.classList.toggle(v.finished, s.board.finished);
    const n = document.createElement("div");
    n.classList.add(v.inner);
    for (let o = 0; o < 9; o++) {
      const i = document.createElement("div");
      for (let a = 0; a < 9; a++) {
        const d = Math.floor(o / 3) * 3 + Math.floor(a / 3), c = o % 3 * 3 + a % 3, u = document.createElement("app-sudoku-cell");
        u.setAttribute("row", d.toString()), u.setAttribute("col", c.toString()), i.appendChild(u);
      }
      n.appendChild(i);
    }
    this.appendChild(n), window.addEventListener(m, this.updateBoard);
  }
  disconnectedCallback() {
    window.removeEventListener(m, this.updateBoard);
  }
}
const ft = "_cell_d2i8u_1", wt = "_initial_d2i8u_40", bt = "_error_d2i8u_47", gt = "_finished_d2i8u_50", kt = "_right_d2i8u_69", Et = "_top_d2i8u_73", f = {
  cell: ft,
  initial: wt,
  error: bt,
  finished: gt,
  right: kt,
  top: Et
};
class vt extends HTMLElement {
  constructor() {
    super(...arguments);
    l(this, "row", 0);
    l(this, "col", 0);
    l(this, "index", 0);
    l(this, "button", document.createElement("button"));
    l(this, "dropdown", document.createElement("div"));
    l(this, "hasClickedButton", !1);
    l(this, "update", () => {
      var n;
      this.button.classList.toggle(
        f.initial,
        s.board.cells[this.index].initial
      ), this.button.classList.toggle(f.finished, s.board.finished), this.button.classList.toggle(
        f.error,
        s.board.cells[this.index].hasError
      ), this.button.ariaLabel = this.getButtonLabel(), this.button.ariaInvalid = s.board.cells[this.index].hasError ? "true" : "false", this.button.innerHTML = ((n = s.board.cells[this.index].value) == null ? void 0 : n.toString()) ?? "", this.button.setAttribute(
        "data-color",
        s.board.cells[this.index].color.toString()
      ), this.button.ariaExpanded === "true" && (this.dropdown.innerHTML = ""), s.board.cells[this.index].initial || s.board.finished ? (this.button.ariaExpanded = null, this.button.ariaHasPopup = null, this.button.removeAttribute("aria-controls")) : (this.button.ariaExpanded = "false", this.button.ariaHasPopup = "true", this.button.setAttribute("aria-controls", this.dropdown.id));
    });
    l(this, "onButtonClick", () => {
      this.button.ariaDisabled === "true" || this.button.ariaExpanded !== "false" || (this.hasClickedButton = !0, this.dropdown.innerHTML = "", [null, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((n) => {
        const o = document.createElement("button");
        o.type = "button", o.role = "option", o.ariaSelected = s.board.cells[this.index].value === n ? "true" : "false", o.innerHTML = n === null ? "-" : n.toString(), this.dropdown.appendChild(o);
      }), this.button.ariaExpanded = "true");
    });
    l(this, "onDocumentClick", () => {
      this.hasClickedButton ? this.hasClickedButton = !1 : this.button.ariaExpanded === "true" && this.update();
    });
    l(this, "onDropdownClick", (n) => {
      const o = n.target;
      if ((o == null ? void 0 : o.role) !== "option" || o.ariaDisabled === "true")
        return;
      const i = o.innerHTML === "-" ? null : Number(o.innerHTML);
      T(this.index, i), this.button.focus();
    });
    l(this, "onKeyDown", (n) => {
      n.key === "Escape" && this.button.ariaExpanded === "true" && (this.update(), this.button.focus());
    });
    l(this, "setLoading", async () => {
      this.button.ariaDisabled = s.loading ? "true" : "false";
    });
    l(this, "getButtonLabel", () => {
      const n = s.board.cells[this.index].value, o = n == null ? "No number selected." : `${n} is selected.`, i = `Sudoku cell row ${this.row + 1} and column ${this.col + 1}. ${o}`;
      return s.board.cells[this.index].initial ? `${i} The number cannot be changed.` : `${i} Click to select a number.`;
    });
    l(this, "initButton", () => {
      this.button.id = `sudoku-cell-${this.row}-${this.col}`, this.button.type = "button", this.button.ariaDisabled = "false", this.appendChild(this.button);
    });
    l(this, "initDropdown", () => {
      this.dropdown.id = `sudoku-cell-dropdown-${this.row}-${this.col}`, this.dropdown.role = "listbox", this.dropdown.ariaLabel = "Cell options", this.dropdown.classList.toggle(f.right, this.col > 4), this.dropdown.classList.toggle(f.top, this.row > 5), this.appendChild(this.dropdown);
    });
  }
  connectedCallback() {
    this.classList.add(f.cell), this.row = Number(this.getAttribute("row")), this.col = Number(this.getAttribute("col")), this.index = this.row * 9 + this.col, this.initButton(), this.initDropdown(), this.update(), window.addEventListener(g, this.setLoading), window.addEventListener(m, this.update), this.button.addEventListener("click", this.onButtonClick), document.addEventListener("click", this.onDocumentClick), this.dropdown.addEventListener("click", this.onDropdownClick), document.addEventListener("keydown", this.onKeyDown);
  }
  disconnectedCallback() {
    window.removeEventListener(g, this.setLoading), window.removeEventListener(m, this.update), this.button.removeEventListener("click", this.onButtonClick), document.removeEventListener("click", this.onDocumentClick), this.dropdown.removeEventListener("click", this.onDropdownClick), document.removeEventListener("keydown", this.onKeyDown);
  }
}
const Ct = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>', yt = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
class Lt extends HTMLElement {
  constructor() {
    super(...arguments);
    l(this, "switch", null);
    l(this, "onSwitchChange", () => {
      this.switch && (this.switch.ariaChecked = this.switch.ariaChecked === "true" ? "false" : "true", document.documentElement.setAttribute(
        "data-theme",
        this.switch.ariaChecked === "true" ? "dark" : "light"
      ), localStorage.setItem(
        "sudoku_theme",
        this.switch.ariaChecked === "true" ? "dark" : "light"
      ));
    });
  }
  connectedCallback() {
    let n = localStorage.getItem("sudoku_theme");
    n || (n = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), this.switch = document.createElement("button"), this.switch.type = "button", this.switch.role = "switch", this.switch.ariaLabel = "Enable dark theme", this.switch.ariaChecked = n === "dark" ? "true" : "false", this.switch.innerHTML = `${Ct}${yt}`, this.switch.addEventListener("click", this.onSwitchChange), this.appendChild(this.switch);
  }
  disconnectedCallback() {
    var n;
    (n = this.switch) == null || n.removeEventListener("click", this.onSwitchChange);
  }
}
const xt = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>', Mt = `<script>
  let theme = localStorage.getItem('sudoku_theme');
  if (!theme) {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  document.documentElement.setAttribute('data-theme', theme);
<\/script>
`, Ht = `<div class="container curtain">
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
    <footer class="block align-center">
      <nav>
        <ul class="no-style">
          <li>
            <a href="/" class="button" data-icon="arrow-left">
              Find more content
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  </div>
</div>
`, At = {
  "arrow-left": xt
}, _t = () => {
  Array.from(document.querySelectorAll("[data-icon]")).forEach((t) => {
    const e = At[t.getAttribute("data-icon") ?? ""];
    t.innerHTML = `${e}${t.innerHTML}`;
  });
}, Tt = () => {
  customElements.define("app-theme-switch", Lt), customElements.define("app-action-button", ut), customElements.define("app-sudoku-board", mt), customElements.define("app-sudoku-cell", vt), H(), _t(), setTimeout(() => {
    document.getElementsByClassName("curtain")[0].classList.remove("curtain");
  }, 0);
};
export {
  Ht as BodyHtml,
  Mt as HeadHtml,
  Tt as init
};
