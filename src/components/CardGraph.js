import "./ChartOverview.js";

class CardGraph extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.range = [];
    this.data = [];
    this.label = "";
    const today = new Date();
    today.setHours(today.getHours() - 4);
    this.today = today.toISOString().slice(0, 10);
  }

  handleEvent(event) {
    const path = event.composedPath();
    if (event.type === "click") {
      if (path[0].classList.contains("btn")) {
        path[1].childNodes.forEach( (node, index) => {
          if (index % 2 !== 0) {
            node.classList.remove("active");
          }
        });
        path[0].classList.toggle("active");
        this.setChart(path[0].textContent);
      }

      if (path[0].classList.contains("btn-select")) {
        console.log(this.input);
        this.input.click();
      }
    }
  }

  static get styles() {
    return /* css */`
      :host {
        width: 100%;
      }

      .container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }

      .active {
        --text-color: #f2f4f6;
        background-color: var(--primary-color);
      }

      .btn {
        padding: 10px 16px;
        border: 1px solid var(--gray-color);
        color: var(--text-color);
      }

      .button-group {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        margin-top: 1rem;
        font-weight: 500;
      }

      .button-group span:first-child {
        border-radius: 8px 0 0 8px;
      }
      .button-group span:last-child {
        border-radius: 0 8px 8px 0;
      }

      .date-picker {
        margin-top: 1rem;
        font-weight: 500;
        display: flex;
        gap: 12px;
      }

      .btn-date {
        display: flex;
        gap: 10px;
        border: 1px solid var(--gray-color);
        border-radius: 8px;
        align-items: center;
      }

      .icon {
        width: 20px;
      }

      .main {
        width: 100%;
      }

      .title-analytics {
        margin-bottom: 0.5rem;
      }

      input {
        background-color: transparent;
        color: var(--text-color);
        border: none;
        font-size: 1.2rem;
        font-style: italic;
        font-family: Satoshi-Variable, sans-serif;
      }
    `;
  }

  connectedCallback() {
    this.render();
    this.main = this.shadowRoot.querySelector(".main");
    this.input = this.shadowRoot.querySelector("input");
    this.chart = this.shadowRoot.querySelector("chart-overview");
    this.addEventListener("click", this);
  }

  setData(data, label) {
    this.label = label;
    this.range =  Object.entries(data).map(([key, val]) => key);
    this.data =  Object.entries(data).map(([key, val]) => val);
  }

  setChart(select) {
    if (select === "12m") {
    }
    if (select === "30d") {
      console.log("date");
    }
    if (select === "7d") {
      console.log("week");
    }
    if (select === "24h") {
      console.log(this.input.value, this.input.type);
      const newRange = [];
      const newData = [];
      this.range.map( (ts, index) => {
        const timestamp = new Date(ts * 1000);
        // timestamp.setHours(timestamp.getHours() - 4);
        const date = timestamp.toISOString().slice(0, 10);
        if (this.input.value === date) {
          newRange.push(timestamp);
          newData.push(this.data.at(index));
        }
      })
      this.chart.setDataChart(newRange, newData, this.label);
    }
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${CardGraph.styles}</style>
    <div class="container">
      <div class="button-group">
        <span class="btn">12m</span>
        <span class="btn">30d</span>
        <span class="btn">7d</span>
        <span class="btn active">24h</span>
      </div>
      <div class="date-picker">
        <div class="btn btn-date btn-select">
          <img src="../icons/icon-calendar.svg" alt="icon-calendar" class="icon btn-select">
          <label class="btn-select" for="input-date">Select dates</label>
          </div>
          <div class="btn btn-date">
          <img src="../icons/icon-filter.svg" alt="icon-filter" class="icon">
          <span class="text-filter">Filters</span>
        </div>
      </div>
      <div class="main">
        <h2 class="title-analytics">Overview</h2>
        <input value="${this.today}" type="date" id="input-date" >
        <chart-overview></chart-overview>
      </div>
    </div>`;
  }
}

customElements.define("card-graph", CardGraph);
