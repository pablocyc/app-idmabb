class CardParameter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
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
    `;
  }

  connectedCallback() {
    this.title = this.getAttribute("title") || "Sensor";
    this.parameter = this.getAttribute("parameter") || "-";
    this.value = this.getAttribute("value") || "0";
    this.render();
  }

  setValue(value) {
    this.value = value;
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${CardParameter.styles}</style>
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
    </div>`;
  }
}

customElements.define("card-parameter", CardParameter);
