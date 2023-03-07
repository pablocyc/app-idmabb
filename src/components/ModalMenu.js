import "./FilterParameter.js";

class ModalMenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.titleFilter = [];
    this.filterSelected = [];
    this.idsSelected = [];
  }

  handleEvent(event) {
    const path = event.composedPath();
    if (event.type === "click") {
      if (path[0].className === "modal-show" || path[0].className === "btn-close") {
        this.classList.remove("modal-show");
        this.filters.forEach(filter => filter.unSave(this.filterSelected));
        this.filterSelected = [];
      }
      if (path[0].classList.contains("clear")) {
        this.filters.forEach(filter => filter.clear());
      }
      if (path[0].classList.contains("apply")) {
        this.classList.remove("modal-show");
        const applyEvent = new CustomEvent("apply", {
          detail: {
            title: this.titleFilter,
            filters: this.filterSelected,
            id: this.idsSelected
          },
          bubbles: true,
          composed: true
        });
        this.dispatchEvent(applyEvent);
        this.filterSelected = [];
        this.titleFilter = [];
        this.idsSelected = [];
      }
    }

    if (event.type === "filter") {
      this.titleFilter.push(event.detail.title);
      this.filterSelected.push(event.detail.message);
      this.idsSelected.push(event.detail.id);
    }
  }

  static get styles() {
    return /* css */`
      :host {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
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
        height: 75vh;
        top: -4rem;
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
        background-color: var(--button-color);
        position: fixed;
        bottom: 7.1rem;
        width: 85vw;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid var(--text-color);
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
        color: var(--card-color);
      }

      .apply {
        margin-right: 1.5rem;
        color: var(--card-color);
        border: 1px solid var(--card-color);
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
          params="L1-Neutro, L2-Neutro, L3-Neutro, L1 - L2, L2 - L3, L3 - L1"
          ids="Volt_L1-N,Volt_L2-N,Volt_L3-N,Volt_L1-L2,Volt_L2-L3,Volt_L3-L1">
        </filter-parameter>
        <filter-parameter
          title="Corriente"
          params="I1, I2, I3, I1 + I2 + I3"
          ids="I_1,I_2,I_3,I_Total">
        </filter-parameter>
        <filter-parameter
          title="Potencia"
          params="P1 - Activa, P2 - Activa, P3 - Activa, PT - Activa Total, Q1 - Reactiva, Q2 - Reactiva, Q3 - Reactiva, QT - Reactiva Total, S1 - Aparente, S2 - Aparente, S3 - Aparente, ST - Aparente Total"
          ids="P_1,P_2,P_3,P_Total,Q_1,Q_2,Q_3,Q_Total,S_1,S_2,S_3,S_Total">
        </filter-parameter>
        <filter-parameter
          title="Factor de Potencia"
          params="FP 1, FP 2, FP 3, FPT Total"
          ids="FP_1,FP_2,FP_3,FP_Total">
        </filter-parameter>
        <filter-parameter
          title="Frecuencia"
          params="Frecuencia-1"
          ids="Frecuency">
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
