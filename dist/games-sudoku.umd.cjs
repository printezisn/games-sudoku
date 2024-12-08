(function(d,h){typeof exports=="object"&&typeof module<"u"?h(exports):typeof define=="function"&&define.amd?define(["exports"],h):(d=typeof globalThis<"u"?globalThis:d||self,h(d.sudoku={}))})(this,function(d){"use strict";var gt=Object.defineProperty;var kt=(d,h,f)=>h in d?gt(d,h,{enumerable:!0,configurable:!0,writable:!0,value:f}):d[h]=f;var l=(d,h,f)=>kt(d,typeof h!="symbol"?h+"":h,f);const h=(t,e,n=500,o=1e3)=>{let i=null,a=!1;return{start:()=>{i!=null&&clearTimeout(i),i=setTimeout(()=>{a=!0,i=null,t()},n)},cancel:()=>{i!=null&&(clearTimeout(i),i=null),a?i=setTimeout(()=>{a=!1,i=null,e()},o):e()}}};var f=(t=>(t[t.CELL_CHANGE=0]="CELL_CHANGE",t[t.COLOR_CHANGE=1]="COLOR_CHANGE",t))(f||{}),m=(t=>(t[t.EASY=0]="EASY",t[t.NORMAL=1]="NORMAL",t[t.HARD=2]="HARD",t[t.EMPTY=3]="EMPTY",t))(m||{}),x=(t=>(t[t.CREATE_NEW=0]="CREATE_NEW",t[t.SOLVE=1]="SOLVE",t))(x||{});const z=t=>{const e=JSON.stringify(t,(n,o)=>o instanceof Set?Array.from(o):o);localStorage.setItem("sudoku_board",e)},O=()=>{const t=localStorage.getItem("sudoku_board");return t?JSON.parse(t,(n,o)=>n==="options"?new Set(o):o):null},S=t=>{const e=[...t];for(let n=e.length-1;n>=0;n--){const o=Math.floor(Math.random()*(n+1)),i=e[o];e[o]=e[n],e[n]=i}return e},$=5,B={[m.EASY]:40,[m.NORMAL]:35,[m.HARD]:30,[m.EMPTY]:0},G=t=>({...t,actions:t.actions.map(e=>({...e})),cells:t.cells.map(e=>({...e,options:new Set(e.options)}))}),g=t=>{const e=Array(9).fill(null).map(()=>Array(10).fill(0)),n=Array(9).fill(null).map(()=>Array(10).fill(0)),o=Array(9).fill(null).map(()=>Array(10).fill(0));t.finished=!0;for(let i=0;i<t.cells.length;i++){const a=t.cells[i].value;if(!a)continue;const p=Math.floor(i/9),c=i%9,u=Math.floor(p/3)*3+Math.floor(c/3);e[p][a]++,n[c][a]++,o[u][a]++}for(let i=0;i<t.cells.length;i++){const a=t.cells[i],p=a.value,c=Math.floor(i/9),u=i%9,L=Math.floor(c/3)*3+Math.floor(u/3);a.options.clear();for(let r=1;r<=9;r++){const w=p===r?2:1;e[c][r]<w&&n[u][r]<w&&o[L][r]<w&&a.options.add(r)}a.hasError=p!=null&&!a.options.has(p),(a.hasError||p==null)&&(t.finished=!1)}},R=t=>{const e=(t.currentColor+1)%$;t.actions.push({cellIndex:null,from:t.currentColor,to:e,type:f.COLOR_CHANGE}),t.currentColor=e},j=(t,e,n)=>{t.actions.push({cellIndex:e,from:t.cells[e].value,to:n,type:f.CELL_CHANGE}),t.cells[e].value=n,t.cells[e].color=t.currentColor,g(t)},M=(t,e)=>{let n=!1;switch(e.type){case f.COLOR_CHANGE:t.currentColor=e.from;break;case f.CELL_CHANGE:t.cells[e.cellIndex].value=e.from,n=!0;break}return n},P=t=>{const e=t.actions.pop();e&&M(t,e)&&g(t)},Y=t=>{let e=!1;for(;t.actions.length>0;){const n=t.actions.pop();if(e=M(t,n)||e,n.type===f.COLOR_CHANGE)break}e&&g(t)},H=t=>{let e=-1;for(let o=0;o<t.cells.length;o++){const i=t.cells[o];i.value==null&&(e===-1||i.options.size<t.cells[e].options.size)&&(e=o)}if(e===-1)return g(t),t;const n=S(Array.from(t.cells[e].options));for(let o=0;o<n.length;o++){const i=Math.floor(e/9)*9,a=e%9,p=Math.floor(e/27)*27+Math.floor(a/3)*3,c=G(t);let u=!0;c.cells[e].value=n[o],c.cells[e].color=c.currentColor;for(let r=a;r<81+a&&u;r+=9)r!==e&&(c.cells[r].options.delete(n[o]),c.cells[r].options.size===0&&(u=!1));for(let r=i;r<i+9&&u;r++)r!==e&&(c.cells[r].options.delete(n[o]),c.cells[r].options.size===0&&(u=!1));for(let r=p;r<27+p&&u;r+=9)for(let w=r;w<r+3;w++)if(w!==e&&(c.cells[w].options.delete(n[o]),c.cells[w].options.size===0)){u=!1;break}if(!u)continue;const L=H(c);if(L)return L}return null},T=t=>{const e={cells:Array(81).fill(null).map(()=>({value:null,color:0,hasError:!1,initial:!1,options:new Set})),finished:!1,actions:[],currentColor:0};if(g(e),B[t]===0)return e;const n=H(e),o=S(n.cells);for(let i=0;i<o.length;i++)i<B[t]?(o[i].initial=!0,o[i].color=n.currentColor):o[i].value=null;return g(n),n};function U(t){return new Worker("/module-assets/worker-VWXZbi3g.js",{name:t==null?void 0:t.name})}const k="setGameLoading",b="updateGameBoard",A=new U;A.onmessage=t=>{const e=t.data;_.cancel(),e.board&&E(e.board)};const s=(()=>{const t=O();return{board:t||T(m.EMPTY),loading:!1,initialized:!!t}})(),_=h(()=>{s.loading=!0,window.dispatchEvent(new CustomEvent(k))},()=>{s.loading=!1,window.dispatchEvent(new CustomEvent(k))}),E=t=>{s.board=t,z(s.board),window.dispatchEvent(new CustomEvent(b))},C=t=>{s.loading||(_.start(),A.postMessage({type:x.CREATE_NEW,difficulty:t}))},I=()=>{s.initialized||C(m.EASY)},V=()=>{C(m.EASY)},F=()=>{C(m.NORMAL)},K=()=>{C(m.HARD)},W=()=>{s.loading||E(T(m.EMPTY))},J=()=>{s.loading||s.board.finished||(P(s.board),E(s.board))},q=()=>{s.loading||s.board.finished||(Y(s.board),E(s.board))},X=()=>{s.loading||(_.start(),A.postMessage({type:x.SOLVE,board:s.board}))},Z=()=>{s.loading||(R(s.board),E(s.board))},N=(t,e)=>{s.loading||(j(s.board,t,e),E(s.board))},Q=Object.freeze(Object.defineProperty({__proto__:null,changeColor:Z,initGame:I,newEasyGame:V,newEmptyGame:W,newHardGame:K,newNormalGame:F,solve:X,state:s,undoColor:q,undoOne:J,updateCell:N},Symbol.toStringTag,{value:"Module"})),tt='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>',et='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-rotate-ccw"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>',nt='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',ot='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>',D={colorIcon:"_colorIcon_1d7c5_1",actionButton:"_actionButton_1d7c5_6"},it=Q,st={"rotate-arrow":et,plus:nt,check:ot,changeColor:`<span class="${D.colorIcon}"></span>`};class lt extends HTMLElement{constructor(){super(...arguments);l(this,"menu","");l(this,"action","");l(this,"icon","");l(this,"button",document.createElement("button"));l(this,"hasClickedButton",!1);l(this,"onButtonClick",()=>{var n;this.button.ariaDisabled!=="true"&&(this.hasClickedButton=!0,this.menu&&this.button&&(this.button.ariaExpanded=this.button.ariaExpanded==="true"?"false":"true"),this.action&&(it[this.action](),(n=document.getElementById("sudoku-cell-0-0"))==null||n.focus()))});l(this,"onDocumentClick",()=>{this.hasClickedButton?this.hasClickedButton=!1:this.button&&(this.button.ariaExpanded="false")});l(this,"onDocumentKeyDown",n=>{n.key==="Escape"&&this.button.ariaExpanded==="true"&&(this.button.ariaExpanded="false",this.button.focus())});l(this,"setLoading",()=>{s.loading?(this.button.ariaDisabled="true",this.button.ariaExpanded="false"):this.button.ariaDisabled="false"});l(this,"setColor",()=>{this.button.setAttribute("data-color",s.board.currentColor.toString())})}connectedCallback(){this.classList.add(D.actionButton),this.action=this.getAttribute("action")??"",this.menu=this.getAttribute("menu")??"",this.icon=this.getAttribute("icon")??"",this.role="presentation",this.button=document.createElement("button"),this.button.type="button",this.button.role="menuitem",this.button.ariaDisabled="false",this.button.setAttribute("data-color",s.board.currentColor.toString()),this.button.classList.add("button"),this.menu&&(this.button.ariaHasPopup="true",this.button.setAttribute("aria-controls",this.menu),this.button.ariaExpanded="false"),window.addEventListener(k,this.setLoading),window.addEventListener(b,this.setColor),this.button.addEventListener("click",this.onButtonClick),this.menu&&(document.addEventListener("keydown",this.onDocumentKeyDown),document.addEventListener("click",this.onDocumentClick)),this.button.innerHTML=`${st[this.icon]??""}${this.innerHTML}${this.menu?tt:""}`,this.replaceChildren(this.button)}disconnectedCallback(){window.removeEventListener(k,this.setLoading),window.removeEventListener(b,this.setColor),this.button.removeEventListener("click",this.onButtonClick),this.menu&&(document.removeEventListener("keydown",this.onDocumentKeyDown),document.removeEventListener("click",this.onDocumentClick))}}const y={board:"_board_nmbl0_1",inner:"_inner_nmbl0_10",finished:"_finished_nmbl0_27"};class at extends HTMLElement{constructor(){super(...arguments);l(this,"updateBoard",()=>{this.classList.toggle(y.finished,s.board.finished)})}connectedCallback(){this.classList.add(y.board),this.classList.toggle(y.finished,s.board.finished);const n=document.createElement("div");n.classList.add(y.inner);for(let o=0;o<9;o++){const i=document.createElement("div");for(let a=0;a<9;a++){const p=Math.floor(o/3)*3+Math.floor(a/3),c=o%3*3+a%3,u=document.createElement("app-sudoku-cell");u.setAttribute("row",p.toString()),u.setAttribute("col",c.toString()),i.appendChild(u)}n.appendChild(i)}this.appendChild(n),window.addEventListener(b,this.updateBoard)}disconnectedCallback(){window.removeEventListener(b,this.updateBoard)}}const v={cell:"_cell_d2i8u_1",initial:"_initial_d2i8u_40",error:"_error_d2i8u_47",finished:"_finished_d2i8u_50",right:"_right_d2i8u_69",top:"_top_d2i8u_73"};class rt extends HTMLElement{constructor(){super(...arguments);l(this,"row",0);l(this,"col",0);l(this,"index",0);l(this,"button",document.createElement("button"));l(this,"dropdown",document.createElement("div"));l(this,"hasClickedButton",!1);l(this,"update",()=>{var n;this.button.classList.toggle(v.initial,s.board.cells[this.index].initial),this.button.classList.toggle(v.finished,s.board.finished),this.button.classList.toggle(v.error,s.board.cells[this.index].hasError),this.button.ariaLabel=this.getButtonLabel(),this.button.ariaInvalid=s.board.cells[this.index].hasError?"true":"false",this.button.innerHTML=((n=s.board.cells[this.index].value)==null?void 0:n.toString())??"",this.button.setAttribute("data-color",s.board.cells[this.index].color.toString()),this.button.ariaExpanded==="true"&&(this.dropdown.innerHTML=""),s.board.cells[this.index].initial||s.board.finished?(this.button.ariaExpanded=null,this.button.ariaHasPopup=null,this.button.removeAttribute("aria-controls")):(this.button.ariaExpanded="false",this.button.ariaHasPopup="true",this.button.setAttribute("aria-controls",this.dropdown.id))});l(this,"onButtonClick",()=>{this.button.ariaDisabled==="true"||this.button.ariaExpanded!=="false"||(this.hasClickedButton=!0,this.dropdown.innerHTML="",[null,1,2,3,4,5,6,7,8,9].forEach(n=>{const o=document.createElement("button");o.type="button",o.role="option",o.ariaSelected=s.board.cells[this.index].value===n?"true":"false",o.innerHTML=n===null?"-":n.toString(),this.dropdown.appendChild(o)}),this.button.ariaExpanded="true")});l(this,"onDocumentClick",()=>{this.hasClickedButton?this.hasClickedButton=!1:this.button.ariaExpanded==="true"&&this.update()});l(this,"onDropdownClick",n=>{const o=n.target;if((o==null?void 0:o.role)!=="option"||o.ariaDisabled==="true")return;const i=o.innerHTML==="-"?null:Number(o.innerHTML);N(this.index,i),this.button.focus()});l(this,"onKeyDown",n=>{n.key==="Escape"&&this.button.ariaExpanded==="true"&&(this.update(),this.button.focus())});l(this,"setLoading",async()=>{this.button.ariaDisabled=s.loading?"true":"false"});l(this,"getButtonLabel",()=>{const n=s.board.cells[this.index].value,o=n==null?"No number selected.":`${n} is selected.`,i=`Sudoku cell row ${this.row+1} and column ${this.col+1}. ${o}`;return s.board.cells[this.index].initial?`${i} The number cannot be changed.`:`${i} Click to select a number.`});l(this,"initButton",()=>{this.button.id=`sudoku-cell-${this.row}-${this.col}`,this.button.type="button",this.button.ariaDisabled="false",this.appendChild(this.button)});l(this,"initDropdown",()=>{this.dropdown.id=`sudoku-cell-dropdown-${this.row}-${this.col}`,this.dropdown.role="listbox",this.dropdown.ariaLabel="Cell options",this.dropdown.classList.toggle(v.right,this.col>4),this.dropdown.classList.toggle(v.top,this.row>5),this.appendChild(this.dropdown)})}connectedCallback(){this.classList.add(v.cell),this.row=Number(this.getAttribute("row")),this.col=Number(this.getAttribute("col")),this.index=this.row*9+this.col,this.initButton(),this.initDropdown(),this.update(),window.addEventListener(k,this.setLoading),window.addEventListener(b,this.update),this.button.addEventListener("click",this.onButtonClick),document.addEventListener("click",this.onDocumentClick),this.dropdown.addEventListener("click",this.onDropdownClick),document.addEventListener("keydown",this.onKeyDown)}disconnectedCallback(){window.removeEventListener(k,this.setLoading),window.removeEventListener(b,this.update),this.button.removeEventListener("click",this.onButtonClick),document.removeEventListener("click",this.onDocumentClick),this.dropdown.removeEventListener("click",this.onDropdownClick),document.removeEventListener("keydown",this.onKeyDown)}}const ct='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>',ut='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';class dt extends HTMLElement{constructor(){super(...arguments);l(this,"switch",null);l(this,"onSwitchChange",()=>{this.switch&&(this.switch.ariaChecked=this.switch.ariaChecked==="true"?"false":"true",document.documentElement.setAttribute("data-theme",this.switch.ariaChecked==="true"?"dark":"light"),localStorage.setItem("sudoku_theme",this.switch.ariaChecked==="true"?"dark":"light"))})}connectedCallback(){let n=localStorage.getItem("sudoku_theme");n||(n=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),this.switch=document.createElement("button"),this.switch.type="button",this.switch.role="switch",this.switch.ariaLabel="Enable dark theme",this.switch.ariaChecked=n==="dark"?"true":"false",this.switch.innerHTML=`${ct}${ut}`,this.switch.addEventListener("click",this.onSwitchChange),this.appendChild(this.switch)}disconnectedCallback(){var n;(n=this.switch)==null||n.removeEventListener("click",this.onSwitchChange)}}const ht='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',pt=`<script>
  let theme = localStorage.getItem('sudoku_theme');
  if (!theme) {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  document.documentElement.setAttribute('data-theme', theme);
<\/script>
`,ft=`<div class="container curtain">
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
`,mt={"arrow-left":ht},wt=()=>{Array.from(document.querySelectorAll("[data-icon]")).forEach(t=>{const e=mt[t.getAttribute("data-icon")??""];t.innerHTML=`${e}${t.innerHTML}`})},bt=()=>{customElements.define("app-theme-switch",dt),customElements.define("app-action-button",lt),customElements.define("app-sudoku-board",at),customElements.define("app-sudoku-cell",rt),I(),wt(),setTimeout(()=>{document.getElementsByClassName("curtain")[0].classList.remove("curtain")},0)};d.BodyHtml=ft,d.HeadHtml=pt,d.init=bt,Object.defineProperty(d,Symbol.toStringTag,{value:"Module"})});
