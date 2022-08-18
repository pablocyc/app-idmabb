import "./FilterParameter.js";

class ModalMenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.filterSelected = [];
    this.titleFilter = [];
  }

  handleEvent(event) {
    const path = event.path[0];
    if (event.type === "click") {
      if (path.classList.contains("modal-show") || path.classList.contains("btn-close")) {
        this.classList.remove("modal-show");
        this.filters.forEach(filter => filter.unSave(this.filterSelected));
        this.filterSelected = [];
      }
      if (path.classList.contains("clear")) {
        this.filters.forEach(filter => filter.clear());
      }
      if (path.classList.contains("apply")) {
        this.classList.remove("modal-show");
        const applyEvent = new CustomEvent("apply", {
          detail: { title: this.titleFilter, filters: this.filterSelected },
          bubbles: true,
          composed: true
        });
        this.dispatchEvent(applyEvent);
        this.filterSelected = [];
        this.titleFilter = [];
      }
    }

    if (event.type === "filter") {
      this.filterSelected.push(event.detail.message);
      this.titleFilter.push(event.detail.title);
    }
  }

  static get styles() {
    return /* css */`
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
    `;
  }

  connectedCallback() {
    this.render();
    this.container = this.shadowRoot.querySelector(".container-params");
    this.filters = this.shadowRoot.querySelectorAll("filter-parameter");
    this.addEventListener("click", this);
    this.addEventListener("filter", this);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${ModalMenu.styles}</style>
    <div class="container">
      <div class="header">
        <h1 class="title">Parameters</h1>
        <button class="button">
          <img class="btn-close" src="icons/Close.svg" alt="close">
        </button>
      </div>
      <div class="container-params">
        <filter-parameter
          title="Tensión"
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
    </div>`;
  }
}

customElements.define("modal-menu", ModalMenu);
