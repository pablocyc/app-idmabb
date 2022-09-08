import{initializeApp as x}from"https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";import{getAuth as L,onAuthStateChanged as E,createUserWithEmailAndPassword as S,signInWithEmailAndPassword as k,signOut as A,updateProfile as C}from"https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js";import{getFirestore as q,getDoc as N,doc as P,onSnapshot as T,collection as M}from"https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerpolicy&&(i.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?i.credentials="include":e.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(e){if(e.ep)return;e.ep=!0;const i=o(e);fetch(e.href,i)}})();class m extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
      :host {
        width: 100%;
      }

      .container {
        border: 1.5px solid var(--text-color);
        border-radius: 12px;
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        background-color: var(--card-color);
      }

      .metrics {
        display: flex;
        flex-direction: column;
      }

      .title {
        margin: 0;
        font-size: 1.2rem;
        font-weight: 500;
      }

      .title strong {
        font-weight: 900;
        margin-left: 0.5rem;
      }

      .value {
        font-size: 2rem;
        font-weight: 500;
        margin: 1rem 0;
      }

      .vs-last {
        display: flex;
        font-weight: 700;
      }

      p {
        margin: 0;
      }

      .percent {
        color: var(--accent-color);
        margin-right: 0.5rem;
      }

      .vs-last img {
        width: 20px;
        height: 20px;
      }

      .column-right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
      }

      .btn-graph {
        border: none;
        background-color: transparent;
        cursor: pointer;
      }

      .btn-graph img {
        width: 24px;
        height: 24px;
      }
    `}connectedCallback(){this.title=this.getAttribute("title")||"Sensor",this.parameter=this.getAttribute("parameter")||"-",this.value=this.getAttribute("value")||"0",this.render()}setValue(t){this.value=t,this.render()}render(){this.shadowRoot.innerHTML=`
    <style>${m.styles}</style>
    <div class="container">
      <div class="metrics">
        <h1 class="title">${this.title} <strong>${this.parameter}</strong></h1>
        <div class="value">${this.value}</div>
        <div class="vs-last">
          <img src="./icons/arrow-up.svg" alt="arrow-up">
          <p class="percent">20%</p>
          <p class="vs">vs last hour</p>
        </div>
      </div>
      <div class="column-right">
        <button class="btn-graph">
          <img src="./icons/maximize.svg" alt="maximize">
        </button>
        <img src="./icons/Chart.svg" alt="chart">
      </div>
    </div>`}}customElements.define("card-parameter",m);class u extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}handleEvent(t){const o=t.target.classList;if(o.contains("btn")){o.toggle("active");const s=new CustomEvent("filter",{detail:{title:this.title,message:t.path[0].innerText},bubbles:!0,composed:!0});this.dispatchEvent(s)}}static get styles(){return`
      :host {
      }

      .container {
        border-bottom: 1px solid var(--text-color);
      }

      .main {
        padding: 0.5rem 1.5rem;
      }

      .title {
        margin: 8px 0;
        font-size: 1.2rem;
        font-weight: 700;
      }

      .buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 0 12px;
      }

      .btn {
        border: 1.5px solid var(--text-color);
        background-color: transparent;
        cursor: pointer;
        padding: 8px 12px;
        margin: 8px 0;
      }

      .active {
        background-color: var(--text-color);
        color: var(--card-color);
      }

      .disable {
        opacity: 0.5;
        cursor: none;
      }
    `}connectedCallback(){this.title=this.getAttribute("title")||"-",this.params=this.getAttribute("params").split(","),this.render(),this.btns=this.shadowRoot.querySelectorAll(".btn"),this.shadowRoot.querySelector(".buttons").addEventListener("click",this)}unSave(t){t.forEach(o=>{this.btns.forEach(s=>{s.innerText===o&&s.classList.toggle("active")})})}getButtons(t){let o="";return t.forEach(s=>{o+=`<button class="btn">${s}</button> `}),o}clear(){this.btns.forEach(t=>{t.classList.remove("active")})}render(){this.shadowRoot.innerHTML=`
    <style>${u.styles}</style>
    <div class="container">
      <main class="main">
        <h1 class="title">${this.title}</h1>
        <div class="buttons">
          ${this.getButtons(this.params)}
        </div>
      </main>
    </div>`}}customElements.define("filter-parameter",u);class p extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.filterSelected=[],this.titleFilter=[]}handleEvent(t){const o=t.composedPath();if(t.type==="click"&&((o[0].className==="modal-show"||o[0].className==="btn-close")&&(this.classList.remove("modal-show"),this.filters.forEach(s=>s.unSave(this.filterSelected)),this.filterSelected=[]),o[0].classList.contains("clear")&&this.filters.forEach(s=>s.clear()),o[0].classList.contains("apply"))){this.classList.remove("modal-show");const s=new CustomEvent("apply",{detail:{title:this.titleFilter,filters:this.filterSelected},bubbles:!0,composed:!0});this.dispatchEvent(s),this.filterSelected=[],this.titleFilter=[]}t.type==="filter"&&(this.filterSelected.push(t.detail.message),this.titleFilter.push(t.detail.title))}static get styles(){return`
      :host {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #0005;
        transition: transform 0.3s ease-in-out;
        transform: scale(0);
      }

      .container {
        background-color: var(--card-color);
        width: 85vw;
        height: 80vh;
        position: relative;
        overflow-y: scroll;
      }

      .header {
        display: flex;
        position: fixed;
        width: 85vw;
        background-color: var(--card-color);
        justify-content: space-between;
        align-items: center;
        height: 2.5rem;
        border-bottom: 1.5px solid var(--text-color);
      }

      .container-params {
        margin-top: 2.5rem;
      }

      .title {
        margin: 0;
        font-size: 1rem;
        font-weight: 700;
        padding-left: 1.5rem;
      }

      .button {
        border: none;
        background-color: transparent;
        cursor: pointer;
        padding: 0;
        margin-right: 1.5rem;
        width: 24px;
        height: 24px;
      }

      .btn-close {
        width: 20px;
        height: 20px;
      }

      .footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid var(--text-color);
        width: 100%;
        padding: 0.2rem 0;
      }

      .btn {
        border: 1.5px solid var(--text-color);
        background-color: transparent;
        cursor: pointer;
        padding: 8px 12px;
        margin: 8px 0;
      }

      .clear {
        margin-left: 1.5rem;
        border: none;
      }

      .apply {
        margin-right: 1.5rem;
        background-color: var(--text-color);
        color: var(--card-color);
      }

      filter-parameter {
        border-bottom: 1px solid var(--text-color);
      }
    `}connectedCallback(){this.render(),this.container=this.shadowRoot.querySelector(".container-params"),this.filters=this.shadowRoot.querySelectorAll("filter-parameter"),this.addEventListener("click",this),this.addEventListener("filter",this)}render(){this.shadowRoot.innerHTML=`
    <style>${p.styles}</style>
    <div class="container">
      <div class="header">
        <h1 class="title">Parameters</h1>
        <button class="button">
          <img class="btn-close" src="icons/Close.svg" alt="close">
        </button>
      </div>
      <div class="container-params">
        <filter-parameter
          title="Tensi\xF3n"
          params="L1-Neutro, L2-Neutro, L3-Neutro, L1 - L2, L2 - L3, L3 - L1"
          ids="Volt_L1-N, Volt_L2-N, Volt_L3-N, Volt_L1-L2, Volt_L2-L3, Volt_L3-L1">
        </filter-parameter>
        <filter-parameter
          title="Corriente"
          params="I1, I2, I3, I1 + I2 + I3">
        </filter-parameter>
        <filter-parameter
          title="Potencia"
          params="P1 - Activa, P2 - Activa, P3 - Activa, PT - Activa Total, Q1 - Reactiva, Q2 - Reactiva, Q3 - Reactiva, QT - Reactiva Total, S1 - Aparente, S2 - Aparente, S3 - Aparente, ST - Aparente Total">
        </filter-parameter>
        <filter-parameter
          title="Factor de Potencia"
          params="FP 1, FP 2, FP 3, FPT Total">
        </filter-parameter>
        <filter-parameter
          title="Frecuencia"
          params="Frecuencia-1">
        </filter-parameter>
      </div>
      <footer class="footer">
        <button class="btn clear">Clear all</button>
        <button class="btn apply">Apply</button>
      </footer>
    </div>`}}customElements.define("modal-menu",p);const R={firebaseConfig:{apiKey:"AIzaSyCV-VH5PUNT39c0NolUn08d8vI-pgeeDCo",authDomain:"idm144-abb.firebaseapp.com",projectId:"idm144-abb",storageBucket:"idm144-abb.appspot.com",messagingSenderId:"792421020780",appId:"1:792421020780:web:19e19311f5712f156e5449",measurementId:"G-BLV937Y7C0"}},f=x(R.firebaseConfig),v=q(f),l=L(f),z=r=>N(P(v,"IDM144-0",r)),I=r=>T(M(v,"IDM144-0/"),r),F=(r,t)=>S(l,r,t),V=(r,t)=>k(l,r,t),$=()=>A(l),H=E,j=C;class h extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}handleEvent(t){const o=t.composedPath();t.type==="click"&&(o[0].classList.contains("button-close")&&this.removeAttribute("class"),o[0].classList.contains("login")&&(this.removeAttribute("class","menu-show"),this.dispatchEvent(new CustomEvent("login",{bubbles:!0,detail:{name:"loginMenu"}})))),t.type==="submit"&&(t.preventDefault(),this.name=this.shadowRoot.querySelector("#name").value,this.email=this.shadowRoot.querySelector("#email").value,this.pass=this.shadowRoot.querySelector("#password").value,F(this.email,this.pass).then(s=>{this.form.reset();const e=s.user;j(e,{displayName:this.name}).then(()=>console.log("update profile...")).catch(i=>console.log("error updating profile: ",i)),this.dispatchEvent(new CustomEvent("login",{bubbles:!0,detail:{name:"signup",userName:this.name}})),this.removeAttribute("class")}).catch(s=>{s.code,s.message}))}static get styles(){return`
      :host {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #0005;
        transition: transform 0.3s ease-in-out;
        transform: scale(0);
      }

      .container {
        background-color: #fff;
        width: 85vw;
        position: relative;
      }

      .header {
        display: flex;
        margin-left: 2rem;
        margin-right: 1.2rem;
        margin-top: 0.5rem;
        justify-content: space-between;
        align-items: center;
        height: 2.5rem;
      }

      .button img {
        width: 24px;
        height: 24px;
      }

      button {
        border-style: none;
        background-color: transparent;
        cursor: pointer;
      }

      .main {
        margin: 1.5rem 2rem;
        margin-top: 0.5rem;
      }

      .title {
        margin: 0;
        font-size: 1.5rem;
      }

      .description {
        margin: 0;
        margin-top: 0.5rem;
        font-size: 0.8rem;
      }

      .form {
        margin-top: 1.5rem;

      }

      label {
        display: block;
        font-weight: 500;
        margin: 0.2rem 0;
      }

      label[for=email],
      label[for=password] {
        margin-top: 0.8rem;
      }

      input {
        width: 95%;
        height: 2.2rem;
        border-radius: 8px;
        border: 1px solid var(--border-color);
        padding-left: 0.5rem;
        font-size: 0.9rem;
      }

      .must {
        margin: 0;
        margin-top: 0.5rem;
        font-size: 0.8rem;
        font-weight: 400;
      }

      .btn-getstarter {
        width: 100%;
        margin-top: 1.5rem;
        background-color: var(--primary-color);
        color: white;
        font-size: 1rem;
        font-weight: 500;
        padding: 0.7rem;
        border-radius: 8px;
      }

      .already {
        text-align: center;
        font-size: 0.8rem;
        margin-top: 1.8rem;
      }

      .already span {
        color: var(--primary-color);
        font-weight: 700;
      }
    `}connectedCallback(){this.render(),this.addEventListener("click",this),this.form=this.shadowRoot.querySelector("#form"),this.form.addEventListener("submit",this)}render(){this.shadowRoot.innerHTML=`
    <style>${h.styles}</style>
    <div class="container">
      <header class="header">
        <img src="vite.svg" alt="logo">
        <button class="button button-close">
          <img class="btn-close button-close" src="icons/Close.svg" alt="close">
        </button>
      </header>
      <main class="main">
        <h1 class="title">Sign up</h1>
        <p class="description">Start your 30-day free trial.</p>
        <form action="" id="form" class="form">
          <label for="name">Name*</label>
          <input type="text" id="name" name="name" placeholder="Enter your name" required>
          <label for="email">Email*</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" required>
          <label for="password">Password*</label>
          <input type="password" id="password" name="password" placeholder="Create a password" minlength="6" required>
          <p class="must">Must be a least 6 characters.</p>
          <button class="btn-getstarter" type="submit">Get started</button>
        </form>
        <p class="already">Already have an account? <span class="login">Log in</span></p>
      </main>
    </div>`}}customElements.define("modal-signup",h);class g extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}handleEvent(t){const o=t.composedPath();t.type==="click"&&(o[0].classList.contains("button-close")&&this.removeAttribute("class"),o[0].classList.contains("signup")&&(this.removeAttribute("class","menu-show"),this.dispatchEvent(new CustomEvent("login",{bubbles:!0,detail:{name:"signupMenu"}})))),t.type==="submit"&&(t.preventDefault(),this.email=this.shadowRoot.querySelector("#email").value,this.pass=this.shadowRoot.querySelector("#password").value,V(this.email,this.pass).then(s=>{this.form.reset();const e=s.user;this.dispatchEvent(new CustomEvent("login",{bubbles:!0,detail:{name:"loging",userName:e.displayName}})),this.removeAttribute("class")}).catch(s=>{s.code,s.message}))}static get styles(){return`
      :host {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #0005;
        transition: transform 0.3s ease-in-out;
        transform: scale(0);
      }

      .container {
        background-color: #fff;
        width: 85vw;
        position: relative;
      }

      .header {
        display: flex;
        margin-left: 2rem;
        margin-right: 1.2rem;
        margin-top: 0.5rem;
        justify-content: space-between;
        align-items: center;
        height: 2.5rem;
      }

      .button img {
        width: 24px;
        height: 24px;
      }

      button {
        border-style: none;
        background-color: transparent;
        cursor: pointer;
      }

      .main {
        margin: 1.5rem 2rem;
      }

      .title {
        margin: 0;
        font-size: 1.5rem;
      }

      .description {
        margin: 0;
        margin-top: 0.5rem;
        font-size: 0.8rem;
      }

      .form {
        margin-top: 1.5rem;

      }

      label {
        display: block;
        font-weight: 500;
        margin: 0.2rem 0;
      }

      label[for=password] {
        margin-top: 0.8rem;
      }

      input {
        width: 96%;
        height: 2.2rem;
        border-radius: 8px;
        border: 1px solid var(--border-color);
        padding-left: 0.5rem;
        font-size: 0.9rem;
      }

      input[type="password"] {
        letter-spacing: 4px;
      }

      .forgot {
        margin: 0;
        margin-top: 0.5rem;
        font-size: 0.8rem;
        font-weight: 700;
        color: var(--primary-color);
        text-align: right;
      }

      .btn-signin {
        width: 100%;
        margin-top: 1.5rem;
        background-color: var(--primary-color);
        color: white;
        font-size: 1rem;
        font-weight: 500;
        padding: 0.7rem;
        border-radius: 8px;
      }

      .dont {
        text-align: center;
        font-size: 0.8rem;
        margin-top: 1.8rem;
      }

      .dont span {
        color: var(--primary-color);
        font-weight: 700;
      }
    `}connectedCallback(){this.render(),this.addEventListener("click",this),this.form=this.shadowRoot.querySelector("#form"),this.form.addEventListener("submit",this)}render(){this.shadowRoot.innerHTML=`
    <style>${g.styles}</style>
    <div class="container">
      <header class="header">
        <img src="vite.svg" alt="logo">
        <button class="button button-close">
          <img class="btn-close button-close" src="icons/Close.svg" alt="close">
        </button>
      </header>
      <main class="main">
        <h1 class="title">Lon in</h1>
        <p class="description">Welcom back! Please enter your details.</p>
        <form method="post" action="" id="form" class="form">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" required>
          <label for="password">Password</label>
          <input type="password" id="password" name="password" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022" required>
          <p class="forgot">Forgot password</p>
          <button class="btn-signin" type="submit">Sign in</button>
        </form>
        <p class="dont">Don't have an account? <span class="signup">Sign up</span></p>
      </main>
    </div>`}}customElements.define("modal-login",g);class b extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}handleEvent(t){const o=t.composedPath();t.type==="click"&&((o[0].classList.contains("menu-close")||o[0].classList.contains("menu-show"))&&this.removeAttribute("class","menu-show"),o[0].classList.contains("btn-login")&&(this.removeAttribute("class","menu-show"),this.dispatchEvent(new CustomEvent("login",{bubbles:!0,detail:{name:"loginMenu"}}))),o[0].classList.contains("btn-signup")&&(this.removeAttribute("class","menu-show"),this.dispatchEvent(new CustomEvent("login",{bubbles:!0,detail:{name:"signupMenu"}}))),o[0].classList.contains("btn-logout")&&(document.location.reload(),$()))}static get styles(){return`
      :host {
        position: fixed;
        top: 83px;
        width: 100%;
        height: 100%;
        right: 0;
        transform: translateX(100%);
        transition: transform 0.3s;
        background-color: transparent;
        padding-bottom: 1rem;
      }

      .container {
        background-color: #fff;
        margin-left: auto;
        width: 60%;
        display: flex;
        align-items: center;
        flex-direction: column;
      }

      button {
        border-style: none;
        background-color: transparent;
        cursor: pointer;
      }

      .nav-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        border-bottom: 1px solid var(--border-color);
      }

      .nav-header img {
        padding: 0.5rem;
      }

      .menu {
        list-style: none;
        padding: 0;
        margin: 0;
        margin-bottom: 1.5rem;
      }

      .menu-item {
        padding: 1em;
        border-bottom: 1px solid var(--button-color);
      }

      .menu-link {
        color: var(--text-color);
        text-decoration: none;
      }

      .btn-close {
        background: transparent;
      }

      .btn-close img {
        width: 24px;
        height: 24px;
      }

      .container-buttons {
        width: 90%;
      }

      .btn {
        font-size: 1rem;
        padding: 0.5rem;
        width: 100%;
        border-radius: 5px;
        margin-bottom: 1.5rem;
      }

      .btn-signup {
        background-color: var(--primary-color);
        color: white;
        margin-bottom: 0.5rem;
      }

      .btn-login {
        border: 1px solid var(--border-color);
        font-weight: 500;
      }

      .btn-logout {
        background-color: var(--error-color);
        color: white;
      }
    `}connectedCallback(){this.render(),this.container=this.shadowRoot.querySelector(".container"),this.addEventListener("click",this)}statusAuth(t){this.container.removeChild(this.container.lastChild);const o=document.createElement("div");o.setAttribute("class","container-buttons"),this.container.appendChild(o);const s=document.createElement("button");if(t){const e=s.cloneNode();e.setAttribute("class","btn btn-logout"),e.textContent="Log out",o.appendChild(e)}else{const e=s.cloneNode();e.setAttribute("class","btn btn-signup"),e.textContent="Sign up";const i=s.cloneNode();i.setAttribute("class","btn btn-login"),i.textContent="Log in",o.appendChild(e),o.appendChild(i)}}render(){this.shadowRoot.innerHTML=`
    <style>${b.styles}</style>
    <div class="container">
      <div class="nav-header">
        <img src="vite.svg" alt="logo">
        <button id="btn-close" class="btn-close menu-close">
          <img src="icons/Close.svg" class="menu-close" alt="close">
        </button>
      </div>
      <ul class="menu" id="main-menu">
        <li class="menu-item"><a href="#" class="menu-link">Home</a></li>
        <li class="menu-item"><a href="#" class="menu-link">Product</a></li>
        <li class="menu-item"><a href="#" class="menu-link">Resources</a></li>
        <li class="menu-item"><a href="#" class="menu-link">Pricing</a></li>
      </ul>
      <div class="container-buttons">
      </div>
    </div>`}}customElements.define("nav-menu",b);const a=document.querySelector(".container-cards"),c=document.querySelector("main"),D=document.querySelector(".btn-add"),B=document.querySelector(".btn-menu"),w=document.querySelector(".welcome-title");c.appendChild(document.createElement("modal-menu"));c.appendChild(document.createElement("nav-menu"));c.appendChild(document.createElement("modal-login"));c.appendChild(document.createElement("modal-signup"));const O=document.querySelector("modal-menu"),d=document.querySelector("nav-menu"),W=document.querySelector("modal-login"),Q=document.querySelector("modal-signup");D.addEventListener("click",()=>O.classList.add("modal-show"));B.addEventListener("click",()=>{d.classList.toggle("menu-show")});document.addEventListener("apply",r=>U(r));document.addEventListener("login",r=>G(r));function y(r){return 250*r/16384}function U(r){let t=!0;r.detail.filters.forEach((o,s)=>{if(a.childNodes.forEach(e=>{e.getAttribute("parameter")===o&&(a.removeChild(e),t=!1)}),t){const e=document.createElement("card-parameter");e.setAttribute("title",r.detail.title[s]),e.setAttribute("parameter",o),e.setAttribute("value","0"),a.appendChild(e),z("Volt_L1-N").then(i=>{const n=y(i.data().current).toFixed(1);e.setValue(n)}),t=!0}})}function G(r){r.detail.name==="signupMenu"&&Q.setAttribute("class","modal-show"),r.detail.name==="loginMenu"&&W.setAttribute("class","modal-show"),(r.detail.name==="loging"||r.detail.name==="signup")&&(w.innerText=`Welcome back, ${r.detail.userName}`)}H(l,r=>{r?(console.log("user loged..."),d.statusAuth(!0),w.innerText=`Welcome back, ${r.displayName}`,I(t=>{const o=a.querySelectorAll("card-parameter");t.forEach(s=>{o.forEach(e=>{if(e.parameter==="L1-Neutro"&&s.id==="Volt_L1-N"){const i=y(s.data().current).toFixed(1);e.setValue(i)}})})})):d.statusAuth(!1)});
