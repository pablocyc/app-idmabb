import "./CardGraph.js";

class CardParameter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.graph = false;
    this.icon = "maximize"
    this.data = {};
  }

  handleEvent(event) {
    const path = event.composedPath();
    if (event.type === "click") {
      if (path[0].classList.contains("btn-graph") || path[0].classList.contains("icon-maximize")) {
        this.graph = true;
        this.icon = "minimize";
        this.render();
        this.shadowRoot.querySelector("card-graph").setData(this.data, this.parameter);
      }
    }
    if (event.type === "click") {
      if (path[0].classList.contains("btn-graph") || path[0].classList.contains("icon-minimize")) {
        this.graph = false;
        this.icon = "maximize";
        this.render();
      }
    }
  }

  static get styles() {
    return /* css */`
      :host {
        width: 100%;
      }

      .container {
        border: 1.5px solid var(--text-color);
        border-radius: 12px;
        padding: 1rem;
        background-color: var(--card-color);
      }

      .header {
        display: flex;
        justify-content: space-between;
      }

      .main {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
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
    `;
  }

  connectedCallback() {
    this.title = this.getAttribute("title") || "Sensor";
    this.parameter = this.getAttribute("parameter") || "-";
    this.value = this.getAttribute("value") || "0";
    this.id = this.getAttribute("id") || "";
    this.render();
    this.main = this.shadowRoot.querySelector(".main");
    this.addEventListener("click", this);
  }

  setValue(data) {
    this.value = this.getValue(data.current, this.id).toFixed(1);
    this.data = Object.fromEntries(
      Object.entries(data.data).map(([key, val]) => [key.substring(3), this.getValue(val, this.id).toFixed(1)])
    );
    if (!this.graph) {
      this.shadowRoot.querySelector(".value").textContent = `${this.value}`;
    }
  }

  getDataRT(graph = false) {
    if (!graph)
      return /* html */ `
        <div class="metrics">
          <div class="value">${this.value}</div>
          <div class="vs-last">
            <img src="./icons/arrow-up.svg" alt="arrow-up">
            <p class="percent">20%</p>
            <p class="vs">vs last hour</p>
          </div>
        </div>
        <img src="./icons/Chart.svg" alt="chart">
      `
    return /* html */ `
      <card-graph></card-graph>
    `
  }

  getValue(data, id = "other") {
    let nominal = 16384;
    let nominalValue = 250;
    if (id === "Frecuency") {
      nominal = 8192;
      nominalValue = 50;
    }
    return nominalValue * data / nominal;
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${CardParameter.styles}</style>
    <div class="container">
      <div class="header">
        <h1 class="title">${this.title} <strong>${this.parameter}</strong></h1>
        <button class="btn-graph">
          <img class="icon-${this.icon}" src="./icons/${this.icon}.svg" alt="${this.icon}">
        </button>
      </div>
      <div class="main">
        ${this.getDataRT(this.graph)}
      </div>
    </div>`;
  }
}

customElements.define("card-parameter", CardParameter);
