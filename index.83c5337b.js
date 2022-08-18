import{initializeApp as p}from"https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";import{getFirestore as h}from"https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();class l extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    <style>${l.styles}</style>
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
    </div>`}}customElements.define("card-parameter",l);class c extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}handleEvent(t){const r=t.target.classList;if(r.contains("btn")){r.toggle("active");const i=new CustomEvent("filter",{detail:{title:this.title,message:t.path[0].innerText},bubbles:!0,composed:!0});this.dispatchEvent(i)}}static get styles(){return`
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
    `}connectedCallback(){this.title=this.getAttribute("title")||"-",this.params=this.getAttribute("params").split(","),this.render(),this.btns=this.shadowRoot.querySelectorAll(".btn"),this.shadowRoot.querySelector(".buttons").addEventListener("click",this)}unSave(t){t.forEach(r=>{this.btns.forEach(i=>{i.innerText===r&&i.classList.toggle("active")})})}getButtons(t){let r="";return t.forEach(i=>{r+=`<button class="btn">${i}</button> `}),r}clear(){this.btns.forEach(t=>{t.classList.remove("active")})}render(){this.shadowRoot.innerHTML=`
    <style>${c.styles}</style>
    <div class="container">
      <main class="main">
        <h1 class="title">${this.title}</h1>
        <div class="buttons">
          ${this.getButtons(this.params)}
        </div>
      </main>
    </div>`}}customElements.define("filter-parameter",c);class d extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.filterSelected=[],this.titleFilter=[]}handleEvent(t){const r=t.path[0];if(t.type==="click"&&((r.classList.contains("modal-show")||r.classList.contains("btn-close"))&&(this.classList.remove("modal-show"),this.filters.forEach(i=>i.unSave(this.filterSelected)),this.filterSelected=[]),r.classList.contains("clear")&&this.filters.forEach(i=>i.clear()),r.classList.contains("apply"))){this.classList.remove("modal-show");const i=new CustomEvent("apply",{detail:{title:this.titleFilter,filters:this.filterSelected},bubbles:!0,composed:!0});this.dispatchEvent(i),this.filterSelected=[],this.titleFilter=[]}t.type==="filter"&&(this.filterSelected.push(t.detail.message),this.titleFilter.push(t.detail.title))}static get styles(){return`
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
    <style>${d.styles}</style>
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
          params="L1-Neutro, L2-Neutro, L3-Neutro, L1 - L2, L2 - L3, L3 - L1">
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
    </div>`}}customElements.define("modal-menu",d);const m={firebaseConfig:{apiKey:"AIzaSyCV-VH5PUNT39c0NolUn08d8vI-pgeeDCo",authDomain:"idm144-abb.firebaseapp.com",projectId:"idm144-abb",storageBucket:"idm144-abb.appspot.com",messagingSenderId:"792421020780",appId:"1:792421020780:web:19e19311f5712f156e5449",measurementId:"G-BLV937Y7C0"}},u=p(m.firebaseConfig);h(u);const n=document.querySelector(".container-cards"),f=document.querySelector("modal-menu"),g=document.querySelector(".btn-add");g.addEventListener("click",()=>f.classList.add("modal-show"));document.addEventListener("apply",a=>b(a));function b(a){let t=!0;a.detail.filters.forEach((r,i)=>{if(n.childNodes.forEach(e=>{e.getAttribute("parameter")===r&&(n.removeChild(e),t=!1)}),t){const e=document.createElement("card-parameter");e.setAttribute("title",a.detail.title[i]),e.setAttribute("parameter",r),e.setAttribute("value","0"),n.appendChild(e),t=!0}})}
