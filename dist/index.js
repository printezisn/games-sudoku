var I = Object.defineProperty;
var O = (t, e, n) => e in t ? I(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var l = (t, e, n) => O(t, typeof e != "symbol" ? e + "" : e, n);
const N = (t, e, n = 500, o = 1e3) => {
  let i = null, r = !1;
  return { start: () => {
    i != null && clearTimeout(i), i = setTimeout(() => {
      r = !0, i = null, t();
    }, n);
  }, cancel: () => {
    i != null && (clearTimeout(i), i = null), r ? i = setTimeout(() => {
      r = !1, i = null, e();
    }, o) : e();
  } };
};
var m = /* @__PURE__ */ ((t) => (t[t.CELL_CHANGE = 0] = "CELL_CHANGE", t[t.COLOR_CHANGE = 1] = "COLOR_CHANGE", t))(m || {}), h = /* @__PURE__ */ ((t) => (t[t.EASY = 0] = "EASY", t[t.NORMAL = 1] = "NORMAL", t[t.HARD = 2] = "HARD", t[t.EMPTY = 3] = "EMPTY", t))(h || {}), L = /* @__PURE__ */ ((t) => (t[t.CREATE_NEW = 0] = "CREATE_NEW", t[t.SOLVE = 1] = "SOLVE", t))(L || {});
const $ = (t) => {
  const e = JSON.stringify(
    t,
    (n, o) => o instanceof Set ? Array.from(o) : o
  );
  localStorage.setItem("sudoku_board", e);
}, R = () => {
  const t = localStorage.getItem("sudoku_board");
  return t ? JSON.parse(
    t,
    (n, o) => n === "options" ? new Set(o) : o
  ) : null;
}, A = (t) => {
  const e = [...t];
  for (let n = e.length - 1; n >= 0; n--) {
    const o = Math.floor(Math.random() * (n + 1)), i = e[o];
    e[o] = e[n], e[n] = i;
  }
  return e;
}, G = 5, _ = {
  [h.EASY]: 40,
  [h.NORMAL]: 35,
  [h.HARD]: 30,
  [h.EMPTY]: 0
}, P = (t) => ({
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
    const r = t.cells[i].value;
    if (!r) continue;
    const u = Math.floor(i / 9), c = i % 9, d = Math.floor(u / 3) * 3 + Math.floor(c / 3);
    e[u][r]++, n[c][r]++, o[d][r]++;
  }
  for (let i = 0; i < t.cells.length; i++) {
    const r = t.cells[i], u = r.value, c = Math.floor(i / 9), d = i % 9, k = Math.floor(c / 3) * 3 + Math.floor(d / 3);
    r.options.clear();
    for (let a = 1; a <= 9; a++) {
      const f = u === a ? 2 : 1;
      e[c][a] < f && n[d][a] < f && o[k][a] < f && r.options.add(a);
    }
    r.hasError = u != null && !r.options.has(u), (r.hasError || u == null) && (t.finished = !1);
  }
}, j = (t) => {
  const e = (t.currentColor + 1) % G;
  t.actions.push({
    cellIndex: null,
    from: t.currentColor,
    to: e,
    type: m.COLOR_CHANGE
  }), t.currentColor = e;
}, z = (t, e, n) => {
  t.actions.push({
    cellIndex: e,
    from: t.cells[e].value,
    to: n,
    type: m.CELL_CHANGE
  }), t.cells[e].value = n, t.cells[e].color = t.currentColor, b(t);
}, B = (t, e) => {
  let n = !1;
  switch (e.type) {
    case m.COLOR_CHANGE:
      t.currentColor = e.from;
      break;
    case m.CELL_CHANGE:
      t.cells[e.cellIndex].value = e.from, n = !0;
      break;
  }
  return n;
}, Y = (t) => {
  const e = t.actions.pop();
  e && B(t, e) && b(t);
}, V = (t) => {
  let e = !1;
  for (; t.actions.length > 0; ) {
    const n = t.actions.pop();
    if (e = B(t, n) || e, n.type === m.COLOR_CHANGE)
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
  const n = A(Array.from(t.cells[e].options));
  for (let o = 0; o < n.length; o++) {
    const i = Math.floor(e / 9) * 9, r = e % 9, u = Math.floor(e / 27) * 27 + Math.floor(r / 3) * 3, c = P(t);
    let d = !0;
    c.cells[e].value = n[o], c.cells[e].color = c.currentColor;
    for (let a = r; a < 81 + r && d; a += 9)
      a !== e && (c.cells[a].options.delete(n[o]), c.cells[a].options.size === 0 && (d = !1));
    for (let a = i; a < i + 9 && d; a++)
      a !== e && (c.cells[a].options.delete(n[o]), c.cells[a].options.size === 0 && (d = !1));
    for (let a = u; a < 27 + u && d; a += 9)
      for (let f = a; f < a + 3; f++)
        if (f !== e && (c.cells[f].options.delete(n[o]), c.cells[f].options.size === 0)) {
          d = !1;
          break;
        }
    if (!d) continue;
    const k = S(c);
    if (k) return k;
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
  if (b(e), _[t] === 0)
    return e;
  const n = S(e), o = A(n.cells);
  for (let i = 0; i < o.length; i++)
    i < _[t] ? (o[i].initial = !0, o[i].color = n.currentColor) : o[i].value = null;
  return b(n), n;
};
function K(t) {
  return new Worker(
    "/module-assets/worker-VWXZbi3g.js",
    {
      name: t == null ? void 0 : t.name
    }
  );
}
const g = "setGameLoading", p = "updateGameBoard", x = new K();
x.onmessage = (t) => {
  const e = t.data;
  y.cancel(), e.board && E(e.board);
};
const W = () => {
  const t = R();
  return {
    board: t || M(h.EMPTY),
    loading: !1,
    initialized: !!t
  };
}, s = W(), y = N(
  () => {
    s.loading = !0, window.dispatchEvent(new CustomEvent(g));
  },
  () => {
    s.loading = !1, window.dispatchEvent(new CustomEvent(g));
  }
), E = (t) => {
  s.board = t, $(s.board), window.dispatchEvent(new CustomEvent(p));
}, v = (t) => {
  s.loading || (y.start(), x.postMessage({
    type: L.CREATE_NEW,
    difficulty: t
  }));
}, T = () => {
  s.initialized || v(h.EASY);
}, F = () => {
  v(h.EASY);
}, J = () => {
  v(h.NORMAL);
}, U = () => {
  v(h.HARD);
}, q = () => {
  s.loading || E(M(h.EMPTY));
}, X = () => {
  s.loading || s.board.finished || (Y(s.board), E(s.board));
}, Z = () => {
  s.loading || s.board.finished || (V(s.board), E(s.board));
}, Q = () => {
  s.loading || (y.start(), x.postMessage({
    type: L.SOLVE,
    board: s.board
  }));
}, tt = () => {
  s.loading || (j(s.board), E(s.board));
}, H = (t, e) => {
  s.loading || (z(s.board, t, e), E(s.board));
}, et = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  changeColor: tt,
  initGame: T,
  newEasyGame: F,
  newEmptyGame: q,
  newHardGame: U,
  newNormalGame: J,
  solve: Q,
  state: s,
  undoColor: Z,
  undoOne: X,
  updateCell: H
}, Symbol.toStringTag, { value: "Module" })), nt = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>', ot = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-rotate-ccw"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>', it = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>', st = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>', lt = "_colorIcon_1d7c5_1", rt = "_actionButton_1d7c5_6", D = {
  colorIcon: lt,
  actionButton: rt
}, at = et, ct = {
  "rotate-arrow": ot,
  plus: it,
  check: st,
  changeColor: `<span class="${D.colorIcon}"></span>`
};
class dt extends HTMLElement {
  constructor() {
    super(...arguments);
    l(this, "menu", "");
    l(this, "action", "");
    l(this, "icon", "");
    l(this, "button", document.createElement("button"));
    l(this, "hasClickedButton", !1);
    l(this, "onButtonClick", () => {
      var n;
      this.button.ariaDisabled !== "true" && (this.hasClickedButton = !0, this.menu && this.button && (this.button.ariaExpanded = this.button.ariaExpanded === "true" ? "false" : "true"), this.action && (at[this.action](), (n = document.getElementById("sudoku-cell-0-0")) == null || n.focus()));
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
    this.classList.add(D.actionButton), this.action = this.getAttribute("action") ?? "", this.menu = this.getAttribute("menu") ?? "", this.icon = this.getAttribute("icon") ?? "", this.role = "presentation", this.button = document.createElement("button"), this.button.type = "button", this.button.role = "menuitem", this.button.ariaDisabled = "false", this.button.setAttribute(
      "data-color",
      s.board.currentColor.toString()
    ), this.button.classList.add("button"), this.menu && (this.button.ariaHasPopup = "true", this.button.setAttribute("aria-controls", this.menu), this.button.ariaExpanded = "false"), window.addEventListener(g, this.setLoading), window.addEventListener(p, this.setColor), this.button.addEventListener("click", this.onButtonClick), this.menu && (document.addEventListener("keydown", this.onDocumentKeyDown), document.addEventListener("click", this.onDocumentClick)), this.button.innerHTML = `${ct[this.icon] ?? ""}${this.innerHTML}${this.menu ? nt : ""}`, this.replaceChildren(this.button);
  }
  disconnectedCallback() {
    window.removeEventListener(g, this.setLoading), window.removeEventListener(p, this.setColor), this.button.removeEventListener("click", this.onButtonClick), this.menu && (document.removeEventListener("keydown", this.onDocumentKeyDown), document.removeEventListener("click", this.onDocumentClick));
  }
}
const ut = "_board_nmbl0_1", ht = "_inner_nmbl0_10", ft = "_finished_nmbl0_27", C = {
  board: ut,
  inner: ht,
  finished: ft
};
class pt extends HTMLElement {
  constructor() {
    super(...arguments);
    l(this, "updateBoard", () => {
      this.classList.toggle(C.finished, s.board.finished);
    });
  }
  connectedCallback() {
    this.classList.add(C.board), this.classList.toggle(C.finished, s.board.finished);
    const n = document.createElement("div");
    n.classList.add(C.inner);
    for (let o = 0; o < 9; o++) {
      const i = document.createElement("div");
      for (let r = 0; r < 9; r++) {
        const u = Math.floor(o / 3) * 3 + Math.floor(r / 3), c = o % 3 * 3 + r % 3, d = document.createElement("app-sudoku-cell");
        d.setAttribute("row", u.toString()), d.setAttribute("col", c.toString()), i.appendChild(d);
      }
      n.appendChild(i);
    }
    this.appendChild(n), window.addEventListener(p, this.updateBoard);
  }
  disconnectedCallback() {
    window.removeEventListener(p, this.updateBoard);
  }
}
const wt = "_cell_d2i8u_1", mt = "_initial_d2i8u_40", bt = "_error_d2i8u_47", gt = "_finished_d2i8u_50", Et = "_right_d2i8u_69", kt = "_top_d2i8u_73", w = {
  cell: wt,
  initial: mt,
  error: bt,
  finished: gt,
  right: Et,
  top: kt
};
class Ct extends HTMLElement {
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
        w.initial,
        s.board.cells[this.index].initial
      ), this.button.classList.toggle(w.finished, s.board.finished), this.button.classList.toggle(
        w.error,
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
      H(this.index, i), this.button.focus();
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
      this.dropdown.id = `sudoku-cell-dropdown-${this.row}-${this.col}`, this.dropdown.role = "listbox", this.dropdown.ariaLabel = "Cell options", this.dropdown.classList.toggle(w.right, this.col > 4), this.dropdown.classList.toggle(w.top, this.row > 5), this.appendChild(this.dropdown);
    });
  }
  connectedCallback() {
    this.classList.add(w.cell), this.row = Number(this.getAttribute("row")), this.col = Number(this.getAttribute("col")), this.index = this.row * 9 + this.col, this.initButton(), this.initDropdown(), this.update(), window.addEventListener(g, this.setLoading), window.addEventListener(p, this.update), this.button.addEventListener("click", this.onButtonClick), document.addEventListener("click", this.onDocumentClick), this.dropdown.addEventListener("click", this.onDropdownClick), document.addEventListener("keydown", this.onKeyDown);
  }
  disconnectedCallback() {
    window.removeEventListener(g, this.setLoading), window.removeEventListener(p, this.update), this.button.removeEventListener("click", this.onButtonClick), document.removeEventListener("click", this.onDocumentClick), this.dropdown.removeEventListener("click", this.onDropdownClick), document.removeEventListener("keydown", this.onKeyDown);
  }
}
const vt = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>', Lt = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
class xt extends HTMLElement {
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
    n || (n = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), this.switch = document.createElement("button"), this.switch.type = "button", this.switch.role = "switch", this.switch.ariaLabel = "Enable dark theme", this.switch.ariaChecked = n === "dark" ? "true" : "false", this.switch.innerHTML = `${vt}${Lt}`, this.switch.addEventListener("click", this.onSwitchChange), this.appendChild(this.switch);
  }
  disconnectedCallback() {
    var n;
    (n = this.switch) == null || n.removeEventListener("click", this.onSwitchChange);
  }
}
const yt = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>', _t = {
  "arrow-left": yt
}, At = () => {
  Array.from(document.querySelectorAll("[data-icon]")).forEach((t) => {
    const e = _t[t.getAttribute("data-icon") ?? ""];
    t.innerHTML = `${e}${t.innerHTML}`;
  });
}, Mt = () => {
  customElements.define("app-theme-switch", xt), customElements.define("app-action-button", dt), customElements.define("app-sudoku-board", pt), customElements.define("app-sudoku-cell", Ct), T(), At(), setTimeout(() => {
    document.getElementsByClassName("curtain")[0].classList.remove("curtain");
  }, 0);
};
export {
  Mt as init
};
